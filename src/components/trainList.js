import React from 'react';
import Relay from 'react-relay';

import Train from './train';

const styles = cssInJS({
    list: {
        backgroundColor: 'white'
    }
});

class TrainList extends React.Component {
    render() {
        return <div className={`ui relaxed divided list ${styles.list}`}>
            {this.props.trains.edges.map(edge => <Train key={edge.node.id} train={edge.node} />)}
        </div>;
    }
}

export default Relay.createContainer(TrainList, {
    fragments: {
        trains: () => Relay.QL`
            fragment on TrainConnection {
                edges {
                    node {
                        id,
                        ${Train.getFragment('train')}
                    }
                }
            }
        `
    }
});
