// battle
// 960*640
WIDTH = 384;
HEIGHT = 256;


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
            "x": this.battle_Width * (170/600),
            "y": this.battle_Height * (150/200)
        },
        {
            "x": this.battle_Width * (130/600),
            "y": this.battle_Height * (115/200)
        },
        {
            "x": this.battle_Width * (200/600),
            "y": this.battle_Height * (90/200)
        }
    ],
    "lOppRobo": [
        {
            "x": this.battle_Width * (1 - (170/600)),
            "y": this.battle_Height * (150/200)
        },
        {
            "x": this.battle_Width * (1 - (230/600)),
            "y": this.battle_Height * (115/200)
        },
        {
            "x": this.battle_Width * (1 - (170/600)),
            "y": this.battle_Height * (90/200)
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
		var robotAttackName = robotAction.attackQueue;// robotObject class
		//TODO put following lines in where attack is initialized
		var TOTALIMAGES = 2;
		this.animationQueue.push({attack: robotAttackName, total: TOTALIMAGES});
		for(var x = 0; x < TOTALIMAGES; x++)
		{
			roboUtils_loadImage(robotAttackName + x, '../battle/images/attacks/' + robotAttackName + x+'.png');
		}
		
		robotAction.doAction();
	}
}


battleScene.prototype.playerUpdate = function()
{
		var self = this;
		var playerAQueue = self.playerA.update();
		var playerBQueue = self.playerB.update();

		if(playerAQueue != false || playerAQueue != "dead")
		{
				for(var i = 0;i < playerAQueue.length;i++)
				{
						self.robotOrderQueue.push(playerAQueue[i]);
				}
		}

		if(playerBQueue != false || playerBQueue != "dead")
		{
				for(var i = 0;i < playerBQueue.length;i++)
				{
						self.robotOrderQueue.push(playerBQueue[i]);
				}
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
		this.animationCounter++;
		var ANIMATION_LENGTH = 8;
		var animation = this.animationQueue[0];
		//Figure out which picture in the animation sequence to grab
		var picNumber = Math.floor((animation.total)/ANIMATION_LENGTH*this.animationCounter);
		
		if(IMAGES[animation.attack + picNumber])
		{
			var animationImage = new Kinetic.Image({
				x: 100,
				y: 100,
				image: IMAGES[animation.attack + picNumber]
			});
			this.animationLayer.add(animationImage);
		}
		if(this.animationCounter >= ANIMATION_LENGTH)
		{
			this.animationLayer.removeChildren();
			this.animationQueue.shift();
			this.animationCounter = 0;
		}
		
	}
}

battleScene.prototype.determineWinner = function()
{	// checkes if anyone has won the battle. 
	var self = this;
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
	this.stage.clear();
	this.stage.draw();
}