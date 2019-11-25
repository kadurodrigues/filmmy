const movies = require('../movies');
const users = require('../users');

module.exports = app => {
  app.use('/api/movies', movies);
  app.use('/api/users', users);
};