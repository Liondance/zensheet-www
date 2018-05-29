//
// web.js
//

var
    express = require('express')
  , fs      = require('fs')
  , http    = require('http')
  , https   = require('https');

var app = express();

app.use(express.static('views'));

app.set('port', process.env.PORT || 8080);

app.set('view engine', 'ejs');

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

http.createServer(app).listen(app.get('port'), function() {
  console.log("Listening on " + app.get('port'));
});
