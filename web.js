//
// web.js
//

// Requirements
var
    express = require('express')
  , fs      = require('fs')
  , http    = require('http')
  , https   = require('https');

// Configuration
var app = express();

// Environment variables
var config = require('./config')

// Setting up the authentication link
const domain_name = "https://" + config.COGNITO_DOMAIN + '/';
const response_type = 'response_type=' + 'code' + '&';
const redirect_uri = 'redirect_uri=' + config.COGNITO_APP_CLIENT_CALLBACK_URL + '&' 
const client_id = 'client_id=' + config.COGNITO_APP_CLIENT_ID
const authentication_parameters = '?' + response_type + redirect_uri + client_id;

app.set('port', process.env.PORT || 8080);

app.use(express.static('views'));

app.set('view engine', 'ejs');

// Routes
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/parallel', function(req, res) {
   res.render('parallel');
});

app.get('/reactive', function(req, res) {
  res.render('reactive');
});

app.get('/cloud', function(req, res) {
  res.render('cloud');
});

app.get('/live2017', function (req, res) {
  res.render('live2017');
});

app.get('/contact', function (req, res) {
  res.render('contact');
});

app.get('/signup', function (req, res) {
  res.redirect(domain_name + 'signup' + authentication_parameters);
});

app.get('/signin', function (req, res) {
  res.redirect(domain_name + 'login' + authentication_parameters);
});

// Starting the server
http.createServer(app).listen(app.get('port'), function() {
  console.log("Listening on " + app.get('port'));
});
