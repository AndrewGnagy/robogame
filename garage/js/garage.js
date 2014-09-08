WIDTH = 768;
HEIGHT = 512;


function garageObject(player)
{
	var self = this;
}


garageObject.prototype.main = function(stage)
{
	this.stage = stage;
}


function garageUI(stage)
{
	this.stage = stage;

 	var localLayer = new Kinetic.Layer();

 	var garageImagePath = "../garage/images/garagebackgrounds.jpg"
 	var garageImageName = "GarageBackground"

	var girlImagePath = "../garage/images/GarageGirl.png";
	var girlImageName = "GarageGirl";
	roboUtils_loadImage(girlImageName,girlImagePath);
	roboUtils_loadImage(garageImageName,garageImagePath);

	var girlImageObj = new Kinetic.Image({
		x:WIDTH/3,
		image:IMAGES[girlImageName]
	})

	var garagebackgroundImageObj = new Kinetic.Image({
		image:IMAGES[garageImageName]
	})

 	this.stage.add(localLayer)
 	localLayer.add(garagebackgroundImageObj)
 	localLayer.add(girlImageObj)
 	this.stage.draw()
}
