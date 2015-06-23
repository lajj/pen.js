var express = require('express');
var app = express();
var https = require('https');
var request = require('request');

function getFile (username){
	//var token = '32c077b72daa92c9aaa6127d5d4dbe0a00f373a6';
	var url = 'https://api.github.com/users/'+username;
	var body = '';
	var result;
	var headers= {'User-Agent':'pen.js'};

	var options = {
		headers: headers,
		url: url
	};

     request.get(options, function (error, response, body){
      	if(!error && response.statusCode == 200){
      		var appDi = JSON.parse(body);
      		console.log('8=================p - - - '+ appDi.login);
      		//console.log(response);
      	}
      	else if(error){      		
      		console.log(error);
		}
      	else{
      		console.log("Huhu Appdi");
      		console.log(response.statusCode);

      	}
      
    }); 
}

app.get('/', function (req, res) {
  
  res.send(getFile('Lukars'));
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