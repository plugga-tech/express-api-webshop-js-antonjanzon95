const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "products" }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

module.exports = Product;
