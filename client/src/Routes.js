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
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategory';
import Cart from './core/Cart';

export default function Routes(){
    return (
       <Router>
           <Switch>
               <Route path="/" exact component={ Home }/>
               <Route path="/signup" exact component={ Signup }/>
               <Route path="/signin" exact component={ Signin }/>
               <Route path="/cart" exact component={ Cart }/>
               <PrivateRoutes path="/user/dashboard" exact component={ UserDashBoard }/>
               <AdminRoutes path="/admin/dashboard" exact component={ AdminDashBoard }/>
               <AdminRoutes path="/admin/create/category" exact component={ AddCategory }/>
               <AdminRoutes path="/admin/categories" exact component={ ManageCategories }/>
               <AdminRoutes path="/admin/create/product" exact component={ AddProduct }/>
               <AdminRoutes path="/admin/products" exact component={ ManageProducts }/>
               <AdminRoutes path="/admin/product/update/:productId" exact component={ UpdateProduct }/>
               <AdminRoutes path="/admin/category/update/:categoryId" exact component={ UpdateCategory }/>
           </Switch>
       </Router>
    );
};

/* end of Routes.js */