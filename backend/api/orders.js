var express = require("express");
var router = express.Router();
const OrderModel = require("../models/order-model");
const UserModel = require("../models/user-model");
const Order = require("../models/order-model");

// HÄMTA ALLA ORDERS
router.get("/all", async function (req, res, next) {
  try {
    const orders = await OrderModel.find();
    res.status(200).json(orders);
  } catch (err) {
    console.log("Error fetching orders: ", err);
    res.status(400).json({ message: "Error fetching orders." });
  }
});

// SKAPA ORDER FÖR EN SPECIFIK USER // PRODUCTS ÄR EN ARRAY MOTSVARANDE INNEHÅLLET I KUNDVAGN
router.post("/add", async function (req, res, next) {
  try {
    const { user, products } = req.body;

    // check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // create order for user
    const order = await OrderModel.create({
      user: user,
      products: products,
    });
    res.status(201).json(order);
  } catch (err) {
    console.log("Error adding order: ", err);
    res.status(400).json({ message: "Error adding order." });
  }
});

module.exports = router;
