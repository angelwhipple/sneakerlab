const mongoose = require("mongoose");

const TradeSchema = new mongoose.Schema({
  creator: String,
  details: {},
  status: String,
  originalTrade: String,
});

module.exports = mongoose.model("trade", TradeSchema);
