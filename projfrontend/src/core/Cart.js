/* start of Cart.js */

import React,{ useState, useEffect } from 'react';

import '../styles.css'
import { API } from '../backend';
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/CartHelper';

export default function Cart(){

    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);        //for force re-mounting the component and reloading the page

    const loadAllProducts = () => {
        return (
            <div>
                { products.map((product, index) => {
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
        );
    };

    const loadCheckout = () => {
        return (
            <div>Checkout section</div>
        );
    };
    
    useEffect(() => {
        setProducts(loadCart());
    }, [reload]);

    return (
      <Base title="Your Shopping Cart" description="Ready to checkout!">
        <div className="row">
          <div className="col-6">{ loadAllProducts() }</div>
          <div className="col-6">{ loadCheckout() }</div>
        </div>
      </Base>
    );
};

/* end of Cart.js */