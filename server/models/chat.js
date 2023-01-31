const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  // array of message IDs
  messages: [],
});

module.exports = mongoose.model("chat", ChatSchema);
