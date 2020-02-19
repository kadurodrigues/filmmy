const mongoose = require('mongoose');

const userListSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  listName: {
    type: String,
    maxlength: 255,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const UserList = mongoose.model('usersLists', userListSchema);

exports.UserList = UserList;
