import React from 'react';

import IsomorphicRelay from 'isomorphic-relay';
import Relay from 'react-relay';

import TrainList from './components/trainList';
import ListRoute from './routes/listRoute';

Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer('http://192.168.1.16:5000/graphql')
);

const rootContainerProps = {
    Component: TrainList,
    route: new ListRoute()
};

if (typeof window === 'undefined') {
    const ReactDOMServer = require('react-dom/server');
    const RelayStoreData = require('react-relay/lib/RelayStoreData');

    RelayStoreData.getDefaultInstance().getChangeEmitter().injectBatchingStrategy(() => {
        // NOOP
    });

    module.exports = () => IsomorphicRelay.prepareData(rootContainerProps).then(data => {
        const reactOutput = ReactDOMServer.renderToString(
            <IsomorphicRelay.RootContainer {...rootContainerProps} />
        );

        return {
            preloadedData: JSON.stringify(data),
            reactOutput
        };
    });
} else {
    const ReactDOM = require('react-dom');

    const data = JSON.parse(document.getElementById('preloadedData').textContent);
    IsomorphicRelay.injectPreparedData(data);

    ReactDOM.render(
        <IsomorphicRelay.RootContainer {...rootContainerProps} />,
        document.querySelector('main')
    );
}
