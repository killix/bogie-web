import React from 'react';
import Relay from 'react-relay';
import StyleSheet from 'react-style';

import Train from './train';

const styles = StyleSheet.create({
    list: {
        backgroundColor: 'white'
    }
});

class TrainList extends React.Component {
    render() {
        return <ul styles={styles.list}>
            {this.props.trains.edges.map(edge => <Train key={edge.node.id} train={edge.node} />)}
        </ul>;
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
