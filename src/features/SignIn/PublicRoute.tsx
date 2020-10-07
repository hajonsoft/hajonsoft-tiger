import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useUserState from './redux/useUserState';

const PublicRoute = ({component: Component, restricted, ...rest}: any) => {
const { isAuthenticated } = useUserState();

    return (
        <Route {...rest} render={props => (
            isAuthenticated && restricted ?
                <Redirect to="/dashboard" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;