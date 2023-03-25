const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    lager: {
      type: Number,
      required: true,
    },
  },
  { collection: "products" }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

module.exports = Product;
