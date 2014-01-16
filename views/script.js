window.onload = function() {
	var socket = io.connect('http://localhost');
    
	// Prompts user for his/her name
    socket.on('promptuser', function(message) {
        var name = prompt(message, "Your Name");
        socket.emit('ready', name);
    });

    socket.on('refreshstate', function(state, activeUsers) {
    	// Update the title/state of game
        var title = document.getElementById('title');
        title.innerHTML = state;
        
        
        // Add active users to be displayed in list
        var list = document.getElementById('list');
        list.innerHTML = "";
        for (var i=0; i<activeUsers.length; i++) {
                var name = document.createElement("p");
                name.innerHTML = activeUsers[i].name;
                list.appendChild(name);
        }
    });
};