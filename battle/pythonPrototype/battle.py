#! /usr/bin/env python

from robotClass import *
from Attacks import *


class battleScene:
		robotList = []
		robotQueue = []
		def __init__(self,player1,player2):
			self.player1 = player1
			self.player2 = player2
			self.orderSetup()
		def orderSetup(self):
			self.robotList.extend(self.player1.robotParty)
			self.robotList.extend(self.player2.robotParty)

			for i in self.robotList:
				print "%s has a speed of %s" % (i.name,i.speed)
				#print i
		def loadImage(self):
			pass
			
		def runScene(self):
			pass





