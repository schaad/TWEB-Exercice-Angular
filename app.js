// SERVEUR
// Auteur : Valentin Schaad

var express = require('express'),
	config = require('./config/config');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

var data = [0, 5, 0];
var label = ["Super", "Just to have 3 colors", "Cool"]

require('./config/express')(app, config);

server.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

io.on('connection', function(socket){
	console.log('Un client s\'est connecté');

	// Définition des événements de communication avec le client

	socket.on('requestInit', function(){
		socket.emit('initVote', data, label);
	});

	socket.on('voteFor', function(id){
		++data[id];

		console.log('Un update ' + data[id]);

		io.emit('updateVote', data);
	});

	socket.on('reset', function(){
		data = [0, 5, 0];

		io.emit('updateVote', data);
	});
});