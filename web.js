//
// web.js
//

var
    express = require('express')
  , fs      = require('fs')
  , http    = require('http')
  , https   = require('https');

var app = express();

app.set('port', process.env.PORT || 8080);

app.get('/', function(request, response) {
  var data = fs.readFileSync('zensheet.html').toString();
  response.send(data);
});

app.get('/parallel', function(request, response) {
  var data = fs.readFileSync('parallel.html').toString();
  response.send(data);
});

app.get('/reactive', function(request, response) {
  var data = fs.readFileSync('reactive.html').toString();
  response.send(data);
});

app.get('/cloud', function(request, response) {
  var data = fs.readFileSync('cloud.html').toString();
  response.send(data);
});

http.createServer(app).listen(app.get('port'), function() {
  console.log("Listening on " + app.get('port'));
});
