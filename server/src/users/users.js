const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const { userValidation } = require('./user-validation');

/** Create a new user */
const create = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const { error } = userValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).send('User already registered');
    
    user = new User({ firstName, lastName, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.send({
      message: 'User created succesful',
      status: 200
    });
  } catch (ex) {
    res.status(500).send(ex.message);
  }
}

/** Find all users */
const findAll = async (req, res) => {
  try {
    const users = await User.find().sort('firstName');

    res.send({
      users,
      status: 200
    });
  } catch (ex) {
    res.status(400).send(ex.message);
  }
}

/** Find a specific user */
const findOne = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if(!user) return res.status(404).send('User not found!');

    res.send({
      user,
      status: 200
    });
  } catch (ex) {
    res.status(400).send(ex.message);
  }
}

module.exports = {
  create,
  findAll,
  findOne
}