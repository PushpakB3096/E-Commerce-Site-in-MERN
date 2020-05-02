/* start of Signin.js */

//component for handling user signin

import React from 'react';
import Base from '../core/Base';

export default function Signin(){

     // function to render the signup form
     const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <input className="form-control" type="email" placeholder="Enter your email"/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="password" placeholder="Enter your password"/>
                        </div>
                        <button className="btn btn-success btn-block">Login</button>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <Base title="User Login" description="Login now to continue shopping!">
            { signInForm() }
        </Base>
    );
}

/* end of Signin.js */