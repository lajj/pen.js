var methods = {};

	methods.getfile = function (){
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

	      		for(var i=0;i<objArray.length+1;i++){
	            if(i=objArray.length){
	              return returnString;
	            }
	      			try{

	              var parsedSingleObj = JSON.parse(objArray[i]);     

			 				if(parsedSingleObj.author){
	  		 					var convertedTime = new Date(parseInt(parsedSingleObj.timestamp)*1000);
	                var timeString = convertedTime.toGMTString();
	     	      		returnString += "<li><h2>" + parsedSingleObj.author + "</h2> <span class='time'>" + timeString + "</span><p> " + parsedSingleObj.file + " : " + parsedSingleObj.message + "</p><p> " + parsedSingleObj.SHA + "</p></li>";
	console.log("opopopopopopopopopop", returnString);
	              }

					    }catch(e){
					        //console.log(e);
					    }
	      		}
	      	}
	      	else if(error || response.statusCode !== 200){      		
	      		console.log(error || response.statusCode);
			    }
	      
	    }); 
	//console.log("oy oy oy oy", returnString);
	};


module.exports = methods;