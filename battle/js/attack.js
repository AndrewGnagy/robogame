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

function makeMelee(name,energyType)
{// melee attack
	this.name = name;
	this.energyType = energyType;
	
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

function makeAbsorbAttack(name,energyType)
{ // Absorb attack
	this.name = name;
	this.energyType = energyType;
	
	
	this.animation = function(user,target)
	{
			console.log(user+" absorbed damage points from "+target);
	}
		
}

makeAbsorbAttack.prototype = new Attacks();
makeAbsorbAttack.prototype.constructor = makeAbsorbAttack;


function  makeAreaAttack(name,energyType)
{ // Area Attack
		this.name = name;
		this.energyType = energyType;
		
		
		this.animation = function(user,target)
		{
				console.log(user+" absorbed damage points from "+target);
		}
		
}

makeAreaAttack.prototype = new Attacks();
makeAreaAttack.prototype.constructor = makeAreaAttack;

function makeStatusChange(name,energyType)
{
		this.name = name;
		this.energyType = energyType;
		
		
		this.animation = function(user,target)
		{
				console.log(user+" absorbed damage points from "+target);
		}
			
}

makeStatusChange.prototype = new Attacks();
makeStatusChange.prototype.constructor = makeStatusChange;



