const express = require("express");
const router = express.Router();
const CategoryModel = require("../models/category-model");

// HÄMTA ALLA PRODUKTER FÖR EN SPECIFIK KATEGORI
router.get("/", async function (req, res, next) {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json(categories);
  } catch (err) {
    console.log("Error fetching categories: ", err);
    res.status(400).json({ message: "Error fetching categories." });
  }
});

// SKAPA KATEGORI, KEY MÅSTE ANGES // UTAN KEY SVARA 401
router.post("/add", async function (req, res, next) {
  try {
    const { name, token } = req.body;

    if (token !== process.env.API_TOKEN) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    const newCategory = await CategoryModel.create({ name: name });
    res.status(201).json(newCategory);
  } catch (err) {
    console.log("Error adding category: ", err);
    res.status(400).json({ message: "Error adding category." });
  }
});

// HÄMTA NAMN PÅ KATEGORI (EGEN-GJORD ENDPOINT)
router.get("/:categoryId", async function (req, res, next) {
  try {
    const id = req.params.categoryId;

    const category = await CategoryModel.find({ _id: id });
    res.status(200).json(category);
  } catch (err) {
    console.log("Error fetching category: ", err);
    res.status(400).json({ message: "Error fetching category" });
  }
});

module.exports = router;
