/* start of Signin.js */

//component for handling user signin

import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Base from '../core/Base';
import { signin, authenticate, isAuthenticated } from '../auth/helper';

export default function Signin(){

    const [values, setValues] = useState({      //setting up states of the component
        email: "",
        password: "",
        errors: "",
        isLoading: false,
        didRedirect: false
    });

    const { email, password, errors, isLoading, didRedirect } = values;     //destructuring state fields
    
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, errors: "", [name]: event.target.value });
    };

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, errors: "", isLoading: true });

        signin({ email, password })
        .then(data => {
            if(data.error){
                setValues({ ...values, errors: data.error, isLoading: false });
            }
            else{
                authenticate(data, () => {
                    setValues({ ...values, didRedirect: true });
                });
            }
        }).catch(err => {
            console.log("Some error occured while logging in: " +JSON.stringify(err));
        });
    };

    const loadingMessage = () => {      //show success message, if any
       if(isLoading){
           return (
               <div className="alert alert-info">Loading...</div>
           );
       }
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

    const performRedirection = () => {      //redirects user based on the privilege they have
        if(didRedirect){
            if(user && user.privilege === "Basic"){
                return (
                    <p>Redirect to user dashboard</p>       //placeholder
                );
            }
            else{
                return (
                    <p>Redirect to admin dashboard</p>      //placeholder
                );
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/" />
        }
    };      
     // function to render the signin form
     const signInForm = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <form>
                <div className="form-group">
                  <input
                    className="form-control"
                    value={email}
                    onChange={handleChange("email")}
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    value={password}
                    onChange={handleChange("password")}
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>
                <button onClick={ onSubmit } className="btn btn-success btn-block">Login</button>
              </form>
            </div>
          </div>
        );
    };

    return (
        <Base title="User Login" description="Login now to continue shopping!">
            { loadingMessage() }
            { errorMessage() }
            { signInForm() }
            { performRedirection() }
        </Base>
    );
}

/* end of Signin.js */