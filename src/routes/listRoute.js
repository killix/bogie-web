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
    static paramDefinitions = {
        token: {required: true}
    };
}

export default class ListContainer extends React.Component {
    static containerProps = {
        Component: TrainList,
        RouteClass: ListRoute
    };

    render() {
        const {Component, RouteClass} = ListContainer.containerProps;
        return <IsomorphicRelay.RootContainer Component={Component} route={new RouteClass({
            token: this.props.location.state.token
        })} />;
    }
}
