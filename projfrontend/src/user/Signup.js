/* start of Signup.js */

//component for handling user signup

import React, { useState } from "react";
import Base from "../core/Base";
import { signup } from "../auth/helper";
import { Link } from "react-router-dom";

export default function Signup() {
  const [values, setValues] = useState({
    //setting up states of the component
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    errors: "",
    isSuccess: false,
  });

  const { firstName, lastName, email, password, errors, isSuccess } = values; //destructuring the state fields for easier access

  const handleChange = (name) => (event) => {
    setValues({ ...values, errors: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault(); //stops the default behavior of form submission
    setValues({ ...values, errors: false });
    signup({ firstName, lastName, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, errors: data.error, isSuccess: false });
        } else {
          setValues({
            ...values, //resetting the state of the component after a successful registration
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            errors: "",
            isSuccess: true,
          });
        }
      })
      .catch((err) => {
        console.log("Some error occured while signing up");
      });
  };

  const successMessage = () => {
    //show success message, if any
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

  const errorMessage = () => {
    //show error message, if any
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
    // return (
    //   <div className="row">
    //     <div className="col-md-6 offset-sm-3 text-left">
    //       <form>
    //         <div className="form-group">
    //           <input
    //             className="form-control"
    //             onChange={handleChange("lastName")}
    //             type="text"
    //             value={ lastName }
    //             placeholder="Enter your last name"
    //           />
    //         </div>
    //         <div className="form-group">
    //           <input
    //             className="form-control"
    //             onChange={handleChange("email")}
    //             type="email"
    //             value={ email }
    //             placeholder="Enter your email"
    //           />
    //         </div>
    //         <div className="form-group">
    //           <input
    //             className="form-control"
    //             onChange={handleChange("password")}
    //             type="password"
    //             value={ password }
    //             placeholder="Enter your password"
    //           />
    //         </div>
    //         <button onClick={ onSubmit } className="btn btn-success btn-block">Register</button>
    //       </form>
    //     </div>
    //   </div>
    // );
    return (
      <div className="row">
        <div className="col l12 m12 s12">
          <div className="container" id="signin-form-container">
            <form>
              <div className="input-field">
                <i className="material-icons prefix">account_circle</i>
                <input
                  id="first_name"
                  value={firstName}
                  onChange={handleChange("firstName")}
                  type="text"
                />
                <label htmlFor="first_name">First Name</label>
              </div>
              <div className="input-field">
                <i className="material-icons prefix">account_circle</i>
                <input
                  id="last_name"
                  value={lastName}
                  onChange={handleChange("lastName")}
                  type="text"
                />
                <label htmlFor="last_name">Last Name</label>
              </div>
              <div className="input-field">
                <i className="material-icons prefix">email</i>
                <input
                  id="email_field"
                  className="validate"
                  value={email}
                  onChange={handleChange("email")}
                  type="email"
                />
                <label htmlFor="email_field">Email</label>
                <span
                  className="helper-text"
                  data-error="Please enter a valid email address!"
                  data-success="Looks good!"
                ></span>
              </div>
              <div className="input-field">
                <i className="material-icons prefix">lock</i>
                <input
                  id="password_field"
                  value={password}
                  onChange={handleChange("password")}
                  type="password"
                />
                <label htmlFor="password_field">Password</label>
              </div>
              <button
                id="user-btn"
                onClick={onSubmit}
                className="btn waves-effect waves-light hoverable responsive"
              >
                Register
                <i className="material-icons right">send</i>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base
      title="User Registration"
      description="Register now for a seamless shopping experience!"
    >
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
}

/* end of Signup.js */
