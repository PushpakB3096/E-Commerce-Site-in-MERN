/* start of Routes.js */

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import PrivateRoutes from './auth/helper/PrivateRoutes';
import AdminRoutes from './auth/helper/AdminRoutes';
import AdminDashBoard from './user/AdminDashBoard';
import UserDashBoard from './user/UserDashBoard';


export default function Routes(){
    return (
       <Router>
           <Switch>
               <Route path="/" exact component={ Home }/>
               <Route path="/signup" exact component={ Signup }/>
               <Route path="/signin" exact component={ Signin }/>
               <PrivateRoutes path="/user/dashboard" exact component={ UserDashBoard }/>
               <AdminRoutes path="/admin/dashboard" exact component={ AdminDashBoard }/>
           </Switch>
       </Router>
    );
};

/* end of Routes.js */