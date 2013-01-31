/*
  Main app 
  - load dependencies
  - setup routes / models
  - load configs
  - start app
*/

var express = require('express')
  , fs = require('fs');

// Load config
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , mongoose = require('mongoose');

// Set db connection
mongoose.connect(config.db);

// Set models
var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function(file){
  require(models_path + '/' + file);
});

// Set express
var app = express();

// Express settings
require('./config/express')(app,config);

// Set routes
require('./config/routes')(app);

// Start app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express app started - port '+port);


// var app = express();

// app.configure(function(){
//   app.set('port', process.env.PORT || 3000);
//   app.set('views', __dirname + '/views');
//   app.set('view engine', 'jade');
//   app.use(express.favicon());
//   app.use(express.logger('dev'));
//   app.use(express.bodyParser());
//   app.use(express.methodOverride());
//   app.use(app.router);
//   app.use(express.static(path.join(__dirname, 'public')));
// });

// app.configure('development', function(){
//   app.use(express.errorHandler());
// });

// app.get('/', routes.index);
// app.get('/users', user.list);

// http.createServer(app).listen(app.get('port'), function(){
//   console.log("Express server listening on port " + app.get('port'));
// });


// /* Main application entry file. Please note, the order of loading is important.
//  * Configuration loading and booting of controllers and custom error handlers */

// var express = require('express')
//   , fs = require('fs')
//   , passport = require('passport')

// // Load configurations
// var env = process.env.NODE_ENV || 'development'
//   , config = require('./config/config')[env]
//   , auth = require('./config/middlewares/authorization')
//   , mongoose = require('mongoose')

// // Bootstrap db connection
// mongoose.connect(config.db)

// // Bootstrap models
// var models_path = __dirname + '/app/models'
// fs.readdirSync(models_path).forEach(function (file) {
//   require(models_path+'/'+file)
// })

// // bootstrap passport config
// require('./config/passport')(passport, config)

// var app = express()
// // express settings
// require('./config/express')(app, config, passport)

// // Bootstrap routes
// require('./config/routes')(app, passport, auth)

// // Start the app by listening on <port>
// var port = process.env.PORT || 3000
// app.listen(port)
// console.log('Express app started on port '+port)
