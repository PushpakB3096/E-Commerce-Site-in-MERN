/* start of Home.js */

import React,{ useState, useEffect } from 'react';

import '../styles.css'
import { API } from '../backend';
import Base from './Base';
import Card from './Card';
import { getAllProducts } from './helper/coreapicalls';

export default function Home(){

    const [products, setProducts ] = useState([]);
    const [error, setError] = useState("");

    const preloadAllProducts = () => {
        getAllProducts().then(data => {
            if(data.error){
                setError(data.error);
            }
            else{
                setProducts(data);
            }
        });
    };

    useEffect(() => {
        preloadAllProducts();
    }, []);

    return (
      <Base title="Home Page" description="Welcome to the ECOM Shop!">
        <div className="row text-center">
          <div className="row">
            {products.map((product, index) => {
              return (
                <div key={index} className="col-4 mb-4">
                  <Card product={product}/>
                </div>
              );
            })}
          </div>
        </div>
      </Base>
    );
};

/* end of Home.js */