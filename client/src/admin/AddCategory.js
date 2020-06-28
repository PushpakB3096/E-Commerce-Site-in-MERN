/* start of AddCategory.js */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Base from '../core/Base';

import { isAuthenticated } from '../auth/helper';
import { createCategory } from './helper/adminapicall';

export default function AddCategory(){

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const { user, token } = isAuthenticated();

    const renderCategoryForm = () => {
        return (
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control my-3"
                autoFocus
                required
                placeholder="Enter a category"
                value={name}
                onChange={handleChange}
              />
              <button className="btn btn-outline-info" onClick={ onSubmit }>Create</button>
            </div>
          </form>
        );
    };

    const handleChange = (event) => {
        setError("");
        setSuccess(false);
        setName(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        //API Call
        createCategory(user._id, token, { name }).then(data => {
            if(data.error){
                setSuccess(false);
                setError(data.error);
            }
            else{
                setError("");
                setSuccess(true);
                setName("");
            }
        });
    };

    const renderBackButton = () => {
        return (
            <div className="mt-5">
                <Link className="btn btn-sm btn-info mb-1" to="/admin/dashboard">
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    <span> Admin Dashboard</span>
                </Link>
            </div>
        );
    };

    const renderSuccessMessage = () => {
        return (
            <div className="row">
              <div className="col-md-6 offset-md-3 text-left">
                <div
                  className="alert alert-success"
                  style={{ display: success ? "" : "none" }}
                >
                 Category created successfully!
                </div>
              </div>
            </div>
          );
    };

    const renderErrorMessage = () => {
        return (
            <div className="row">
              <div className="col-md-6 offset-md-3 text-left">
                <div
                  className="alert alert-danger"
                  style={{ display: error ? "" : "none" }}
                >
                  { error }
                </div>
              </div>
            </div>
          );
    };

    return (
        <Base title="New Category" description="Add new category for your products!" className="container bg-info p-4">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    { renderSuccessMessage() }
                    { renderErrorMessage() }
                    { renderBackButton() }
                    { renderCategoryForm() }
                </div>
            </div>
        </Base>
    );
};

/* end of AddCategory.js */