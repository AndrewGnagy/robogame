var charImg = new Image();

function Character(name) {
    this.name = name;
    this.frame = 0;
    this.animated = false;
    this.coord = {x:64, y:64};
    this.orientation = 'down';
    this.moving = false;
}
//load
Character.prototype.load = function(name){
    charImg.src = "img/"+name+".png";
}
Character.prototype.setOrientation = function(o){
    if(o){
        this.orientation = o;
    }
    if(inputEngine.presses[inputEngine.KEY['UP_ARROW']]){
        this.orientation = 'up';
        this.moving = true;
    }
    else if(inputEngine.presses[inputEngine.KEY['RIGHT_ARROW']]){
        this.orientation = 'right';
        this.moving = true;
    }
    else if(inputEngine.presses[inputEngine.KEY['LEFT_ARROW']]){
        this.orientation = 'left';
        this.moving = true;
    }
    else if(inputEngine.presses[inputEngine.KEY['DOWN_ARROW']]){
        this.orientation = 'down';
        this.moving = true;
    } else {
        this.moving = false;
    }

}
Character.prototype.move = function(speed){
    if(!this.moving){
        return
    }
    if(this.orientation == 'up'){
        this.coord.y -= speed;
    }
    else if(this.orientation == 'right'){
        this.coord.x += speed;
    }
    else if(this.orientation == 'left'){
        this.coord.x -= speed;
    }
    else if(this.orientation == 'down'){
        this.coord.y += speed;
    }
}
//animate
//a = animation object
Character.prototype.animate = function(a){
    var ctx = document.getElementById('game').getContext('2d');
    if(!this.moving){
        this.frame = 0;
        return
    }
    a = a[this.orientation];
    if(this.frame==a.length-1)
        this.frame=1;
    else
        this.frame++;
}
Character.prototype.draw = function(a){
    var ctx = document.getElementById('game').getContext('2d');
    var f = this.frame; //0 is standing still frame
    a = a[this.orientation];
    ctx.drawImage(charImg,a[f].sx,a[f].sy,a[f].swidth,a[f].sheight,this.coord.x,this.coord.y,a[f].swidth,a[f].sheight);
}
