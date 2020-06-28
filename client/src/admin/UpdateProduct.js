/* start of UpdateProduct.js */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Base from '../core/Base';
import { getCategories, getProduct, updateProduct } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper/index';

export default function UpdateProduct({match}) {

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
        updatedProduct: "",
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
        updatedProduct,
        getARedirect,
        formData,
    } = values;
    
    const preloadCategories = () => {
        getCategories().then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ categories: data, formData: new FormData() });
            }
            });
    };

    const preload = (productId) => {
        getProduct(productId).then(data => {
            if(data.error){
                setValues({ ...values, error: data.error });
            }
            else{
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    cost: data.cost,
                    category: data.category._id,
                    stock: data.stock,
                    formData: new FormData()
                });
                preloadCategories();
            }
        });
    };

    const onUpdate = (event) => {
        event.preventDefault();
        setValues({...values, error: "", loading: true});
        updateProduct(match.params.productId, user._id, token, formData)
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
                  updatedProduct: data.product.name
                });
            }
        });
    };

    const handleChange = (name) => (event) => {

        //value is going to have either a file name or whatever value comes up from the form
        const value = (name === "image") ? event.target.files[0] : event.target.value;

        formData.set(name, value);
        setValues({...values, [name]: value});
    };

    const successMessage = () => {
        return (
            <div className="alert alert-success mt-3"
             style={{ display: updatedProduct ? "" : "none" }}>
                <h6>{ updatedProduct } has been successfully updated!</h6>
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

    const updateProductForm = () => (
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
            onClick={onUpdate}
            className="btn btn-outline-success mb-3"
        >
            Update Product
        </button>
        </form>
    );

    useEffect(() => {
        preload(match.params.productId);
    }, []);

    return (
      <Base
        title="Update Product"
        description="Make changes to your product here!"
        className="container bg-info p-4"
      >
        <div className="row bg-white rounded">
            <div className="col-md-8 offset-md-2">
                { successMessage() }
                { errorMessage() }
                { renderBackButton() }
                { updateProductForm() }
            </div>
        </div>
      </Base>
    );
};


/* end of UpdateProduct.js */