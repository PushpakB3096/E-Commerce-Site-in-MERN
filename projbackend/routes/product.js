/* start of product.js route */

const express = require("express");
const router = express.Router();

const { check } = require("express-validator"); //importing package for validation

const {
  getProductById,
  createProduct,
  getProduct,
  image,
  updateProduct,
  deleteProduct,
  getAllProducts,
  gallAllUniqueCategories
} = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//parameters
router.param("productId", getProductById);
router.param("userId", getUserById);

//update routes - only used by an admin
router.post(
  "/product/create/:userId",
  //TODO: adding validations here is causing an issue where the validation fails even if it is valid
  // [
  //     //check("name").exists().withMessage("You must provide the name"),
  //     check("description").isLength({ min: 5, max: 500 }).withMessage("Description must be between 5 and 500 characters"),
  //     check("cost").exists().withMessage("You must provide the cost"),
  //     check("category").exists().withMessage("You must provide the category"),
  //     check("stock").exists().withMessage("You must provide the stock of the product")
  // ],
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

//get routes
router.get("/product/:productId", getProduct);
router.get("/product/image/:productId", image); //middleware to diplay iamge of the products
router.get("/products/", getAllProducts);
router.get("/product/categories", gallAllUniqueCategories);

module.exports = router;

/* end of product.js route */