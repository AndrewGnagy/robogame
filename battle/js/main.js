
player1 = new Character();
player1.name = "Arjun";


player2 = new Character();
player2.name = "Andrew";


robot1 = buildRobot(RobotJson,"HellRaiser");
robot2 = buildRobot(RobotJson,"RC-0022");
robot3 = buildRobot(RobotJson,"Rampage");
robot4 = buildRobot(RobotJson,"HellRaiser");
robot5 = buildRobot(RobotJson,"HellRaiser");
robot6 = buildRobot(RobotJson,"HellRaiser");

robot1.learnAttack("Triple Slash Attack");
robot1.learnAttack("Drill");

robot2.learnAttack("Entropy Increase");
robot2.learnAttack("Supreme Blast");

robot3.learnAttack("Positron Beam");

player1.addRobot(robot1);
player1.addRobot(robot3);
player1.addRobot(robot2);

player2.addRobot(robot5);
player2.addRobot(robot4);
player2.addRobot(robot6);


battleObject = new battleScene(player1, player2);
battleObject.main();

