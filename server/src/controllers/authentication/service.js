const bcript = require('bcrypt');
const { User } = require('../user/model');
const { generateToken } = require('../../utils');

module.exports = {
  async auth(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email }).select('+password');

      if(!user)
        return res.status(400).send({ error: 'User not found' });

      if(!await bcript.compare(password, user.password))
        return res.status(400).send({ error: 'Invalid password' });
        
      user.password = undefined;
  
      return res.send({ 
        user,
        token: await generateToken({ id: user._id })
      });
    } catch (ex) {
      res.status(400).send(ex.message);
    }
  }
}