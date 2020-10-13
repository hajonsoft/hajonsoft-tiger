import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useUserState from './redux/useUserState';


const PrivateRoute = ({ component: Component, ...rest }: any) => {
    const {isValid} = useUserState({provider: process.env.REACT_APP_AUTHPROVIDER});
    return (

        <Route {...rest} render={props => (
            isValid ?
                <Component {...props} />
                : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;