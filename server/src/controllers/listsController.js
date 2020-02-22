const { List } = require('../models/listModel');
const { 
  listValidation, 
  addMovieValidation, 
  removeMovieValidation 
} = require('../validations');

module.exports = {
  /** Create a new movies list */
  async createList(req, res) {
    const { userId, name } = req.body;
    const { error } = listValidation(req.body);
    
    if (error) return res.status(400).send(error.details[0].message);

    try {
      const list = new List({ userId, name });
      await list.save();

      return res.send(list)
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  /** Find user lists */
  async findLists(req, res) {
    const { id } = req.params

    try {
      const lists = await List.find({ 'userId': id }).select('-createdAt')

      if(!lists) return res.status(404).send('Lists not found!');

      res.send({
        lists,
        status: 200
      })
      
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  /** Add a movie to a list */
  async addMovie(req, res) {
    const { listId, movie } = req.body;
    const { error } = addMovieValidation(req.body);
    
    if (error) return res.status(400).send(error.details[0].message);

    try {
      let list = await List.findByIdAndUpdate(
        { _id: listId },
        { $push: { movies: movie } },
        { new: true } 
      );
      
      if (!list) return res.status(404).send({
        errorMessage: 'List Not Found'
      });

      res.status(200).send({ list });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  
  /** Remove a movie from a list */
  async removeMovie(req, res) {
    const { listId, movieId } = req.body;
    const { error } = removeMovieValidation(req.body);
    
    if (error) return res.status(400).send(error.details[0].message);

    try {
      let list = await List.findByIdAndUpdate(
        { _id: listId },
        { $pull: { "movies": { "_id": movieId } } },
        { new: true } 
      );
      
      if (!list) return res.status(404).send({
        errorMessage: 'List Not Found'
      });

      res.status(200).send({ list });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}