////////////////////////////////////////////////////////////////////////
// Object Template ////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
function robotObject()
{	// base robot object
	this.name = "Robot";
	this.owner = "";
	this.uid = "";
	this.craftType = "";
	this.energyType = "";
	this.IQ = 1; //1-50
	this.ready = true;
	this.attackQueue = null; // selected attack
	
	
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
	
	var self = this;
	
	
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
		this.armor = this.baseStats.armor;
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
								this.attacksJson.attackList[i] = buildAttack(AttackJson,attackname);
								//this.attacksJson.attackList[i].owner = this;
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
			if( this.attacksJson.attackList[i] != null)
			{
				console.log("Attack"+i+" "+this.attacksJson.attackList[i].name);
			}
			else
			{
				console.log("Attack"+i+" "+"---");
			}
		}
	}

	this.buildAttackMenu = function()
	{
			this.popupAttack = new Kinetic.Rect({
				width:40,
				height:80,
				opacity: 0.7,
				fill:'black',
				stroke:'gray',
				strokeWidth:2				
			});
			this.popupAttack.setPosition(15,-70);
			this.popupAttack.on('mouseout',function(){
				this.destroy();
				self.robotFinalLook.parent.draw();			
			});		
			return this.popupAttack;
	}
	
	this.useAttack = function(attackname,target)
	{	// Robot performs attacks
		//if(this.speedBar <= 100)
		//{
		this.speedBar = 0;
		for(var i=0; i < this.attacksJson.attackList.length; i++)
		{
				if (this.attacksJson.attackList[i].name == attackname)
				{
						this.attacksJson.attackList[i].doAttack(this,target);
						return true;
				}
		}
		//}
		return false;
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
	
	this.displayRobotBattle = function(position)
	{
		this.robotLook = new Kinetic.Rect({
			width:20,
			height:40,
			strokeWidth:0,
			fill:'green',
		});
		
		this.selectBar = new Kinetic.Wedge({
			radius:10,
			angleDeg:60,
			fill:'black',
			rotationDeg: -120,
			visible:false
		});
		
		this.healthBar = new Kinetic.Rect({
			width:25,
			height:2,
			stroke:'red',
			strokeWidth:2		
		});
		
		this.energyBar = new Kinetic.Rect({
			width:25,
			height:2,
			stroke:'blue',
			strokeWidth:2		
		});

		this.speedBar = new Kinetic.Rect({
			width:25,
			height:2,
			stroke:'yellow',
			strokeWidth:2		
		});
		
		this.textName = new Kinetic.Text({
			text:this.name,
			fontSize: 11,
			fontFamily: 'Calibri',
			fill: 'black',
			shadowColor:'white'
		});

		this.robotFinalLook = new Kinetic.Group({
			x: position.x,
			y: position.y
		})


		this.robotFinalLook.add(this.robotLook);
		this.robotFinalLook.add(this.healthBar);
		this.robotFinalLook.add(this.energyBar);
		this.robotFinalLook.add(this.speedBar);
		this.robotFinalLook.add(this.textName);
		this.robotFinalLook.add(this.selectBar);
		
		this.healthBar.setPosition(25,5);
		this.energyBar.setPosition(25,10);
		this.speedBar.setPosition(25,15);
		this.textName.setPosition(-5,-12);		
		this.selectBar.setPosition(9,-12);
		
		
		this.healthBar.name = "healthBar";
		this.energyBar.name = "energyBar";
		this.speedBar.name = "speedBar";
		this.selectBar.name = "selectBar";
		
		
		this.robotLook.setStroke(this.robotLook.attrs.fill);
		
		this.robotLook.setListening(true);
		
		this.robotLook.on('mouseover',function(){
				self.selectBar.show();

				self.robotFinalLook.parent.draw();
		});
		
		this.robotLook.on('mouseout',function(){
				self.selectBar.hide();
				self.robotFinalLook.parent.draw();
		});
		
		this.robotLook.on('click',function(){
			this.parent.add(self.buildAttackMenu());
			this.parent.parent.draw();
		});
		

		
		return this.robotFinalLook;
	}

	this.isBroken = function()
	{  // find out if robot can continue battling or not.
			if(this.damagePoints <= 0)
			{
					this.damagePoint = 0
					return true;
			}
			return false;
	}

	this.isReady = function()
	{
		if(this.speedBar == 100 && this.attackQueue != null)
		{
				if(this.ready != true)
				{
					this.ready = true;
				}
		}
		
		return this.ready;
	}
	
	
	this.update = function()
	{
			this.isReady();
			this.isBroken();
			this.speedUp();
	}
	
	this.initial();
}


