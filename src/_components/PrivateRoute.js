import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from "@/_services";

export const PrivateRoute = ({ component: Component, ...rest }) => {
    <Route {...rest} render={ props => {
        const currentUser = authenticationService.currentUserValue;
        if (!currentUser) {
            // Not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
        // Authorized, so return the component
        return <Component {...props} />
    }}/>
}