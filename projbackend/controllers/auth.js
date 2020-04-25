/* start of auth controller */

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const { validationResult } = require('express-validator');   //importing package for validation

exports.signUp = (req, res) => {
    const errors = validationResult(req);   //getting all the errors from the body of the request, if any

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: `Param \'${errors.array()[0].param}\' could not be saved. Reason: ${errors.array()[0].msg}`
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
            error: `Param \'${errors.array()[0].param}\' could not be saved. Reason: ${errors.array()[0].msg}`
        });
    }

    User.findOne({ email }, (err, user) => {
        
        //checking if the email address is registered 
        if(err || !user){
            return res.status(400).json({
                error: "Email ID not found"
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
        const { _id, firstName, email, privilege } = user;  //deconstructing the user obtained from DB

        return res.json({
            token,
            user: { _id, firstName, email, privilege }
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

/* end of auth controller */