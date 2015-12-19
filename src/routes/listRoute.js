import Relay from 'react-relay';

export default class ListRoute extends Relay.Route {
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
