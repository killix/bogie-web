import React from 'react';

import IsomorphicRelay from 'isomorphic-relay';
import Relay from 'react-relay';

import TrainList from '../components/trainList';

class ListRoute extends Relay.Route {
    static routeName = 'ListRoute';
    static queries = {
        trains: Component => Relay.QL`
            query {
                trains {
                    ${Component.getFragment('trains')}
                }
            }
        `
    };
}

export default class ListContainer extends React.Component {
    static containerProps = {
        Component: TrainList,
        route: new ListRoute()
    };

    render() {
        return <IsomorphicRelay.RootContainer {...ListContainer.containerProps} />;
    }
}
