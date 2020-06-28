/* start of Signin.js */

//component for handling user signin

import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Base from "../core/Base";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

export default function Signin() {
  const [values, setValues] = useState({
    //setting up states of the component
    email: "",
    password: "",
    errors: "",
    isLoading: false,
    didRedirect: false,
  });

  const { email, password, errors, isLoading, didRedirect } = values; //destructuring state fields

  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, errors: "", [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, errors: "", isLoading: true });

    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, errors: data.error, isLoading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch((err) => {
        console.log(
          "Some error occured while logging in: " + JSON.stringify(err)
        );
      });
  };

  const loadingMessage = () => {
    //show preloader while the user gets logged in
    if (isLoading) {
      return (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      );
    }
  };

  const errorMessage = () => {
    //show error message, if any
    return (
      <div>
        {errors && (
          <div className="row">
            <div className="col l12 m12 s12">
              <h6 className="container msg-container">{errors}</h6>
            </div>
          </div>
        )}
      </div>
    );
  };

  const performRedirection = () => {
    //redirects user based on the privilege they have
    if (didRedirect) {
      if (user && user.privilege === "Basic") {
        return <Redirect to="/user/dashboard" />;
      } else {
        return <Redirect to="/admin/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };
  // function to render the signin form
  const signInForm = () => {
    return (
      <div className="row">
        <div className="col l12 m12 s12">
          <div className="container" id="signin-form-container">
            <form>
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
                Login
                <i className="material-icons right">send</i>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="User Login" description="Login now to continue shopping!">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirection()}
    </Base>
  );
}

/* end of Signin.js */
