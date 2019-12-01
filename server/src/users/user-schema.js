const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    maxlength: 255,
    required: true
  },
  lastName: {
    type: String,
    maxlength: 255,
    required: true
  },
  email: {
    type: String,
    maxlength: 255,
    minlength: 8,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 1024,
    required: true
  }
})

const User = mongoose.model('User', userSchema);

exports.User = User;
