import React from 'react';
import Relay from 'react-relay';
import TrainType from '../types/train';

const styles = cssInJS({
    element: {
        backgroundColor: 'white'
    }
});

class Train extends React.Component {
    static propTypes = {
        train: TrainType
    };

    render() {
        return (
            <div className={`content ${styles.element}`}>
                {this.props.train.departure.name} &rarr; {this.props.train.arrival.name}
            </div>
        );
    }
}

export default Relay.createContainer(Train, {
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
