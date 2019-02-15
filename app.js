var express = require('express');
var mongoose = require('mongoose')
var todoController = require('./controllers/todoController'); 

var app = express();

app.set('view engine','ejs');



app.use(express.static('./public'));

todoController(app);

app.listen(3000);
console.log('You are listining to port 3000'); 