var robo = {currentInterval: false}; //Global robo game object
var character = new Character('hero');
var map = new Map();
var pathFind = new Pathfind();
var dialog = new Dialog();
var clockCount = 0;
var c; //Main canvas context
var stage; //Global stage obj
robo.menuBox = makeMenuBox();

function initiateBattle(){
	if(!robo.battleObject || !robo.battleObject.playerA.robotsLoaded() || !robo.battleObject.playerB.robotsLoaded() || robo.battleObject.initiated){
		return;
	}

	robo.battleObject.main(stage);
	robo.battleObject.initiated = true;
	robo.currentInterval = setInterval(function(){
		robo.battleObject.loop();
	},150);
}

function restartOverworld(callback){
	pathFind.currPath = [];
	clearInterval(robo.currentInterval);
	robo.currentInterval = setInterval(clientTick, 100);
	stage.removeChildren();
	robo.gameLayer.removeChildren();
	dialog = new Dialog();
	stage.add(dialog.dialogLayer);
	robo.gameLayer = new Kinetic.Layer();
	robo.menuBox = makeMenuBox();
	robo.gameLayer.add(robo.menuBox);
	var mainCanvas = robo.gameLayer.getCanvas();
	mainCanvas._canvas.setAttribute("id", "game");
	c = mainCanvas.getContext();
	stage.add(robo.gameLayer);
	inputEngine.registerEvents();
	if(callback)
		callback();
}

function clientTick(){
    //var ctx = document.getElementById('game').getContext('2d');
    //var rect = $('#game')[0].getBoundingClientRect();
	clockCount++;
    if(!dialog.isUp) stage.clear();
    map.drawMap();

    character.move(~~(SIZE/4), true);

    character.animate(hero);
    character.draw(hero);
    if(clockCount % 4 == 0){
        character.move(1);
        character.moveToClick();
        inputEngine.mouseClicked = false;
    }
	robo.menuBox.draw();
}

function startGame(){
	robo.gameLayer = new Kinetic.Layer();
	robo.gameLayer.add(robo.menuBox);
	var mainCanvas = robo.gameLayer.getCanvas();
	mainCanvas._canvas.setAttribute("id", "game");
	c = mainCanvas.getContext();
	
	//Stat menu
	robo.robotMenu = new robotMenu();

	//** Hardcoded for now
	map.load('homeVillage');
	character.load('hero');
	character.isHero = true;
	robot1 = new robotObject();
	character.addRobot(robot1);
	robot1.loadRobot("527546fa41f3ec7af56855ef");
	robot2 = new robotObject();
	character.addRobot(robot2);
	robot2.loadRobot("527546fa41f3ec7af56855ef");
	//**

	stage = new Kinetic.Stage({
		container: 'container',
		width: 768,
		height: 512
	});

	stage.add(dialog.dialogLayer);
	stage.add(robo.gameLayer);

	robo.currentInterval = setInterval(clientTick, 100);

	inputEngine.registerEvents();
}

function loadUser(){
	var username = $('#input')[0].value;
	$.ajax({
		type: 'GET',
		url: "/node/users/"+username,
		dataType: 'json',
		success: function(data){
			console.log(data);
			if(data)
            {
                $.extend(true, character.saved, data);
                //character.saved = data;
                character.saved.coord.x = parseInt(character.saved.coord.x,10);
                character.saved.coord.y = parseInt(character.saved.coord.y,10);
            }
			if(data && data.name)
				$('#output').html("User is: " + data.name);
			startGame();
		},
		error: function(request, textStatus, errorThrown) {
			console.log("User not found: running test mode");
            $.extend(true, character.saved, {coord: {x: 12, y: 6}});
			startGame();
		    $('#output').html("User is: testuser");
		}
	});
}

function saveUser(){
	console.log('saving');
	console.log(character.saved);
	var username = $('#input')[0].value;
	$.ajax({
		type: 'POST',
		url: "/node/users/"+username,
		data: character.saved,
		dataType: 'json',
		success: function(data){
			console.log("saved");
		},
		error: function(request, textStatus, errorThrown) {
			alert("User not found");
			console.log(errorThrown);
			console.log(request);
		}
	});
}