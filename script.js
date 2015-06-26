window.onload = function(){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/notify');
  xhr.send();
}

var socket = io();
var getChatElement = document.getElementById('chat');
var sendbutton = document.getElementById('sendbutton');	
var inputfield = document.getElementById('inputfield');
var getElement = document.getElementById('content');

socket.on('update', function (data){
	getElement.innerHTML = data;
});


sendbutton.addEventListener("click", function(){
	var message = inputfield.value;
	console.log(message);
	socket.emit('chat', message);
});

socket.on('loadChat', function(data){
	getChatElement.innerHTML = data;
})