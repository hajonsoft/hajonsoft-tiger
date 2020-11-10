import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../firebaseapp'
function PrivateRoute({ children, ...rest }) {
  const [user] = useAuthState(firebase.auth());
    return (
      <Route
        {...rest}
        render={({ location }) =>
        user && user.uid ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

export default PrivateRoute;
