// ui Text box creation
function textBox(json)
{
	//defaults and json parameter inputs
	var xPosition = ('x' in json)?json.x:100;
	var yPosition = ('y' in json)?json.y:60;
	var widthP = ('width' in json)?json.width:50;
	var heightP = ('height' in json)?json.height:10;
	var alignP = ('align' in json)?json.align:'Left';
	var textP = ('text' in json)?json.text:'Default text';
	var fontSizeP = ('fontSize' in json)?json.fontSize:10;
	var fontFamilyP = ('fontFamily' in json)?json.fontFamily:'Calibri';
	var fontColorP = ('fontColor' in json)?json.fontColor:'black';
	var strokeFrameP = ('strokeFrame' in json)?json.strokeFrame:'black';
	var strokeWidthP = ('strokeWidth' in json)?json.strokeWidth:1;
	var backgroundColorP = ('backgroundColor' in json)?json.backgroundColor:'white';
	var idP = ('id' in json)?json.id:'textbox';
	
	var textGroup = new Kinetic.Group({
		x:xPosition,
		y:yPosition,
		clip:[0,0,widthP,heightP],
		id:idP
	})


	var textBoxFrame = new Kinetic.Rect({
		width: widthP,
		height: heightP,
		stroke:strokeFrameP,
		strokeWidth:strokeWidthP,
		fill:backgroundColorP,
		x:0,
		y:0,
		id:'Frame' 
	});
	
	var textBoxText = new Kinetic.Text({
		align: alignP,
		text: textP,
        fontSize: fontSizeP,
        fontFamily: fontFamilyP,
        fill: fontColorP,
        width:widthP,
        x:0,
        y:0,
        id:'Text'		
	});

	textGroup.add(textBoxFrame);
	textGroup.add(textBoxText);
	


	return textGroup;
}

function WindowDialog(json)
{
	//defaults and json parameter inputs
	var xPosition = ('x' in json)?json.x:0; // x position on stage
	var yPosition = ('y' in json)?json.y:0; // y position on stage
	var widthP = ('width' in json)?json.width:50; // width size
	var heightP = ('height' in json)?json.height:10; // height size
	var alignP = ('align' in json)?json.align:'Left';
	var titleP = ('title' in json)?json.title:'Default text';
	var fontSizeP = ('fontSize' in json)?json.fontSize:10;
	var fontFamilyP = ('fontFamily' in json)?json.fontFamily:'Calibri';
	var fontColorP = ('fontColor' in json)?json.fontColor:'black';
	var strokeFrameP = ('strokeFrame' in json)?json.strokeFrame:'black';
	var strokeWidthP = ('strokeWidth' in json)?json.strokeWidth:1;
	var backgroundColorP = ('backgroundColor' in json)?json.backgroundColor:'white';

	var windowGroup1 = new Kinetic.Group({id:'Window'});
	var windowGroupMain = new Kinetic.Group({
		x:xPosition,
		y:yPosition,
		clip:[0,0,widthP,heightP],
		draggable:true
	})


	var windowBoxFrame = new Kinetic.Rect({
		width: widthP,
		height: heightP,
		stroke:strokeFrameP,
		strokeWidth:strokeWidthP,
		fill:backgroundColorP
	});



	function windowCloseButtonCreate()
	{
		var windowCloseButton = new textBox({
			align: 'center',
			text: 'x',
	        fontSize: fontSizeP,
	        fontFamily: fontFamilyP,
	        fill: backgroundColorP,
	        width:widthP*.2,
	        height:heightP*.1,
	        strokeFrame:'black',
	        x:widthP*.8,
	        y:0,
	        id:'closeButton'		
		});

		windowCloseButton.on('mousedown', function(){
			console.log('closeButton');
			windowGroupMain.destroyChildren();
			windowGroupMain.destroy();
		});
		return windowCloseButton;
	}

	var windowTitleFrame = new textBox({
		align: 'center',
		text: titleP,
        fontSize: fontSizeP,
        fontFamily: fontFamilyP,
        fill: backgroundColorP,
        width:widthP*.8,
        height:heightP*.1,
        strokeFrame:'black',
        x:0,
        y:0,
        id:'Title'	
	});	

	windowGroup1.add(windowBoxFrame);
	windowGroup1.add(windowCloseButtonCreate());
	windowGroup1.add(windowTitleFrame);
	windowGroupMain.add(windowGroup1);

	return windowGroupMain;
}




