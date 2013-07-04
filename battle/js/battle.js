// battle
// 960*640
WIDTH = 600;
HEIGHT = 200;


function battleScene(playerA, playerB)
{
	var self = this;
	
	this.playerA = playerA;
	this.playerB = playerB;
	
	this.playerA.opponent = playerB;
	this.playerB.opponent = playerA;
	
	battlePositions = {
    "lUserRobo": [
        {
            "x": WIDTH * (170/600),
            "y": HEIGHT * (150/200)
        },
        {
            "x": WIDTH * (130/600),
            "y": HEIGHT * (115/200)
        },
        {
            "x": WIDTH * (200/600),
            "y": HEIGHT * (90/200)
        }
    ],
    "lOppRobo": [
        {
            "x": WIDTH * (1 - (170/600)),
            "y": HEIGHT * (150/200)
        },
        {
            "x": WIDTH * (1 - (230/600)),
            "y": HEIGHT * (115/200)
        },
        {
            "x": WIDTH * (1 - (170/600)),
            "y": HEIGHT * (90/200)
        }
    ]
	}
	
	
	
	this.robotOrderQueue = new Array();
	
	this.playerDisplay = function()
	{
			//display players
			
			var nPlayerARobots = this.playerA.robotParty.length;
			var nPlayerBRobots = this.playerB.robotParty.length;
			
			
			localLayer = new Kinetic.Layer();
			for (var i = nPlayerARobots - 1; i >= 0;i--)
			{
				this.playerA.isHeroSet();
				roboTemp = this.playerA.robotParty[i].displayRobotBattle(battlePositions.lUserRobo[i]);
				localLayer.add(roboTemp);
			}
			
			for (var i = nPlayerBRobots - 1; i >= 0;i--)
			{
				roboTemp = this.playerB.robotParty[i].displayRobotBattle(battlePositions.lOppRobo[i]);
				localLayer.add(roboTemp);
			}	
			return localLayer;		
	}
	
	this.buildScene = function()
	{
			// build function
	}
	
	this.queueSort = function()
	{ // poping things from the queue
		for(x = 0; x < this.robotOrderQueue.length; x++) 
		{
			robotAction = this.robotOrderQueue.pop();
			robotAction.useAttack(robotAction.attackQueue,robotAction.targetQueue);
		}
	}
	
		
	this.main = function()
	{  // intial setup
		this.stage = new Kinetic.Stage({
			container: 'gameScreen',
			width: WIDTH,
			height: HEIGHT
		});

		this.backgroundLayer = new Kinetic.Layer();
		//this.foregroundLayer = new Kinetic.Layer();

		this.back = new Kinetic.Rect({
			x: 0,
			y: 0,
			width: this.stage.getWidth(),
			height: this.stage.getHeight(),
			fill: 'gray',
			stroke: 'black',
			strokeWidth: 4
		});
		
		//the ground
		var battleFloor = new Kinetic.Polygon({
				points: [0, self.stage.getHeight(), (self.stage.getWidth()/5), (self.stage.getHeight()*0.6), (self.stage.getWidth()*4/5), (self.stage.getHeight()*0.6), self.stage.getWidth(), self.stage.getHeight()],
				fill: 'brown',
				stroke: 'black',
				strokeWidth: 2,
				dashArray: [5,10]			
		});
		
		var line1 =  new Kinetic.Line({
				points: [(self.stage.getWidth()/5), (self.stage.getHeight()*0.6),(self.stage.getWidth()/5),0],
				stroke:'black',
				strokeWidth: 2,
				dashArray: [5,10]
		});
		
		var line2 = new Kinetic.Line({
				points:[(self.stage.getWidth()*4/5), (self.stage.getHeight()*0.6),(self.stage.getWidth()*4/5),0],
				stroke:'black',
				strokeWidth: 2,
				dashArray: [5,10]
		})
		
		// add the shape to the layer
		this.backgroundLayer.add(this.back);
		this.backgroundLayer.add(battleFloor);
		this.backgroundLayer.add(line1);
		this.backgroundLayer.add(line2);
		
		// add the layer to the stage
		this.stage.add(this.backgroundLayer);	
		this.stage.add(this.playerDisplay());
		
		
		var timer = setInterval(function(){
			loop();
		},150);
		
		function loop()
		{  // loop run
			var playerAQueue = self.playerA.update();
			var playerBQueue = self.playerB.update();
			
			if(playerAQueue != false)
			{
					for(i = 0;i < playerAQueue.length;i++)
					{
							self.robotOrderQueue.push(playerAQueue[i]);
					}
			}

			if(playerBQueue != false)
			{
					for(i = 0;i < playerBQueue.length;i++)
					{
							self.robotOrderQueue.push(playerBQueue[i]);
					}
			}
			
			self.queueSort();
			self.stage.draw();
		}
	
	}
}



