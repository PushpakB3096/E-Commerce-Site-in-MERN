/* start of ImageHelper.js */

import React from 'react';

import { API } from '../../backend'; 

export default function ImageHelper({productId}) {
    
    const dafaultImageURL = "http://leeford.in/wp-content/uploads/2017/09/image-not-found.jpg";     //for displaying a default image if the product image is not present

    const imageURL = productId ? `${API}/product/image/${productId}`: `${dafaultImageURL}`;     //if the product image exists, use that. Otherwise use a default image.
    return (
        <div className="rounded border border-success p-2">
            <img
              src={imageURL}
              alt="photo"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              className="mb-3 rounded"
            />
        </div>
    );
};

/* end of ImageHelper.js */