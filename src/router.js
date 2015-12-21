import React from 'react';
import {
    Router,
    Route,
    createRoutes
} from 'react-router';

import ListContainer from './routes/listRoute';

export default createRoutes(
    <Router>
        <Route path="/" component={ListContainer} />
    </Router>
);
