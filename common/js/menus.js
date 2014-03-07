function robotMenu(){
	this.currentRobot = 0;
}

function showMainMenu(){
	//self.currentRobot = 0;
	var robot = character.robotParty[0];
	var stats = Object.keys(robot.saved.baseStats);
	var statDisplay = stats.map(function(x){
		return "<p>" + x[0].toUpperCase()+x.substr(1) + ": " + robot.saved.baseStats[x] + "</p>";
	});

	statDisplay.forEach(function(x){
		$(x).appendTo("#mainMenu .modal-body");
	});

	$('#mainMenu').modal('show');
}