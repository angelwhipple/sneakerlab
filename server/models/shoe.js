// import
const mongoose = require("mongoose");

// attributes
const ShoeSchema = new mongoose.Schema({
  shoe_name: String,
  color: String,
  release: Number,
  price: Number,
  url: String,
});

// export
module.exports = mongoose.model("shoe", ShoeSchema);
