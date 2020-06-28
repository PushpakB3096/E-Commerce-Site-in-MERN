/* start of UpdateCategory.js */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Base from '../core/Base';
import { getCategory, updateCategory } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper/index';

export default function UpdateCategory({match}){

    const { user, token } = isAuthenticated();

    const [values, setValues] = useState({
        name: "",
        error: "",
        loading: false,
        updatedCategory: null,
        getARedirect: false,    //TODO: redirect user back to admin dashboard after a certain amount of time
    });

    const {       //destructuring the state values
        name,
        error,
        loading,
        updatedCategory,
        getARedirect
    } = values;

    const preload = (categoryId) => {
        getCategory(categoryId).then(data => {
            if(data.error){
                setValues({ ...values, error: data.error });
            }
            else{
                setValues({
                    ...values,
                    name: data.name,
                });
            }
        });
    };

    useEffect(() => {
        preload(match.params.categoryId);
    }, []);

    const onUpdate = (event) => {
        event.preventDefault();
        setValues({...values, error: "", loading: true});

        var JSOName = {     //converting to JSON object for the req.body
            "name": name
        };

        updateCategory(match.params.categoryId, user._id, token, JSON.stringify(JSOName))
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error});
                console.log("Error in front end UpdateCategory Component")
            }
            else{
                setValues({
                  ...values,
                  error: "",
                  name: "",
                  loading: false,
                  updatedCategory: data.updatedCategory
                });
                console.log("Updated Category", data.updatedCategory);
            }
        });
    };

    const handleChange = (name) => (event) => {
        setValues({...values, error: "", loading: false, [name]: event.target.value});
    };

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
                onChange={handleChange("name")}
              />
              <button className="btn btn-outline-info" onClick={ onUpdate }>Update</button>
            </div>
          </form>
        );
    };

    const successMessage = () => {
        return (
            <div className="alert alert-success mt-3"
             style={{ display: updatedCategory ? "" : "none" }}>
                <h6>Category has been successfully updated!</h6>
            </div>
        );
    };

    const errorMessage = () => {
        return (
            <div className="alert alert-danger mt-3"
                 style={{ display: error ? "" : "none" }}>
                <h6>Some error occured while saving the category</h6>
            </div>
        );
    };

    const renderBackButton = () => {
        //renders a back button that takes user back to previous page
        return (
        <div className="mt-5">
            <Link className="btn btn-sm btn-info mb-2" to="/admin/dashboard">
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
            <span> Admin Dashboard</span>
            </Link>
        </div>
        );
    };

    return (
        <Base title="Update Category" description="Update this category with new data!" className="container bg-info p-4">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    { renderBackButton() }
                    { successMessage() }
                    { errorMessage() }
                    { renderCategoryForm() }
                </div>
            </div>
        </Base>
    );
};

/* end of UpdateCategory.js */