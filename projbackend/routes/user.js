/* start of user.js route */

const express = require('express');
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, getUser, updateUser, getOrderList } = require("../controllers/user");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);      //getting user data
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);   //updating user data

router.get("/orders/user/:userId", isSignedIn, isAuthenticated, getOrderList);

module.exports = router;

/* end of user.js route */