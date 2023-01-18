const mongoose = require("mongoose");
const shoe = require("./shoe");

const CollectionSchema = new mongoose.Schema({
  creator: String,
  title: String,
  shoes: [shoe.shoeSchema],
});

module.exports = mongoose.model("collection", CollectionSchema);
