const mongoose = require("mongoose");

const ShoeSchema = new mongoose.Schema({
  shoe_name: String,
  color: String,
  release: Number,
  price: Number,
  url: String,
});

module.exports = {
  shoeSchema: ShoeSchema,
  shoeModel: mongoose.model("shoe", ShoeSchema),
}