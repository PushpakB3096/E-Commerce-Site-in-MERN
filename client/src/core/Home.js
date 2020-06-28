/* start of Home.js */

import React,{ useState, useEffect } from 'react';
import M from "materialize-css";

import '../styles.css'
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

        var elems = document.querySelectorAll('.slider');
        var instances = M.Slider.init(elems, {
          height : 330,
          duration: 300,
          interval: 3000
        });
    }, []);

    return (
      <div className="slider-div">
        <Base>
          <div className="slider">
            <ul className="slides">
              <li>
                <img src="https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
                <div className="caption left-align">
                  <h3>Electronics</h3>
                  <h5 className="light grey-text text-lighten-3">
                    upto 30% off!
                  </h5>
                </div>
              </li>
              <li>
                <img src="https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
                <div className="caption center-align">
                  <h3>Summer Styles</h3>
                  <h5 className="light grey-text text-lighten-3">
                    Buy 1 get 1 free!
                  </h5>
                </div>
              </li>
              <li>
                <img src="https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
                <div className="caption right-align">
                  <h3>Furnitures</h3>
                  <h5 className="light grey-text text-lighten-3">
                    upto 20% off!
                  </h5>
                </div>
              </li>
              <li>
                <img src="https://images.pexels.com/photos/354962/pexels-photo-354962.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
                <div className="caption left-align">
                  <h3>Beauty</h3>
                  <h5 className="light grey-text text-lighten-3">
                    upto 30% off!
                  </h5>
                </div>
              </li>
              <li>
                <img src="https://images.pexels.com/photos/2089696/pexels-photo-2089696.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
                <div className="caption center-align">
                  <h3>Kitchen Products</h3>
                  <h5 className="light grey-text text-lighten-3">
                    upto 10% off!
                  </h5>
                </div>
              </li>
            </ul>
          </div>
          <div className="row text-center">
            <div className="row">
              {products.map((product, index) => {
                return (
                  <div key={index} className="col s12 m6 l4">
                    <Card product={product} />
                  </div>
                );
              })}
            </div>
          </div>
        </Base>
      </div>
    );
};

/* end of Home.js */