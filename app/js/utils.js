robo = {}; //Global robot object
IMAGES = [];

robo.namespace = function(ns_string){
	var parts = ns_string.split('.'),
		parent = robo,
		i;

	// strip redundant leading global
	if(parts[0] === "robo"){
		parts = parts.slice(1);
	}

	for(var i = 0; i < parts.length; i+=1){
		// create a property if it doesn't exist
		if(typeof parent[parts[i]] === "undefined"){
			parent[parts[i]] = {};
		}
		parent = parent[parts[i]];
	}
	return parent;
};

function roboUtils_loadImage(name, location, onLoad){
	var loaded = false;
	if(IMAGES[name]){
		if(onLoad)
			onLoad();
		return IMAGES[name];
	}
	var img = new Image();
	img.onload = onLoad;
    img.src = location;
	IMAGES[name] = (img);
	return img;
}