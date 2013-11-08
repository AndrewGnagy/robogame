WIDTH = 600;
HEIGHT = 200;

function animate(funct,timeIntervalSec)
{
	this.funct = funct;
	this.timeIntervalSec = timeIntervalSec;
	this.stopAnim = false;
}

animate.prototype.getSec = function()
{
	var time = new Date();
	var sec = time.getTime()/1000%100000;
	delete time;
	return sec;
}

animate.prototype.start = function(funct)
{
		while(true)
		{
			if(this.getTime()%this.timeIntervalSec == 0)
			{
				this.funct;
				console.log(this.getTime());
			}

			if(this.stopAnim == true)
			{
				break;
			}
		}
}

animate.prototype.stop = function()
{
	this.stopAnim = true;
}

var testAnimate = new animate(function printHelloWorld(){
	console.log("hello world");},20);

testAnimate.start();
testAnimate.stop();




