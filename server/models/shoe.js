const mongoose = require("mongoose");

const ShoeSchema = new mongoose.Schema({
  shoe_name: String,
  color: String,
  release: String,
  image: String,
  prices: { String: Number },
  urls: { String: String },
});

module.exports = {
  shoeSchema: ShoeSchema,
  shoeModel: mongoose.model("shoe", ShoeSchema),
};
