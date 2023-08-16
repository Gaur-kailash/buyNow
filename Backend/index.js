const express = require('express');
const cors = require('cors');
const signup = require('./routes/signup');
const login = require('./routes/login');
require('./db/config')
const app = express();
app.use(express.json());
app.use(cors());


app.use('/',signup);
app.use('/',login);

console.log("Server started");
app.listen(5000);