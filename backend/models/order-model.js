const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  products: {
    productId: {
      type: [mongoose.Types.ObjectId],
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

module.exports = Order;
