/* start of auth route */

const express = require("express");
const router = express.Router();

const { check } = require("express-validator"); //importing package for validation

const { logout, signUp, signIn, isSignedIn } = require("../controllers/auth");

//route for handing user registration
router.post(
  "/signup",
  [
    //TODO: add validation to check if user has entered email or not
    check("email").isEmail().withMessage("Please enter a valid email."),
    check("password")
      .isLength({ min: 6 })
      .withMessage(
        "Password length must be more than or equal to 6 characters"
      ),
  ],
  signUp
);

router.get("/logout", logout);

//route for handling user login
router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Not a valid email"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Lenght must be more than or equal to 6 characters"),
  ],
  signIn
);

module.exports = router;

/* end of auth route */
