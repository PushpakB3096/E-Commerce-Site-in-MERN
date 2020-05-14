/* start of ManageProduct.js */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Base from '../core/Base';
import { isAutheticated, isAuthenticated } from "../auth/helper";
import { getProducts, deleteProduct } from "./helper/adminapicall";

export default function ManageProducts() {

    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const preload = () => {     //gets all the products before the page load
        getProducts().then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setProducts(data);
            }
        });
    };

    useEffect(() => {
        preload();
      }, []);

    const deleteThisProduct = productId =>{
        deleteProduct(productId, user._id, token).then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                preload();      //fetch the complete list of products again after deleting one product
            }
        });
    };

    return (
        <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total 3 products</h2>

          { products.map((product, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{ product.name }</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/product/update/${product._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button       //TODO: add user confirmation before deleting the product
                    onClick={() => {
                      deleteThisProduct(product._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
    );
};


/* end of ManageProduct.js */