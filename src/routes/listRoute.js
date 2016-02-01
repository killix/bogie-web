import Relay from 'react-relay';

export default {
    trains: Component => Relay.QL`
        query {
            trains {
                ${Component.getFragment('trains')}
            }
        }
    `
};
