var express = require('express');
var app = express();
var https = require('https');
var request = require('request');

function getFile (){
	//var token = '32c077b72daa92c9aaa6127d5d4dbe0a00f373a6';
	//var url = 'https://api.github.com/users/'+username;
	var url = 'https://api.github.com/repos/Lajj/pen.js/contents/log.md?ref=notify';
	var body = '';
	var result;
	var headers= {'User-Agent':'pen.js'};

	var options = {
		headers: headers,
		url: url
	};

     request.get(options, function (error, response, body){
      	if(!error && response.statusCode == 200){
      		var b64string = JSON.parse(body);
			var buf = new Buffer(b64string.content, 'base64');
      		console.log(buf.toString());
      		
      	}
      	else if(error){      		
      		console.log(error);
		}
      
    }); 
}

app.get('/', function (req, res) {
  	var stuff = getFile();
  	res.send(stuff);
});

app.get('/notify', function (req, res) {
  	console.log(req);
 	 //put socket here
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});