var socket = io();

socket.on('update', function (data){
	var poop = document.getElementById('suckit');
	poop.innerHTML = data;
})