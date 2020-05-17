/* start of Card.js */

import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addProuctToCart, removeItemFromCart } from "./helper/CartHelper";

export default function Card({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = f => f,   //just returns whatever is being passed on. Short-hand notation of lambda function
  reload = undefined,
}) {
  const [redirect, setRedirect] = useState(false);

  //defining default values if product is not passed to this component
  const cardTitle = product ? product.name : "Product Title";
  const cardDesc = product ? product.description : "Product Description";
  const cardCost = product ? product.cost : "Product Cost";

  const addProductInCart = () => {
    addProuctToCart(product, () => {
      setRedirect(true);
    });
  };

  const getRedirected = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  return (
    <div className="card text-white text-center bg-dark border border-info ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        {getRedirected(redirect)}
        <ImageHelper productId={product._id} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDesc}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">${cardCost} </p>
        <div className="row">
          <div
            className="col-12"
            style={{ display: addToCart ? "" : "none" }} //conditional rendering for "Add to Cart" button
          >
            <button
              onClick={addProductInCart}
              className="btn btn-block btn-outline-success mt-2 mb-2"
            >
              Add to Cart
            </button>
          </div>
          <div
            className="col-12"
            style={{ display: removeFromCart ? "" : "none" }} //conditional rendering for "Remove from Cart" button
          >
            <button
              onClick={() => {
                removeItemFromCart(product._id);
                setReload(!reload);
              }}
              className="btn btn-block btn-outline-danger mt-2 mb-2"
            >
              Remove from cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* end of Card.js */
