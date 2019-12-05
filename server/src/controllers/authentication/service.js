const bcript = require('bcrypt');
const { User } = require('../user/model');

module.exports = {
  async auth(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email }).select('+password');
  
      if(!user)
        return res.status(400).send({ error: 'User not found' });
  
      if(!await bcript.compare(password, user.password))
        return res.status(400).send({ error: 'Invalid password' }); 
  
      res.status(200).send({ 
        statusMessage: 'User logged',
        user
      });
    } catch (ex) {
      res.status(400).send(ex.message);
    }
  }
}