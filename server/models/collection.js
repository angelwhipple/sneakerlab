import shoe from "./shoe";
const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema({
  creator: String,
  title: String,
  shoes: [shoe],
});

module.exports = mongoose.model("collection", CollectionSchema);
