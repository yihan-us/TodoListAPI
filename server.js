var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'), 
  User = require('./api/models/userModel'),
  bodyParser = require('body-parser');

var config = require('./config'); // get our config file
var morgan = require('morgan');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.database); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));


var todoListRoutes = require('./api/routes/todoListRoutes'); //importing route
todoListRoutes(app); //register the route

var authRoutes = require('./api/routes/authRoutes')
authRoutes(app);




app.listen(port);


console.log('todo list RESTful API server started on: ' + port);