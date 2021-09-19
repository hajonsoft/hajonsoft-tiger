import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
function PrivateRoute({ children, ...rest }) {

  const authData = useSelector(state => state.auth.data);
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);

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
        authData?.user?.uid ? (
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
