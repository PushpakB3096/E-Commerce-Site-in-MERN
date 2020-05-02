/* start of Routes.js */

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';

export default function Routes(){
    return (
       <Router>
           <Switch>
               <Route path="/" exact component={ Home }/>
               <Route path="/signup" exact component={ Signup }/>
               <Route path="/signin" exact component={ Signin }/>
           </Switch>
       </Router>
    );
};

/* end of Routes.js */