import React from 'react';
import Relay from 'react-relay';

const styles = cssInJS({
    element: {
        backgroundColor: 'white'
    }
});

class TrainList extends React.Component {
    render() {
        return <div className={`content ${styles.element}`}>
            {this.props.train.departure.name} &rarr; {this.props.train.arrival.name}
        </div>;
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
