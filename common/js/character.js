var charImg = new Image();

function Character(name) {
	var self = this;
	this.saved = {}; //Put all saved info in this object
	this.saved.inventory = [];
	this.saved.story = { //Stores all of the storyline information
		wrench: false,
		defeatedNPCs: []
	};

	this.saved.coord = {x:6, y:5};
	this.saved.itemsPicked = [];
	this.saved.map = 'herosHome2';
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
	this.robotParty = [];// three objects
	this.saved.robotParty = []//three ids
	this.saved.robots = []//ids of every owned robot
}

Character.prototype.robotsLoaded = function(){
    return (this.robotParty.every(function(x){return x.isLoaded}) && this.robotParty.length);
}

//load
Character.prototype.load = function(name){
    charImg.src = "img/"+name+"32.png";
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
        this.animationOffset = {x:0,y:0};
    }

	var change = {x:0,y:0};
	var tempCoords = {x:this.saved.coord.x, y:this.saved.coord.y};

    if(this.orientation == 'up'){
		change = {x:0,y:-1};
    }
    else if(this.orientation == 'right'){
        change = {x:1,y:0};
    }
    else if(this.orientation == 'left'){
        change = {x:-1,y:0};
    }
    else if(this.orientation == 'down'){
        change = {x:0,y:1};
    }
	tempCoords.x += change.x;
	tempCoords.y += change.y;
	if(!map.getCollision(tempCoords.x, tempCoords.y)){
		if(isOffset){
			this.animationOffset.x += change.x * speed;
			this.animationOffset.y += change.y * speed;
		} else {
			this.saved.coord = tempCoords;
		}
	}
	if(!isOffset){
		map.detectTile(tempCoords.x, tempCoords.y);
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
    var f = this.frame; //0 is standing still frame
    a = a[this.orientation];
    var ydraw = canvas.midpoint.y*SIZE + (SIZE - a[f].sheight);
    c.drawImage(charImg,a[f].sx,a[f].sy,a[f].swidth,a[f].sheight,canvas.midpoint.x*SIZE,ydraw,a[f].swidth,a[f].sheight);
}

Character.prototype.hasItem = function(itemName){
	for(var x = 0; x < this.saved.inventory.length; x++){
		if(this.saved.inventory[x].name == itemName)
			return true;
	}
	return false;
}
Character.prototype.removeItem = function(itemName){
	var idx = -1;
	for(var x = 0; x < this.saved.inventory.length; x++){
		if(this.saved.inventory[x].name == itemName)
			idx = x;
	}
	if(idx == -1)
		return false;
	return this.saved.inventory.splice(idx,1); //Removes item from array and returns item
}

// add robot to robot party
Character.prototype.addRobot = function(robot)
{	//adds robot to party
	if(this.robotParty.length < 3)
	{
		this.robotParty.push(robot);
		if(this.searchSavedRobotParty(robot) === false)
		{
			this.saved.robotParty.push(robot);
		}
		robot.owner = this;
	}
	return robot;
}

Character.prototype.addToParty = function(robot)
{
	if(this.robotParty.length < 3)
	{
		this.robotParty.push(robot)
		robot.owner = this;
	}

	return robot;
}

Character.prototype.addToSavedParty = function(robot)
{
		if(this.searchSavedRobotParty(robot) === false)
		{
			this.saved.robotParty.push(robot);
		}
}

// Takes all robots in saved.robotParty (ids) and loads into .robotParty (objects)
Character.prototype.initiateRobots = function(){
	this.robotParty = [];
	for(var r = 0; r < this.saved.robotParty.length; r++){
		var robot = new robotObject();
		robot.loadRobot(this.saved.robotParty[r]);
		this.addRobot(robot);
	}
}


// Checks if saved robot party equal current robot party
// saved robot take precedent over current robot party in this check
Character.prototype.checkRobotParty = function()
{
	var bSuccess = true;
	for(var i = 0; i < this.saved.robotParty.length; i++)
	{
		var bFound = this.searchRobotParty(this.saved.robotParty[i]);
		if(!bFound)
		{
			bSuccess = false;
		}
	}
	return bSuccess;
}

Character.prototype.searchSavedRobotParty = function(robotObject)
{
	var bSuccess = false
	for (var i = 0; i < this.saved.robotParty.length; i++) {
		if(this.saved.robotParty[i] === robotObject)
		{
			bSuccess = true;
			break;
		}
	}
	return bSuccess;	
}

Character.prototype.searchRobotParty = function(robotObject)
{
	var bSuccess = false
	for (var i = 0; i < this.robotParty.length; i++) {
		if(this.robotParty[i] === robotObject)
		{
			bSuccess = true;
			break;
		}
	}
	return bSuccess;
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
	var deadCount = 0;

	for(i = 0;i < this.robotParty.length;i++)
	{
			switch(this.robotParty[i].update())
			{
				case 'ready':
					readyRobots.push(this.robotParty[i]);
					break;
				case 'dead':
					deadCount++;
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
	else if(this.robotParty.length <= deadCount)
	{
			return "dead";
	}
	else
	{
			return false;
	}
}