function Attacks()
{	// base attack object
	this.name = ""; // the name of the attack
	this.owner = null; // the user of the attack
	this.energyType = "";
	this.accModifier = 1; // range .25-10 default 1  10 is super accurate and .25 is not so accurate
	this.attackModifier = 20; // range - 5,10,20,50, 80
	this.numberTargets = 1; // default is 1 // max 3 and min 0 (for self status enhancements)
	
	this.craftWeaknessJson = {
		WEAK:.5,
		NORMAL:1,
		STRONG:3
	}
	
	this.initial = function()
	{
		
	}
	
	this.doAttack = function(user,target)
	{		// executes attack
		if (this.hitCalc(user,target))
		{	// attack hits
			var damage = this.damageCalc(user,target);
			this.attackApply(target,damage);
			this.animation(user,target);
			if(target.isBroken())
			{
					console.log(target.name+" is broken");
			}
		}
		else
		{		// missed attack
				this.animation(user,target);
				console.log("missed attack");
		}
	}
	
	this.attackApply = function(target,damage)
	{		// apply event
			target.damagePoints -= damage;
	}
	
	this.animation = function(user,target)
	{		// animation run
			
	}
	
	this.damageCalc = function(user,target)
	{		// run attack calculation
			// experimental
			var cWeakness = this.craftWeakness(user.craftType, target.craftType); // craft Weakness
			
			var eWeakness = 8;
			
			
			var n = ((user.power*2)/eWeakness);
			var d = target.armor*cWeakness;
			
			var y = (n/d)+1;
			var x = (160 + Math.random()*61)/200;
			var z = (user.IQ*this.attackModifier)/10;
			console.log(y+" "+x+" "+z);
			var totalDamage = y*x*z;
			return Math.floor(totalDamage);
	}
	
	
	this.craftWeakness = function(userCraftType,targetCraftType)
	{	// determines weakness of target and strength of user
		var STRONG = .5;
		var WEAK = 3;
		var NORMAL = 1;
		
		switch(userCraftType.toLowerCase())
		{	//
			case "terrestrial":
				if(targetCraftType.toLowerCase() == "hovercraft")
				{  // terrestrial is strong againts hovercraft
						return STRONG;
				}
				else if (target.craftType.toLowerCase() == "pedal")
				{  // terrestrial is weak againts hovercraft
						return WEAK;
				}
				else
				{
						return NORMAL;
				}
			case "aeronautical":
				if(targetCraftType.toLowerCase() == "pedal")
				{  // aeronautical is strong againts pedal
						return STRONG;
				}
				else if (targetCraftType.toLowerCase() == "naval")
				{  // aeronautical is weak againts naval
						return WEAK;
				}
				else
				{
						return NORMAL;
				}
			case "naval":
				if(targetCraftType.toLowerCase() == "aeronautical")
				{  // naval is strong againts aeronautical
						return STRONG;
				}
				else if (targetCraftType.toLowerCase() == "hovercraft")
				{  // naval is weak againts hovercraft
						return WEAK;
				}
				else
				{
						return NORMAL;
				}
			case "pedal":
				if(targetCraftType.toLowerCase() == "terrestrial")
				{  // pedal is strong againts terrestrial
						return STRONG;
				}
				else if (targetCraftType.toLowerCase() == "aeronautical")
				{  // pedal is weak againts aeronautical
						return WEAK;
				}
				else
				{
						return NORMAL;
				}
			case "hovercraft":
				if(targetCraftType.toLowerCase() == "naval")
				{  // hovercraft is strong againts naval
						return STRONG;
				}
				else if (targetCraftType.toLowerCase() == "terrestrial")
				{  // hovercraft is weak againts terrestrial
						return WEAK;
				}
				else
				{
						return NORMAL;
				}
			case "alien":
				return STRONG;
			default:
				return NORMAL;
		}
	}
	
	this.hitCalc = function(user,target)
	{	// determines if attack hits target or not
		var probablity = (user.accuracy*this.accModifier)/(target.agility+user.accuracy+.1)
		console.log(probablity);
		if(Math.random() > probablity)
		{// attack missed
				return false; 
		}
		else
		{ // attack hit
				return true;
		}
	}
	
	this.attackName = function()
	{   // returns attack name
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
{		// NPC object and/or player
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
			return this.robotParty;
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

		this.update = function()
		{ // update
			for(i = 0;i < this.robotParty.length;i++)
			{
					this.robotParty[i].speedUp();
					this.robotParty[i].isBroken();
			}			
		}
}


////////////////////////////////////////////////////////////////////////
// Building functions //////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
function buildRobot(RobotJson,name)
{  // make more secure
	
	for(var i=0; i < RobotJson.robots.length;i++)
	{
		if (RobotJson.robots[i].name == name)
		{
			robotProperties = RobotJson.robots[i];
			break;
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

function buildAttack(AttackJson,name)
{
	for(var i=0; i < AttackJson.Attacks.length; i++)
	{
			if(AttackJson.Attacks[i].name == name)
			{
					attackProperties = AttackJson.Attacks[i];
					break;
			}
	}
	
	switch(attackProperties.funcType)
	{
		case "makeMelee":
			attack = new makeMelee();
			break;
		case "makeMultiMelee":
			attack = new makeMultiMelee();
			attack.numberOfAttacks = attackProperties.numberOfAttacks;
			break
		case "makeAbsorbAttack":
			attack = new makeAbsorbAttack();
			break;
		case "makeStatusChange":
			attack = new makeStatusChange();
			break;
		case "makeAreaAttack":
			attack = new makeAreaAttack();
			break;
		default:
			break;
	}
	
	attack.name = attackProperties.name;
	attack.attackModifier = attackProperties.attackModifier;
	//attack.
	return attack;
	
}
