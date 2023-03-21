const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);

module.exports = Category;
