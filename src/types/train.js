import {
    PropTypes
} from 'react';

export default PropTypes.shape({
    id: PropTypes.string,
    departure: PropTypes.shape({
        name: PropTypes.string
    }),
    arrival: PropTypes.shape({
        name: PropTypes.string
    })
});
