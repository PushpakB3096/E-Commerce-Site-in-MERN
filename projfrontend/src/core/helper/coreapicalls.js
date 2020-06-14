/* start of coreapicalls.js */

import { API } from '../../backend';

export const getAllProducts = () => {
    return fetch(`${API}/products`, {
        method: "GET"
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};

/* end of coreapicalls.js */