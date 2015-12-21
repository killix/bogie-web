import React from 'react';
import {
    Router
} from 'react-router';

import IsomorphicRelay from 'isomorphic-relay';
import Relay from 'react-relay';

import router from './router';

Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer(`${process.env.BACKEND_URL}/graphql`)
);

if (typeof window !== 'undefined') {
    const ReactDOM = require('react-dom');

    const data = JSON.parse(document.getElementById('preloadedData').textContent);
    IsomorphicRelay.injectPreparedData(data);

    ReactDOM.render(
        <Router routes={router} />,
        document.querySelector('main')
    );
}
