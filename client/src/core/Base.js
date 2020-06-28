/* start of Base.js */

//for common data across multiple components

import React from 'react';

import Navbar from './Navbar';

export default function Base({
    title = "",
    description = "",
    className = "",
    children
}){
    return (
      <div>
        <Navbar />
        <div className="">
          <div className="container center-align">
            <h4 className="">{title}</h4>
            <p className="">{description}</p>
          </div>
          {/* main content goes below */}
          <div className={className}>{children}</div>
        </div>

        <div
          style={{ position: "fixed", bottom: "1px", left: "0", width: "100%" }}
          className="page-footer footer-copyright cyan darken-3"
        >
          <div className="container">
            <span className="footer-text">
              © { new Date().getFullYear() } Made by Pushpak Bhattacharya
            </span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="grey-text text-lighten-4 right"
              href="https://github.com/PushpakB3096/"
            >
              <i className="material-icons left">link</i>
              <span className="footer-text">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    );
};

/* end of Base.js */