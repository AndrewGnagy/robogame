// main js
function buildRobot(RobotJson,name)
{  // make more secure
	
	for(var i=0; i < RobotJson.robots.length;i++)
	{
		if (RobotJson.robots[i].name == name)
		{
			robotProperties = RobotJson.robots[i];
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


player1 = new User();
player1.name = "Arjun";
player1.addRobot(buildRobot(RobotJson,"Rampage"));

player2 = new User();
player2.name = "Andrew";
player2.addRobot(buildRobot(RobotJson,"HellRaiser"));

rogue1 = buildRobot(RobotJson,"HellRaiser");
rogue2 = buildRobot(RobotJson,"RC-0022");

attack1 = new makeMelee("","");
