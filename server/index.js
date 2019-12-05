const express = require('express');
const app = express();

require('dotenv').config();
require('./src/database')();
require('./src/middleware')(app);
require('./src/routes')(app);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
});


