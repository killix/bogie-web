import React from 'react';
import ReactDOM from 'react-dom';
import {
    browserHistory
} from 'react-router';

import IsomorphicRouter from 'isomorphic-relay-router';
import IsomorphicRelay from 'isomorphic-relay';
import Relay from 'react-relay';

import cookieDough from 'cookie-dough';

import router from './router';

const cookies = cookieDough();
browserHistory.replace({
    state: {
        cookies
    }
});

const token = cookies.get('token');
if (token) {
    Relay.injectNetworkLayer(
        new Relay.DefaultNetworkLayer(`${process.env.BACKEND_URL}/graphql`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    );
}

const data = JSON.parse(document.getElementById('preloadedData').textContent);
IsomorphicRelay.injectPreparedData(data);

ReactDOM.render(
    <IsomorphicRouter.Router routes={router} history={browserHistory} />,
    document.querySelector('main')
);
