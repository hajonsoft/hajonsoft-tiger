import React from "react";
import { Route } from "react-router-dom";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  console.log('%cMyProject%cline:4%crest', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(254, 67, 101);padding:3px;border-radius:2px', rest)
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PublicRoute;
