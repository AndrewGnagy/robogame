// Attack sheet
/*
Attack object template
function Attacks()
{
	this.name = "";
	this.energyType = "";

	this.initial = function()
	{

	}

	this.doAttack = function(user,target)
	{
			this.damageCalc(user,target);
			this.animation(user,target);
	}

	this.animation = function(user,target)
	{
			// animation run
	}

	this.damageCalc = function(user,target)
	{
			// run attack calculation
	}

	this.attackName = function()
	{
		return this.name;
	}
}
*/
function Attacks()
{	// base attack object
	this.name = ""; // the name of the attack
	this.owner = null; // the user of the attack
	this.energyType = "";
	this.accModifier = 1; // range .25-10 default 1  10 is super accurate and .25 is not so accurate
	this.attackModifier = 20; // range - 5,10,20,50, 80
	this.numberTargets = 1; // default is 1 // max 3 and min 0 (for self status enhancements)
	this.statusOfAttack = null;

	this.craftWeaknessJson = {
		WEAK:3,
		NORMAL:1,
		STRONG:.5
	}
}


Attacks.prototype.initial = function()
{

}

Attacks.prototype.doAttack = function(user,target)
{		// executes attack
	if (this.hitCalc(user,target))
	{	// attack hits
		var damage = this.damageCalc(user,target);
		this.attackApply(target,damage);
		//this.animation(user,target);
		if(target.isBroken())
		{
				this.attackStatus(target.saved.name+" is broken");
		}
	}
	else
	{		// missed attack
			//this.animation(user,target);
			this.attackStatus("missed attack");
	}
	return this.animation(user,target);
}

Attacks.prototype.attackApply = function(target,damage)
{		// apply event
		target.damagePoints -= damage;
}

Attacks.prototype.animation = function(user,target)
{		// animation run
		var animationObject = false;
		return animationObject;
}

Attacks.prototype.damageCalc = function(user,target)
{		// run attack calculation
		// experimental
		var cWeakness = this.craftWeakness(user.saved.craftType, target.saved.craftType); // craft Weakness

		var eWeakness = 8; // energy Weakness


		var n = ((user.power*2)/eWeakness);
		var d = target.armor*cWeakness;

		var y = (n/d)+1;
		var x = (160 + Math.random()*61)/200;
		var z = (user.IQ*this.attackModifier)/10;
		console.log(y+"*"+x+"*"+z);
		var totalDamage = y*x*z;
		return Math.floor(totalDamage);
}


