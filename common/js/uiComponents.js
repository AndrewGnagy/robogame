// ui Text box creation
function textBox(json)
{
	//defaults and json parameter inputs
	xPosition = (json.x)?json.x:100;
	yPosition = (json.y)?json.y:60;
	widthP = (json.width)?json.width:100;
	heightP = (json.height)?json.height:50;
	alignP = (json.align)?json.align:'Left';
	textP = (json.text)?json.text:'Default text';
	
	
	var textBoxGroup = new Kinetic.Group({
		x: xPosition,
		y: yPosition
	});

	var textBoxFrame = new Kinetic.Rect({
		width: widthP,
		height: heightP,
	});
	
	var textBoxText = new Kinetic.Text({
		align: alignP,
		text: textP
	});

	textBoxGroup.add(textBoxFrame);
	textBoxGroup.add(textBoxText);
	
	return 0;

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