const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  displayName: String,
  googleid: String,
  pfp: String,
  about: String,
  searchHistory: [String],
  clickHistory: [String],
  followers: [],
  following: [],
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
