/* start of product.js route */

const express = require('express');
const router = express.Router();

const { getProductById } = require('../controllers/product');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');
 
//parameters
router.param("productId", getProductById);
router.param("userId", getUserById);

//routes
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct);

module.exports = router;

/* end of product.js route */
