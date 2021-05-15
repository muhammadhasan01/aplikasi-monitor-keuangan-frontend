import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUserFromToken } from "_helpers";

import { authenticationService } from "_services";

export const PrivateRoute = ({
  UserComponent: User,
  AdminComponent: Admin,
  UserType: userType,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      const currentUser = authenticationService.currentUserValue;
      const userInfo = getUserFromToken(currentUser);
      if (!currentUser || !userInfo) {
        // Not logged in or JWT Token Expired, so redirect to login page with the return url
        authenticationService.logout();
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }

      // Authorized, so return the component
      // and redirect it with its user role/type
      if (!userType || userInfo.type === userType) {
        if (userInfo.type === "User") {
          return <User userInfo={userInfo} {...props} />;
        } else if (userInfo.type === "Admin") {
          return <Admin userInfo={userInfo} {...props} />;
        }
        return <div>ERROR</div>;
      } else {
        // TODO: Maybe make an error 404 not found component would be better
        return <div>Error 404 Not Found</div>;
      }
    }}
  />
);