import React from "react";
import { Route, Redirect } from "react-router-dom";

function AuthRoute(props) {
  const { component: Component, authenticated, ...rest } = props;
  return (
    <Route
      {...rest}
      render={() =>
        authenticated === true ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

export default AuthRoute;
