const express = require('express');
const router = express.Router();

const { findAll, findOne, create } = require('./users');

router
  .get('/', findAll)
  .get('/:id', findOne)
  .post('/', create)

module.exports = router;