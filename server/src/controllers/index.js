const { auth } = require('./authController');
const { create, findAll, findOne } = require('./usersController');
const { discover, findMovie } = require('./moviesController');
const { addMovie, createList, findLists, removeMovie, removeList } = require('./listsController');

module.exports = {
  auth,
  create,
  findAll,
  findOne,
  discover,
  findMovie,
  addMovie,
  createList,
  findLists,
  removeMovie,
  removeList
}