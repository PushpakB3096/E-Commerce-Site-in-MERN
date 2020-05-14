/* start of AddProduct.js */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Base from '../core/Base';
import { getCategories, createProduct } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';

export default function AddProduct() {

    const { user, token } = isAuthenticated();

    const [values, setValues] = useState({
        name: "",
        description: "",
        cost: "",
        stock: "",
        image: "",
        categories: [],
        category: "",
        error: "",
        loading: false,
        createdProduct: "",
        getARedirect: false,    //TODO: redirect user back to admin dashboard after a certain amount of time
        formData: "",
    });

    const {       //destructuring the state values
        name,
        description,
        cost,
        stock,
        image,
        category,
        categories,
        error,
        loading,
        createdProduct,
        getARedirect,
        formData,
    } = values;

    const preload = () => {
        getCategories().then((data) => {
        if (data.error) {
            setValues({ ...values, error: data.error });
        } else {
            setValues({ ...values, categories: data, formData: new FormData() });
        }
        });
    };

    useEffect(() => {
        preload();
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: "", loading: true});
        createProduct(user._id, token, formData)
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error});
            }
            else{
                setValues({
                  ...values,
                  error: "",
                  name: "",
                  description: "",
                  cost: "",
                  image: "",
                  stock: "",
                  loading: false,
                  createdProduct: data.product.name
                });
            }
        });
    };

    const handleChange = name => (event) => {

        //value is going to have either a file name or whatever value comes up from the form
        const value = (name === "image") ? event.target.files[0] : event.target.value;

        formData.set(name, value);
        setValues({...values, [name]: value});
    };

    const successMessage = () => {
        return (
            <div className="alert alert-success mt-3"
             style={{ display: createdProduct ? "" : "none" }}>
                <h6>{ createdProduct } has been successfully created!</h6>
            </div>
        )
    };

    const errorMessage = () => {
        return (
            <div className="alert alert-danger mt-3"
                 style={{ display: error ? "" : "none" }}>
                <h6>Some error occured while saving the product</h6>
            </div>
        );
    };

    const createProductForm = () => (
        <form>
        <span>Upload image</span>
        <div className="form-group">
            <label className="btn btn-block btn-success">
            <input
                onChange={handleChange("image")}
                type="file"
                name="image"
                accept="image"
                placeholder="choose an image"
            />
            </label>
        </div>
        <div className="form-group">
            <input
            onChange={handleChange("name")}
            name="name"
            className="form-control"
            placeholder="Enter product name"
            value={name}
            />
        </div>
        <div className="form-group">
            <textarea
            onChange={handleChange("description")}
            name="description"
            className="form-control"
            placeholder="Enter product description"
            value={description}
            />
        </div>
        <div className="form-group">
            <input
            onChange={handleChange("cost")}
            type="number"
            className="form-control"
            placeholder="Enter product cost"
            value={cost}
            />
        </div>
        <div className="form-group">
            <select onChange={handleChange("category")} className="form-control">
            <option>Select</option>
            { categories && 
                categories.map((cate, index) => (
                <option key={ index } value={ cate._id }>{ cate.name }</option>
                ))}
            </select>
        </div>
        <div className="form-group">
            <input
            onChange={handleChange("stock")}
            type="number"
            className="form-control"
            placeholder="Enter the product quantity"
            value={stock}
            />
        </div>
        <button
            type="submit"
            onClick={onSubmit}
            className="btn btn-outline-success mb-3"
        >
            Create Product
        </button>
        </form>
    );

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
        <Base
        title="Add Product"
        description="Add a brand new product!"
        className="container bg-info p-4"
        >
        <div className="row bg-white rounded">
            <div className="col-md-8 offset-md-2">
                { successMessage() }
                { errorMessage() }
                { renderBackButton() }
                { createProductForm() }
            </div>
        </div>
        </Base>
    );
};

/* end of AddProduct.js */