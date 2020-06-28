/* start of Card.js */

import React, { useState, useEffect } from "react";
import M from "materialize-css";

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

  useEffect(() => {
    var tooltipElem = document.querySelectorAll('.tooltipped');
    var tooltipInst = M.Tooltip.init(tooltipElem, {
      position: "top"
    });

    var FABelems = document.querySelectorAll('.fixed-action-btn');
    var FABInst = M.FloatingActionButton.init(FABelems, {});
  }, []);

  return (
    <div className="card hoverable z-depth-3">
      <div className="card-image">
        <ImageHelper productId={product._id} />
        {addToCart && (
          <a className="btn-floating halfway-fab waves-effect waves-light red">
            <i
              className="material-icons tooltipped"
              data-tooltip="Add to cart"
              onClick={() => {
                addProductInCart();
                M.toast({
                  html: "Item added to cart!",
                  classes: "rounded",
                });
              }}
            >
              add
            </i>
          </a>
        )}
        {removeFromCart && (
          <a className="btn-floating halfway-fab waves-effect waves-light red">
            <i
              className="material-icons tooltipped"
              data-tooltip="Remove from cart"
              onClick={() => {
                removeItemFromCart(product._id);
                setReload(!reload);
                M.toast({
                  html: "Item removed from cart!",
                  classes: "rounded",
                });
              }}
            >
              remove
            </i>
          </a>
        )}
      </div>
      <div className="card-content">
            <span className="card-title">{cardTitle} @ ${cardCost}</span>
        <p>{cardDesc}</p>
      </div>
      {/* <div className="card-action">
        <a href="#">This is a link</a>
      </div> */}
    </div>
  );
}

/* end of Card.js */
