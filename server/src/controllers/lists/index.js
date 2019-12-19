const { List } = require('../../models/list-model');

module.exports = {
  async createList(req, res) {
    const { userId, listName } = req.body;

    try {
      const list = new List({ userId, listName });
      await list.save();

      return res.send(list)
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}