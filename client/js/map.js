//Temp replace with actual objects
var SIZE = 16;
var charCoord = {x:6, y:5};
var canvas = {width: 30, height: 20, midpoint:{x:15,y:10}}; //in tiles
$.ajaxSetup({ cache: false });

function Map(name) {
    this.tilesize = 16;
    this.name = name;
}
//load
//takes "Tiled" generated JSON map object and loads it
Map.prototype.load = function(name) {
    //$.getJSON("maps/" + name + ".json", $.proxy(this.loadMap, this));
	$.ajax({
		url: "maps/" + name + ".json",
		dataType: 'json',
		success: $.proxy(this.loadMap, this),
		error: function(request, textStatus, errorThrown) {
			alert(textStatus);
		}
	});
}
Map.prototype.loadMap = function(tileset){
	this.currMap = tileset;
	roboUtils_loadImage('mainmap', this.currMap.tilesets[0].image, $.proxy(this.drawMap, this));
}

Map.prototype.drawMap = function(){
    var self = this;
    for(var x = -1; x < canvas.width + 1; x++){
        for(var y = -1; y < canvas.height + 1; y++){
            //shift coordinates so that character is in the middle of the screen
            var adjustedTile = self.denormalize(x,y);
            var tile_id = self.getTileID(adjustedTile.x,adjustedTile.y); //Tile type
            //Draws 1 tile
            if (!tile_id && tile_id != 0) { continue; }
            var img_x, img_y, s_x, s_y,
                tile = self.currMap.tilesets[0];
            img_x = (tile_id % (tile.imagewidth / SIZE)) * SIZE;
            img_y = ~~(tile_id / (tile.imagewidth / SIZE)) * SIZE;
            s_x = (x * SIZE) - character.animationOffset.x;
            s_y = (y * SIZE) - character.animationOffset.y;
            c.drawImage(IMAGES['mainmap'], img_x, img_y, SIZE, SIZE,
                            s_x, s_y, SIZE, SIZE);

        }
    }
    //Draw next layer in separate loop to avoid cutoff
    for(x = -1; x < canvas.width + 1; x++){
        for(y = -1; y < canvas.height + 1; y++){
            //Draw visible NPCs
            var adjustedTile = self.denormalize(x,y);
            var i = self.getTileIndex(adjustedTile.x,adjustedTile.y); //1D array index
            var npc_id = self.currMap.layers[1].data[i];

            if(!npc_id) { continue; }
            var npc = NPCs[npc_id];
            if(!npc) { continue; }

            var npc_sprite = roboUtils_loadImage(npc.name, npc.image);
            s_x = (x * SIZE) - character.animationOffset.x;
            s_y = ((y * SIZE) - character.animationOffset.y) + (SIZE - npc.height); //Start drawing at bottom left instead of top left
            c.drawImage(npc_sprite, 0, 0, npc.width, npc.height,
                            s_x, s_y, npc.width, npc.height);
        }
    }
}

//getCollision
//x and y are overall map coords (not canvas)
Map.prototype.getCollision = function(x,y){
    var idx = this.getTileID(x,y);
	var i = this.getTileIndex(x,y);
    var tileProp = this.currMap.tilesets[0].tileproperties[idx];
	var hasCharacter = (this.currMap.layers[1].data[i] != 0);
    if(tileProp){
        return (!tileProp.walk || hasCharacter);
    }
    else{
        return true;
    }
}

Map.prototype.doWarp = function(x,y){
	var idx = this.getTileIndex(x,y);
	var warpObj = this.currMap.layers[2].data[idx];
	if(warpObj || idx == 384){
		character.saved.coord.x = warpObj.x;
		character.saved.coord.y = warpObj.y;
		this.load(warpObj.map);
	}
}

//Searches canvas for dialog and show it if exists
Map.prototype.showDialog = function(x,y){
    var i = this.getTileIndex(x,y); //1D array index
    var npc_id = this.currMap.layers[1].data[i];
    if(!npc_id) { return; }
    var npc = NPCs[npc_id];
    if(npc && npc.dialog)
		var dialg = [].concat(npc.dialog); //Breaking reference
        dialog.show(dialg);
}
//getTileID
//specifies the kind of tile (returned as integer id)
//x and y are overall map coords (not canvas)
Map.prototype.getTileID = function(x,y){
    return this.currMap.layers[0].data[this.getTileIndex(x,y)] - 1
}
//getTileIndex
//Tiles are stored in 1D array, this translates from x,y to that index
//x and y are overall map coords (not canvas)
Map.prototype.getTileIndex = function(x,y){
    if(x<0 || y<0 || x>this.currMap.width-1 || y>this.currMap.height-1){
        return false;
    }
    var idx = y * this.currMap.width;
    idx += x;
    return idx;
}
//Map.normalize
//Take coordinates for map tiles and convert to canvas coordinates
Map.prototype.normalize = function(x,y){
    return {
        x: x-character.saved.coord.x+(canvas.width/2),
        y: y-character.saved.coord.y+(canvas.height/2)
    };
}
//Map.denormalize
//Take coordinates for canvas tiles and convert to map coordinates
Map.prototype.denormalize = function(x,y){
    return {
        x: x+character.saved.coord.x-(canvas.width/2),
        y: y+character.saved.coord.y-(canvas.height/2)
    };
}

Map.prototype.getTileCoord = function(x,y){
    return {
        x: ~~(x/this.tilesize),
        y: ~~(y/this.tilesize)
    }
}