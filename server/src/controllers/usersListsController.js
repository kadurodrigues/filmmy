const { UserList } = require('../models/userListModel');

module.exports = {
  async createList(req, res) {
    const { userId, listName } = req.body;

    try {
      const list = new UserList({ userId, listName });
      await list.save();

      return res.send(list)
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  async findUserLists(req, res) {
    const { id } = req.params

    try {
      const lists = await UserList.find({ 'userId': id})

      if(!lists) return res.status(404).send('Lists not found!');

      res.send({
        lists,
        status: 200
      })
      
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}