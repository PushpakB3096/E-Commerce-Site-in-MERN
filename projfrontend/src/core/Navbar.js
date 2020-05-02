/* start of Navbar.js */

//component for creating a navbar

import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const activeTabChecker = (history, path) => {
    // history is given by react
    if(history.location.pathname === path){     //if the current path is same as the path provided, change tab link color to white
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
                {/* TODO: add conditional rendering of navbar links */}
                <li className="nav-item">
                    <Link style={ activeTabChecker(history, "/") }
                          className="nav-link" to="/">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={ activeTabChecker(history, "/cart") }
                          className="nav-link" to="/cart">
                        Cart
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={ activeTabChecker(history, "/user/dashboard") }
                          className="nav-link" to="/user/dashboard">
                        Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={ activeTabChecker(history, "/admin/dashboard") }
                          className="nav-link" to="/admin/dashboard">
                        Admin Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={ activeTabChecker(history, "/signup") }
                          className="nav-link" to="/signup">
                        Signup
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={ activeTabChecker(history, "/signin") }
                          className="nav-link" to="/signin">
                        Signin
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={ activeTabChecker(history, "/logout") }
                          className="nav-link" to="/logout">
                        Logout
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default withRouter(Navbar);

/* end of Navbar.js */