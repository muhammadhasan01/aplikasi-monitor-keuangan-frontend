import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUserFromToken } from "_helpers";

import { authenticationService } from "_services";

export const PrivateRoute = ({ UserComponent: User, AdminComponent: Admin, ...rest }) => (
    <Route {...rest} render={ props => {
        const currentUser = authenticationService.currentUserValue;
        const userInfo = getUserFromToken(currentUser);
        console.log("We have", currentUser, userInfo);
        if (!currentUser || !userInfo) {
            // Not logged in or JWT Token Expired, so redirect to login page with the return url
            authenticationService.logout();
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // Authorized, so return the component
        // and redirect it with its user role/type
        console.log(userInfo);
        if (userInfo.type === "User") {
            return <User userInfo={userInfo} {...props} />
        } else if (userInfo.type === "Admin") {
            return <Admin userInfo={userInfo} {...props} />
        }
    }}/>
)