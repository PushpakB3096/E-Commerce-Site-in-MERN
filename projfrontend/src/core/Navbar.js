/* start of Navbar.js */

//component for creating a navbar

import React from 'react';
import { Link, withRouter } from 'react-router-dom';

export default function Navbar(){
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                {/* TODO: add conditional rendering of navbar links */}
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        Cart
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        Admin Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        Signup
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        Signin
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        Logout
                    </Link>
                </li>
            </ul>
        </div>
    );
};

/* end of Navbar.js */