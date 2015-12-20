import React from 'react';
import Relay from 'react-relay';
import StyleSheet from 'react-style';

const styles = StyleSheet.create({
    element: {
        backgroundColor: 'white'
    }
}, 'train_styles', true);

class TrainList extends React.Component {
    render() {
        return <li styles={styles.element}>
            {this.props.train.departure.name} -> {this.props.train.arrival.name}
        </li>;
    }
}

export default Relay.createContainer(TrainList, {
    fragments: {
        train: () => Relay.QL`
            fragment on Train {
                departure {
                    name
                },
                arrival {
                    name
                }
            }
        `
    }
});
