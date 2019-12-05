const express = require('express');
const routes = express.Router();

const { findAll, findOne, create } = require('./controllers/user');
const { discover, findMovie } = require('./controllers/movies');
const { auth } = require('./controllers/authentication');

/** Authentication route */
routes.post('/api/auth', auth);

/** User routes */
routes
  .get('/api/users', findAll)
  .get('/api/users/:id', findOne)
  .post('/api/users', create);

/** Movies routes */
routes
  .get('/api/movies/discover', discover)
  .get('/api/movie/:id', findMovie);

module.exports = (app) => {
  app.use(routes);
};