var express = require('express');
var app = express();
var http = require('http').Server(app)
var fs = require('fs');
var gitHub = require('./github.js');
var io = require('socket.io')(http); 
var chatArray = [];


http.listen( process.env.PORT || 3000, function (){
    //console.log('listening on 3000');
  });

io.on('connection', function(socket){

  console.log('User Connected');
  socket.on('update', function(stuff){
    io.emit('update', stuff);
  });
  
  socket.on('chat', function(stuff){
    console.log(stuff);
    var dataOfMessage = new Date();
    chatArray.push({'message' : stuff, 'date' : dataOfMessage});
    var returnChat = "";
    for(var i=0;i<chatArray.length;i++){
      returnChat = "<li>" + chatArray[i].message + " " + chatArray[i].date + "</li>" + returnChat;
    }
    io.emit('loadChat', returnChat);

  });
})

app.get('/notify', function (req, res) {
   
    gitHub(function(string){
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

    gitHub(function(string){

       fs.readFile(__dirname + "/index.html", function (err,data){
        //console.log(data.toString());
        var assembleHTML = data.toString().replace("<li></li>" , string);
        res.writeHead(200, {'Content-Type':'text/html'});
        res.send(assembleHTML);
       });
    });
});