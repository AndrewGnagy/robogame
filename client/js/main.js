var robo = {}; //Global robo game object
var character = new Character('hero');
var map = new Map();
var pathFind = new Pathfind();
var dialog = new Dialog();
var clockCount = 0;
var c; //Main canvas context
var stage; //Global stage obj
//TODO 960*640


function clockTick(){
    clockCount++;
    //var ctx = document.getElementById('game').getContext('2d');
    //var rect = $('#game')[0].getBoundingClientRect();
    if(!dialog.isUp) stage.clear();
    map.drawMap();

    character.move(4, true);

    character.animate(hero);
    character.draw(hero);
    if(clockCount % 4 == 0){
        character.move(1);
        character.moveToClick();
        inputEngine.mouseClicked = false;
    }
	map.doWarp(character.coord.x, character.coord.y);
}

function startGame(){
	robo.gameLayer = new Kinetic.Layer();
	var mainCanvas = robo.gameLayer.getCanvas();
	mainCanvas.getElement().setAttribute("id", "game");
	c = mainCanvas.getContext();
	//c = $("#game")[0].getContext("2d");
	map.load('bigRoom');
	character.load('hero');
	setInterval(clockTick, 150);

	stage = new Kinetic.Stage({
		container: 'container',
		width: 480,
		height: 320
	});

	stage.add(dialog.dialogLayer);
	stage.add(robo.gameLayer);

	inputEngine.registerEvents();

}

function loadUser(){
	console.log('called');
	var username = $('#input')[0].value;
	$.ajax({
		type: 'GET',
		url: "/node/users/"+username,
		dataType: 'json',
		success: function(data){
			console.log(data)
			if(data && data.coord)
                character.coord = data.coord;
			if(data && data.name)
				$('#output').html("User is: " + data.name);

			startGame();
		},
		error: function(request, textStatus, errorThrown) {
			alert("User not found");
			console.log(errorThrown);
			console.log(request);
		}
	});
}

$(function() {


});
