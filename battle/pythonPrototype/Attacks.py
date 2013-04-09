#! /usr/bin/env python

from robotClass import *

class absorbAttacks(Attacks):
	def doAttack(self,user,target):
		target.damagePoints - user.attackCalc(target)
		if user.damagePoints < user.damagePointsMax:
			user.damagePoints + user.attackCalc(target)
			if user.damagePoints > user.damagePointsMax:
				user.damagePointsMax = user.damagePoints
			print "%s does absorbing attack on %s" % (user,target)
		
class strikeAttacks(Attacks):
	def doAttack(self,user,target):
		target.damagePoints -= user.attackCalc(target)
		print "%s does strike attack on %s" % (user,target)
		
class projectileAttacks(Attacks):
	def doAttack(self,user,target):
		target.damagePoints - user.attackCalc(target)
		print "%s does missile attack on %s" % (user,target)
		
class repairAttack(Attacks):
	def doAttack(self,user,target):	
		print "%s does repair on %s" % (user,target)
			
class massAttacks(Attacks):
	def doAttack(self,user,target):
		print "%s does mass attack on %s" % (user,target)	
		
		