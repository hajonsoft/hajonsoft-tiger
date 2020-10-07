import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useUserState from './redux/useUserState';


const PrivateRoute = ({ component: Component, ...rest }: any) => {
    const {isAuthenticated} = useUserState();
    return (

        <Route {...rest} render={props => (
            isAuthenticated ?
                <Component {...props} />
                : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;