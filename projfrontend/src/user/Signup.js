/* start of Signup.js */

//component for handling user signup

import React from 'react';
import Base from '../core/Base';


export default function Signup(){

    // function to render the signup form
    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Enter your first name"/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Enter your last name"/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="email" placeholder="Enter your email"/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="password" placeholder="Enter your password"/>
                        </div>
                        <button className="btn btn-success btn-block">Register</button>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <Base title="User Registration" description="Register now for a seamless shopping experience!">
            { signUpForm() }
        </Base>
    );
}

/* end of Signup.js */