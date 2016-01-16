import React from 'react';
import {
    Router,
    Route,
    createRoutes
} from 'react-router';

import ListContainer from './routes/listRoute';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';

export default createRoutes(
    <Router>
        <Route path="/" component={ListContainer} onEnter={({location: {state, query}}, replace) => {
            if (!state.token) {
                replace(state, '/login', query);
            }
        }} />
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
    </Router>
);
