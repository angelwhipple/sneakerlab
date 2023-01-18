const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  displayName: String,
  googleid: String,
  about: String,
  searches: [String],
  pfp: String //stored as url
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
