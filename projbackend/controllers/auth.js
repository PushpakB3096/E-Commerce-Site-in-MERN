/* start of auth controller */

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const { validationResult } = require('express-validator');   //importing package for validation

exports.signUp = (req, res) => {
    const errors = validationResult(req);   //getting all the errors from the body of the request, if any

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: `${errors.array()[0].msg}`
        });
    }

    const user = new User(req.body);

    user.save((err, user) => {
        if(err){
            return res.status(500).json({
                "message" : "Something went wrong while saving the user",
                "error": err.errmsg
            });
        }
        res.json({
            "message": `User with ID: ${user._id} has been saved!`
        });
    });
};

exports.signIn = (req, res) => {
    const { email, password } = req.body;   //destructuring the request body

    const errors = validationResult(req);   //getting all the errors from the body of the request, if any

    //checking if there are any validation errors
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: `${errors.array()[0].msg}`
        });
    }

    User.findOne({ email }, (err, user) => {
        
        //checking if the email address is registered 
        if(err || !user){
            return res.status(400).json({
                error: "Email ID not registered."
            });
        }

        //if the authentication fails
        if(!user.authenticateUser(password)){
            return res.status(401).json({
                error: "Email ID and password do not match"
            });
        }

        //upon successful login, do the following --

        //create a token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
         
        //put the token in cookie
        res.cookie("token", token, { expire: new Date() + 3600 });

        //send response to the front-end
        const { _id, firstName, lastName, email, privilege } = user;  //deconstructing the user obtained from DB

        return res.json({
            token,
            user: { _id, firstName, lastName, email, privilege }
        });
    });
}; 

exports.logout = (req, res) => {
    //clearing the cookie
    res.clearCookie("token");

    return res.json({
        "message": "User has been logged out"
    });
};

//middleware for checking token presence
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});

//TODO: move all the middlewares to a separate file
//custom middlewares
//checking if the user is authenticated
exports.isAuthenticated = (req, res, next) => {
    var isTrue = req.profile &&     //req.profile will be set from the UI
                 req.auth &&        //checking the userProperty called "auth". auth contains the user's _id
                 req.auth._id == req.profile._id;      //checking if both the _id are same
    
        if(!isTrue){
            return res.json({
            error: "Access Denied"
        });
    }
    next();
};

//checking if the user is admin
exports.isAdmin = (req, res, next) => {
    if(!(req.profile.privilege === "admin")){
        return res.status(403).json({
            error: "Access Denied. Only an admin can perform this action"
        });
    }
    next();
};

/* end of auth controller */