const express = require('express');
const router = express.Router();

const {
  auth,
  create,
  findOne,
  findAll,
  discover,
  findMovie,
  createList,
  findLists,
  addMovie,
  removeMovie,
  removeList
} = require('./controllers');

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
  .get('/lists/:id', authMiddleware, findLists)
  .post('/lists/create', authMiddleware, createList)
  .post('/lists/add-movie', authMiddleware, addMovie)
  .put('/lists/remove-movie', authMiddleware, removeMovie)
  .put('/lists/remove-list', authMiddleware, removeList)

module.exports = (app) => {
  app.use('/api', router);
};