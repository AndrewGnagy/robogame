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

$(function() {
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
    width: 256,
    height: 256
});
robo.dialogLayer = new Kinetic.Layer();
robo.dialogLayer.getCanvas().getElement().setAttribute("id", "dialog");
var rect = new Kinetic.Rect({
    x: 100,
    y: 60,
    stroke: '#555',
    strokeWidth: 5,
    fill: '#ddd',
    width: 100,
    height: 100,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffset: [10, 10],
    shadowOpacity: 0.2,
    cornerRadius: 10,
    opacity: 0.5
});
robo.dialogText = new Kinetic.Text({
	x: 100,
	y: 60,
	text: 'Default text',
	fontSize: 18,
	fontFamily: 'Calibri',
	fill: '#555',
	width: 100,
	padding: 10,
	align: 'center'
});
robo.dialogLayer.add(rect);
robo.dialogLayer.add(robo.dialogText);
stage.add(robo.dialogLayer);
stage.add(robo.gameLayer);

inputEngine.registerEvents();

});
