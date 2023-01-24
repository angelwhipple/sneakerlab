const mongoose = require("mongoose");

const ShoeSchema = new mongoose.Schema({
  shoeName: String,
  release: String,
  colorway: String,
  image: String,
  styleId: String,
});

module.exports = mongoose.model("shoe", ShoeSchema);
