// battle.py

function battleScene(playerA, playerB)
{
	
	this.playerA = playerA;
	this.playerB = playerB;
	
	this.robotOrderQueue = new Array();
	
	this.playerDisplay = function()
	{
		playerAstring = "<div id = \"playerA\">"+this.playerA.name+"</div>";
		playerBstring = "<div id = \"playerB\">"+this.playerB.name+"</div>";
		document.write(playerAstring);
		document.write(playerBstring);
		$("#playerA").css("background-color","#10A2E0");
		$("#playerB").css("background-color","#E01063");
				
	}
	
	this.intialOrder = function()
	{
		
		for(i = 0;i < this.playerA.robotParty.length;i++)
		{
			this.robotOrderQueue.push(this.playerA.robotParty[i]);
		}
		
		for(i = 0;i < this.playerB.robotParty.length;i++)
		{
			this.robotOrderQueue.push(this.playerB.robotParty[i]);
		}
		
		for(x = 0; x < this.robotOrderQueue.length; x++) 
		{
			for(y = 0; y < (this.robotOrderQueue.length-1); y++) 
			{
				if(this.robotOrderQueue[y].speed > this.robotOrderQueue.speed[y+1]) 
				{
					holder = this.robotOrderQueue[y+1];
					this.robotOrderQueue[y+1] = this.robotOrderQueue[y];
					this.robotOrderQueue[y] = holder;
				}
			}
		}
		
		
	}
	this.main = function()
	{
		this.playerDisplay();
		this.intialOrder();
	}
	
	this.loop = function()
	{
		this.playerA.update();
		this.playerB.update();
	}	

}
