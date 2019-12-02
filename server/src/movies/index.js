const express = require('express');
const router = express.Router();

const { findMovie, discover } = require('./movies');

router
  .get('/movie/:id', findMovie)
  .get('/discover', discover)

module.exports = router;