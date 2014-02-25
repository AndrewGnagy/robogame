// battle
// 960*640
WIDTH = 768;
HEIGHT = 512;


function battleScene(playerA, playerB)
{
	var self = this;

	this.battle_Width = WIDTH;
	this.battle_Height = HEIGHT;

	this.robotOrderQueue = new Array();

	this.playerA = playerA;
	this.playerB = playerB;

	this.playerA.opponent = playerB;
	this.playerB.opponent = playerA;
	
	this.initiated = false;
	
	this.animationQueue = [];
	this.animationCounter = 0;
    this.animationLayer = new Kinetic.Layer();

	battlePositions = {
    "lUserRobo": [
        {
            "x": this.battle_Width * (.3),
            "y": this.battle_Height * (.75)
        },
        {
            "x": this.battle_Width * (.22),
            "y": this.battle_Height * (.6)
        },
        {
            "x": this.battle_Width * (.33),
            "y": this.battle_Height * (.55)
        }
    ],
    "lOppRobo": [
        {
            "x": this.battle_Width * (1 - (.3)),
            "y": this.battle_Height * (.75)
        },
        {
            "x": this.battle_Width * (1 - (.22)),
            "y": this.battle_Height * (.6)
        },
        {
            "x": this.battle_Width * (1 - (.33)),
            "y": this.battle_Height * (.55)
        }
    ]
	}

}

battleScene.prototype.playerDisplay = function()
{
		//display players
		var self = this;

		var nPlayerARobots = this.playerA.robotParty.length;
		var nPlayerBRobots = this.playerB.robotParty.length;


		var localLayer = new Kinetic.Layer();
		for (var i = nPlayerARobots - 1; i >= 0;i--)
		{
			this.playerA.isHeroSet();
			var roboTemp = this.playerA.robotParty[i].uiMake(battlePositions.lUserRobo[i]);
			localLayer.add(roboTemp);
		}

		for (var i = nPlayerBRobots - 1; i >= 0;i--)
		{
			//roboUtils_loadImage('robot32', '../battle/images/robot32.png', function(){
			var roboTemp = self.playerB.robotParty[i].uiMake(battlePositions.lOppRobo[i]);
			localLayer.add(roboTemp);
			//});
		}
		return localLayer;
}

battleScene.prototype.queueSort = function()
{ // poping things from the queue
	for(x = 0; x < this.robotOrderQueue.length; x++)
	{
		var robotAction = this.robotOrderQueue.pop();
		var robotAttackName = robotAction.attackQueue;
		var robotTargetObject = robotAction.targetQueue;// robotObject class
		//TODO put following lines in where attack is initialized
		var TOTALIMAGES = 2;
		var animationClip = new animationObject(robotAttackName,TOTALIMAGES);
		var xPosition = robotTargetObject.getXPosition();
		var yPosition = robotTargetObject.getYPosition();
		animationClip.setPosition(xPosition,yPosition);
		this.animationQueue.push(animationClip);
		
		robotAction.doAction();
	}
}


battleScene.prototype.playerUpdate = function()
{
		var self = this;
		var playerAQueue = self.playerA.update();
		var playerBQueue = self.playerB.update();

		if(playerAQueue && playerAQueue != "dead")
		{
			for(var i = 0;i < playerAQueue.length;i++)
			{
					self.robotOrderQueue.push(playerAQueue[i]);
			}
		} else if (playerAQueue == 'dead') {
			//TODO exit code here
			console.log("Player dead");
			//Warp player to Garage and restart
		}

		if(playerBQueue && playerBQueue != "dead")
		{
			for(var i = 0;i < playerBQueue.length;i++)
			{
					self.robotOrderQueue.push(playerBQueue[i]);
			}
		} else if (playerBQueue == 'dead') {
			this.playerA.saved.story.defeatedNPCs.push(this.playerB.name);
			console.log("Enemy defeated, switching to overworld");
			restartOverworld(function(){
				dialog.show("Enemy defeated");
			});
		}
}


