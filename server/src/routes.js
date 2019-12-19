const express = require('express');
const router = express.Router();

const { findAll, findOne, create } = require('./controllers/user');
const { discover, findMovie } = require('./controllers/movies');
const { auth } = require('./controllers/authentication');
const { createList } = require('./controllers/lists');

const authMiddleware = require('./middleware/auth');

/** Authentication route */
router.post('/api/auth', auth);

/** User routes */
router
  .get('/api/users', findAll)
  .get('/api/users/:id', findOne)
  .post('/api/users', create);

/** Movies routes */
router
  .get('/api/movies/discover', discover)
  .get('/api/movie/:id', findMovie);

/** Lists routes */
router.use(authMiddleware);
router.post('/api/create-list', createList)

module.exports = (app) => {
  app.use(router);
};