function Dialog(name) {
    this.coord = {x:16, y:16};
	this.isUp = false;
	this.textAry = [];
}

Dialog.prototype.show = function(inputText){
	if(!this.isUp){
		this.textAry = inputText;
		this.advance();
		this.isUp = true;
		robo.dialogLayer.setZIndex(1);
	}
}

Dialog.prototype.advance = function(){
	var txt = this.textAry.shift();
	if(txt){
		robo.dialogText.setText(txt);
		robo.dialogText.getLayer().draw();
	} else {
		this.hide();
	}
	console.log(txt);
}

Dialog.prototype.hide = function(){
		robo.dialogLayer.setZIndex(-1);
		this.isUp = false;
}