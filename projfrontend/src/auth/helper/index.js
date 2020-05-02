/* start of index.js for auth/helper */

import {API} from '../../backend';

export const signup = user => {     //function to handle signup requests
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(response => {
        console.log(response.json)
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};

export const signin = user => {     //function to handle signin requests
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(response => {
        console.log(JSON.stringify(response))
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};

export const signout = next => {        //function to handle signout requests
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt");
        next();

        return fetch(`${API}/logout`, {
            method: "GET"
        }).then(response => {
            console.log("User has been logged out: " +JSON.stringify(response))
        }).catch(err => {
            console.log("An error occured: " +JSON.stringify(err));
        });
    }
};


export const authenticate = (data, next) => {       //function to handle the authentication of user
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};

export const isAuthenticated = () => {      //function to check if the user is authenticated or not
    if(typeof window === "undefined"){
        return false;
    }
    else if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
    }
    else{
        return false;
    }
};

/* end of index.js for auth/helper */  