
WIDTH = 768;
HEIGHT = 512;

var character = new Character('hero');

function startgame()
{

	var stage = new Kinetic.Stage({
			container: 'container',
			width: WIDTH,
			height: HEIGHT
		});

 	var localLayer = new Kinetic.Layer();

	var girlImagePath = "../garage/images/GarageGirl.png";
	var girlImageName = "GarageGirl";
	roboUtils_loadImage(girlImageName,girlImagePath);

	var girlImageObj = new Kinetic.Image({
		x:WIDTH/3,
		image:IMAGES[girlImageName]
	})

 	stage.add(localLayer)
 	localLayer.add(girlImageObj)
 	stage.draw()

}

function loadUser()
{
	startgame();
}

function saveUser()
{
	console.log("empty");
}