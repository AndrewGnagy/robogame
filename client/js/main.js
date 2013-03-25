var character = new Character('hero');
var map = new Map();
var clockCount = 0;

function clockTick(){
    clockCount++;
    var ctx = document.getElementById('game').getContext('2d');
    var rect = $('#game')[0].getBoundingClientRect();
    ctx.clearRect(0,0,rect.width,rect.height);
    map.drawMap();

    character.move(4, true);
    if(clockCount % 4 == 0){
        character.move(1);
        character.setOrientation();
        character.animationOffset = {x:0,y:0};
    }

    character.animate(hero);
    character.draw(hero);
}

$(function() {
c = $("#game")[0].getContext("2d");
map.load('testMap1');
character.load('hero');
setInterval(clockTick, 100);
});
