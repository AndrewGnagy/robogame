#! /usr/bin/env python

## Robot Class Template

class Robot:
	name = "Robot"
	craftType = ""
	energyType = ""
	IQ = 1 ## 1 - 50
	
	damagePointsMax = 40
	damagePoints = 40 ## 40 - 300
	
	energyPointsMax = 40
	energyPoints = 40 ## 40 - 300
	
	speedBar = 100	##
	speed = 1  ## 1 - 25 
	power = 10  ## 10 - 1000
	armor = 5  ## 5 - 1000
	chargingRate = 0
	accuracy = 0 ## 0 - 100
	agility = 0 ## 0 - 100
	attacks = {}
	
	def __init__(self):
		pass
		
	def useAttack(self,attack,target):
		""" Robot performs attack"""
		self.speedBar = 0
		if attack.name in self.attacks:
			self.attacks[attack.name].doAttack(self,target) 
				
	def attackCalc(self, target):
		return self.power/(target.armor*10)+1
	
	def hitCalc(self, target):
		probability = (self.accuracy - target.agility)
		return probability
		
	def speedUp(self):
		if self.speedBar < 100:
			self.speedBar += self.speed
						
	def useItem(self,item):
		pass
	
	def __str__(self):
		return self.name

class Attacks:
	name = ""
	energyType = ""
	def __init__(self):
		pass
		
	def doAttack(self,user,target):
		print "%s did attack on %s" % (user,target)
		
	def __str__(self):
		return self.name
		
class Item:
	def __init__(self):
		self.name = ""
		
	def action(self,target):
		pass
		
	def __str__(self):
		return self.name
		
		
class User:
	def __init__(self):
		self.name = ""
		self.robotParty = []
		self.itemList = {}
		
	def addRobot(self,robot):
		self.robotParty.append(robot)
		
		
	def printParty(self):
		for i in self.robotParty:
			print i
			
	def printItemList(self):
		for i in self.itemList:
			print i
		
	def __str__(self):
		return self.name

