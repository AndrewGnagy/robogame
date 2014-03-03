// animation object 

function animationObject()
{
	this.counter = 0;
	this.actQueue = [];
	this.currentAct = null;
	this.layer = null;
	this.done = false;
}

animationObject.prototype.addActQueue = function(actObject)
{
	this.actQueue.push(actObject);
}

animationObject.prototype.getActQueueLength = function()
{
	return this.actQueue.length();
}

animationObject.prototype.addLayer = function(layer)
{
	this.layer = layer;
}

animationObject.prototype.playCurrentAct = function()
{
	if(this.getActQueueLength() > 0)
	{
		this.currentAct.play()
	}
	else
	{
		this.stop();
	}
}

animationObject.prototype.play = function()
{
	if(!this.done)
	{

	}
}

animationObject.prototype.stop = function()
{
	this.done = true;
}


function act()
{
	this.counter = 0
	this.sceneQueue = [];
	this.currentSceneQueue = null;
	this.layer = null;
}

