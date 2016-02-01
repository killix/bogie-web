import React from 'react';
import {
    RelayRouter
} from 'react-router-relay';
import {
    Route,
    createRoutes
} from 'react-router';

import TrainList from './components/trainList';
import ListQueries from './routes/listRoute';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';

export default createRoutes(
    <RelayRouter>
        <Route path="/" component={TrainList} queries={ListQueries} onEnter={({location}, replace) => {
            if (!location.state.token) {
                replace({
                    ...location,
                    pathname: '/login'
                });
            }
        }} stateParams={['token']} />
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
    </RelayRouter>
);
