const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  sender: String,
  content: String,
});

module.exports = mongoose.model("message", MessageSchema);
