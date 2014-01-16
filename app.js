// request handlers
var handler = function(req, res) {
	// path handler
	var filePath = req.url === '/' ? "./views/index.html" : "./views" + req.url;
	fs.readFile(filePath, function(err, data) {
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

	// Holds name of client and states
	var user = "";
	var state = "Starting soon";
	
	// Updates the state
	var getMessage = function() {
		if (user === null || user === "") {
			return "Please enter a cool name";
		}
		else {
			return "Sorry, there was an error. Try a cooler name";
		}
	};
	
	var message = getMessage();
	
	// Request the user's name
	socket.emit('promptuser', message);
	
	// After user submits name, updates the view
	socket.on('ready', function(name) {
		
		// If name is taken, repeat process
		if (game.isRepeat(name) || name == null) {
			message = getMessage();
			socket.emit('promptuser', message);
			return;
		}
		
		// Adds user and sets up the view
		user = name;
		game.addUser(name);
	//	updateScreen();
		io.sockets.emit('refreshstate', state, game.getUsers());
	});
	
	// If disconnected, remove the user from activeUser
	socket.on('disconnect', function() {
		if (user === null){
			return;
		}	
		game.removeUser(user);
	});
	
	// Check if they have the correct answer
	socket.on('click', function(question, answer) {
		var valid = game.checkAnswer(question, answer);
		socket.emit('update', valid, user);
	});
	
	// Toggles the state if in game or waiting for new game.
	var toggleState = function () {
		if (state === "Starting soon") {
			return state = "In Progress";
		}
		return state = "Starting soon";
	};
});