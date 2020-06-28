/* start of CartHelper.js */

export const addProuctToCart = (item, next) => {
    let cart = [];

    if(typeof(window) !== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        cart.push({
            ...item
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        next();
    }
};

export const loadCart = () => {
    if(typeof(window) !== undefined){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
};

export const removeItemFromCart = (productId) => {
    let cart = [];

    if(typeof(window) !== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        cart.map((product, index) => {
            if(product._id === productId){
                cart.splice(index, 1);      //removes 1 item from the product Id that was found
            }
        });
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
};

export const emptyCart = next => {      //after a payment is successful, clear the cart contents
    if(typeof(window) !== undefined){
        localStorage.removeItem("cart");
        let cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    next();
};

/* end of CartHelper.js */