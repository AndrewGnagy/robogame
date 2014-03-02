function robotMenu(){
    this.mainLayer = new Kinetic.Layer();
	this.currentRobot = 0;
}

robotMenu.prototype.drawMenu = function(){
	//Stops clock ticks
	clearInterval(robo.currentInterval);
	stage.removeChildren();
	var self = robo.robotMenu;
	var menuFrame = new Kinetic.Rect({
		width: 768,
		height: 512,
		stroke:1,
		strokeWidth:1,
		fill:'gray',
		x:0,
		y:0,
		id:'Frame'
	});

	// add the shape to the layer
	self.mainLayer.add(menuFrame);

	//Exit button
	var exitBoxes = new Kinetic.Group({
		x: canvas.width * SIZE - 130,
		y: canvas.height * SIZE - 50
	});
	var exitBox = new Kinetic.Rect({
		width: 120,
		height: 40,
		stroke:1,
		strokeWidth:1,
		fill:'gray'
	});
	var exitText = new Kinetic.Text({
		x: 5,
		y: 5,
		text:'Exit',
		fontSize: 18,
		fontFamily: 'Calibri',
		fill: 'black',
		shadowColor:'white'
	});
	exitBoxes.on('mouseleave mouseenter',function(){
		exitBox.setFill((exitBox.attrs.fill === 'gray' ? 'white' : 'gray'));
		this.getLayer().draw();
	});
	exitBoxes.on('click',function(){
		restartOverworld();
	});
	exitBoxes.add(exitBox);
	exitBoxes.add(exitText);
	self.mainLayer.add(exitBoxes);

	if(!character.robotParty.length){
		stage.add(self.mainLayer);
		stage.draw();
		return
	}
	
	if(!self.currentRobot)
		self.currentRobot = 0;
	var robot = character.robotParty[self.currentRobot];
	var stats = Object.keys(robot.saved.baseStats);
	var statDisplay = stats.map(function(x){
		return x[0].toUpperCase()+x.substr(1) + ": " + robot.saved.baseStats[x];
	});
	var robotText = new Kinetic.Text({
		x: 25,
		y: 100,
		text: "Name: " + robot.saved.name + "\n" + statDisplay.join("\n"),
		fontSize: 20,
		fontFamily: 'Calibri',
		fill: 'black'
	});
	self.mainLayer.add(robotText);

	var robotImg = roboUtils_loadImage(robot.saved.image, "../common/img/"+robot.saved.image)//, self.drawRobotImage);
	var robotPic = new Kinetic.Image({
		x: 300,
		y: 150,
		image: robotImg
	});
	self.mainLayer.add(robotPic);

	var position = 0;
	for(var x = 0; x< character.robotParty.length; x++){
		self.mainLayer.add(self.makeSelectionBox(10+290*position++,10,character.robotParty[x].saved.name,x));
	}
	// add the layer to the stage
	stage.add(self.mainLayer);
	stage.draw();
}

robotMenu.prototype.makeSelectionBox = function(x, y, text, i){
	var self = this;
	var selectionBoxes = new Kinetic.Group({
		x:x,
		y:y
	});
	var selectionBox = new Kinetic.Rect({
		width: 120,
		height: 40,
		stroke:1,
		strokeWidth:1,
		fill:'gray'
	});
	var selectionText = new Kinetic.Text({
		x: 5,
		y: 5,
		text:text,
		fontSize: 18,
		fontFamily: 'Calibri',
		fill: 'black',
		shadowColor:'white'
	});

	selectionBoxes.roboIndex = i;
	selectionBoxes.on('mouseleave mouseenter',function(){
		selectionBox.setFill((selectionBox.attrs.fill === 'gray' ? 'white' : 'gray'));
		this.getLayer().draw();
	});
	selectionBoxes.on('click',function(){
		self.setRobot(this.roboIndex);
		//this.getLayer().draw();
	});

	selectionBoxes.add(selectionBox);
	selectionBoxes.add(selectionText);
	return selectionBoxes;
}

robotMenu.prototype.setRobot = function(rIndex){
	this.currentRobot = rIndex;
	console.log("Not finished yet. Index: " + rIndex);
	this.drawMenu();
}

function makeMenuBox(){
	var selectionBoxes = new Kinetic.Group({
		x: canvas.width * SIZE - 130,
		y: 10
	});
	var selectionBox = new Kinetic.Rect({
		width: 120,
		height: 40,
		stroke:1,
		strokeWidth:1,
		fill:'gray'
	});
	var selectionText = new Kinetic.Text({
		x: 5,
		y: 5,
		text:'Menu',
		fontSize: 18,
		fontFamily: 'Calibri',
		fill: 'black',
		shadowColor:'white'
	});

	selectionBoxes.on('mouseleave mouseenter',function(){
		selectionBox.setFill((selectionBox.attrs.fill === 'gray' ? 'white' : 'gray'));
		this.draw();
	});
	selectionBoxes.on('click',function(){
		robo.robotMenu.drawMenu();
	});

	selectionBoxes.add(selectionBox);
	selectionBoxes.add(selectionText);
	return selectionBoxes;
};