
//robotObject = new Object()
function robotObject()
{
	this.name = "Robot";
	this.craftType = "";
	this.energyType = "";
	this.IQ=1; //1-50
	
	this.damagePointsMax = 40;
	this.damagePoints = 40; // 40-300
	
	this.energyPointsMax = 40;
	this.energyPoints=40; //40-300
	
	this.speedBar = 100;
	this.speed=1;
	this.power=10; //10-1000
	this.armor=5;
	this.changingRate=0;
	this.accuracy=0;
	this.agility=0;
	
	this.attacks = {
		"attack1": null,
		"attack2": null,
		"attack3": null,
		"attack4": null,
		};
	
	this.initial = function()
	{
	}
	
	this.useAttack = function(attackname,target)
	{
		// Robot performs attacks
		this.speedBar = 0
	}
	
	this.attackCalc = function(target)
	{
		// Robot attack calc
	}
	
	this.hitCalc = function(target)
	{
		// Robot hit calc
	}
	
	this.speedUp = function()
	{
		// Robot speed up
	}
	
	this.useItem = function(item)
	{
		// Robot item
	}
	
	this.printName = function()
	{
			// printname
		//document.write(robotalpha.name);
		console.log(this.name)
		return this.name;
	}
	
}


function Attacks()
{
	this.name = "";
	this.energyType = "";
	
	this.initial = function()
	{
		
	}
	
	this.doAttack = function(user,target)
	{
			this.attackCalc(user,target);
			this.animation(user,target);
	}
	
	this.animation = function(user,target)
	{
			// animation run
	}
	
	this.attackCalc = function(user,target)
	{
			// run attack calculation 
	}
	
	this.attackName = function()
	{
		return this.name;
	}
}



function Item()
{
		this.name = "";

		this.initial = function()
		{
			
		}
		
		this.action = function()
		{
			// action
			console.log("used item "+this.itemName);	
		}
		
		this.itemName = function()
		{
				return this.name;
		}
}
	
	
	
function User()
{
		this.name = "";
		this.robotParty = new Array();
		this.itemList = new Array();
		
		this.addRobot =  function(robot)
		{
				if(this.robotParty.length < 3)
				{
						i = this.robotParty.length;
						this.robotParty[i]=robot;
				}
				
				return robot;
		}
		
		this.printParty = function()
		{
			for(i = 0;this.robotParty.length < i;i++)
			{
					console.log(this.robotParty[i]);
			}
		}
		
		this.printItemList = function()
		{
			for(i = 0;this.itemList.length < i;i++)
			{
					console.log(this.itemList[i]);
			}
		
		}
		
		this.printName = function()
		{
				console.log(this.name);
				return this.name;
		}
}


robotalpha = new robotObject();
robotalpha.name = "alpha";
robotalpha.printName();

