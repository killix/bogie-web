import React from 'react';
import ReactDOM from 'react-dom';
import {
    browserHistory
} from 'react-router';

import IsomorphicRouter from 'isomorphic-relay-router';
import IsomorphicRelay from 'isomorphic-relay';
import Relay from 'react-relay';

import router from './router';

const token = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;)\s*token\s*\=\s*([^;]*).*$)|^.*$/, '$1'));
if (token) {
    Relay.injectNetworkLayer(
        new Relay.DefaultNetworkLayer(`${process.env.BACKEND_URL}/graphql`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    );

    browserHistory.replace({
        state: {
            token
        }
    });
}

const data = JSON.parse(document.getElementById('preloadedData').textContent);
IsomorphicRelay.injectPreparedData(data);

ReactDOM.render(
    <IsomorphicRouter.Router routes={router} history={browserHistory} />,
    document.querySelector('main')
);
