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
router.post("/product/create/:userId", [
    check("name").exists().withMessage("You must provide the name"),
    check("description").isLength({ min: 5, max: 500 }).withMessage("Description must be between 5 and 500 characters"),
    check("cost").exists().withMessage("You must provide the cost"),
    check("category").exists().withMessage("You must provide the category"),
    check("stock").exists().withMessage("You must provide the stock of the product")
], isSignedIn, isAuthenticated, isAdmin, createProduct);

module.exports = router;

/* end of product.js route */
