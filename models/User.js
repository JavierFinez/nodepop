

const mongoose = require('mongoose');

// schema definition
const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

// model creation
const User = mongoose.model('User', userSchema);

module.exports = User;
