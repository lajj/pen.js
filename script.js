var socket = io();

socket.on('update', function (data){
	console.log(data);
	var poop = document.getElementById('suckit');
	poop.innerHTML = data;
})