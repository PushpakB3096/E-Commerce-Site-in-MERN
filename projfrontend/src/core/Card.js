/* start of Card.js */

import React from 'react';
import ImageHelper from './helper/ImageHelper';

export default function Card({product, addToCard = true, removeFromCart = false}) {

    //defining default values if product is not passed to this component
    const cardTitle = product ? product.name : "Product Title";
    const cardDesc = product ? product.description : "Product Description";
    const cardCost = product ? product.cost : "Product Cost";

    return (
      <div className="card text-white text-center bg-dark border border-info ">
        <div className="card-header lead">{ cardTitle }</div>
        <div className="card-body">
          <ImageHelper productId={product._id} />
          <p className="lead bg-success font-weight-normal text-wrap">
            { cardDesc }
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">${ cardCost } </p>
          <div className="row">
            <div
              className="col-12"
              style={{ display: addToCard ? "" : "none" }}      //conditional rendering for "Add to Cart" button
            >
              <button
                onClick={() => {}}
                className="btn btn-block btn-outline-success mt-2 mb-2"
              >
                Add to Cart
              </button>
            </div>
            <div
              className="col-12"
              style={{ display: removeFromCart ? "" : "none" }}      //conditional rendering for "Remove from Cart" button
            >
              <button
                onClick={() => {}}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

/* end of Card.js */