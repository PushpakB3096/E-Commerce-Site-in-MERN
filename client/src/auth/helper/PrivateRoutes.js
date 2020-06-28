/* start of PrivateRoutes.js */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from './index';

const PrivateRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().user.privilege !== "Admin" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoutes;
 
/* end of PrivateRoutes.js */