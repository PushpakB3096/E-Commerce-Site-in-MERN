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
      <ul className="collection with-header">
        <li className="collection-header">
          <h6>Admin Panel</h6>
        </li>
        <Link to="/admin/create/category" className="collection-item">
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
      //   <div>
      //     <div className="card mb-4">
      //       <h4 className="card-header">Admin Information</h4>
      //       <ul className="list-group">
      //         <li className="list-group-item">
      //           <span className="badge badge-success mr-2">First Name: </span>
      //           <span>{firstName}</span>
      //         </li>
      //         <li className="list-group-item">
      //           <span className="badge badge-success mr-2">Last Name: </span>
      //           <span>{lastName}</span>
      //         </li>
      //         <li className="list-group-item">
      //           <span className="badge badge-success mr-2">Email Address: </span>
      //           <span>{email}</span>
      //         </li>
      //         <li className="list-group-item">
      //           <span className="badge badge-success mr-2">User Info: </span>
      //           <span>{userInfo}</span>
      //         </li>
      //         <li className="list-group-item">
      //           <span className="badge badge-danger mr-2">User Role: </span>
      //           <span>{privilege}</span>
      //         </li>
      //       </ul>
      //     </div>
      //   </div>
      <ul className="collection with-header">
        <li className="collection-header">
          <h5>Admin Information</h5>
        </li>
        <li className="collection-item">
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
