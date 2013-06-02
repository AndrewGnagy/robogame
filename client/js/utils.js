IMAGES = [];

function roboUtils_loadImage(name, location, onLoad){
	var loaded = false;
	if(IMAGES[name]){
		return IMAGES[name];
	}
	var img = new Image();
	img.onload = onLoad;
    img.src = location;
	IMAGES[name] = (img);
	return img;
}