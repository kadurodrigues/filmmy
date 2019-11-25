const express = require('express');
const router = express.Router();

const { getAll, findOne } = require('./movies');

router.get('/', getAll);
router.get('/:id', findOne);

module.exports = router;