const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
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
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/** Encript the password before save */
UserSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', UserSchema);

exports.User = User;
