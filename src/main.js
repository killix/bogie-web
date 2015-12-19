import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import TrainList from './components/trainList';
import ListRoute from './routes/listRoute';

if (typeof window !== 'undefined') {
    Relay.injectNetworkLayer(
        new Relay.DefaultNetworkLayer('http://192.168.1.16:5000/graphql')
    );

    ReactDOM.render(
        <Relay.RootContainer Component={TrainList} route={new ListRoute()} />,
        document.querySelector('main')
    );
}
