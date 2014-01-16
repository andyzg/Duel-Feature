window.onload = function() {
	
	var socket = io.connect('http://localhost');
    
    socket.on('promptuser', function(message) {
        var name = prompt(message, "Your Name");
        socket.emit('ready', name);
    });

    socket.on('refreshstate', function(state, activeUsers) {
        var title = document.getElementById('title');
        title.innerHTML = state;

        var list = document.getElementById('list');
        for (var i=0; i<activeUsers.length; i++) {
                var name = document.createElement("p");
                name.innerHTML = activeUsers[i].name;
                list.appendChild(name);
        }
    });
/*
var welcome = document.getElementById("welcome");
var allUsers = document.getElementById("users");
var progress = document.getElementById("progress");
var results = document.getElementById("results");

var socket = io.connect('http://localhost:3000');

socket.on('welcome', function (data) {
	console.log(data);
	welcome.innerHTML = "Welcome to the game <strong>" + data.name + "</strong>";
});
socket.on('users', function (data) {
	allUsers.innerHTML = "<strong>Users:</strong><br />" + data.users;
});
socket.on('update', function (data) {
	progress.innerHTML = data.currentWidth;
	progress.style.width = parseInt(data.currentWidth) + "px";
});
socket.on('win', function (data) {
	results.innerHTML = data.message;
});

progress.onclick = function() {
        socket.emit("click");
}
*/
}