#! /usr/bin/env python

from robotClass import *
from Attacks import *
from battle import *

def makeAttack(name):
	newAttack = strikeAttacks()
	newAttack.name = name
	
	return newAttack
	
def makeRobot(name,attack):
	newRobot = Robot()
	newRobot.name = name
	newRobot.attacks[attack.name] = attack

	return newRobot
	
tackle = makeAttack('tackle')

RobotA = makeRobot('Alpha',tackle)
RobotB = makeRobot('Beta',tackle)

User1 = User()
User2 = User()

User1.addRobot(RobotA)
User2.addRobot(RobotB)

#RobotA.useAttack(tackle,RobotB)

#print RobotA.damagePoints
#print RobotB.damagePoints

runBattle = battleScene(User1,User2)

