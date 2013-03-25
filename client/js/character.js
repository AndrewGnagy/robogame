var charImg = new Image();

function Character(name) {
    this.name = name;
    this.frame = 0;
    this.animated = false;
    this.coord = {x:16, y:16};
    this.orientation = 'down';
    this.animationOffset = {x:0,y:0};
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
//Moves character.
// isOffset - false to move character logically
//  true to move by pixel amount (for animation)
Character.prototype.move = function(speed, isOffset){
    if(!this.moving){
        return
    }
    if(isOffset){
        coordType = 'animationOffset';
    } else {
        coordType = 'coord';
    }
    if(this.orientation == 'up'){
        if(map.getCollision(this.coord.x, this.coord.y - 1))
            return;
        this[coordType].y -= speed;
    }
    else if(this.orientation == 'right'){
        if(map.getCollision(this.coord.x + 1, this.coord.y))
            return;
        this[coordType].x += speed;
    }
    else if(this.orientation == 'left'){
        if(map.getCollision(this.coord.x - 1, this.coord.y))
            return;
        this[coordType].x -= speed;
    }
    else if(this.orientation == 'down'){
        if(map.getCollision(this.coord.x, this.coord.y + 1))
            return;
        this[coordType].y += speed;
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
    ctx.drawImage(charImg,a[f].sx,a[f].sy,a[f].swidth,a[f].sheight,128,128,a[f].swidth,a[f].sheight);
    //TODO replace 128,128 with adjusted middle canvas tile coordinates
}
