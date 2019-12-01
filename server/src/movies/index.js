const express = require('express');
const router = express.Router();

const { getAll, findOne } = require('./movies');

router
  .get('/', getAll)
  .get('/:id', findOne);

module.exports = router;