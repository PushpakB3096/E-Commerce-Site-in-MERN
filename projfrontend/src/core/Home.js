/* start of Home.js */

import React from 'react';

import '../styles.css'
import { API } from '../backend';
import Base from './Base';

export default function Home(){
    return (
        <Base title="Home Page" description="Welcome to the ECOM Shop!">
            <div className="row">
                <div className="col-4">
                    <button className="btn btn-success">Buy</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-success">Buy</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-success">Buy</button>
                </div>
            </div>
        </Base>
    );
};

/* end of Home.js */