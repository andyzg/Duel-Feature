// request handlers
var handler = function(req, res) {
	fs.readFile('./views/index.html', function(err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Sorry. Error loading the HTML :(');
		}
		res.writeHead(200);
		res.end(data);
	});
}

// dependencies
var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var game = require('./game');

// constants
var port = 3000;

app.listen(port);

io.sockets.on('connection', function(socket) {
	var user;
	var state = "Starting soon";
	
	socket.emit('promptuser', message);
	
	socket.on('ready', function(name) {
		if (game.isRepeat(name) || name == null) {
			socket.emit('promptuser', message);
			return;
		}
		
		user = name;
		game.addUser(name);
	//	updateScreen();
		io.sockets.emit('refreshstate', state, game.getUsers());
	});
	
	socket.on('disconnect', function() {
		if (user === null){
			return;
		}
		
		game.removeUser(user);
	});
	
	socket.on('click', function(question, answer) {
		var valid = game.checkAnswer(question, answer);
		socket.emit('update', valid, user);
	});
	
	var toggleState = function () {
		if (state === "Starting soon") {
			return state = "In Progress";
		}
		return state = "Starting soon";
	};
	
	var message = function() {
		if (user === null) {
			return "Please enter a cool name";
		}
		else {
			return "Sorry, there was an error. Try a cooler name";
		}
	};
});