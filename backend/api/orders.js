var express = require("express");
var router = express.Router();
const OrderModel = require("../models/order-model");
const ProductModel = require("../models/product-model");

// HÄMTA ALLA ORDERS
router.get("/all/:token", async function (req, res, next) {
  try {
    const token = req.params.token;

    if (token !== process.env.API_TOKEN) {
      return res.status(401).json({ message: "Not Authorized" });
    }

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

    // deduct stock amount for product
    const deductProductStock = products.map(({ productId, quantity }) => ({
      updateOne: {
        filter: { _id: productId },
        update: { $inc: { lager: -quantity } },
      },
    }));

    await ProductModel.bulkWrite(deductProductStock);

    res.status(201).json(order);
  } catch (err) {
    console.log("Error adding order: ", err);
    res.status(400).json({ message: "Error adding order." });
  }
});

// HÄMTA ORDERS FÖR EN USER // SKALL MISSLYCKAS = INGEN KEY  // SVARA MED 401
router.post("/user", async function (req, res, next) {
  try {
    const { user, token } = req.body;

    if (token !== process.env.API_TOKEN) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    const orders = await OrderModel.find({ user }).populate(
      "products.productId"
    );

    // const orders = await OrderModel.find({ user });

    res.status(200).json(orders);
  } catch (err) {
    console.log("Error fetching orders: ", err);
    res.status(400).json({ message: "Error fetching orders." });
  }
});

module.exports = router;
