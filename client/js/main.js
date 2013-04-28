var character = new Character('hero');
var map = new Map();
var pathFind = new Pathfind();
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
});