var tabWindowSlide = function(json)
{
	//defaults and json parameter inputs
	var xPosition = ('x' in json)?json.x:0; // x position on stage
	var yPosition = ('y' in json)?json.y:0; // y position on stage
	var widthP = ('width' in json)?json.width:300; // width size
	var heightP = ('height' in json)?json.height:200; // height size	
	var tabWidthP = ('tabWidth' in json)?json.tabWidth:20; // width size
	var tabHeightP = ('tabHeight' in json)?json.tabHeight:50; // height size
	var alignP = ('align' in json)?json.align:'Left';
	var titleP = ('title' in json)?json.title:'Default text';
	var fontSizeP = ('fontSize' in json)?json.fontSize:10;
	var fontFamilyP = ('fontFamily' in json)?json.fontFamily:'Calibri';
	var fontColorP = ('fontColor' in json)?json.fontColor:'black';
	var strokeFrameP = ('strokeFrame' in json)?json.strokeFrame:'black';
	var strokeWidthP = ('strokeWidth' in json)?json.strokeWidth:1;
	var backgroundColorP = ('backgroundColor' in json)?json.backgroundColor:'white';

	//var layer = new Kinetic.Layer();

	var tabGroup1 = new Kinetic.Group({
		x:-1*widthP,
		y:0
	});

	var tab = new Kinetic.Rect({
		x:widthP+xPosition,
		y:yPosition,
		width:tabWidthP,
		height:tabHeightP,
		fill:backgroundColorP
	});



	var menuWindow = new Kinetic.Rect({
		x:xPosition,
		y:yPosition,
		width:widthP,
		height:heightP,
		fill:backgroundColorP
	});

	tabGroup1.add(tab);
	tabGroup1.add(menuWindow);
	//layer.add(tabGroup1);

	var openAnim = new Kinetic.Animation(function(frame) {
		var amplitude = widthP;
		var period = 4000;
		
		if(tabGroup1.getX() <= -tabWidthP)
		{
			tabGroup1.setX(-1*amplitude * Math.cos(frame.time*Math.PI / period)-tabWidthP);
		}
		else
		{
			tabGroup1.setX(0);			
			openAnim.stop();
		}
	}, tabGroup1);

	var closeAnim = new Kinetic.Animation(function(frame) {
		var amplitude = -1*widthP;
		var period = 4000;
		
		if(tabGroup1.getX() > -1*widthP)
		{
			tabGroup1.setX(tabGroup1.getX()+amplitude * Math.sin(frame.time *2* Math.PI / period));
		}
		else
		{
			tabGroup1.setX(-1*widthP);
			closeAnim.stop();
		}
	}, tabGroup1);



	var open = false;
	tab.on('mousedown',function(){
			open = (open)?false:true;
			if(open)
			{
			openAnim.start();
			}
			else
			{
			closeAnim.start();
			}
	});
	return tabGroup1;
}

function Dialog(name) {
    this.coord = {x:16, y:16};
	this.isUp = false;
	this.textAry = [];
 
	this.dialogLayer = new Kinetic.Layer();
	this.dialogLayer.getCanvas().getElement().setAttribute("id", "dialog");
	var rect = new Kinetic.Rect({
		x: 100,
		y: 60,
		stroke: '#555',
		strokeWidth: 5,
		fill: '#ddd',
		width: 100,
		height: 100,
		shadowColor: 'black',
		shadowBlur: 10,
		shadowOffset: [10, 10],
		shadowOpacity: 0.2,
		cornerRadius: 10,
		opacity: 0.5
	});
	this.dialogText = new Kinetic.Text({
		x: 100,
		y: 60,
		text: 'Default text',
		fontSize: 18,
		fontFamily: 'Calibri',
		fill: '#555',
		width: 100,
		padding: 10,
		align: 'center'
	});
	this.dialogLayer.add(rect);
	this.dialogLayer.add(this.dialogText);
}
 
Dialog.prototype.show = function(inputText){
	if(!this.isUp){
		this.textAry = inputText;
		this.isUp = true;
		this.dialogLayer.setZIndex(2);
		this.advance();
	}
}
 
Dialog.prototype.advance = function(){
	var txt = this.textAry.shift();
	if(txt){
		this.dialogText.setText(txt);
		this.dialogText.getLayer().draw();
	} else {
		this.hide();
	}
	console.log(txt);
}

Dialog.prototype.hide = function(){
		this.isUp = false;
		this.dialogLayer.setZIndex(0);
}

