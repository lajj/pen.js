var express = require('express');
var app = express();
var http = require('http').Server(app)
var fs = require('fs');
var methods = require('./github.js');
<<<<<<< Updated upstream
var io = require('socket.io')(http); 

http.listen( process.env.PORT || 3000, function (){
    //console.log('listening on 3000');
  });

=======
var io = require('socket.io')(server); 

>>>>>>> Stashed changes
io.on('connection', function(socket){
  socket.on('update', function(stuff){
    io.emit('update', stuff);
  })
})
<<<<<<< Updated upstream

app.get('/notify', function (req, res) {
   
    methods(function(string){
      io.emit('update', string);
    });

    res.send('Socket get fucked');
});
=======
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======

app.get('/notify', function (req, res) {
  	var stuff = methods();
    var input = req;
    socket.emit('update',input);
  	res.send('Ok: stuff');
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('PenJs listening at http://%s:%s', host, port);

});
>>>>>>> Stashed changes
