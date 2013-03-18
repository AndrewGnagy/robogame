var charImg = new Image();

function Character(name) {
    this.name = name;
    this.frame = 1;
    this.animated = false;
    this.coord = {x:64, y:64};
    this.orientation = 'down';
}
//load
Character.prototype.load = function(name){
    charImg.src = "img/"+name+".png";
}
Character.prototype.move = function(speed){
    if(inputEngine.presses[inputEngine.KEY['UP_ARROW']]){
        this.orientation = 'up';
        this.coord.y -= speed;
    }
    else if(inputEngine.presses[inputEngine.KEY['RIGHT_ARROW']]){
        this.orientation = 'right';
        this.coord.x += speed;
    }
    else if(inputEngine.presses[inputEngine.KEY['LEFT_ARROW']]){
        this.orientation = 'left';
        this.coord.x -= speed;
    }
    else if(inputEngine.presses[inputEngine.KEY['DOWN_ARROW']]){
        //default orientation is down
        this.orientation = 'down';
        this.coord.y += speed;
    }

}
//animate
//a = animation object
Character.prototype.animate = function(a){
    var ctx = document.getElementById('game').getContext('2d');
    var f = this.frame;

    //orientation is set in move method 
    a = a[this.orientation];

    ctx.drawImage(charImg,a[f].sx,a[f].sy,a[f].swidth,a[f].sheight,this.coord.x,this.coord.y,a[f].swidth,a[f].sheight);
    if(f==a.length-1)
        this.frame=1;
    else
        this.frame++;
}
Character.prototype.draw = function(a){
    var ctx = document.getElementById('game').getContext('2d');
    var f = 0; //0 is standing still frame
    a = a[this.orientation];

    ctx.drawImage(charImg,a[f].sx,a[f].sy,a[f].swidth,a[f].sheight,this.coord.x,this.coord.y,a[f].swidth,a[f].sheight);
}