Attacks.prototype.craftWeakness = function(userCraftType,targetCraftType)
{	// determines weakness of target and strength of user
	var STRONG = this.craftWeaknessJson.STRONG;
	var WEAK = this.craftWeaknessJson.WEAK;
	var NORMAL = this.craftWeaknessJson.NORMAL;

	switch(userCraftType.toLowerCase())
	{	//
		case "terrestrial":
			if(targetCraftType.toLowerCase() == "hovercraft")
			{  // terrestrial is strong againts hovercraft
					return STRONG;
			}
			else if (targetCraftType.toLowerCase() == "pedal")
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

Attacks.prototype.hitCalc = function(user,target)
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

Attacks.prototype.attackName = function()
{   // returns attack name
	return this.name;
}

Attacks.prototype.attackStatus = function(sString)
{
	this.statusOfAttack = sString;
	console.log(sString)
	return sString;
} 

Attacks.prototype.setRobotUser = function(robotUser)
{
	this.owner = robotUser;
}



function makeMelee()
{// melee attack
	//this.name = name;
	//this.energyType = energyType;
}

makeMelee.prototype = new Attacks();
makeMelee.prototype.constructor = makeMelee;


makeMelee.prototype.attackApply = function(target,damage)
{
	target.damagePoints -= damage;
	this.attackStatus(target.saved.name+" received damage");
	this.attackStatus(damage);	
}

makeMelee.prototype.animation = function(user,target)
{
		var TOTALIMAGES = 2;
		var robotAttackName = this.name;
		var animationClip = new animationObject(robotAttackName,TOTALIMAGES);
		var xPosition = target.getXPosition();
		var yPosition = target.getYPosition();
		animationClip.setPosition(xPosition,yPosition);
		return animationClip;
}




function makeMultiMelee()
{// melee attack
	this.numberOfAttacks = 2;
}

makeMultiMelee.prototype = new Attacks();
makeMultiMelee.prototype.constructor = makeMultiMelee;

makeMultiMelee.prototype.setNumberOfAttacks = function(nAttacks)
{
	this.numberOfAttacks = nAttacks;
}

makeMultiMelee.prototype.doAttack = function(user,target)
{		// executes attack

	for(var i = 0; i < this.numberOfAttacks; i++)
	{ // number of iterations of attacks
		if (this.hitCalc(user,target))
		{	// attack hits
			var damage = this.damageCalc(user,target);
			this.attackApply(target,damage);
			this.animation(user,target);
			if(target.isBroken())
			{
					console.log(target.saved.name+" is broken");
			}
			this.animation(user,target);
		}
		else
		{		// missed attack
				this.animation(user,target);
				this.attackStatus("missed attack");
		}
	} // end of for loop
}

makeMultiMelee.prototype.attackApply = function(target,damage)
{
	target.damagePoints -= damage;
	//console.log(target.saved.name+" recieved damage");
	target.recieveDamageDisplay();
	console.log(damage);	
}

makeMultiMelee.prototype.animation = function(user,target)
{
	this.attackStatus("animation attacking ");
}



function makeAbsorbAttack()
{ // Absorb attack

}

makeAbsorbAttack.prototype = new Attacks();
makeAbsorbAttack.prototype.constructor = makeAbsorbAttack;

makeAbsorbAttack.prototype.animation = function(user,target)
{
	this.attackStatus(user.name+" absorbed damage points from "+target.saved.name);
}


function  makeAreaAttack()
{ // Area Attack

}

makeAreaAttack.prototype = new Attacks();
makeAreaAttack.prototype.constructor = makeAreaAttack;

makeAreaAttack.prototype.animation = function(user,target)
{
		this.attackStatus(user.name+" absorbed damage points from "+target.saved.name);
}

function makeStatusChange()
{
		this.statusChange = ""; // status properties to change
		this.change = ""; // reduce or increase
}

makeStatusChange.prototype = new Attacks();
makeStatusChange.prototype.constructor = makeStatusChange;


makeStatusChange.prototype.animation = function(user,target)
{
	this.attackStatus(user.name+" absorbed damage points from "+target.saved.name);
}


function animationObject(imagePrefix,totalNumberImages)
{
	this.counter = 0
	this.imagePrefix = imagePrefix;
	this.totalNumberImages = totalNumberImages;
	this.animation_length = 8;

	this.setPosition(0,0);
	this.loadImages();
}

animationObject.prototype.setAnimationLength = function(nLength)
{
	this.animation_length = 8;
}

animationObject.prototype.loadImages = function()
{
	var totalNumberImages = this.totalNumberImages;
	var imagePrefix = this.imagePrefix;

	for(var x = 0; x < totalNumberImages; x++)
	{
		var imageFullName = imagePrefix + x;
		roboUtils_loadImage(imageFullName, '../battle/images/attacks/' + imageFullName +'.png');
	}
}

animationObject.prototype.addLayer = function(layer)
{
	this.parentLayer = layer;
}

animationObject.prototype.addObjectToLayer = function(kObject)
{
	this.parentLayer.add(kObject);
}

animationObject.prototype.changePicture = function(fImage)
{
	var xPosition = this.xPosition;
	var yPosition = this.yPosition;

    if(IMAGES[fImage])
    {
      var animationImage = new Kinetic.Image({
        x: xPosition,
        y: yPosition,
        image: IMAGES[fImage]
      });
      this.addObjectToLayer(animationImage);
    }

}

animationObject.prototype.isFinished = function(counter,animationLength)
{
		var doneAnimation = false;
	    if(counter >= animationLength)
	    {
	      this.parentLayer.removeChildren();
	      doneAnimation = true;
	      this.counter = 0;
	    }

	    return doneAnimation;	
}

animationObject.prototype.setPosition = function(xPosition,yPosition)
{
	this.xPosition = xPosition;
	this.yPosition = yPosition;
}


animationObject.prototype.play = function()
{
	var totalNumberImages = this.totalNumberImages;
	var imagePrefix = this.imagePrefix;
	var animationLength = this.animation_length;


	var counter = this.counter++;
	var picNumber = Math.floor((totalNumberImages)/animationLength*counter);

	var fullImageName = imagePrefix + picNumber;

    this.changePicture(fullImageName)

    return this.isFinished(counter,animationLength);
}
 
