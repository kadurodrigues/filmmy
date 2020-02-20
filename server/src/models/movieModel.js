const mongoose = require('mongoose');
const { genreSchema } = require('./genresModel');

const movieSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  overview: {
    type: String,
    required: true
  },
  backdrop_path: {
    type: String,
    required: true
  },
  genres: {
    type: [genreSchema],
    required: true
  },
  release_date: {
    type: String,
    required: true
  },
  vote_average: {
    type: Number,
    required: true
  }
})

exports.movieSchema = movieSchema