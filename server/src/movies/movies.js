const movies = require('../../data/movies.json');
const schema = require('./movie.schema');

const getAll = (req, res) => {
  res.send({
    statusCode: 200,
    movies
  });
}

const findOne = (req, res) => {
  const movie = movies.filter(movie => movie.id === req.params.id);
  return movie.length > 0
    ? res.status(200).send({ movie })
    : res.status(404).send({ message: 'Not Found' })
}

module.exports = {
  getAll,
  findOne
}