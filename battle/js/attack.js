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

function makeMelee()
{// melee attack
	//this.name = name;
	//this.energyType = energyType;
	
	this.attackApply = function(target,damage)
	{		// apply event
			target.damagePoints -= damage;
			console.log(target.name+" recieved damage");
			console.log(damage);
	}		
	this.animation = function(user,target)
	{		// animation
			console.log(" attacking ");
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
						console.log(target.name+" is broken");
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
			console.log(target.name+" recieved damage");
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
			console.log(user+" absorbed damage points from "+target);
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