battleScene.prototype.buildSceneBasic = function(battleWidth,battleHeight)
{

	var backgroundLayer = new Kinetic.Layer();

	var backimage = new Kinetic.Rect({
		x: 0,
		y: 0,
		width: battleWidth,
		height: battleHeight,
		fill: 'gray',
		stroke: 'black',
		strokeWidth: 4
	});

	//the ground
	var battleFloor = new Kinetic.Polygon({
			points: [0, battleHeight, (battleWidth/5), (battleHeight*0.6), (battleWidth*4/5), (battleHeight*0.6), battleWidth, battleHeight],
			fill: 'brown',
			stroke: 'black',
			strokeWidth: 2,
			dashArray: [5,10],
			opacity:0.25
	});

	var line1 =  new Kinetic.Line({
			points: [(battleWidth/5), (battleHeight*0.6),(battleWidth/5),0],
			stroke:'black',
			strokeWidth: 2,
			dashArray: [5,10]
	});

	var line2 = new Kinetic.Line({
			points:[(battleWidth*4/5), (battleHeight*0.6),(battleWidth*4/5),0],
			stroke:'black',
			strokeWidth: 2,
			dashArray: [5,10]
	})

	// add the shape to the layer
	backgroundLayer.add(backimage);
	backgroundLayer.add(battleFloor);
	backgroundLayer.add(line1);
	backgroundLayer.add(line2);

	return backgroundLayer;
}

battleScene.prototype.animate = function()
{

	if(this.animationQueue.length){
		this.animationLayer.clear();
		var ANIMATION_LENGTH = 8;

		var animation = this.animationQueue[0];
		animation.addLayer(this.animationLayer);
		var result = animation.play(ANIMATION_LENGTH);
		if(result)
		{
			this.animationQueue.shift();
		}
		
	}
}

battleScene.prototype.determineWinner = function()
{	// checkes if anyone has won the battle. 
	var self = this;
}

battleScene.prototype.reDraw = function()
{
	this.stage.clear();
	this.stage.draw();
}

battleScene.prototype.main = function(stage)
{  // intial setup
	this.stage = stage;
	this.backgroundLayer = this.buildSceneBasic(this.stage.getWidth(),this.stage.getHeight());

	// add the layer to the stage
	this.stage.add(this.backgroundLayer);
	this.stage.add(this.playerDisplay());
	
	this.stage.add(this.animationLayer);
}

battleScene.prototype.loop = function()
{
	this.playerUpdate();
	this.queueSort();
	this.animate();
	this.reDraw();
}

function animationObject(imagePrefix,totalNumberImages)
{
	this.counter = 0
	this.imagePrefix = imagePrefix;
	this.totalNumberImages = totalNumberImages;

	this.setPosition(0,0);
	this.loadImages();
}

animationObject.prototype.loadImages = function()
{
	var totalNumberImages = this.totalNumberImages;
	var imagePrefix = this.imagePrefix;

	for(var x = 0; x < totalNumberImages; x++)
	{
		var imageFullName = imagePrefix + x;
		roboUtils_loadImage(imageFullName, '../battle/images/attacks/' + imageFullName +'.png');
	}
}

animationObject.prototype.addLayer = function(layer)
{
	this.parentLayer = layer;
}

animationObject.prototype.addObjectToLayer = function(kObject)
{
	this.parentLayer.add(kObject);
}

animationObject.prototype.changePicture = function(fImage)
{
	var xPosition = this.xPosition;
	var yPosition = this.yPosition;

    if(IMAGES[fImage])
    {
      var animationImage = new Kinetic.Image({
        x: xPosition,
        y: yPosition,
        image: IMAGES[fImage]
      });
      this.addObjectToLayer(animationImage);
    }

}

animationObject.prototype.isFinished = function(counter,animationLength)
{
		var doneAnimation = false;
	    if(counter >= animationLength)
	    {
	      this.parentLayer.removeChildren();
	      doneAnimation = true;
	      this.counter = 0;
	    }

	    return doneAnimation;	
}

animationObject.prototype.setPosition = function(xPosition,yPosition)
{
	this.xPosition = xPosition;
	this.yPosition = yPosition;
}


animationObject.prototype.play = function(animationLength)
{
	var totalNumberImages = this.totalNumberImages;
	var imagePrefix = this.imagePrefix;


	var counter = this.counter++;
	var picNumber = Math.floor((totalNumberImages)/animationLength*counter);

	var fullImageName = imagePrefix + picNumber;

    this.changePicture(fullImageName)

    return this.isFinished(counter,animationLength);
}