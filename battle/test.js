WIDTH = 600;
HEIGHT = 200;

stage = new Kinetic.Stage({
	container: 'gameScreen',
	width:WIDTH,
	height:HEIGHT
});

backgroundLayer = new Kinetic.Layer();


var testTextBox = new WindowDialog({title:'Attack',width:100,height:100}); 
//var tab = new tabWindowSlide({backgroundColor:'green'});



backgroundLayer.add(testTextBox.windowGroupMain);
//backgroundLayer.add(tab.tabGroup1);

stage.add(backgroundLayer);