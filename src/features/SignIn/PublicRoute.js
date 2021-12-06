import React from "react";
import { Route } from "react-router-dom";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return <Route {...rest} render={(props) => Component ? <Component {...props} /> : props.children} />;
};

export default PublicRoute;
