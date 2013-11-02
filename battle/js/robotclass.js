////////////////////////////////////////////////////////////////////////
// Object Template ////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
function robotObject()
{	// base robot object
	this.name = "Robot";
	this.owner = null;
	this.uid = "";
	this.craftType = "";
	this.energyType = "";
	this.IQ = 1; //1-50
	this.ready = false;
	this.attackQueue = null; // selected attack
	this.targetQueue = null; // selected target
	
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
	
	this.isHero = false;
	this.isNpc = false;
	
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
		attackList:[null, null, null,null], // store
		emptySlots:4
		};	
	this.initial();
}

robotObject.prototype.uiMake = function(position)
{
	this.uiLook = new robotUi(this);
	return this.uiLook.displayRobotBattle(position);
}

robotObject.prototype.useAttack = function(attackname,target)
{	// Robot performs attacks
	this.attackQueue = null;
	this.targetQueue = null;
	this.ready = false;
	this.speedBar = 0;
	for(var i=0; i < this.attacksJson.attackList.length; i++)
	{
			if (this.attacksJson.attackList[i].name == attackname)
			{
					this.attacksJson.attackList[i].doAttack(this,target);
					return true;
			}
	}
	return false;
}

robotObject.prototype.learnAttack = function(attackname)
{ // adding attack and abilities to robot
	if (this.attacksJson.emptySlots > 0)
	{	// checks if there are any empty slots available
		for(var i=0; i<this.attacksJson.attackList.length;i++)
		{ // searching attackList array
				if (this.attacksJson.attackList[i] == null)
				{		// found empty slot
						// will need to change this to an attack object
						this.attacksJson.attackList[i] = buildAttack(AttackJson,attackname);
						this.attacksJson.attackList[i].owner = self;
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


robotObject.prototype.isBroken = function()
{
	if(this.damagePoints <= 0)
	{
		this.damagePoints = 0;
		return true;
	}
	return false;
}


robotObject.prototype.isReadyStatus = function()
{
	if(this.speedBar >= 100 && this.attackQueue != null && this.targetQueue != null)
	{
			if(this.ready != true)
			{
				return true;
			}
	}
	return false;	
}

robotObject.prototype.speedUp = function()
{	// Robot speed up
	//console.log(this.speedBar);
	if (this.speedBar < 100)
	{ 
			this.speedBar += this.speed/10;
			if(this.speedBar > 100)
			{ // incase of overshoot
					this.speedBar = 100;
			}
	}
	else
	{
			if(this.speedBar > 100)
			{ // incase of overshoot
					this.speedBar = 100;
			}
						
	} 
}

/*robotObject.prototype.speedDisplayUpdate = function()
{
	this.speedBarDisplay.setWidth(25*(this.speedBar/100));
}*/

robotObject.prototype.getSpeedBar = function()
{
	return this.speedBar;
}


robotObject.prototype.robotStatusPrint =  function(sStatus)
{
	console.log(sStatus);
	return sStatus;
}

robotObject.prototype.displayUiUpdate = function()
{
	this.uiLook.displayUiUpdate();
}

/*// health update
robotObject.prototype.healthUpdate = function()
{
		this.healthBar.setWidth(25*this.healthPercent());
}*/

robotObject.prototype.healthPercent = function()
{
	return this.damagePoints/this.baseStats.damagePoints;
}
	
robotObject.prototype.isHeroSet = function()
{
		this.isHero = true;
		this.isNpc = false;
}

robotObject.prototype.statusUpdate = function()
{
		var status;
		var ready = this.isReadyStatus();
		var broken = this.isBroken();
		this.speedUp();	
		if(ready && !broken)
		{
			status = 'ready';
		}
		else if(broken)
		{
			status = 'dead';
		}
		else
		{
			status = 'not ready';
		}
		return status;
}

robotObject.prototype.update = function()
{
		var status = this.statusUpdate()
		this.displayUiUpdate();
		return status;
}


robotObject.prototype.initial = function()
{	// base stats intialized
	this.damagePoints = this.baseStats.damagePoints;
	this.energyPoints = this.baseStats.energyPoints;
	this.speed = this.baseStats.speed;
	this.power = this.baseStats.power;
	this.armor = this.baseStats.armor;
	this.chargingRate = this.baseStats.chargingRate;
	this.accuracy = this.baseStats.accuracy;
	this.agility = this.baseStats.agility;
	this.speedBar = 0;
}
	
robotObject.prototype.useItem = function(item)
{  // Robot item
	console.log("used "+item);
}

robotObject.prototype.printName = function()
{   // print robots name	
	console.log(this.name)
	return this.name;
}

robotObject.prototype.printAttacks = function()
{	// prints attack list to console Log
	var attackList = this.getAttackList()
	for(var i=0; i < attackList.length; i++)
	{
		if(attackList[i] != null)
		{
			console.log("Attack"+i+" "+attackList[i].name);
		}
		else
		{
			console.log("Attack"+i+" "+"---");
		}
	}
}

robotObject.prototype.getAttackList = function()
{
	return this.attacksJson.attackList;
}

robotObject.prototype.getTargetList = function()
{
	return this.owner.opponent.robotParty;
}

robotObject.prototype.getEmptyAttackList = function()
{
	return this.attacksJson.emptySlots;
}

robotObject.prototype.setAttackQueue = function(attackInsert)
{
	this.attackQueue = attackInsert;
	return attackInsert;
}

robotObject.prototype.setTargetQueue = function(targetInsert)
{
	this.targetQueue = targetInsert;
	return targetInsert;
}

robotObject.prototype.getIsHero = function()
{
	return this.isHero;
}

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
// robotUI

function robotUi(robotObject)
{
	this.robotObject = robotObject;
	this.attackList = this.robotObject.getAttackList();
	this.emptySlots = this.robotObject.getEmptyAttackList();
	this.targetList = this.robotObject.getTargetList();
	this.isHero = this.robotObject.getIsHero();
}

robotUi.prototype.statusUpdate = function()
{
	this.speedbar = this.robotObject.getSpeedBar();
	this.healthPercent = this.robotObject.healthPercent();
	this.ready = this.robotObject.isReadyStatus();
	this.broken = this.robotObject.isBroken();
}
// display update methods
robotUi.prototype.displayUiUpdate = function()
{
	this.statusUpdate();
	this.healthUpdate();
	this.speedDisplayUpdate();
	this.isReadyDisplay();
	this.isBrokenDisplay();
}

robotUi.prototype.speedDisplayUpdate = function()
{
	var speedbar = this.speedbar;
	this.speedBarDisplay.setWidth(25*(speedbar/100));
}

robotUi.prototype.healthUpdate = function()
{
	var healthPercent = this.healthPercent;
	this.healthBar.setWidth(25*healthPercent);
}

robotUi.prototype.isReadyDisplay = function()
{
	var ready = this.ready;
	if(ready)
	{
			this.robotLook.disableShadow();
	}
	else if(this.speedbar >= 100 && this.isHero)
	{		// only the hero's robots flashes
		var currShadow = this.robotLook.getShadowEnabled();
		this.robotLook.setShadowEnabled(currShadow === false ? true : false);
	}
	else
	{
		this.robotLook.disableShadow();	
	}
}

robotUi.prototype.isBrokenDisplay = function()
{  // find out if robot can continue battling or not.
		var broken = this.robotObject.isBroken()
		if(broken)
		{
				this.robotLook.setFill('gray');
				this.robotLook.setStroke('black');
		}
}

// robot ui build methods
robotUi.prototype.displayRobotBattle = function(position)
{
	var self = this;
	this.robotLook = new Kinetic.Rect({
		width:20,
		height:40,
		shadowColor:'yellow',
		shadowBlur:15,
		shadowEnabled:false,
		strokeWidth:2,
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

	this.speedBarDisplay = new Kinetic.Rect({
		width:25,
		height:2,
		stroke:'yellow',
		strokeWidth:2		
	});
	
	this.textName = new Kinetic.Text({
		text:this.robotObject.name,
		fontSize: 11,
		fontFamily: 'Calibri',
		fill: 'black',
		shadowColor:'white'
	});

	this.robotFinalLook = new Kinetic.Group({
		x: position.x,
		y: position.y
	})

	this.attackMenu = this.buildAttackMenu();
	this.targetMenu = this.buildTargetMenu();
	
	this.attackMenu.on('click',function(){
		this.hide();
		self.robotFinalLook.parent.draw();		
	});	

	this.attackMenu.on('mouseleave mouseout',function(){
		this.hide();
		self.robotFinalLook.parent.draw();			
	});
				
	this.attackMenu.on('mouseover mouseenter',function(){
		this.show();
		self.robotFinalLook.parent.draw(); 
	});		
	
	this.robotFinalLook.add(this.robotLook);
	this.robotFinalLook.add(this.healthBar);
	this.robotFinalLook.add(this.energyBar);
	this.robotFinalLook.add(this.speedBarDisplay);
	this.robotFinalLook.add(this.textName);
	this.robotFinalLook.add(this.selectBar);
	this.robotFinalLook.add(this.attackMenu);
	this.robotFinalLook.add(this.targetMenu);
	
	this.healthBar.setPosition(25,5);
	this.energyBar.setPosition(25,10);
	this.speedBarDisplay.setPosition(25,15);
	this.textName.setPosition(-5,-12);		
	this.selectBar.setPosition(9,-12);
	
	
	this.healthBar.name = "healthBar";
	this.energyBar.name = "energyBar";
	this.speedBarDisplay.name = "speedBarDisplay";
	this.selectBar.name = "selectBar";
	
	
	this.robotLook.setStroke(this.robotLook.attrs.fill);
	
	//this.robotLook.setListening(true);
	
	this.robotLook.on('mouseover',function(){
			self.selectBar.show();
			self.robotFinalLook.parent.draw();
	});
	
	this.robotLook.on('mouseleave',function(){
			self.selectBar.hide();
			self.attackMenu.hide();
			self.robotFinalLook.parent.draw();
	});
	
	if(this.isHero)
	{
		this.robotLook.on('click',function(evt){
			self.attackMenu.show();
			self.robotFinalLook.parent.draw();
		});
	}
	
	return this.robotFinalLook;
}

robotUi.prototype.buildTargetMenu = function()
{		
		var self = this;
		opponentPartyList = this.targetList;
		var nTarget = opponentPartyList.length;
		
		popTarget = new WindowDialog({
			width:70,
			height:20*nTarget,
			opacity: 0.7,
			backgroundColor:'black',
			fontColor:'white',
			strokeWidth:2,
			strokeFrame:'gray',
			title:'Target'
		});
		popTarget.hide();
		
		for(var n = 0; n < opponentPartyList.length; n++)
		{
			var target = opponentPartyList[n];
			var targetLabel = new Kinetic.Label({
				width:40,
				height:20,
				fill:'black',
				opacity: .75,
				stroke:'gray',
				strokeWidth:2
			});
			
			targetLabelText = new Kinetic.Text({
				text:target.name,
				robot:target,
				fontFamily:'Calibri',
				fontSize:10,
				fill: 'white'
			});
			
			targetLabel.add(targetLabelText);
			popTarget.windowGroup2.add(targetLabel);
			var yPosition = popTarget.getHeight()*n/nTarget;
			targetLabel.setPosition(0,yPosition);
			
			targetLabelText.on('mouseleave',function(evt){
				var fill = this.getFill();
				this.setFill(fill === 'black' ? 'white' : 'black');
				this.getLayer().draw();							
			});
			
			targetLabelText.on('mouseenter',function(evt){
				var fill = this.getFill();
				this.setFill(fill === 'black' ? 'white' : 'black');
				this.getLayer().draw();
			});
			
			
			targetLabelText.on('click',function(){
				self.robotObject.setTargetQueue(this.attrs.robot);// ******
			});								
		}// end of for loop
		
		popTarget.setPosition(5,-.75*popTarget.getHeight());
		popTarget.windowGroupMain.on('click',function(){
			this.hide();
			this.getLayer().draw();		
		});	

		popTarget.windowGroupMain.on('mouseleave mouseout',function(){
			this.hide();
			this.getLayer().draw();			
		});
					
		popTarget.windowGroupMain.on('mouseover mouseenter',function(){
			this.show();
			this.getLayer().draw(); 
		});	
		
		return popTarget.windowGroupMain;			
}


robotUi.prototype.buildAttackMenu = function()
{
		var nAttacks = 4 - this.robotObject.getEmptyAttackList();
		var attackList = this.robotObject.getAttackList();
		var self = this;
		popAttack = new Kinetic.Group();
		popupAttackBase = new Kinetic.Rect({
			width:70,
			height:20*nAttacks,
			opacity: 0.7,
			fill:'black',
			stroke:'gray',
			strokeWidth:2				
		});
		popAttack.add(popupAttackBase);

		popAttack.hide();
		for(var n = 0; n < attackList.length; n++)
		{

				var attackLabel = new Kinetic.Label({
						width:40,
						height:20,
						fill:'black',
						opacity: .75,
						stroke:'gray',
						strokeWidth:2
				});
				
				if(attackList[n] != null)
				{
					var attackText = attackList[n].name;
					attackLabelText = new Kinetic.Text({
						text:attackText,
						fontFamily:'Calibri',
						fontSize:10,
						fill: 'white'
					});
					
					attackLabel.add(attackLabelText);
					popAttack.add(attackLabel);
					var yPosition = popupAttackBase.getHeight()*n/nAttacks;
					attackLabel.setPosition(0,yPosition);
					
					attackLabelText.on('mouseleave',function(){
						var fill = this.getFill();
						this.setFill(fill === 'black' ? 'white' : 'black');
						self.robotFinalLook.parent.draw();							
					});
					
					attackLabelText.on('mouseenter',function(evt){
						var fill = this.getFill();
						this.setFill(fill === 'black' ? 'white' : 'black');
						self.robotFinalLook.parent.draw();
					});
					
					
					attackLabelText.on('click',function(){
						self.robotObject.setAttackQueue(this.getText());// *********
						self.targetMenu.show();
						self.robotFinalLook.parent.draw();
					});
				}
		}
		
		
		popAttack.setPosition(5,-.75*popupAttackBase.getHeight());

		return popAttack;
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
