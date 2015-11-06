robo.namespace("ai");
//ai.chooseAttack
//Is given a robot to choose attack
robo.ai.chooseAction = function(robotObj)
{
	if(!robotObj.getAttackQueue() && !robotObj.getTargetQueue())
	{
			this.chooseAttack(robotObj);
			this.chooseTarget(robotObj);
	}
	else
	{
		if(!robotObj.getTargetQueue().isBroken())
		{
			this.chooseTarget(robotObj); 
		}		
	}
}

robo.ai.chooseAttack = function(robotObj)
{
	var attackAry = robotObj.getAttackList();	
	var attack = attackAry[Math.floor(Math.random()*attackAry.length)];
	robotObj.setAttackQueue(attack.name);
}

robo.ai.chooseTarget = function(robotObj)
{
	var targetAry = robotObj.getActiveTargetList();
	var target = targetAry[Math.floor(Math.random()*targetAry.length)];
	robotObj.setTargetQueue(target);	
}
