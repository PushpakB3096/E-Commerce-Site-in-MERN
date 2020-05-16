/* start of adminapicall.js */

import { API } from '../../backend';

//calls related to category
export const createCategory = (userId, token, category) => {        //creates a category
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log("An error occured: " +err);
    });
};

export const getCategories = () => {        //gets all categories
    return fetch(`${API}/categories`, {
        method: "GET"
    }).then(response => {
        return response.json();
    }).catch(err => {
        return err.json();
    });
};

export const getCategory = categoryId => {        //gets a single category
    return fetch(`${API}/category/${categoryId}`, {
        method: "GET"
    }).then(response => {
        return response.json();
    }).catch(err => {
        return err.json();
    });
};

export const deleteCategory = (categoryId, userId, token) => {      //deletes a category
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    }).catch(err => {
        return err.json();
    });
};

export const updateCategory = (categoryId, userId, token, category) => {      //updates a category
    console.log("category", category);
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: {category}
    }).then(response => {
        return response.json();
    }).catch(err => {
        return err.json();
    });
};

//calls related to product
export const createProduct = (userId, token, product) => {      //creates a product
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(response => {
        return response.json();
    }).catch(err => {
        return err.json();
    });
};

export const getProducts = () => {        //gets all products
    return fetch(`${API}/products`, {
        method: "GET"
    }).then(response => {
        return response.json();
    }).catch(err => {
        return err.json();
    });
};

export const getProduct = productId => {        //gets a single product
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    }).then(response => {
        return response.json();
    }).catch(err => {
        return err.json();
    });
};

export const updateProduct = (productId, userId, token, product) => {      //updates a product
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(response => {
        return response.json();
    }).catch(err => {
        return err.json();
    });
};

export const deleteProduct = (productId, userId, token) => {      //deletes a product
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    }).catch(err => {
        return err.json();
    });
};

/* end of adminapicall.js */