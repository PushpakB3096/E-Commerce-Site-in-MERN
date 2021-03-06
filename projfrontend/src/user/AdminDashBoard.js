/* start of AdminDashBoard.js */

import React from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';

import { isAuthenticated } from '../auth/helper/index';
import AddCategory from '../admin/AddCategory';

export default function AdminDashBoard(){

    const { user: { firstName, lastName, email, userInfo, privilege } } = isAuthenticated();      //destructuring the user data
    
    const adminLeftPanel = () => {
        return (
            <div className="card">
                <h6 className="card-header bg-dark text-white text-center">Admin Navigation Panel</h6>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/create/category" className="nav-link text-success text-center">Create Category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/categories" className="nav-link text-success text-center">Manage Categories</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/create/product" className="nav-link text-success text-center">Create Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/products" className="nav-link text-success text-center">Manage Products</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/orders" className="nav-link text-success text-center">Manage Orders</Link>
                    </li>
                </ul>
            </div>
        );
    };

    const adminRightPanel = () => {
        return (
            <div>
                <div className="card mb-4">
                    <h4 className="card-header">Admin Information</h4>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <span className="badge badge-success mr-2">First Name: </span><span>{ firstName }</span>
                        </li>
                        <li className="list-group-item">
                            <span className="badge badge-success mr-2">Last Name: </span><span>{ lastName }</span>
                        </li>
                        <li className="list-group-item">
                            <span className="badge badge-success mr-2">Email Address: </span><span>{ email }</span>
                        </li>
                        <li className="list-group-item">
                            <span className="badge badge-success mr-2">User Info: </span><span>{ userInfo }</span>
                        </li>
                        <li className="list-group-item">
                            <span className="badge badge-danger mr-2">User Role: </span><span>{ privilege }</span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    };

    return (
      <Base
        title="Admin Dashboard"
        description="Manage all of your products & orders here!"
        className = "container bg-success p-4"
      >
        <div className="row">
          <div className="col-3">{ adminLeftPanel() }</div>
          <div className="col-9">{ adminRightPanel() }</div>
        </div>
      </Base>
    );
};

/* end of AdminDashBoard.js */