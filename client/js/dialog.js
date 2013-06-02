function Dialog(name) {
    this.coord = {x:16, y:16};
	this.isUp = false;
}

Dialog.prototype.show = function(showText){
	if(!this.isUp){
		console.log(showText);
		this.isUp = true;
	}
}

Dialog.prototype.hide = function(){

}
