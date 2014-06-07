////////////////////////////////////////////////////////////////////////
// Object Template ////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
function robotObject()
{	// base robot object
	this.saved = {}; //Put all saved info in this object
	this.saved.name = "Robot";
	this.saved.image = null;// default image
	this.owner = null;
	this.uid = "";
	this.saved.robotid = "";
	this.saved.craftType = "";
	this.saved.energyType = "";
	this.IQ = 1; //1-50
	this.ready = false;
	this.attackQueue = null; // selected attack
	this.targetQueue = null; // selected target
	this.battleFieldObject = null;

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

	this.isLoaded = false;
	this.isHero = false;
	this.isNpc = false;
	this.battleSpeedNormalized = 10;


	var self = this;

	// immutable/saved stats restored after battle
	this.saved.baseStats = {
		damagePoints: 40,
		energyPoints: 40,
		speed: 15,
		power: 10,
		armor: 5,
		chargingRate:1,
		accuracy:1,
		agility:1
	};

	this.saved.attackList = [];
	this.initializeStats();
}

robotObject.prototype.battleFieldSet = function(sceneObject)
{
	this.battleFieldObject = sceneObject;
}

robotObject.prototype.battleFieldGet = function()
{
	return this.battleFieldObject;
}

robotObject.prototype.battleFieldRemove = function()
{
	this.battleFieldObject = null;
}


robotObject.prototype.uiMake = function(position)
{
	this.uiLook = new robotUi(this);
	return this.uiLook.displayRobotBattle(position);
}

robotObject.prototype.recieveDamageDisplay = function()
{
	this.uiLook.recieveDamageDisplay();
}

robotObject.prototype.doAction = function()
{ // suppose to run either an attack or use item
	// returns an animation object
	return this.useAttack(this.attackQueue, this.targetQueue);
}


//this method is done to get the robot ready for its next turn
robotObject.prototype.clearActionQueue = function()
{
	this.attackQueue = null; // clears attack queue
	this.targetQueue = null; // clear target queue
	this.ready = false; // resets ready flage to false
	this.speedBar = 0; // restarts speed bar
}

robotObject.prototype.useAttack = function(attackname,target)
{	// Robot performs attacks
	// returns an animation object
	var bAnimation = false;
	var attackList = this.getAttackList()
	for(var i=0; i < attackList.length; i++)
	{
		if (attackList[i].name == attackname)
		{
			bAnimation = attackList[i].doAttack(this,target);
		}
	}
	this.clearActionQueue();
	return bAnimation;
}

robotObject.prototype.learnAttack = function(attackname)
{ // adding attack and abilities to robot
	if ((4-this.saved.attackList.length) > 0)
	{	// checks if there are any empty slots available
		for(var i=0; i<4;i++)
		{ // searching attackList array
			if (this.saved.attackList[i] == null)
			{		// found empty slot
				// will need to change this to an attack object
				this.saved.attackList[i] = buildAttack(attackname);
				this.saved.attackList[i].setRobotUser(this);
				return "learned";
			}
		}
	}
	else
	{
		console.log("must unlearn attack");
	}
}

