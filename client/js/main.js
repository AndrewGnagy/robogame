var character = new Character('hero');
var map = new Map();
var pathFind = new Pathfind();
var dialog = new Dialog();
var clockCount = 0;


function clockTick(){
    clockCount++;
    var ctx = document.getElementById('game').getContext('2d');
    var rect = $('#game')[0].getBoundingClientRect();
    ctx.clearRect(0,0,rect.width,rect.height);
    map.drawMap();

    character.move(4, true);

    character.animate(hero);
    character.draw(hero);
    if(clockCount % 4 == 0){
        character.move(1);
        character.moveToClick();
        inputEngine.mouseClicked = false;
    }
}

$(function() {
c = $("#game")[0].getContext("2d");
map.load('testMap3');
character.load('hero');
setInterval(clockTick, 150);


var stage = new Kinetic.Stage({
    container: 'container',
    width: 256,
    height: 256
});
var layer = new Kinetic.Layer();
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
layer.add(rect);
stage.add(layer);


});
