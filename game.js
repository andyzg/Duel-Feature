var activeUser = [];

var newUser =  function(name) {
	return {
		name : name, 
		questionRight:0,
		wins : 0 
	};
};

exports.addUser = function(name) {
	var user = newUser(name);
	activeUser.push(user);
};

exports.isRepeat = function(name) {
	if (activeUser.indexOf(name) > -1) {
		return true;
	}
	return false;
};

exports.getUsers = function() {
	return activeUser;
};

exports.removeUser = function(name) {
	for (var i=0; i<activeUser.length; i++) {
		if (activeUser[i].name === name) {
			activeUser.splice(i, 1);
		}
	}
};