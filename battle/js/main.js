
player1 = new User();
player1.name = "Arjun";


player2 = new User();
player2.name = "Andrew";


robot1 = buildRobot(RobotJson,"HellRaiser");
robot2 = buildRobot(RobotJson,"RC-0022");
robot3 = buildRobot(RobotJson,"Rampage");


robot1.learnAttack("Triple Slash Attack");
robot1.learnAttack("Drill");

robot2.learnAttack("Entropy Increase");
robot2.learnAttack("Supreme Blast");

robot3.learnAttack("Positron Beam");

player1.addRobot(robot1);
player1.addRobot(robot3);

player2.addRobot(robot2);


battleObject = new battleScene(player1, player2);
battleObject.main();

