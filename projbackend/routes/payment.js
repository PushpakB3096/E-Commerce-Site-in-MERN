/* start of payment.js */

const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getToken, processPayment } = require("../controllers/payment");
const { getUserById } = require('../controllers/user');

router.param("userId", getUserById);

//route to get a token for payment
router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken);

//route to process a payment request
router.post("/payment/braintree/:userId", isSignedIn, isAuthenticated, processPayment);

module.exports = router;

/* end of payment.js */