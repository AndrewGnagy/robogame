function Dialog(name) {
    this.coord = {x:16, y:16};
	this.isUp = false;
	this.textAry = [];
}

Dialog.prototype.show = function(inputText){
	if(!this.isUp){
		var txt = inputText.pop();
		this.textAry = inputText;
		console.log(txt);
		this.isUp = true;
		robo.dialogLayer.setZIndex(1);
	}
}

Dialog.prototype.advance = function(){
	var txt = this.textAry.pop();
	if(txt){
		//TODO Show text
	} else {
		this.hide();
	}
	console.log(txt);
}

Dialog.prototype.hide = function(){
		robo.dialogLayer.setZIndex(-1);
		this.isUp = false;
}
