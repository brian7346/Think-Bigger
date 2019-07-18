import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function AuthRoute(props) {
  const authenticated = useSelector(state => state.user.authenticated);

  console.log(authenticated);
  const { component: Component, ...rest } = props;
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
