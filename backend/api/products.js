var express = require("express");
var router = express.Router();
const ProductModel = require("../models/product-model");

// HÄMTA ALLA PRODUKTER
router.get("/", async function (req, res, next) {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (err) {
    console.log("Error fetching products: ", err);
    res.status(400).json({ message: "Error fetching products." });
  }
});

// HÄMTA SPECIFIK PRODUKT
router.get("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    res.status(200).json(product);
  } catch (err) {
    console.log("Error fetching product: ", err);
    res.status(400).json({ message: "Error fetching product." });
  }
});

// SKAPA PRODUKT
router.post("/add", async function (req, res, next) {
  try {
    const newProduct = await ProductModel.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    console.log("Error adding product: ", err);
    res.status(400).json({ message: "Error adding product." });
  }
});

module.exports = router;
