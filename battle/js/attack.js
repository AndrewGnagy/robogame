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
*/

function makeMelee(name,energyType)
{
	this.name = name;
	this.energyType = energyType;
	
	this.attackCalc(user,target)
	{
			console.log("calculating attack damage on "+target);
	}
	
	this.animation = function(user,target)
	{
			console.log(user+" attacking "+target);
	}
		
}

makeMelee.prototype = new Attacks();
makeMelee.prototype.constructor = makeMelee;

function makeAbsorbAttack(name,energyType)
{
	this.name = name;
	this.energyType = energyType;
	
	this.attackCalc = function(user,target)
	{
			console.log("calculating attack damage on "+target);
	}	
	
	this.animation = function(user,target)
	{
			console.log(user+" absorbed damage points from "+target);
	}
		
}

makeAbsorbAttack.prototype = new Attacks();
makeAbsorbAttack.prototype.constructor = makeAbsorbAttack;

