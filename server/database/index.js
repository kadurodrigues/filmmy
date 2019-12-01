const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(`${process.env.MONGO_URI}`, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  });
  
  mongoose.connection
    .on('error', console.error.bind(console, 'connection error:'))
    .once('open', () => console.log('DB connected'));
}