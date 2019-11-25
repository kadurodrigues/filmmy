const express = require('express');
const router = express.Router();

const { getAll } = require('./users');

router.get('/', getAll);

module.exports = router;