window.onload = function(){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/notify');
  xhr.send();
}

var socket = io();

socket.on('update', function (data){
	var poop = document.getElementById('suckit');
	poop.innerHTML = data;
})