/* start of Base.js */

//for common data across multiple components

import React from 'react';
import Navbar from './Navbar';

export default function Base({
    title = "Title Placeholder",
    description = "Description Placeholder",
    className = "bg-dark text-white p-4",
    children
}){
    return (
        <div>
            <Navbar />
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                    <h4 className="display-4">{ title }</h4>
                    <p className="lead">{ description }</p>
                </div>
                {/* main content goes below */}
                <div className={ className }>{ children }</div>
            </div>
            <footer className="footer bg-dark mt-auto py-3">
                <div className="container-fluid bg-success text-center text-white py-3">
                    <span id="contact-text">If you have any questions, contact us </span>
                    <button className="btn btn-warning btn-sm">Contact Us</button>
                </div>
                <div id="bottom-text" className="container">
                    <span className="text-muted">An <span className="text-white">amazing</span> marketplace for all your needs!</span>
                </div>
            </footer>
        </div>
    );
};

/* end of Base.js */