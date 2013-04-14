
//robotObject = new Object()
function robotObject()
{
	this.name = "Robot";
	this.owner = "";
	this.uid = "";
	this.craftType = "";
	this.energyType = "";
	this.IQ = 1; //1-50
	
	// mutable stats during battle
	this.damagePoints = 0; // 40-300
	this.energyPoints = 0; //40-300 // current number of energy points
	this.speedBar = 100; // the speed bar
	this.speed= 0; // the rate of speed bar completes
	this.power= 0; //10-1000 the offence of the attack
	this.armor= 0; // the defence from the attack
	this.chargingRate = 0; // the rate at which the  energy bar increases
	this.accuracy = 0; // property that determines if attack hits or misses
	this.agility = 0; // property that determines if robot dodges attack
	
	// immutable/saved stats restored after battle
	this.baseStats = {
		damagePoints: 40,
		energyPoints: 40,
		speed: 1,
		power: 10,
		armor: 5,
		chargingRate:1,
		accuracy:1,
		agility:1
	}
	
	
	// attack list
	this.attacksJson = {
		attackList:[null, null, null,null],
		emptySlots:4
		};
	
	this.initial = function()
	{	// base stats intialized
		this.damagePoints = this.baseStats.damagePoints;
		this.energyPoints = this.baseStats.energyPoints;
		this.speed = this.baseStats.speed;
		this.power = this.baseStats.power;
		this.chargingRate = this.baseStats.chargingRate;
		this.accuracy = this.baseStats.accuracy;
		this.agility = this.baseStats.agility;
	}
	
	this.learnAttack = function(attackname)
	{ // adding attack and abilities to robot
		if (this.attacksJson.emptySlots > 0)
		{	// checks if there are any empty slots available
			for(var i=0; i<this.attacksJson.attackList.length;i++)
			{ // searching attackList array
					if (this.attacksJson.attackList[i] == null)
					{		// found empty slot
							// will need to change this to an attack object
								this.attacksJson.attackList[i] = attackname;
								this.attacksJson.emptySlots--;
								return "learned";
					}
			}
		}
		else
		{
				console.log("must unlearn attack");
		}
		
	}
	
	this.printAttacks = function()
	{	// prints attack list to console Log
		for(var i=0; i < this.attacksJson.attackList.length; i++)
		{
				console.log("Attack"+i+" "+this.attacksJson.attackList[i]);
		}
	}
	
	this.useAttack = function(attackname,target)
	{	// Robot performs attacks
		this.speedBar = 0
	}
	
	this.attackCalc = function(target)
	{	// Robot attack calc
		
	}
	
	this.hitCalc = function(target)
	{	// Robot hit calc
		
	}
	
	this.speedUp = function()
	{	// Robot speed up
		
		if (this.speedBar < 100)
		{ 
				this.speedBar += this.speed;
				if(this.speedBar > 100)
				{ // incase of overshoot
						this.speedbar = 100;
				}
		} 
	}
	
	this.useItem = function(item)
	{  // Robot item
		
	}
	
	this.printName = function()
	{   // print robots name	
		console.log(this.name)
		return this.name;
	}

	this.initial();
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
	{		// animation run
			
	}
	
	this.attackCalc = function(user,target)
	{		// run attack calculation 
			
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
		//this.uid = "";
		this.robotParty = new Array();
		this.itemList = new Array();
		
		this.addRobot =  function(robot)
		{	//adds robot to party
				if(this.robotParty.length < 3)
				{
						i = this.robotParty.length;
						this.robotParty[i]=robot;
						robot.owner = this.name;
				}
				
				return robot;
		}
		
		this.printParty = function()
		{	// prints out players party
			for(i = 0;i < this.robotParty.length;i++)
			{
					console.log(this.robotParty[i].name);
			}
		}
		
		this.printItemList = function()
		{	// prints out players item list
			for(i = 0;this.itemList.length < i;i++)
			{
					console.log(this.itemList[i]);
			}
		
		}
		
		this.printName = function()
		{	// prints and returns name
				console.log(this.name);
				return this.name;
		}
}


function buildRobot(RobotJson,name)
{  // make more secure
	
	for(var i=0; i < RobotJson.robots.length;i++)
	{
		if (RobotJson.robots[i].name == name)
		{
			robotProperties = RobotJson.robots[i];
		}
	}
	robotNew = new robotObject();
	robotNew.name = robotProperties.name;
	robotNew.craftType = robotProperties.craftType;
	robotNew.energyType = robotProperties.energyType;
	robotNew.baseStats = robotProperties.baseStats;
	robotNew.initial();
	return robotNew;
}



player1 = new User();
player1.name = "Arjun";
player1.addRobot(buildRobot(RobotJson,"Rampage"));


