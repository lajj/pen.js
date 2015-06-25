var express = require('express');
var app = express();
var http = require('http').Server(app)
var fs = require('fs');
var methods = require('./github.js');
var io = require('socket.io')(http); 

http.listen(3000, function (){
    console.log('listening on 3000');
  });


// io.on('connection', function(socket){
//   //console.log('hello world');
//     socket.on('update', function(bla){
//     //console.log(bla);
//     io.emit('update', bla);
// });
// });


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



// var server = app.listen(3000, function () {

//   var host = server.address().address;
//   var port = server.address().port;

//   console.log('PenJs listening at http://%s:%s', host, port);

// });