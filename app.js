require('babel-register');
var PATH = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var http = require('http');
var logger = require('morgan');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
require('dotenv').config();

var app = express();
var port = process.env.PORT || 3000;

// Set handlebars as templating engine
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: __dirname + '/views/layouts/main.hbs'
}));
app.set('view engine', 'hbs');

// Disable etag headers on responses
app.disable('etag');

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
// Set /public as static content dir
app.use('/', express.static(process.cwd() + '/public'));

// Routes
routes(app);

// Start server
var server = http.createServer(app).listen(port, function() {
	console.log('Server started, listening on port ' + port);
});
