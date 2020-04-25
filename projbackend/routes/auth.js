/* start of auth route */

const express = require("express");
const router = express.Router();

const { check } = require('express-validator');   //importing package for validation

const { logout, signUp, signIn, isSignedIn } = require('../controllers/auth');

//route for handing user registration
router.post("/signup", [
    check("email").isEmail().withMessage("Not a valid email"),
    check("password").isLength({ min: 6 }).withMessage("Lenght must be more than or equal to 6 characters")
], signUp);

router.get("/logout", logout);

//route for handling user login
router.post("/signin", [
    check("email").isEmail().withMessage("Not a valid email"),
    check("password").isLength({ min: 6 }).withMessage("Lenght must be more than or equal to 6 characters")
], signIn);

//TODO: move all the middlewares to a separate file
//custom middlewares
//checking if the user is authenticated
exports.isAuthenticated = (req, res, next) => {
    var isTrue = req.profile &&     //req.profile will be set from the UI
                 req.auth &&        //checking the userProperty called "auth". auth contains the user's _id
                 req.auth._id === req.profile._id;      //checking if both the _id are same
    
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
        return res.json({
            error: "Access Denied."
        });
    }
    next();
};

module.exports = router;

/* end of auth route */