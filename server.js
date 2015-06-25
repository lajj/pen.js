var express = require('express');
var app = express();
var https = require('https');
var request = require('request');
var io = require('socket.io');

function getFile (){
	var url = 'https://api.github.com/repos/Lajj/pen.js/contents/log.md?ref=notify';
	var body = '';
	var result;
	var headers= {'User-Agent':'pen.js',
					'Content-Type': 'application/json'};

	var options = {
		headers: headers,
		url: url
	};
     request.get(options, function (error, response, body){
      	if(!error && response.statusCode == 200){
      		var b64string = JSON.parse(body);
			    var buf = new Buffer(b64string.content, 'base64');
      		var obj = buf.toString().replace(/time/g, "timestamp");
      		var objArray = obj.split('\n');
          var returnString="";
          var data = [];
      		for(var i=0;i<objArray.length;i++){
      			try{
              var parsedSingleObj = JSON.parse(objArray[i]);        
		 				if(parsedSingleObj.author){
                data.push(parsedSingleObj);              
  		 					var convertedTime = new Date(parseInt(parsedSingleObj.timestamp)*1000);
                var timeString = convertedTime.toGMTString();
     	      		returnString.data += "<li><h2>" + parsedSingleObj.author + "</h2> <span class='time'>" + timeString + "</span><p> " + parsedSingleObj.file + " : " + parsedSingleObj.message + "</p><p> " + parsedSingleObj.SHA + "</p></li>";
   	      	}
				    }catch(e){
				        //console.log(e);
				    }
      		}
        return returnString;
      	}
      	else if(error || response.statusCode !== 200){      		
      		console.log(error || response.statusCode);
		}
    //return returnString;
    // callback(returnString);
      
    }); 
return returnString;
}

app.get('/', function (req, res) {
  	var stuff = getFile();
  	res.send(stuff);
});

app.get('/notify', function (req, res) {
  	var stuff = getFile();
  	res.send(stuff);
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});