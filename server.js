var express = require('express');
var app = express();
var fs = require('fs');
var methods = require('./github.js');


app.get('/', function (req, res) {
      res.redirect('/index.html');
  });

app.get('/src/*', function (req, res) {
  var ext = req.url.split('.')[1] || 'text';
  res.writeHead(200, {'Content-Type' : 'text/' + ext});
  res.write(fs.readFileSync(__dirname + req.url));
  res.end();
})

app.get('/index.html', function (req, res) {

    methods(function(string){

       fs.readFile(__dirname + "/index.html", function (err,data){
        //console.log(data.toString());
        var assembleHTML = data.toString().replace("<li></li>" , string);
        res.send(assembleHTML);
       });
    });
});

app.get('/notify', function (req, res) {
  	var stuff = methods();
  	res.send(stuff);
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Penjs listening at http://%s:%s', host, port);

});