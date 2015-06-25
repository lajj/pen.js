var express = require('express');
var app = express();
var fs = require('fs');
var methods = require('./github.js');
var port = process.env.PORT || 3000;

<<<<<<< Updated upstream
=======
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
      		var lol = obj.split('\n');
      		var returnstring="";
          var data = [];
      		for(var i=0;i<lol.length;i++){

      			try{
        	      		 
                    var kp = JSON.parse(lol[i]);
                    
		 				if(kp.author){
              data.push(kp); 
             
		 					var convertedTime  ;
 		       	      		returnstring += "<li><h2>" + kp.author + kp.timestamp + "</h2></li>";
 		       	      	}
				    }catch(e){
				        //console.log(e);
				    }
	      		//console.log(returnstring);	      		      			

      		}
      	}
      	else if(error || response.statusCode !== 200){      		
      		console.log(error || response.statusCode);
		}
       console.log(data);
      
    }); 
}
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
  	var stuff = methods();
  	res.send(stuff);
=======
  	var stuff = getFile();
  	res.send('stuff');
>>>>>>> Stashed changes
});

var server = app.listen(port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Penjs listening at http://%s:%s', host, port);

});