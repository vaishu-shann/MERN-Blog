const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  username: { type: String, required: true, min: 4, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User",UserSchema)