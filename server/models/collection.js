const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema({
  creator: String,
  name: String,
  shoes: [],
});

module.exports = mongoose.model("collection", CollectionSchema);
