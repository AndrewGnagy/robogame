WIDTH = 600;
HEIGHT = 200;

function stepScene(funct,timeIntervalSec)
{
	this.funct = funct;
	this.timeIntervalSec = timeIntervalSec;
	this.stopAnim = false;
}

stepScene.prototype.getSec = function()
{
	var time = new Date();
	var sec = time.getTime()/1000%100000;
	delete time;
	return sec;
}

stepScene.prototype.start = function()
{
	this.intial = this.getSec();
}

stepScene.prototype.stop = function()
{
	this.stopAnim = true;
}

stepScene.prototype.loop = function()
{
	//loops
}

testAnimate.start();
testAnimate.stop();




