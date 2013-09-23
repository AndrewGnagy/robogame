var charImg = new Image();

function Character(name) {
	var self = this;
	this.saved = {}; //Put all saved info in this object
	this.saved.inventory = [];
	this.saved.coord = {x:6, y:5};
	this.saved.itemsPicked = [];
    this.name = name;
    this.frame = 0;
    this.animated = false;
    this.orientation = 'down';
    this.animationOffset = {x:0,y:0};
    this.moving = false;
    this.isNPC = false;
	this.isHero = false;	
	//this.uid = "";
	this.opponent = null;
	this.robotParty = [];
}

//load
Character.prototype.load = function(name){
    charImg.src = "img/"+name+".png";
}
Character.prototype.setOrientation = function(o){
    this.orientation = o;
}
Character.prototype.moveToClick = function(){
    if(pathFind.currPath.length){
        var direction = pathFind.currPath.pop();
        this.moving = true;
        this.orientation = direction;
    } else {
        this.moving = false;
    }
}
//Moves character.
// isOffset - false to move character logically or
//  true to move by pixel amount (for animation)
Character.prototype.move = function(speed, isOffset){
    if(!this.moving){
        return
    }
    if(!isOffset){
        character.animationOffset = {x:0,y:0};
    }
    if(this.orientation == 'up'){
        if(map.getCollision(this.saved.coord.x, this.saved.coord.y - 1))
            map.showDialog(this.saved.coord.x, this.saved.coord.y -1);
        else {
			if(isOffset){
				this.animationOffset.y -= speed;
			} else {
				this.saved.coord.y -= speed;
			}
		}
    }
    else if(this.orientation == 'right'){
        if(map.getCollision(this.saved.coord.x + 1, this.saved.coord.y))
            map.showDialog(this.saved.coord.x + 1, this.saved.coord.y);
        else {
			if(isOffset){
				this.animationOffset.x += speed;
			} else {
				this.saved.coord.x += speed;
			}
		}
    }
    else if(this.orientation == 'left'){
        if(map.getCollision(this.saved.coord.x - 1, this.saved.coord.y))
            map.showDialog(this.saved.coord.x - 1, this.saved.coord.y);
        else {
			if(isOffset){
				this.animationOffset.x -= speed;
			} else {
				this.saved.coord.x -= speed;
			}
		}
    }
    else if(this.orientation == 'down'){
        if(map.getCollision(this.saved.coord.x, this.saved.coord.y + 1))
            map.showDialog(this.saved.coord.x, this.saved.coord.y + 1);
        else {
			if(isOffset){
				this.animationOffset.y += speed;
			} else {
				this.saved.coord.y += speed;
			}
		}
    }
}
//animate
//a = animation object
Character.prototype.animate = function(a){
    //var ctx = document.getElementById('game').getContext('2d');
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
    //var ctx = document.getElementById('game').getContext('2d');
    var f = this.frame; //0 is standing still frame
    a = a[this.orientation];
    var ydraw = canvas.midpoint.y*16 + (SIZE - a[f].sheight);
    c.drawImage(charImg,a[f].sx,a[f].sy,a[f].swidth,a[f].sheight,canvas.midpoint.x*16,ydraw,a[f].swidth,a[f].sheight);
}

// add robot to robot party
Character.prototype.addRobot =  function(robot)
{	//adds robot to party
	if(this.robotParty.length < 3)
	{
			i = this.robotParty.length;
			this.robotParty[i]=robot;
			robot.owner = this;
	}	
	return robot;
}

// print robot party to console log
Character.prototype.printParty = function()
{	// prints out players party
	for(i = 0;i < this.robotParty.length;i++)
	{
			console.log(this.robotParty[i].name);
	}
	return this.robotParty;
}

// set Character to hero
Character.prototype.isHeroSet = function()
{
	this.isHero = true;
	this.isNPC = false;

	for(i = 0;i < this.robotParty.length;i++)
	{
			this.robotParty[i].isHeroSet();
	}
	return this.robotParty;			
}

// print item list to console log
Character.prototype.printItemList = function()
{	// prints out players item list
	for(i = 0;this.itemList.length < i;i++)
	{
			console.log(this.itemList[i]);
	}
}

// print name to console log and return  value
Character.prototype.printName = function()
{	// prints and returns name
		console.log(this.name);
		return this.name;
}

// Updates character's robot parties current status
Character.prototype.update = function()
{ // update
	var readyRobots = new Array();
	
	for(i = 0;i < this.robotParty.length;i++)
	{
			switch(this.robotParty[i].update())
			{
				case 'ready':
					readyRobots.push(this.robotParty[i]);
					break;
				case 'dead':
					break;
				case 'not ready':
					break;
				default:
					console.log("error: user.update");
			}
	}
	
	if(readyRobots.length > 0)
	{
			return readyRobots;
	}
	else
	{
			return false;
	}
				
}