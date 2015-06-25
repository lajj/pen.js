var express = require('express');
var app = express();
var http = require('http').Server(app)
var fs = require('fs');
var methods = require('./github.js');
var io = require('socket.io')(http); 

http.listen( process.env.PORT || 3000, function (){
    //console.log('listening on 3000');
  });

io.on('connection', function(socket){
  socket.on('update', function(stuff){
    io.emit('update', stuff);
  })
})

app.get('/notify', function (req, res) {
   
    methods(function(string){
      io.emit('update', string);
    });

    res.send('Socket get fucked');
});

app.get('/', function (req, res) {
      res.redirect('/index.html');
  });

app.get('/*', function (req, res) {
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
        res.writeHead(200, {'Content-Type':'text/html'});
        res.send(assembleHTML);
       });
    });
});