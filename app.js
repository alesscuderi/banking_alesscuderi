const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/banking');
var index = require('./routes/index');
var chats = require('./routes/chats');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/chats', chats);
app.use('/', index);


var port = 3001;
app.listen(port, ()=>
{console.log("server start at port:", port)})
module.exports = app;
