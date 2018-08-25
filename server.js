var express = require('express');
var socket = require('socket.io');

//App setup
var app = express();
var server = app.listen(4000, function(){
	console.log('listening to port 4000');
});

//static files
app.use(express.static('public'));

var io = socket(server);

io.on('connection', function(client){
	console.log('made socket connection',client.id);

	client.on('message', function(data){
		io.sockets.emit('message', data);
	});

	client.on('typing', function(data){
		client.broadcast.emit('typing', data);
	});
});