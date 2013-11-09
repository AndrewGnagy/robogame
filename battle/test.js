WIDTH = 600;
HEIGHT = 200;

function animate(funct,timeIntervalSec)
{
	this.funct = funct();
	this.timeIntervalSec = timeIntervalSec;
	this.stopAnim = false;
}

animate.prototype.getTime = function()
{
	var time = new Date();
	var sec = time.getTime()/1000%100000;
	return sec;
}

animate.prototype.start = function()
{
		while(true)
		{
			if(this.getTime()%this.timeIntervalSec)
			{
				this.funct();
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
