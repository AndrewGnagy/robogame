robo.namespace("menu");

robo.menu.showMainMenu = function(){
	robo.menu.currentRobot = robo.menu.currentRobot || 0;
	$("#mainMenu .menu-left").empty();
	$("#mainMenu .menu-right").empty();
	$("#mainMenu .modal-robotSelect").empty();

	//Create robot selection buttons
	character.robotParty.forEach(function(r,i){
		$('<a class="btn btn-primary btn-small" onClick="robo.menu.changeRobot('+i+')" role="button">'+r.saved.name+'</a>').appendTo("#mainMenu .modal-robotSelect");
	});

	if(!character.robotParty.length){
		$('<p>No Robots Available</p>').appendTo("#mainMenu .menu-left");
	} else {
		robo.menu.changeRobot(robo.menu.currentRobot);
	}

	$('#mainMenu').modal('show');
};

robo.menu.changeRobot = function(curRobot){
	var statDisplay = [];

	$("#mainMenu .menu-left").empty();
	$("#mainMenu .menu-right").empty();
	var robot = character.robotParty[curRobot];
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