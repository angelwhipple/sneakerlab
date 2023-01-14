const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema({
  collection_name: String,
  item_urls: [String],
});

module.exports = mongoose.model("collection", CollectionSchema);
