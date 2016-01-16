import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/lib/createBrowserHistory';
import {
    Router
} from 'react-router';

import IsomorphicRelay from 'isomorphic-relay';
import Relay from 'react-relay';

import router from './router';

const history = createHistory();

const token = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;)\s*token\s*\=\s*([^;]*).*$)|^.*$/, '$1'));
if (token) {
    Relay.injectNetworkLayer(
        new Relay.DefaultNetworkLayer(`${process.env.BACKEND_URL}/graphql`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    );

    history.pushState({
        token
    });
}

const preloadedData = document.getElementById('preloadedData');
if (preloadedData) {
    const data = JSON.parse(preloadedData.textContent);
    IsomorphicRelay.injectPreparedData(data);
}

ReactDOM.render(
    <Router routes={router} history={history} />,
    document.querySelector('main')
);
