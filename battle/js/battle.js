// battle
// 960*640
WIDTH = 600;
HEIGHT = 200;


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
			var roboTemp = this.playerB.robotParty[i].uiMake(battlePositions.lOppRobo[i]);
			localLayer.add(roboTemp);
		}	
		return localLayer;		
}




battleScene.prototype.queueSort = function()
{ // poping things from the queue
	for(x = 0; x < this.robotOrderQueue.length; x++) 
	{
		var robotAction = this.robotOrderQueue.pop();
		robotAction.doAction();
	}
}


battleScene.prototype.playerUpdate = function()
{
		var self = this;
		var playerAQueue = self.playerA.update();
		var playerBQueue = self.playerB.update();
		
		if(playerAQueue != false)
		{
				for(var i = 0;i < playerAQueue.length;i++)
				{
						self.robotOrderQueue.push(playerAQueue[i]);
				}
		}

		if(playerBQueue != false)
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


battleScene.prototype.main = function(stage)
{  // intial setup
	this.stage = stage;
	this.backgroundLayer = this.buildSceneBasic(this.stage.getWidth(),this.stage.getHeight());

	// add the layer to the stage
	this.stage.add(this.backgroundLayer);	
	this.stage.add(this.playerDisplay());
	
}

battleScene.prototype.loop = function()
{
		this.playerUpdate();
		this.queueSort();
		this.stage.draw();	
}



