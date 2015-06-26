window.onload = function(){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/notify');
  xhr.send();
}

var socket = io();

socket.on('update', function (data){
	var getElement = document.getElementById('content');
	getElement.innerHTML = data;
})