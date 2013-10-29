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
		this.speedBar = 0;
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
	
	this.buildTargetMenu = function()
	{		
		
			opponentPartyList = this.owner.opponent.robotParty;
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
					self.targetQueue = this.attrs.robot;
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

	this.buildAttackMenu = function()
	{
			var nAttacks = 4 - this.attacksJson.emptySlots;
			
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
			for(var n = 0; n < this.attacksJson.attackList.length; n++)
			{
	
					var attackLabel = new Kinetic.Label({
							width:40,
							height:20,
							fill:'black',
							opacity: .75,
							stroke:'gray',
							strokeWidth:2
					});
					
					if( this.attacksJson.attackList[n] != null)
					{
						var attackText = this.attacksJson.attackList[n].name;
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
							self.attackQueue = this.getText();
							self.targetMenu.show();
							self.robotFinalLook.parent.draw();
						});
					}
			}
			
			
			popAttack.setPosition(5,-.75*popupAttackBase.getHeight());

			return popAttack;
	}
	
	this.useAttack = function(attackname,target)
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

	this.isBroken = function()
	{  // find out if robot can continue battling or not.
			if(this.damagePoints <= 0)
			{
					this.damagePoint = 0;
					this.robotLook.setFill('gray');
					this.robotLook.setStroke('black');
					return true;
			}
			return false;
	}

	this.isReady = function()
	{
/*		var anim = new Kinetic.Animation(function(frame)
		{
			// animation for ready
			var currShadow =  self.robotLook.getShadowEnabled();
			
			if(frame.time % 1000 === 0)
			{
				this.robotLook.setShadowEnabled(currShadow === false ? true : false);
			}

		},self);*/
		if(this.speedBar >= 100 && this.attackQueue != null && this.targetQueue != null)
		{
				this.robotLook.disableShadow();
				if(this.ready != true)
				{
					this.ready = true;
				}
		}
		else if(this.speedBar >= 100 && this.isHero)
		{		// only the hero's robots flashes
			var currShadow = this.robotLook.getShadowEnabled();
			this.robotLook.setShadowEnabled(currShadow === false ? true : false);
			//anim.start();
		}
		else
		{
			this.robotLook.disableShadow();
			//anim.stop();	
		}
		
		return this.ready;
	}
	
	this.speedUp = function()
	{	// Robot speed up
		//console.log(this.speedBar);
		if (this.speedBar < 100)
		{ 
				this.speedBar += this.speed/10;
				if(this.speedBar > 100)
				{ // incase of overshoot
						this.speedbar = 100;
				}
				this.speedBarDisplay.setWidth(25*(this.speedBar/100));
		}
		else
		{
				if(this.speedBar > 100)
				{ // incase of overshoot
						this.speedbar = 100;
				}
				this.speedBarDisplay.setWidth(25*(this.speedBar/100));			
		} 
	}
	
	// health update
	this.healthUpdate = function()
	{
			this.healthBar.setWidth(25*(this.damagePoints/this.baseStats.damagePoints));
	}
	
	this.isHeroSet = function()
	{
			this.isHero = true;
			this.isNpc = false;
	}
		
	this.update = function()
	{
			var ready = this.isReady();
			var broken = this.isBroken();
			this.speedUp();
			this.healthUpdate()
			
			if(ready && !broken)
			{
				return 'ready';
			}
			else if(broken)
			{
				return 'dead';
			}
			else
			{
				return 'not ready';
			}
	}
	
	this.initial();
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
