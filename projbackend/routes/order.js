/* start of order.js route */

const express = require("express");
const router = express.Router();

const {
  getOrderById,
  getAllOrder,
  createOrder,
  getOrderStatus,
  updateOrderStatus,
} = require("../controllers/order");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, pushOrderinOrdersList } = require("../controllers/user");
const { updateInventory } = require("../controllers/product");

const {} = require("../controllers/order");

//parameters
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//get routes
router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrder);
router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus);

//update route
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderinOrdersList,
  updateInventory,
  createOrder
);
router.put("/order/:orderId//status/:userId", isSignedIn, isAuthenticated, isAdmin, updateOrderStatus);



module.exports = router;

/* end of order.js route */