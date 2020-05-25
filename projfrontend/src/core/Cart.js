/* start of Cart.js */

import React,{ useState, useEffect } from 'react';

import '../styles.css'
import { API } from '../backend';
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/CartHelper';
import Braintree from './Braintree';

export default function Cart(){

    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);        //for force re-mounting the component and reloading the page

    const loadAllProducts = products => {
        return (
          <div className="row">
            <div className="col s4 m4 l4">
              {products.map((product, index) => {
                return (
                  <Card
                    key={index}
                    product={product}
                    addToCart={false}
                    removeFromCart={true}
                    setReload={setReload}
                    reload={reload}
                  />
                );
              })}
            </div>
          </div>
        );
    };

    const loadCheckout = () => {
        return (
            <Braintree products={products} setReload={setReload} reload={reload} />
        );
    };
    
    useEffect(() => {
        setProducts(loadCart());
    }, [reload]);

    return (
      <Base title="Your Shopping Cart" description="Ready to checkout!">
        <div className="row">
          <div className="col">
            {products.length > 0 ? (
              loadAllProducts(products)
            ) : (
              <h3>No items in your cart. Shop for more!</h3>
            )}
          </div>
          <div className="col">{loadCheckout()}</div>
        </div>
      </Base>
    );
};

/* end of Cart.js */