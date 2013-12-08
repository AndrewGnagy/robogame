function statsMenu(){
	if(!character.robotsLoaded()){
		return;
	}
	clearInterval(robo.currentInterval);
	stage.clear();
    var layer = new Kinetic.Layer();
	var menuFrame = new Kinetic.Rect({
		width: 384,
		height: 256,
		stroke:1,
		strokeWidth:1,
		fill:'gray',
		x:0,
		y:0,
		id:'Frame'
	});

	var makeSelectionBox = function(x, y, text){
		var selectionBoxes = new Kinetic.Group({
			x:x,
			y:y
		});
		var selectionBox = new Kinetic.Rect({
			width: 40,
			height: 20,
			stroke:1,
			strokeWidth:1,
			fill:'gray'
		});
		var selectionText = new Kinetic.Text({
			text:text,
			fontSize: 11,
			fontFamily: 'Calibri',
			fill: 'black',
			shadowColor:'white'
		});

		selectionBoxes.on('mouseleave mouseenter',function(){
			selectionBox.setFill((selectionBox.attrs.fill === 'gray' ? 'white' : 'gray'));
			this.getLayer().draw();
		});
		selectionBoxes.on('click',function(){
			setRobot();
			this.getLayer().draw();
		});

		selectionBoxes.add(selectionBox);
		selectionBoxes.add(selectionText);
		return selectionBoxes;
	}

	// add the shape to the layer
	layer.add(menuFrame);
	
	var robot = character.robotParty[0];
	var stats = Object.keys(robot.saved.baseStats);
	var statDisplay = stats.map(function(x){
		return x[0].toUpperCase()+x.substr(1) + ": " + robot.saved.baseStats[x];
	});
	var robotText = new Kinetic.Text({
		x: 25,
		y: 50,
		text: "Name: " + robot.saved.name + "\n" + statDisplay.join("\n"),
		fontSize: 20,
		fontFamily: 'Calibri',
		fill: 'black',
	});
	layer.add(robotText);

	var position = 0;
	character.robotParty.forEach(function(robot){
		layer.add(makeSelectionBox(10+150*position++,10,robot.saved.name));
	// add the layer to the stage
	stage.add(layer);
	});
	stage.draw();
}