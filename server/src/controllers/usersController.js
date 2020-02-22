const { User } = require('../models/userModel');
const userValidation = require('../validations/userValidation');
const generateToken = require('../utils/generateToken');

module.exports = {
  /** Create a new user */
  async create(req, res) {
    const { firstName, lastName, email, password } = req.body;
    const { error } = userValidation(req.body);
    
    if (error) return res.status(400).send(error.details[0].message);

    try {
      if (await User.findOne({ email })) 
        return res.status(400).send({ error: 'User already exists' });
  
      const user = new User({ firstName, lastName, email, password });
      await user.save();

      return res.send({
        user,
        token: await generateToken({ id: user._id })
      });
    } catch (ex) {
      res.status(500).send(ex.message);
    }
  },

  /** Find all users */
  async findAll(req, res) {
    try {
      const users = await User.find().sort('firstName');
  
      res.send({
        users,
        status: 200
      });
    } catch (ex) {
      res.status(400).send(ex.message);
    }
  },

  /** Find a specific user */
  async findOne(req, res) {
    try {
      const user = await User
        .findById(req.params.id)
        .select(['-password', '-createdAt'])
        
      if(!user) return res.status(404).send('User not found!');
  
      res.send({
        user,
        status: 200
      });
    } catch (ex) {
      res.status(400).send(ex.message);
    }
  }
}