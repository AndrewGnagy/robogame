var character = new Character('hero');
var map = new Map();
var clockCount = 0;

function clockTick(){
    clockCount++;
    var ctx = document.getElementById('game').getContext('2d');
    var rect = $('#game')[0].getBoundingClientRect();
    ctx.clearRect(0,0,rect.width,rect.height);
    map.drawMap();

    character.move(4);
    if(clockCount % 4 == 0){
        character.setOrientation();
    }

    character.animate(hero);
    character.draw(hero);
}

$(function() {
c = $("#game")[0].getContext("2d");
map.load('sampleRoom2');
character.load('hero');
setInterval(clockTick, 100);
});
