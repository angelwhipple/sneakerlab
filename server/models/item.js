const mongoose = require("mongoose");

const ShoeSchema = new mongoose.Schema({
  userId: String,
  shoe_url: String,
  tag: String,
});

module.exports = mongoose.model("item", ShoeSchema);
