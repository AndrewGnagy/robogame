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

	this.textGroup = new Kinetic.Group({
		x:xPosition,
		y:yPosition,
		clip:[0,0,widthP,heightP],
		id:idP
	});


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

	this.textGroup.add(textBoxFrame);
	this.textGroup.add(textBoxText);
}

textBox.prototype.setAttr = function(attr,value)
{
	this.textGroup.setAttr(attr,value);
}

textBox.prototype.setAttrs = function(json)
{
	this.textGroup.setAttrs(json);
}

textBox.prototype.hide = function()
{
	this.textGroup.hide();
}

textBox.prototype.show = function()
{
	this.textGroup.show();
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
	var self = this;

	this.windowGroupMain = new Kinetic.Group({
		x:xPosition,
		y:yPosition,
		draggable:true
	});

	this.windowBoxFrame = new Kinetic.Rect({
		width: widthP,
		height: heightP,
		stroke:strokeFrameP,
		strokeWidth:strokeWidthP,
		fill:backgroundColorP,
		clip:[0,0,widthP,heightP]
	});

	this.windowGroup1 = new Kinetic.Group({
		id:'Window',
		y:heightP*-.1
	});

	this.windowGroup2 = new Kinetic.Group({
		id:'WindowFrame',
	});


	function windowCloseButtonCreate()
	{
		var windowCloseButton = new textBox({
			align: 'center',
			text: 'x',
	        fontSize: fontSizeP,
	        fontFamily: fontFamilyP,
	        backgroundColor: backgroundColorP,
	        fontColor:fontColorP,
	        width:widthP*.2,
	        height:heightP*.1,
	        strokeFrame:'black',
	        x:widthP*.8,
	        y:0,
	        id:'closeButton'
		});

		windowCloseButton.textGroup.on('mousedown', function(){
			console.log('closeButton');
			//var layer = self.windowGroupMain.getLayer();
			//self.windowGroupMain.destroyChildren();
			//self.windowGroupMain.destroy();
			//layer.draw();
			self.hide();
		});
		return windowCloseButton.textGroup;
	}

	var windowTitleFrame = new textBox({
		align: 'center',
		text: titleP,
        fontSize: fontSizeP,
        fontFamily: fontFamilyP,
        backgroundColor: backgroundColorP,
        fontColor:fontColorP,
        width:widthP*.8,
        height:heightP*.1,
        strokeFrame:'black',
        x:0,
        y:0,
        id:'Title'
	});

	this.windowGroup2.add(this.windowBoxFrame);
	this.windowGroup1.add(windowTitleFrame.textGroup);
	this.windowGroup1.add(windowCloseButtonCreate());

	this.windowGroupMain.add(this.windowGroup2);
	this.windowGroupMain.add(this.windowGroup1);
}

WindowDialog.prototype.getHeight = function()
{
	return this.windowBoxFrame.getHeight();
}

WindowDialog.prototype.setPosition = function(x,y)
{
	this.windowGroupMain.setPosition(x,y);
}

WindowDialog.prototype.getWidth = function()
{
	return this.windowBoxFrame.getWidth();
}

WindowDialog.prototype.hide = function()
{
	this.windowGroupMain.hide();
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
	var self = this;

	this.tabGroup1 = new Kinetic.Group({
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

	this.tabGroup1.add(tab);
	this.tabGroup1.add(menuWindow);

	var openAnim = new Kinetic.Animation(function(frame) {
		var amplitude = widthP;
		var period = 4000;

		if(self.tabGroup1.getX() <= -tabWidthP)
		{
			self.tabGroup1.setX(-1*amplitude * Math.cos(frame.time*Math.PI / period)-tabWidthP);
		}
		else
		{
			self.tabGroup1.setX(0);
			self.tabGroup1.getLayer().draw();
			openAnim.stop();
		}
	}, this.tabGroup1);

	var closeAnim = new Kinetic.Animation(function(frame) {
		var amplitude = -1*widthP;
		var period = 4000;

		if(self.tabGroup1.getX() > -1*widthP)
		{
			self.tabGroup1.setX(self.tabGroup1.getX()+amplitude * Math.sin(frame.time *2* Math.PI / period));
		}
		else
		{
			self.tabGroup1.setX(-1*widthP);
			self.tabGroup1.getLayer().draw();
			closeAnim.stop();
		}
	}, this.tabGroup1);



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
}

function Dialog(name) {
    this.coord = {x:16, y:16};
	this.isUp = false;
	this.textAry = [];

	this.dialogLayer = new Kinetic.Layer();
	this.dialogLayer.getCanvas()._canvas.setAttribute("id", "dialog");
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

