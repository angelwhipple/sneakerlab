const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  displayName: String,
  googleid: String,
  about: String,
  searches: [String],
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
