// server/src/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // tests create plain password
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
