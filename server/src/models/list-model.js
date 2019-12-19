const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
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

const List = mongoose.model('List', ListSchema);

exports.List = List;
