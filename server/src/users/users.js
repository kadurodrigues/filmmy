const users = require('../../data/users.json');

const getAll = (req, res) => {
  res.send({
    statusCode: 200,
    users
  });
}

module.exports = {
  getAll
}