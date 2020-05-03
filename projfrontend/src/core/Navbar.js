/* start of Navbar.js */

//component for creating a navbar

import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { isAuthenticated, signout } from '../auth/helper';

const activeTabChecker = (history, path) => {
    // history is given by react
    if(history.location.pathname === path){     //if the current path is same as the path provided, change tab link color
        return {
            color: "#2ECC72"
        };
    }
    return {
        color: "#FFFFFF"
    };
};

const Navbar = ({ history }) => {
    return (
      <div>
        <ul className="nav nav-tabs bg-dark">
          <li className="nav-item">
            <Link
              style={activeTabChecker(history, "/")}
              className="nav-link"
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={activeTabChecker(history, "/cart")}
              className="nav-link"
              to="/cart"
            >
              Cart
            </Link>
          </li>
          {/* Conditional rendering of dashboard links */}
          { isAuthenticated() && isAuthenticated().user.privilege === "Basic" && (
            <li className="nav-item">
            <Link
              style={activeTabChecker(history, "/user/dashboard")}
              className="nav-link"
              to="/user/dashboard"
            >
              Dashboard
            </Link>
          </li>
          )}
          { isAuthenticated() && isAuthenticated().user.privilege === "Admin" && (
            <li className="nav-item">
            <Link
              style={activeTabChecker(history, "/admin/dashboard")}
              className="nav-link"
              to="/admin/dashboard"
            >
              Admin Dashboard
            </Link>
          </li>
          )}
          {!isAuthenticated() && (      //don't show the signup & signin links when already logged in
              <Fragment>
              <li className="nav-item ml-auto">
                <Link
                  style={activeTabChecker(history, "/signup")}
                  className="nav-link"
                  to="/signup"
                >
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={activeTabChecker(history, "/signin")}
                  className="nav-link"
                  to="/signin"
                >
                  Signin
                </Link>
              </li>
            </Fragment>
          )}
          {isAuthenticated() && (       //conditional rendering of the logout button
            <Fragment>
                <li className="nav-item ml-auto">
                    <span
                        className="nav-link text-warning"
                        onClick={() => {
                        signout(() => {
                            history.push("/");
                        });
                        }}
                    >
                        Logout
                    </span>
                </li>
            </Fragment>
          )}
        </ul>
      </div>
    );
};

export default withRouter(Navbar);

/* end of Navbar.js */