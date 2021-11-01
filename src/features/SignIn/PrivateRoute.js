import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";



function PrivateRoute({ children, ...rest }) {

  const authData = useSelector(state => state.auth?.data);
  const loading = useSelector(state => state.auth?.loading);
  const error = useSelector(state => state.auth?.error);
  if (loading) {
    return (
      null
    );
  }
  if (error) {
    return (
      <div>
        <Snackbar open={!!error} autoHideDuration={6000}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      </div>
    );
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authData?.name ? (
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
