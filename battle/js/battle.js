// battle.py

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
            "x": 170,
            "y": 150
        },
        {
            "x": 120,
            "y": 100
        },
        {
            "x": 160,
            "y": 90
        }
    ],
    "lOppRobo": [
        {
            "x": 600-170,
            "y": 150
        },
        {
            "x": 600-120,
            "y": 100
        },
        {
            "x": 600-160,
            "y": 90
        }
    ]
	}
	
	
	
	this.robotOrderQueue = new Array();
	
	this.playerDisplay = function()
	{
			//display players
			localLayer = new Kinetic.Layer();
			for (var i = 0; i < this.playerA.robotParty.length;i++)
			{
				this.playerA.isHeroSet();
				roboTemp = this.playerA.robotParty[i].displayRobotBattle(battlePositions.lUserRobo[i]);
				localLayer.add(roboTemp);
			}
			
			for (var i = 0; i < this.playerB.robotParty.length;i++)
			{
				roboTemp = this.playerB.robotParty[i].displayRobotBattle(battlePositions.lOppRobo[i]);
				roboTemp.attrs.fill = 'orange';
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
			robotAction.attackQueue = null;
			robotAction.targetQueue = null;
			robotAction.ready = false;
		}
	}
	
		
	this.main = function()
	{  // intial setup
		this.stage = new Kinetic.Stage({
			container: 'gameScreen',
			width: 600,
			height: 200
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
				strokeWidth: 2			
		});
		
		// add the shape to the layer
		this.backgroundLayer.add(this.back);
		this.backgroundLayer.add(battleFloor);
		
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



