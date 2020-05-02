/* start of Signup.js */

//component for handling user signup

import React, { useState } from 'react';
import Base from '../core/Base';
import { signup } from '../auth/helper';
import { Link } from 'react-router-dom';


export default function Signup(){

    const [values, setValues] = useState({       //setting up states of the component
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        errors: "",
        isSuccess: false  
    });
    
    const { firstName, lastName, email, password, errors, isSuccess } = values;      //destructuring the state fields for easier access

    const handleChange = name => event => {
        setValues({ ...values, errors: false, [name]: event.target.value });
    };

    const onSubmit = event => {
        event.preventDefault();     //stops the default behavior of form submission
        setValues({ ...values, errors: false });
        signup({ firstName, lastName, email, password })
        .then(data => {
            if(data.error){
                setValues({ ...values, errors: data.error, isSuccess: false });
            }
            else{
              setValues({ ...values,        //resetting the state of the component after a successful registration
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    errors: "",
                    isSuccess: true
                });
            }
        })
        .catch(err => {
            console.log("Some error occured while signing up");
        });
    };

    const successMessage = () => {      //show success message, if any
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
                className="alert alert-success"
                style={{ display: isSuccess ? "" : "none" }}
              >
                Welcome aboard! Click <Link to="/signin">here</Link> to login.
              </div>
            </div>
          </div>
        );
    };

    const errorMessage = () => {        //show error message, if any
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
                className="alert alert-danger"
                style={{ display: errors ? "" : "none" }}
              >
                {errors}
              </div>
            </div>
          </div>
        );
    };
    
    // function to render the signup form
    const signUpForm = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <form>
                <div className="form-group">
                  <input
                    className="form-control"
                    onChange={handleChange("firstName")}
                    type="text"
                    value={ firstName }
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    onChange={handleChange("lastName")}
                    type="text"
                    value={ lastName }
                    placeholder="Enter your last name"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    onChange={handleChange("email")}
                    type="email"
                    value={ email }
                    placeholder="Enter your email"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    onChange={handleChange("password")}
                    type="password"
                    value={ password }
                    placeholder="Enter your password"
                  />
                </div>
                <button onClick={ onSubmit } className="btn btn-success btn-block">Register</button>
              </form>
            </div>
          </div>
        );
    };

    return (
        <Base title="User Registration" description="Register now for a seamless shopping experience!">
            { successMessage() }
            { errorMessage() }
            { signUpForm() }
        </Base>
    );
}

/* end of Signup.js */