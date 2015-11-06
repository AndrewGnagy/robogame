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

    this.statusText = this.statusTextCreate();

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

battleScene.prototype.statusTextCreate = function()
{
	var textObject = new Kinetic.Text({
    	x:this.battle_Width/3,
    	y:40,
    	text: '',
    	fontSize: 30,
    	fontFamily: 'Calibri',
    	fill:'red'
    });

    return textObject;
}

battleScene.prototype.statusTextSet = function(sText)
{
	this.statusText.setAttr('text',sText);
}

battleScene.prototype.statusTextGet = function()
{
	return this.statusText.getAttr('text');
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
			this.playerA.robotParty[i].battleFieldSet(self);
			localLayer.add(roboTemp);
		}

		for (var i = nPlayerBRobots - 1; i >= 0;i--)
		{
			var roboTemp = self.playerB.robotParty[i].uiMake(battlePositions.lOppRobo[i]);
			this.playerA.robotParty[i].battleFieldSet(self);
			localLayer.add(roboTemp);
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
		var animationClip = robotAction.doAction();
		if(animationClip)
		{
			this.animationQueue.push(animationClip);
		}
	}
}


battleScene.prototype.playerUpdate = function()
{
		var self = this;
		var playerAQueue = self.playerA.update();
		var playerBQueue = self.playerB.update();
		var bContinueBattle = true;

		if(playerAQueue && playerAQueue != "dead")
		{
			this.robotOrderQueueUpdate(playerAQueue);
		} 
		else if (playerAQueue == 'dead') 
		{
			//TODO exit code here
			//Warp player to Garage and restart
			this.statusTextSet("Game Over!!!!");
			bContinueBattle = false;
		}

		if(playerBQueue && playerBQueue != "dead")
		{
			this.robotOrderQueueUpdate(playerBQueue);
		} 
		else if (playerBQueue == 'dead') 
		{
			this.playerA.saved.story.defeatedNPCs.push(this.playerB.name);
			console.log("Enemy defeated, switching to overworld");
			restartOverworld(function(){
				robo.dialog.show("Enemy defeated");
			});
			bContinueBattle = false;
		}

		return bContinueBattle;
}

battleScene.prototype.robotOrderQueueUpdate = function(playerQueue)
{
	for (var i = 0; i < playerQueue.length; i++) {
		this.robotOrderQueueAdd(playerQueue[i]);
	};
}

battleScene.prototype.robotOrderQueueAdd = function(robotObject)
{
	this.robotOrderQueue.push(robotObject);
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

		var animation = this.animationQueue[0];
		animation.addLayer(this.animationLayer);
		var result = animation.play();
		if(result)
		{
			this.animationQueue.shift();
		}
		
	}
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
	this.backgroundLayer.add(this.statusText);
}

battleScene.prototype.aiCombatSelector = function()
{
	var aiRobotParty = this.playerB.robotParty;

	for (var i = 0; i < aiRobotParty.length; i++)
	{
		robo.ai.chooseAction(aiRobotParty[i]);
	}	

}

battleScene.prototype.loop = function()
{
	var bContinueBattle = true;
	if(this.playerUpdate())
	{
		this.aiCombatSelector();
		this.queueSort();
	}
	else bContinueBattle = false;
	
	this.animate();
	this.reDraw();
	
	return bContinueBattle;
}
