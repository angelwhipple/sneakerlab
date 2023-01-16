import shoe from "./shoe";
const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema({
  userId: String,
  collection_name: String,
  shoes: [shoe],
});

module.exports = mongoose.model("collection", CollectionSchema);
