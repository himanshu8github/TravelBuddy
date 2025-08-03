const express = require("express");
const router = express.Router();
const { createCheckoutSession } = require("../controller/payment.controller.js");

router.post("/create-checkout-session", createCheckoutSession);

module.exports = router;
