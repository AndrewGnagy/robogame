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

	this.craftWeaknessJson = {
		WEAK:.5,
		NORMAL:1,
		STRONG:3
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
		this.animation(user,target);
		if(target.isBroken())
		{
				this.attackStatus(target.saved.name+" is broken");
		}
	}
	else
	{		// missed attack
			this.animation(user,target);
			this.attackStatus("missed attack");
	}
}

Attacks.prototype.attackApply = function(target,damage)
{		// apply event
		target.damagePoints -= damage;
}

Attacks.prototype.animation = function(user,target)
{		// animation run

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
		console.log(y+" "+x+" "+z);
		var totalDamage = y*x*z;
		return Math.floor(totalDamage);
}


Attacks.prototype.craftWeakness = function(userCraftType,targetCraftType)
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
	console.log(sString)
	return sString;
}



function makeMelee()
{// melee attack
	//this.name = name;
	//this.energyType = energyType;

	this.attackApply = function(target,damage)
	{		// apply event
			target.damagePoints -= damage;
			this.attackStatus(target.saved.name+" received damage");
			this.attackStatus(damage);
	}
	this.animation = function(user,target)
	{		// animation
			this.attackStatus(" attacking ");
	}
}

makeMelee.prototype = new Attacks();
makeMelee.prototype.constructor = makeMelee;


function makeMultiMelee()
{// melee attack
	//this.name = name;
	//this.energyType = energyType;
	this.numberOfAttacks = 2;

	this.doAttack = function(user,target)
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
			}
			else
			{		// missed attack
					this.animation(user,target);
					console.log("missed attack");
			}
		} // end of for loop
	}

	this.attackApply = function(target,damage)
	{		// apply event
			target.damagePoints -= damage;
			//console.log(target.saved.name+" recieved damage");
			target.recieveDamageDisplay();
			console.log(damage);
	}
	this.animation = function(user,target)
	{		// animation
			console.log(" attacking ");
	}
}

makeMultiMelee.prototype = new Attacks();
makeMultiMelee.prototype.constructor = makeMultiMelee;


function makeAbsorbAttack()
{ // Absorb attack
	//this.name = name;
	//this.energyType = energyType;

	this.animation = function(user,target)
	{
			console.log(user.name+" absorbed damage points from "+target.saved.name);
	}
}

makeAbsorbAttack.prototype = new Attacks();
makeAbsorbAttack.prototype.constructor = makeAbsorbAttack;


function  makeAreaAttack()
{ // Area Attack
		//this.name = name;
		//this.energyType = energyType;


		this.animation = function(user,target)
		{
				console.log(user+" absorbed damage points from "+target);
		}

}

makeAreaAttack.prototype = new Attacks();
makeAreaAttack.prototype.constructor = makeAreaAttack;

function makeStatusChange()
{
		this.statusChange = ""; // status properties to change
		this.change = ""; // reduce or increase
		this.animation = function(user,target)
		{
				console.log(user+" absorbed damage points from "+target);
		}

}

makeStatusChange.prototype = new Attacks();
makeStatusChange.prototype.constructor = makeStatusChange;



