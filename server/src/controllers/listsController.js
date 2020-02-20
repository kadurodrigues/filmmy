const { List } = require('../models/listModel');
const { listValidation, addMovieValidation } = require('../validations');

module.exports = {
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

  async findUserLists(req, res) {
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

  async addMovieToList(req, res) {
    const { listId, movie } = req.body;
    const { error } = addMovieValidation(req.body);
    
    if (error) return res.status(400).send(error.details[0].message);

    try {
      const list = await List.findByIdAndUpdate(
        { _id: listId },
        { $push: { movies: movie } },
        { new: true }
      )
      
      res.send({
        list,
        status: 200
      })
    } catch (error) {
      res.status(500).send(error.message);
    }
  } 
}