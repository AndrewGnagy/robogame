// battle.py

function battleScene(playerA, playerB)
{
	
	this.playerA = playerA;
	this.playerB = playerB;
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
	{ // sorting
		// bubble sorted by speed
		for(x = 0; x < this.robotOrderQueue.length; x++) 
		{
			for(y = 0; y < (this.robotOrderQueue.length-1); y++) 
			{
				if(this.robotOrderQueue[y].speed < this.robotOrderQueue[y+1].speed) 
				{
					holder = this.robotOrderQueue[y+1];
					this.robotOrderQueue[y+1] = this.robotOrderQueue[y];
					this.robotOrderQueue[y] = holder;
				}
			}
		}
	}
	
	this.intialOrder = function()
	{  // makes the intial order in which the robots attack
		
		// inserted robots of player A into queue
		for(i = 0;i < this.playerA.robotParty.length;i++)
		{
			this.robotOrderQueue.push(this.playerA.robotParty[i]);
		}
		
		// inserted robots of player B into queue
		for(i = 0;i < this.playerB.robotParty.length;i++)
		{
			this.robotOrderQueue.push(this.playerB.robotParty[i]);
		}
		
		this.queueSort();
	}
	
	
	this.main = function()
	{  // intial setup
		this.stage = new Kinetic.Stage({
			container: 'gameScreen',
			width: 600,
			height: 200
		});

		this.layer = new Kinetic.Layer();

		this.back = new Kinetic.Rect({
			x: 0,
			y: 0,
			width: this.stage.getWidth(),
			height: this.stage.getHeight(),
			fill: 'white',
			stroke: 'black',
			strokeWidth: 4
		});
		
	
		
		// add the shape to the layer
		this.layer.add(this.back);

		
		// add the layer to the stage
		this.stage.add(this.layer);	
		this.stage.add(this.playerDisplay());
		
		this.intialOrder();
	}
	
	this.loop = function()
	{  // loop run
		this.playerA.update();
		this.playerB.update();
	}	

}



