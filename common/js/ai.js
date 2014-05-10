//receive array of available attack strings and all of opponent robots
//return target robotObject and attack string
robo.namespace("ai");
//ai.chooseAttack
//Is given a list of AI robots and uses that list to attack enemy robots
robo.ai.chooseAttack = function(robotObj)
{
	if(robotObj.getAttackQueue())
		return;
	var attackAry = robotObj.getAttackList();
	var targetAry = robotObj.getActiveTargetList();
	var attack = attackAry[Math.floor(Math.random()*attackAry.length)];
	var target = attackAry[Math.floor(Math.random()*targetAry.length)];
	robotObj.setTargetQueue(target);
	robotObj.setAttackQueue(attack);
}
