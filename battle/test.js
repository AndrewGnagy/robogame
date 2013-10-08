WIDTH = 600;
HEIGHT = 200;

stage = new Kinetic.Stage({
	container: 'gameScreen',
	width:WIDTH,
	height:HEIGHT
});

backgroundLayer = new Kinetic.Layer();


var testTextBox = new WindowDialog({title:'Attack',width:100,height:100}); 
var tab = tabWindowSlide({backgroundColor:'green'});



backgroundLayer.add(testTextBox);
backgroundLayer.add(tab);

stage.add(backgroundLayer);


var timer = setInterval(function(){
	loop();
},150);

function loop()
{  // loop run
	stage.draw();
}

