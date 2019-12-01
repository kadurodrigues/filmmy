const express = require('express');
const app = express();

require('./config')(app);
require('./database')();
require('./middleware')(app);
require('./src/routes')(app);

