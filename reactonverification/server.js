const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

//routes
app.use('/register', require('./src/Api/register'));