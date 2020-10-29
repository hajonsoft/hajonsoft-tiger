import React from "react";
import { Redirect, Route } from "react-router-dom";
import useUserState from "./redux/useUserState";

function PrivateRoute({ children, ...rest }) {
    const {data: user} = useUserState()
    return (
      <Route
        {...rest}
        render={({ location }) =>
          user?.idToken ? (
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
