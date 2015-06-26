var fs = require('fs');

app.get('/', function (req, res) {
    res.redirect('/index.html');
});

app.get('/src')

app.get('/index.html', function (req, res) {

    getFile(function(string){

       fs.readFile(__dirname + "/index.html", function (err,data){
        //console.log(data.toString());
        var assembleHTML = data.toString().replace("<li></li>" , string);
        res.send(assembleHTML);
       });
    });
});

app.get('/notify', function (req, res) {
  	var stuff = getFile();
  	res.send(stuff);
});