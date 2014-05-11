robo.namespace("ai");
//ai.chooseAttack
//Is given a robot to choose attack
robo.ai.chooseAttack = function(robotObj)
{
	if(robotObj.getAttackQueue())
		return;
	var attackAry = robotObj.getAttackList();
	var targetAry = robotObj.getActiveTargetList();
	var attack = attackAry[Math.floor(Math.random()*attackAry.length)];
	var target = targetAry[Math.floor(Math.random()*targetAry.length)];
	console.log("attack"+attackAry);
	robotObj.setTargetQueue(target);
	robotObj.setAttackQueue(attack.name);
}
