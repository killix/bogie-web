import React from 'react';
import ReactDOM from 'react-dom';
import createHashHistory from 'history/lib/createHashHistory';
import {
    Router
} from 'react-router';

import IsomorphicRelay from 'isomorphic-relay';
import Relay from 'react-relay';

import router from './router';

const token = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;)\s*token\s*\=\s*([^;]*).*$)|^.*$/, '$1'));
Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer(`${process.env.BACKEND_URL}/graphql`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
);

const data = JSON.parse(document.getElementById('preloadedData').textContent);
IsomorphicRelay.injectPreparedData(data);

const history = createHashHistory();
history.pushState({
    token
});

ReactDOM.render(
    <Router routes={router} history={history} />,
    document.querySelector('main')
);