robotObject.prototype.loadAttack = function(attacksList)
{
	for(var i = 0; i < attacksList.length; i++)
	{
		var attackID = attacksList[i];
		this.learnAttack(attackID);
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
	var normalizedSpeed = this.getNormalizedSpeed();
	if (this.speedBar < 100)
	{
		this.speedBar += this.speed*2/normalizedSpeed;
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

robotObject.prototype.getSpeedBar = function()
{
	return this.speedBar;
}

robotObject.prototype.changeNormalizedSpeed = function(fastestSpeed)
{
	this.battleSpeedNormalized = fastestSpeed;
}

robotObject.prototype.getNormalizedSpeed = function()
{
	return this.battleSpeedNormalized;
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

robotObject.prototype.healthPercent = function()
{
	return this.damagePoints/this.saved.baseStats.damagePoints;
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

robotObject.prototype.initializeStats = function()
{	// base stats intialized
	this.damagePoints = this.saved.baseStats.damagePoints;
	this.energyPoints = this.saved.baseStats.energyPoints;
	this.speed = this.saved.baseStats.speed;
	this.power = this.saved.baseStats.power;
	this.armor = this.saved.baseStats.armor;
	this.chargingRate = this.saved.baseStats.chargingRate;
	this.accuracy = this.saved.baseStats.accuracy;
	this.agility = this.saved.baseStats.agility;
	this.speedBar = 0;
}

robotObject.prototype.useItem = function(item)
{  // Robot item
	console.log("used "+item);
}

robotObject.prototype.printName = function()
{   // print robots name
	console.log(this.saved.name)
	return this.saved.name;
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
	return this.saved.attackList;
}

robotObject.prototype.getTargetList = function()
{
	return this.owner.opponent.robotParty;
}

robotObject.prototype.getActiveTargetList = function()
{
	var targetActiveList = this.getTargetList();

	for (var i = targetActiveList.length - 1; i >= 0; i--) 
	{
		if(targetActiveList[i].isBroken() === true)
		{
			targetActiveList.splice(i,1)
		}
	};

	return targetActiveList;
}

robotObject.prototype.setAttackQueue = function(attackInsert)
{
	this.attackQueue = attackInsert;
	return attackInsert;
}

robotObject.prototype.getAttackQueue = function()
{
	return this.attackQueue;
}

robotObject.prototype.setTargetQueue = function(targetInsert)
{
	this.targetQueue = targetInsert;
	return targetInsert;
}

robotObject.prototype.getTargetQueue = function()
{
	return this.targetQueue;
}

robotObject.prototype.getIsHero = function()
{
	return this.isHero;
}

robotObject.prototype.setSelected = function(bShow)
{
	var self = this;
	self.uiLook.setSelected(bShow);
}

robotObject.prototype.getXPosition = function()
{
	var self = this;
	var position = self.uiLook.robotFinalLook.getAbsolutePosition();

	return position.x;

}

robotObject.prototype.getYPosition = function()
{
	var self = this;
	var position = self.uiLook.robotFinalLook.getAbsolutePosition();

	return position.y;
}


/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
// robotUI

function robotUi(robotObject)
{
	this.robotObject = robotObject;
	this.attackList = this.robotObject.getAttackList();
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
		this.blinkOff();
	}
	else if(this.speedbar >= 100 && this.isHero)
	{		// only the hero's robots flashes
		this.blinkOn('yellow');
	}
	else
	{
		this.blinkOff();
	}
}

robotUi.prototype.blinkOn = function(color)
{
	this.robotLook.setShadowColor(color);
	var currShadow = this.robotLook.getShadowEnabled();
	this.robotLook.setShadowEnabled(currShadow === false ? true : false);
}

robotUi.prototype.hitBlinkOn = function()
{
	this.blinkOn('red');
}


robotUi.prototype.blinkOff = function()
{
	this.robotLook.disableShadow();
}

robotUi.prototype.isBrokenDisplay = function()
{  // find out if robot can continue battling or not.
	var broken = this.robotObject.isBroken()
	if(broken)
	{
		this.robotLook.setFill('gray');
		this.robotLook.setStroke('black');
		this.robotLook.off('click');
	}
}

robotUi.prototype.recieveDamageDisplay = function()
{
	console.log('received damage');
}

robotUi.prototype.robotLookCreateUi = function()
{
	var self = this;
	var defaultImage = "robot32.png";

	if(self.robotObject.saved.image)
	{
		var robotLook = new Kinetic.Image({
			width:32,
			height: 64,
			image: IMAGES[self.robotObject.saved.image]
		});
	}
	else
	{
		var robotLook = new Kinetic.Rect({
			width:32, //20
			height:64, // 40
			shadowColor:'yellow',
			shadowBlur:15,
			shadowEnabled:false,
			strokeWidth:2,
			fill:'green',
		});		
	}
	return robotLook;
}

robotUi.prototype.getMiddle =  function()
{
	var width = this.robotLook.getWidth();
	var height = this.robotLook.getHeight();

	return {'x':width/2, 'y': height/6};
}

robotUi.prototype.createSelectBar = function()
{
	var self = this;

	var selectBar =  new Kinetic.Wedge({
		radius:10,
		angleDeg:60,
		fill:'black',
		rotationDeg: -120,
		visible:false
	});

	return selectBar
}

// robot ui build methods
robotUi.prototype.displayRobotBattle = function(position)
{
	var self = this;

	this.robotLook = this.robotLookCreateUi();
	this.selectBar = this.createSelectBar();
	this.healthBar = this.createStatusBar('red','health');
	this.energyBar = this.createStatusBar('blue','energy');
	this.speedBarDisplay = this.createStatusBar('yellow','speed');

	this.textName = new Kinetic.Text({
		text:this.robotObject.saved.name,
		fontSize: 11,
		fontFamily: 'Calibri',
		fill: 'black',
		shadowColor:'white'
	});

	this.robotFinalLook = new Kinetic.Group({
		x: position.x,
		y: position.y
	});

	this.attackMenu = this.buildCircleAttackMenu();
	this.targetMenu = this.buildCircleTargetMenu();
	var middle = this.getMiddle();
	this.attackMenu.setPosition(middle.x,middle.y);
	this.targetMenu.setPosition(middle.x,middle.y);
	//this.targetMenu = this.buildTargetMenu();

	


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

	this.buildMenuActions();

	return this.robotFinalLook;
}

robotUi.prototype.buildMenuActions = function()
{
	var self = this;
	// attack menu event actions
	this.attackMenu.on('click',function(){
		//this.hide();
		this.hide();
		this.getLayer().draw();
	});

	this.attackMenu.on('mouseleave',function(){
		this.getLayer().draw();
	});

	this.attackMenu.on('mouseover mouseenter',function(){
		this.show();
		this.getLayer().draw();
	});
	// target menu event actions
	this.targetMenu.on('click',function(){
		this.hide();
		this.getLayer().draw();
	});
	// robot event action
	this.robotLook.on('mouseover',function(){
			self.setSelected(true);
			this.getLayer().draw();
	});

	this.robotLook.on('mouseleave',function(){
			self.setSelected(false);
			//self.attackMenu.hide();
			this.getLayer().draw();
	});

	if(this.isHero)
	{
		this.robotLook.on('click',function(evt){
			self.attackMenu.show();
			this.getLayer().draw();
		});
	}
}

robotUi.prototype.createStatusBar = function(color,name)
{
	var statusBar = new Kinetic.Rect({
		width:25,
		height:2,
		stroke:color,
		strokeWidth:2,
		id:name
	});

	return statusBar;
}

// robotUi.prototype.popUpDialogBase = function(numberOfItems,titleText)
// {
// 	var popUp = new WindowDialog({
// 		width:70,
// 		height:20*numberOfItems + 15,
// 		opacity: 0.7,
// 		backgroundColor:'black',
// 		fontColor:'white',
// 		strokeWidth:2,
// 		strokeFrame:'gray',
// 		title:titleText
// 	});

// 	return popUp;
// }

robotUi.prototype.buildTargetLabel = function(targetObject)
{
	var target = targetObject;

	var targetTextBox = new textBox({
		width:68,
		height:20,
		backgroundColor:'black',
		strokeFrame:'black',
		strokeWidth:1,
		text:target.saved.name,
		fontColor:'white'
	});

	targetTextBox.setAttr('robot',target);

	return targetTextBox.textGroup;
}

robotUi.prototype.applyActionTargetLabel = function(targetContainer)
{
	var self = this;

	targetContainer.on('mouseleave',function(evt){
		var targetSelected = this.attrs.robot;
		targetSelected.setSelected(false);
		var myRect = this.getChildren()[0];
		var myText = this.getChildren()[1];
		var fillRect = myRect.getFill();
		var fillText = myText.getFill();
		myRect.setFill(fillRect === 'black' ? 'white' : 'black');
		myText.setFill(fillText === 'black' ? 'white' : 'black');
		myRect.getLayer().draw();
	});

	targetContainer.on('mouseenter',function(evt){
		var targetSelected = this.attrs.robot;
		targetSelected.setSelected(true);
		var myRect = this.getChildren()[0];
		var myText = this.getChildren()[1];
		var fillRect = myRect.getFill();
		var fillText = myText.getFill();
		myRect.setFill(fillRect === 'black' ? 'white' : 'black');
		myText.setFill(fillText === 'black' ? 'white' : 'black');
		myRect.getLayer().draw();
	});


	targetContainer.on('click',function(){
		var targetSelected = this.attrs.robot;
		self.robotObject.setTargetQueue(targetSelected);// ******
		self.showTargetMenu(false);
		self.showAttackMenu(false);
	});
}

// robotUi.prototype.buildTargetMenu = function()
// {
// 	var nTarget = this.targetList.length;
// 	opponentPartyList = this.targetList;
// 	var self = this;


// 	var popTarget = self.popUpDialogBase(nTarget,"Target");
// 	popTarget.hide();

// 	for(var n = 0; n < opponentPartyList.length; n++)
// 	{
// 		var target = opponentPartyList[n];


// 		var targetContainer = self.buildTargetLabel(target);

// 		self.applyActionTargetLabel(targetContainer);


// 		popTarget.add(targetContainer);
// 		var yPosition = (popTarget.getHeight()*n/nTarget) + 5;
// 		targetContainer.setPosition(3,yPosition);

// 	}

// 	popTarget.setPosition(5,-.75*popTarget.getHeight());

// 	return popTarget.windowGroupMain;
// }

robotUi.prototype.buildCircleTargetMenu = function()
{
	var targetList = this.robotObject.getTargetList();
	var nTargets = targetList.length;
	var self = this;
	var PI = Math.PI;

	var targetGroup = new Kinetic.Group();

	targetGroup.hide();

	for(var n = 0; n < nTargets; n++)
	{
		if(targetList[n] != null)
		{
			//var targetText = targetList[n].saved.name
			var targetIcon = this.buildTargetCirleLabel(targetList[n]);

			self.applyActionTargetLabel(targetIcon);
			targetGroup.add(targetIcon);

			var xPosition = 60*Math.sin(n*PI/2);
			var yPosition = -1*60*Math.cos(n*PI/2);
			targetIcon.setPosition(xPosition,yPosition);

		}
	}
	return targetGroup;
}


// robotUi.prototype.buildAttackLabel = function(attackObject)
// {
// 	var attack = attackObject;

// 	var attackTextBox = new textBox({
// 		width:68,
// 		height:20,
// 		backgroundColor:'black',
// 		strokeFrame:'black',
// 		strokeWidth:1,
// 		text:attack,
// 		fontColor:'white'
// 	});

// 	return attackTextBox.textGroup;
// }

robotUi.prototype.applyActionAttackLabel = function(attackContainer)
{
	var self = this;

	attackContainer.on('mouseleave',function(){
		var myRect = this.getChildren()[0];
		var myText = this.getChildren()[1];
		var fillRect = myRect.getFill();
		var fillText = myText.getFill();
		myRect.setFill(fillRect === 'black' ? 'white' : 'black');
		myText.setFill(fillText === 'black' ? 'white' : 'black');
		myRect.getLayer().draw();
	});

	attackContainer.on('mouseenter',function(evt){
		var myRect = this.getChildren()[0];
		var myText = this.getChildren()[1];
		var fillRect = myRect.getFill();
		var fillText = myText.getFill();
		myRect.setFill(fillRect === 'black' ? 'white' : 'black');
		myText.setFill(fillText === 'black' ? 'white' : 'black');
		myRect.getLayer().draw();
	});


	attackContainer.on('mousedown click',function(){
		var myText = this.getChildren()[1].getText();
		var myLayer = this.getLayer();
		self.robotObject.setAttackQueue(myText);// *********
		self.showAttackMenu(false);
		self.targetMenu.show();
		myLayer.draw();
	});

}

// robotUi.prototype.buildAttackMenu = function()
// {
// 	var nAttacks = this.robotObject.getAttackList().length;
// 	var attackList = this.robotObject.getAttackList();
// 	var self = this;


// 	var popAttack = self.popUpDialogBase(nAttacks,"Attacks");

// 	popAttack.hide();
// 	for(var n = 0; n < attackList.length; n++)
// 	{


// 			if(attackList[n] != null)
// 			{
// 				var attackText = attackList[n].name;
// 				var attackContainer = self.buildAttackLabel(attackText);

// 				self.applyActionAttackLabel(attackContainer);

// 				popAttack.add(attackContainer);
// 				var yPosition = (popAttack.getHeight()*n/nAttacks) + 5;
// 				attackContainer.setPosition(3,yPosition);

// 			}
// 	}

// 	popAttack.setPosition(5,-.75*popAttack.getHeight());

// 	return popAttack.windowGroupMain;
// }

robotUi.prototype.buildCircleAttackMenu = function()
{
	var attackList = this.robotObject.getAttackList();
	var nAttacks = attackList.length;
	var self = this;
	var PI = Math.PI;

	var attackGroup = new Kinetic.Group();

	attackGroup.hide();

	for(var n = 0; n < nAttacks; n++)
	{
		if(attackList[n] != null)
		{
			var attackText = attackList[n].name;
			var attackIcon = this.buildCircleLabel(attackText);
			
			self.applyActionAttackLabel(attackIcon);
			attackGroup.add(attackIcon);
			
			var xPosition = 60*Math.sin(n*PI/2);
			var yPosition = -1*60*Math.cos(n*PI/2);
			attackIcon.setPosition(xPosition,yPosition);
		}
	}
	return attackGroup;
}

robotUi.prototype.buildCircleLabel = function(attackText)
{
	var iconGroup = new Kinetic.Group();
	var icon = new Kinetic.Circle({
		radius:20,
		fill:'black',
		fillRadialGradientStartRadius:0,
		fillRadialGradientEndRadius:25,
		opacity:0.65,
		id:'Icon'
	});
	var iconText = new Kinetic.Text({
		text:attackText,
		align:'center',
		fill:'black',
		fontSize:12,
		x:-10,
		y:-30,
		id:'Text'
	});

	iconGroup.add(icon);
	iconGroup.add(iconText);

	return iconGroup;
}

robotUi.prototype.buildTargetCirleLabel = function(targetObject)
{
	var targetName = targetObject.saved.name;
	var iconGroup = this.buildCircleLabel(targetName);
	iconGroup.setAttr('robot',targetObject);

	return iconGroup;
}

robotUi.prototype.draw = function()
{
	var self = this;
	self.robotFinalLook.getLayer().draw();
}

robotUi.prototype.showAttackMenu = function(bShow)
{
	var self = this;
	if(bShow)
	{
		self.attackMenu.show();
	}
	else
	{
		self.attackMenu.hide();
	}
}

robotUi.prototype.showTargetMenu = function(bShow)
{
	var self = this;
	if(bShow)
	{
		self.targetMenu.show();
	}
	else
	{
		self.targetMenu.hide();
	}
}

robotUi.prototype.setSelected = function(bShow) 
{
	var self = this;
	if(bShow)
	{
		self.selectBar.show();
	}
	else
	{
		self.selectBar.hide();
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
	robotNew.saved.name = robotProperties.name;
	robotNew.saved.craftType = robotProperties.craftType;
	robotNew.saved.energyType = robotProperties.energyType;
	robotNew.saved.baseStats = robotProperties.baseStats;
	robotNew.initializeStats();
	return robotNew;
}

function buildAttack(name)
{
	var AttackJson = ATTACKJSON;
	if(AttackJson.Attacks[name])
	{
		attackProperties = AttackJson.Attacks[name]
	}
	else 
	{
		for(var i=0; i < AttackJson.Attacks.length; i++)
		{
			if(AttackJson.Attacks[i].name == name)
			{
					attackProperties = AttackJson.Attacks[i];
					break;
			}
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


robotObject.prototype.loadRobot = function(robotid, callback){

	var loadedRobotCallback = function(data, callback){
		if(data)
		{
			//character.robotParty.push(data);
			$.extend(true, self.saved, data);
			self.isLoaded = true;
			self.loadAttack(data.attacks);
			self.initializeStats();
		}
		if(self.saved.image && !IMAGES[self.saved.image]){
			roboUtils_loadImage(self.saved.image, "../battle/images/"+self.saved.image, callback());
			return;
		}
		callback();
	}
	if(typeof robotid === "string")
		robotid = [robotid];
	if(!callback){
		callback = initiateBattle;
	}
	var self = this;
	var loadRoboRequest = function(rid){
		$.ajax({
			type: 'GET',
			url: "/node/robots/"+rid,
			dataType: 'json',
			success: function(data){
				console.log(data);
				loadedRobotCallback(data, callback);
			},
			error: function(request, textStatus, errorThrown) {
				console.log("robot not found: using fake robot instead");
				loadedRobotCallback(fakeRobot[rid], callback);
			}
		});
	}
	
	for(var x = 0; x < robotid.length; x++){
		loadRoboRequest(robotid[x]);
	}
}

robotObject.prototype.saveRobot = function(robotid){
	console.log('saving');
	console.log(this.saved);
	$.ajax({
		type: 'POST',
		url: "/node/robots/"+robotid,
		data: this.saved,
		dataType: 'json',
		success: function(data){
			console.log("saved");
		},
		error: function(request, textStatus, errorThrown) {
			alert("Robot not found");
			console.log(errorThrown);
			console.log(request);
		}
	});
}

fakeRobot = {
"527546fa41f3ec7af56855ef": {
  "_id": "527546fa41f3ec7af56855ef",
  "name": "HellRaiser",
  "craftType": "pedal",
  "energyType": "nuke",
  "image": "robot32.png",
  "baseStats": {
    "damagePoints": 70,
    "energyPoints": 100,
    "speed": 20,
    "power": 2000,
    "armor": 10,
    "chargingRate": 10,
    "agility": 8,
    "accuracy": 90
  },
  "attacks": [
    1,
    2
  ]
},
"000000000000000000000000": {
  "_id": "000000000000000000000000",
  "name": "Gizmo",
  "craftType": "pedal",
  "energyType": "nuke",
  "image": "robot32.png",
  "baseStats": {
    "damagePoints": 70,
    "energyPoints": 100,
    "speed": 20,
    "power": 2000,
    "armor": 10,
    "chargingRate": 10,
    "agility": 8,
    "accuracy": 90
  },
  "attacks": [
    1,
    2
  ]
}};
