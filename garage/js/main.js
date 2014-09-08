
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

	var UI = new garageUI(stage);

}

function loadUser()
{
	startgame();
}

function saveUser()
{
	console.log("empty");
}