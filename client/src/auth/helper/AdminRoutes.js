/* start of AdminRoutes.js */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from './index';

const AdminRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().user.privilege === "Admin" ? (
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

export default AdminRoutes;
 
/* end of AdminRoutes.js */