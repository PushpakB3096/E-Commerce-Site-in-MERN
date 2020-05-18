/* start of StripeCheckout.js */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { emptyCart, loadCart } from './helper/CartHelper';
import { API } from '../backend';

import StripeChkout from 'react-stripe-checkout';   //Stripe payment gateway

export default function StripeCheckout({products, setReload = f => f, reload = undefined}) {

    const [data, setData] = useState({
        loading: false,
        success: false,
        address: ""
    });

    const { user, token } = isAuthenticated();

    const calculateFinalAmount = () => {        //calculates the final cart amount
        let amount = 0;

        products.map(product => {
            amount += product.cost;
        });
        return amount;
    };

    const makePayment = token => {
        const body = {
            token,
            products
        };

        const headers = {
            "Content-Type": "application/json"
        };

        return fetch(`${API}/stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            const { status } = response;

            if(status === 200){
                //TODO: empty cart and redirect user 
            }
        }).catch(err => console.log(err));
    };

    const showPaymentButton = () => {       //if the user is logged in, show the payment button. Otherwise, login button.
        return isAuthenticated() ? (
          <StripeChkout
            stripeKey="pk_test_76ejtpidCVQVp6Dir6Uy027q00KA33R3HL"      //expires in 24hrs of commiting
            name="Payment Form"
            token={makePayment}
            amount={calculateFinalAmount() * 100}       //stripe default amount is in cents. To get dollar amount, multiply by 100
          >
            <button className="btn btn-success">Pay now</button>
          </StripeChkout>
        ) : (
          <Link to="/signin">
            <button className="btn btn-warning">Signin to pay</button>
          </Link>
        ); 
    };

    return (
        <div>Your Final Purchase Amount is { calculateFinalAmount() } { showPaymentButton() }</div>
    );
};

/* end of StripeCheckout.js */