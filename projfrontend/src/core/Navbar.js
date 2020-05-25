/* start of Navbar.js */

//component for creating a navbar

import React, { Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import M from "materialize-css";

import { isAuthenticated, signout } from "../auth/helper";

const Navbar = ({ history }) => {
  
  useEffect(() => {
    var notAvailableModal = document.querySelectorAll(".modal");
    var modalInst = M.Modal.init(notAvailableModal, {
      startingTop: "80%",
      inDuration: 330,
      outDuration: 400,
      dismissible: true,
      opacity: 0.65,
    });
  
    var sidebarElem = document.querySelectorAll('.sidenav');
    var sidebarInst = M.Sidenav.init(sidebarElem, {
      inDuration: 320
    });

    var tooltipElem = document.querySelectorAll('.tooltipped');
    var tooltipInst = M.Tooltip.init(tooltipElem, {});
  }, []);

  return (
    <div id="navbar-div">
      <ul className="sidenav" id="mobile-demo">
        {isAuthenticated() && (
          <li>
            <Link to="/cart">
              <i className="material-icons left">shopping_cart</i>Cart
            </Link>
          </li>
        )}
        {!isAuthenticated() && ( //don't show the signup & signin links when already logged in
          <Fragment>
            <li>
              <Link to="/signup">
                <i className="material-icons left">person_add</i>Signup
              </Link>
            </li>
            <li>
              <Link to="/signin">
                <i className="material-icons left">person</i>Signin
              </Link>
            </li>
          </Fragment>
        )}
        {/* Conditional rendering of dashboard links */}
        {isAuthenticated() && isAuthenticated().user.privilege === "Basic" && (
          <li className="nav-item">
            <Link className="nav-link" to="/user/dashboard">
              <i className="material-icons left">dashboard</i>Dashboard
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.privilege === "Admin" && (
          <li>
            <Link to="/admin/dashboard">
              <i className="material-icons left">dashboard</i>Admin Dashboard
            </Link>
          </li>
        )}
        {isAuthenticated() && (
          <li>
            <Link
              data-target="not-available-modal"
              className="modal-trigger"
              to="#"
            >
              <i className="material-icons left">settings</i>Account Settings
            </Link>
          </li>
        )}
        {isAuthenticated() && ( //conditional rendering of the logout button
          <li>
            <Link
              to="#"
              onClick={() => {
                signout(() => {
                  history.push("/signin"); //redirects user to singin page after logging out
                });
              }}
            >
              <i className="material-icons left">remove_circle</i>Logout
            </Link>
          </li>
        )}
      </ul>
      <div id="not-available-modal" className="modal">
        <div className="modal-content">
          <h4>Page Under Construction</h4>
          <p>We are working on this page. Please come back later!</p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat"
          >
            Okay
          </a>
        </div>
      </div>
      <div className="navbar-fixed">
        <nav className="cyan darken-3 z-depth-3">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">
              <img
                id="brand-logo-img"
                src={require("./../assets/images/logo/facebook_cover_photo_1.png")}
                className="img-responsive"
              />
            </Link>
            <a
              href="#"
              data-target="mobile-demo"
              className="sidenav-trigger button-collapse"
            >
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              {isAuthenticated() && (
                <li>
                  <Link to="/cart">
                    <i className="material-icons left">shopping_cart</i>Cart
                  </Link>
                </li>
              )}
              {!isAuthenticated() && ( //don't show the signup & signin links when already logged in
                <Fragment>
                  <li>
                    <Link to="/signup">
                      <i className="material-icons left">person_add</i>Signup
                    </Link>
                  </li>
                  <li>
                    <Link to="/signin">
                      <i className="material-icons left">person</i>Signin
                    </Link>
                  </li>
                </Fragment>
              )}
              {/* Conditional rendering of dashboard links */}
              {isAuthenticated() &&
                isAuthenticated().user.privilege === "Basic" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/user/dashboard">
                      <i className="material-icons left">dashboard</i>Dashboard
                    </Link>
                  </li>
                )}
              {isAuthenticated() &&
                isAuthenticated().user.privilege === "Admin" && (
                  <li>
                    <Link to="/admin/dashboard">
                      <i className="material-icons left">dashboard</i>Admin
                      Dashboard
                    </Link>
                  </li>
                )}
              {isAuthenticated() && (
                <li>
                  <Link
                    data-target="not-available-modal"
                    className="modal-trigger tooltipped"
                    to="#"
                    data-position="bottom"
                    data-tooltip="Not Available"
                  >
                    <i className="material-icons left">settings</i>Account
                    Settings
                  </Link>
                </li>
              )}
              {isAuthenticated() && ( //conditional rendering of the logout button
                <li>
                  <Link
                    to="#"
                    onClick={() => {
                      signout(() => {
                        history.push("/signin"); //redirects user to singin page after logging out
                        M.toast({
                          html: "You have been logged out!",
                          classes: "rounded",
                        });
                      });
                    }}
                  >
                    <i className="material-icons left">remove_circle</i>Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default withRouter(Navbar);

/* end of Navbar.js */
