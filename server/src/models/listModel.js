const mongoose = require('mongoose');
const { movieSchema } = require('./movieModel');

const listSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    maxlength: 255,
    required: true
  },
  movies: {
    type: [movieSchema]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const List = mongoose.model('lists', listSchema);

exports.List = List;
