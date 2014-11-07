robo.namespace("menu");

robo.menu.showMainMenu = function(){
	robo.menu.currentRobot = robo.menu.currentRobot || 0;
	$("#mainMenu .menu-left").empty();
	$("#mainMenu .menu-right").empty();
	$("#mainMenu .modal-robotSelect").empty();

	var savedRoboParty = character.saved.robotParty;
	//Create robot selection buttons
	savedRoboParty.forEach(function(oRobot,iRobot){
		$('<a class="btn btn-primary btn-small" onClick="robo.menu.changeRobot('+iRobot+')" role="button">'+oRobot.saved.name+'</a>').appendTo("#mainMenu .modal-robotSelect");
	});

	if(!savedRoboParty.length){
		$('<p>No Robots Available</p>').appendTo("#mainMenu .menu-left");
	} 
	else {
		robo.menu.changeRobot(robo.menu.currentRobot);
	}

	$('#mainMenu').modal('show');
};

robo.menu.changeRobot = function(curRobot){
	var statDisplay = [];

	$("#mainMenu .menu-left").empty();
	$("#mainMenu .menu-right").empty();
	var robot = character.saved.robotParty[curRobot];
	$('<h3>'+robot.saved.name+'</h3>').appendTo("#mainMenu .menu-left");
	var stats = Object.keys(robot.saved.baseStats);
	statDisplay = stats.map(function(x){
		return "<p>" + x[0].toUpperCase()+x.substr(1) + ": " + robot.saved.baseStats[x] + "</p>";
	});

	statDisplay.forEach(function(x){
		$(x).appendTo("#mainMenu .menu-left");
	});

	$('<img src="img/'+robot.saved.image+'"></img>').appendTo("#mainMenu .menu-right");
};

robo.menu.showGarage = function(){

	$('#garageMenu').modal('show');
}