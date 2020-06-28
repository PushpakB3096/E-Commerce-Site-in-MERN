/* start of AdminDashBoard.js */

import React from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";

import { isAuthenticated } from "../auth/helper/index";

export default function AdminDashBoard() {
  const {
    user: { firstName, lastName, email, userInfo, privilege },
  } = isAuthenticated(); //destructuring the user data

  const adminLeftPanel = () => {
    return (
      <ul className="collection with-header z-depth-4">
        <li className="collection-header">
          <h6>Admin Panel</h6>
        </li>
        <Link to="/admin/create/category" className="collection-item z-depth-2">
          Create Category
        </Link>
        <Link to="/admin/categories" className="collection-item">
          Manage Categories
        </Link>
        <Link to="/admin/create/product" className="collection-item">
          Create Product
        </Link>
        <Link to="/admin/products" className="collection-item">
          Manage Products
        </Link>
        <Link to="/admin/orders" className="collection-item">
          Manage Orders
        </Link>
      </ul>
    );
  };

  const adminRightPanel = () => {
    return (
      <ul className="collection with-header z-depth-4">
        <li className="collection-header">
          <h5>{privilege} Information</h5>
        </li>
        <li className="collection-item z-depth-2">
          <span className="new badge left" data-badge-caption="">
            First Name
          </span>
          <span className="admin-info">{firstName}</span>
        </li>
        <li className="collection-item">
          <span className="new badge left" data-badge-caption="">
            Last Name
          </span>
          <span className="admin-info">{lastName}</span>
        </li>
        <li className="collection-item">
          <span className="new badge left" data-badge-caption="">
            Email Address
          </span>
          <span style={{ marginLeft: "4rem" }}>{email}</span>
        </li>
        {/* TODO: userInfo is not displaying */}
        {/* <li className="collection-item">
          <span className="new badge left" data-badge-caption="">
            User Info
          </span>
          <span>{userInfo}</span>
        </li> */}
        <li className="collection-item">
          <span className="new badge left" data-badge-caption="">
            User Role
          </span>
          <span style={{ marginLeft: "5.4rem" }}>{privilege}</span>
        </li>
      </ul>
    );
  };

  return (
    <Base
      title="Admin Dashboard"
      description="Manage all of your products & orders here!"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col l4 m4 s12">{adminLeftPanel()}</div>
        <div className="col l8 m8 s12">{adminRightPanel()}</div>
      </div>
    </Base>
  );
}

/* end of AdminDashBoard.js */
