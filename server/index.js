const express = require('express');
const app = express();

require('./config')(app);
require('./middleware')(app);
require('./src/routes')(app);

