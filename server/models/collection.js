import shoe from "./shoe";
const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema({
  collection_name: String,
  shoes: [shoe],
});

module.exports = mongoose.model("collection", CollectionSchema);
