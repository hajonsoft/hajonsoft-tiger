import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../firebaseapp'
function PrivateRoute({ children, ...rest }) {

  const [user, loading, error] = useAuthState(firebase.auth());

  if (loading) {
    return (
      null
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
    return (
      <Route
        {...rest}
        render={({ location }) =>
        user ? (
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
