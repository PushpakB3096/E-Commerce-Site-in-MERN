/* start of category.js route */

const express = require("express");
const router = express.Router();

const { getCategoryById, createCategory,
        getCategory, getAllCategories,
        updateCategory, deleteCategory } = require("../controllers/category");
const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated,
        isAdmin } = require("../controllers/auth");

//parameters
router.param("categoryId", getCategoryById);
router.param("userId", getUserById);

//get routes
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategories);

//update routes - to be done only by an admin
router.post("/category/create/:userId", isSignedIn, isAuthenticated,
            isAdmin, createCategory);
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated,
            isAdmin, updateCategory);
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated,
            isAdmin, deleteCategory);

module.exports = router;
/* end of category.js route */