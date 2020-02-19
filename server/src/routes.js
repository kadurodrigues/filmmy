const express = require('express');
const router = express.Router();

const { create, findAll, findOne } = require('./controllers/usersController');
const { discover, findMovie } = require('./controllers/moviesController');
const { auth } = require('./controllers/authController');
const { createList, findUserLists } = require('./controllers/usersListsController');

const authMiddleware = require('./middleware/auth');

/** Authentication route */
router.post('/auth', auth);

/** User routes */
router
  .get('/users', findAll)
  .get('/users/:id', findOne)
  .post('/users', create);

/** Movies routes */
router
  .get('/movies/discover', discover)
  .get('/movie/:id', findMovie);

/** Lists routes */
router
  .get('/lists/:id', authMiddleware, findUserLists)
  .post('/create-list', authMiddleware, createList)

module.exports = (app) => {
  app.use('/api', router);
};