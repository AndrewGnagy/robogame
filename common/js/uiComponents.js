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
        x:5,
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

textBox.prototype.searchChildrenId = function(Id)
{
	var children = this.textGroup.getChildren();
	var foundChild = null;
	for(var i = 0; children.length > i;i++)
	{
		if(children[i].getId() === Id)
		{
			foundChild = children[i];
		}
	}
	return foundChild;
}

textBox.prototype.setAttrText = function(attr,value)
{
	var textObject = this.searchChildrenId("Text");
	textObject.setAttr(attr,value);
}

textBox.prototype.setAttrFrame = function(attr,value)
{
	var frameObject = this.searchChildrenId("Frame");
	frameObject.setAttr(attr,value);
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
		id:'TitleFrame',
		x:5,
		y:heightP*-.15
	});

	this.windowGroup2 = new Kinetic.Group({
		id:'WindowFrame',
		clip:[0,0,widthP,heightP]
	});

	var windowTitleFrame = new textBox({
		align: 'center',
		text: titleP,
        fontSize: fontSizeP,
        fontFamily: fontFamilyP,
        backgroundColor: backgroundColorP,
        fontColor:fontColorP,
        width:widthP*.9,
        height:fontSizeToPixel(fontSizeP),
        strokeFrame:'black',
        x:0,
        y:-fontSizeToPixel(fontSizeP)*.25,
        id:'Title'
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
	        width:widthP*.25,
	        height:fontSizeToPixel(fontSizeP),
	        strokeFrame:'black',
	        x:widthP*.7,
	        y:-fontSizeToPixel(fontSizeP)*.25,
	        id:'closeButton'
		});

		windowCloseButton.textGroup.on('mousedown', function(){
			console.log('closeButton');
			self.hide();
		});
		return windowCloseButton.textGroup;
	}

	this.windowGroup2.add(this.windowBoxFrame);
	this.windowGroup1.add(windowTitleFrame.textGroup);
	//this.windowGroup1.add(windowCloseButtonCreate());

	this.windowGroupMain.add(this.windowGroup2);
	this.windowGroupMain.add(this.windowGroup1);
}

WindowDialog.prototype.getHeight = function()
{
	return this.windowBoxFrame.getHeight();
}

WindowDialog.prototype.getTitleHeight = function()
{
	return this.windowTitleFrame.getHeight();
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

WindowDialog.prototype.add = function(kineticObject)
{
	var classObjectName = kineticObject.getClassName();
	var classId = kineticObject.getId()
	if(classObjectName === 'Group' && classId === 'textbox')
	{
		var clipHeight = this.getHeight();
		var clipWidth = this.getWidth()-10;
		this.windowGroup2.setClip([5,0,clipWidth,clipHeight]);
		this.windowGroup2.setX(5);
	}
	this.windowGroup2.add(kineticObject);
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
	this.name = "";

	this.dialogLayer = new Kinetic.Layer();
	this.dialogLayer.getCanvas()._canvas.setAttribute("id", "dialog");
	var rect = new Kinetic.Rect({
		x: 150,
		y: 150,
		stroke: '#555',
		strokeWidth: 5,
		fill: '#ddd',
		width: canvas.width * SIZE - 300,
		height: canvas.height * SIZE - 300,
		shadowColor: 'black',
		shadowBlur: 10,
		shadowOffset: [10, 10],
		shadowOpacity: 0.2,
		cornerRadius: 10,
		opacity: 0.65
	});
	this.dialogText = new Kinetic.Text({
		x: 200,
		y: 250,
		text: 'Default text',
		fontSize: 18,
		fontFamily: 'Calibri',
		fill: '#555',
		width: canvas.width * SIZE - 350,
		padding: 10,
		align: 'center'
	});
	this.nameText = new Kinetic.Text({
		x: 200,
		y: 200,
		text: 'Default text',
		fontSize: 18,
		fontFamily: 'Calibri',
		fill: '#555',
		width: canvas.width * SIZE - 350,
		padding: 10,
		align: 'center'
	});
	this.dialogLayer.add(rect);
	this.dialogLayer.add(this.dialogText);
	this.dialogLayer.add(this.nameText);
}

Dialog.prototype.show = function(inputText, name, callback){
	if(typeof inputText === "string")
		inputText = [inputText];
	if(!name)
		name = "";
	if(!this.isUp){
		this.callback = callback;
		this.textAry = inputText;
		this.name = name;
		this.isUp = true;
		this.dialogLayer.setZIndex(2);
		this.advance();
	}
}

Dialog.prototype.advance = function(){
	var txt = this.textAry.shift();
	if(txt){
		this.nameText.setText(this.name);
		this.dialogText.setText(txt);
		this.dialogText.getLayer().draw();
	} else {
		if(this.callback)
			this.callback();
		this.callback = undefined;
		this.hide();
	}
	console.log(txt);
}

Dialog.prototype.hide = function(){
	this.isUp = false;
	this.dialogLayer.setZIndex(0);
}


function roughFontSizeToPixel(fontSize)
{
	var pixel;
	switch(fontSize)
	{
		case 6:
			pixel = 8;
			break;
		case 7:
			pixel = 9;
			break;
		case 8:
			pixel = 11;
			break;
		case 9:
			pixel = 12;
			break;
		case 10:
			pixel = 13;
			break;
		case 11:
			pixel = 15;
			break;
		case 12:
			pixel = 16;
			break;
		case 13:
			pixel = 17;
			break;
		case 14:
			pixel = 18;
			break;
		case 15:
			pixel = 21;
			break;
		case 16:
			pixel = 22;
			break;
		case 17:
			pixel = 23;
			break;
		case 18:
			pixel = 24;
			break;
		case 20:
			pixel = 26;
			break;
		case 22:
			pixel = 29;
			break;
		case 24:
			pixel = 32;
			break;
		case 26:
			pixel = 35;
			break;
		case 27:
			pixel = 36;
			break;
		case 28:
			pixel = 37;
			break;
		case 29:
			pixel = 38;
			break;
		case 30:
			pixel = 40;
			break;
		case 32:
			pixel = 42;
			break;
		case 34:
			pixel = 45;
			break;
		case 36:
			pixel = 48;
			break;
		default:
			console.log("Error")
			pixel = 8;
	}
	return pixel;
}

function fontSizeToPixel(fontSize)
{
	var pixel = roughFontSizeToPixel(fontSize);
	return pixel;
}