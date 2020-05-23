/* start of Braintree.js */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import DropIn from 'braintree-web-drop-in-react';

import { loadCart, emptyCart } from './helper/CartHelper';
import { getAToken, processPayment } from './helper/paymenthelper';
import { createOrder } from './helper/OrderHelper';
import { isAuthenticated } from '../auth/helper';

export default function Braintree({products, setReload = f => f, reload = undefined}) {
    
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        error: "",
        clientToken: null,
        instance: {}
    });
   
    const { user, token } = isAuthenticated();

    const getToken = (user, token) => {
        getAToken(user._id, token).then(info => {
            if(info.error){
                setInfo({...info, error: info.err});
            }
            else{
                setInfo({clientToken: info.clientToken});
            }
        });
    };

    const showDropIn = () => {      //conditional rendering of payment form
        return (
            <div>
                { info.clientToken !== null && products.length > 0 ? (
                    <div className="text-center">
                        <DropIn options={{ authorization: info.clientToken}}
                                onInstance={instance => (info.instance = instance)}        
                        />
                         <button className="btn btn-success btn-block" onClick={() => {
                             onPurchase()
                         }}>Buy</button>
                    </div>
                ) : (
                    //TODO: add condition to check if the user is logged in first then check if the cart has items
                    <h3>Looks like your cart is empty. Shop more!</h3>
                ) }
            </div>
        );
    };

    const onPurchase = () => {
        setInfo({loading: true});
        
        let nonce;
        let getNonce = info.instance.requestPaymentMethod().then(data => {
            nonce = data.nonce;
            
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: calculateAmount()
            };

            processPayment(user._id, token, paymentData).then(data => {
                setInfo({...info, success: true, loading: false});
                
                const orderData = {
                    products,
                    transactionId: data.transaction.id,
                    amount: data.transaction.amount
                };

                createOrder(user._id, token, orderData)     //creating an order object after a successful payment
                  .then((data) => console.log(data))
                  .catch((err) => console.log(err));

                emptyCart(() => {       //emptying cart after a successful payment
                    console.log("Cart cleared");
                });

                setReload(!reload);     //reounting the component to reload it

            }).catch(err => {
                setInfo({loading: false, success: false, error: err});
                console.log("failed", err);
            });
        }).catch(err => console.log(err));

    };

    const calculateAmount = () => {     //calculates the final payment amount
        let amount = 0;

        products.map(product => {
            amount += product.cost;
        })
        return amount;
    };

    useEffect(() => {
        getToken(user, token);
    }, []);

    return (
        <h3>{ showDropIn() }</h3>
    );
};

/* end of Braintree.js */