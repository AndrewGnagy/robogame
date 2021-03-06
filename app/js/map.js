//Temp replace with actual objects
var SIZE = 32;
var canvas = {width: 24, height: 16, midpoint:{x:12,y:8}}; //in tiles
//var canvas = {width: 30, height: 20, midpoint:{x:15,y:10}}; //in tiles
$.ajaxSetup({ cache: false });

function Map(name) {
    this.tilesize = 32;
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
    roboUtils_loadImage(this.currMap.name, this.currMap.tilesets[0].image, $.proxy(this.drawMap, this));
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
            c.drawImage(IMAGES[self.currMap.name], img_x, img_y, SIZE, SIZE,
                            s_x, s_y, SIZE, SIZE);

        }
    }
    //Draw next layer in separate loop to avoid cutoff
    for(x = -1; x < canvas.width + 1; x++){
        for(y = -1; y < canvas.height + 1; y++){
            var adjustedTile = self.denormalize(x,y);
            var i = self.getTileIndex(adjustedTile.x,adjustedTile.y); //1D array index
            var npc_id = self.currMap.npcs[i];
            var item = self.currMap.items[i];

            if(!npc_id && !item) { continue; }
            var npc = NPCs[npc_id];
            if(!npc && !item) { continue; }
			if(character.saved.story.defeatedNPCs.indexOf(npc_id) != -1) { continue; } //Don't draw defeated npcs

            //Drawing calculations
            s_x = (x * SIZE) - character.animationOffset.x;
            s_y = (y * SIZE) - character.animationOffset.y; //Start drawing at bottom left instead of top left

            //Draw any items
            if(item){
                //Don't draw if already picked up
                if(character.saved.itemsPicked[item.itemid]) { continue; }
                var item_sprite = roboUtils_loadImage(item.name, item.image);
                c.drawImage(item_sprite, item.imgx, item.imgy, SIZE, SIZE,
                            s_x, s_y, SIZE, SIZE);
            }

            //Draw any npcs
            if(npc){
                s_y = ((y * SIZE) - character.animationOffset.y) + (SIZE - npc.height); //Start drawing at bottom left instead of top left
                var npc_sprite = roboUtils_loadImage(npc.name, npc.image);
                c.drawImage(npc_sprite, 0, 0, npc.width, npc.height,
                                s_x, s_y, npc.width, npc.height);
            }
        }
    }
}

//getCollision
//x and y are overall map coords (not canvas)
Map.prototype.getCollision = function(x,y){
    var idx = this.getTileID(x,y);
    var i = this.getTileIndex(x,y);
    var tileProp = this.currMap.tilesets[0].tileproperties[idx];
	var npc_id = this.currMap.npcs[i];
    var hasCharacter = (!!npc_id && character.saved.story.defeatedNPCs.indexOf(npc_id) == -1);
    if(tileProp){
        return (!tileProp.walk || hasCharacter);
    }
    else{
        return true;
    }
}

//Map.detectTile
//Performs actions if the tile is a special type of tile
Map.prototype.detectTile = function(x,y){
    var i = this.getTileIndex(x,y);

	//If it's a warp tile, perform warp
    var warpObj = this.currMap.warptiles[i];
    if(warpObj){
		pathFind.currPath = [];
        character.saved.coord.x = warpObj.x;
        character.saved.coord.y = warpObj.y;
        this.load(warpObj.map);
		return;
    }

	//If it's an item tile, get item
    var itemObj = this.currMap.items[i];
    if(itemObj){
		if(character.saved.itemsPicked[itemObj.itemid]){ return; }
		character.saved.itemsPicked[itemObj.itemid] = true;
		character.saved.inventory.push(itemObj);
		robo.dialog.show(["You picked up: "+itemObj.name]);
		return;
    }

	//If it's an item tile, get item
	if(this.currMap.specialtiles){
		var specialObj = this.currMap.specialtiles[i];
		if(specialObj){
			specialObj.callback();
			return;
		}
	}

    var npc_id = this.currMap.npcs[i];
	if(npc_id && character.saved.story.defeatedNPCs.indexOf(npc_id) == -1){
		var npc = NPCs[npc_id];
		if(npc && npc.action){
			npc.action();
		}
	}
}

//Searches npc for dialog and show it if exists
/*Map.prototype.showDialog = function(x,y){
	console.log('showDialog');
    var i = this.getTileIndex(x,y); //1D array index
}*/

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
        x: x-character.saved.coord.x+~~(canvas.width/2),
        y: y-character.saved.coord.y+~~(canvas.height/2)
    };
}
//Map.denormalize
//Take coordinates for canvas tiles and convert to map coordinates
Map.prototype.denormalize = function(x,y){
    return {
        x: x+character.saved.coord.x-~~(canvas.width/2),
        y: y+character.saved.coord.y-~~(canvas.height/2)
    };
}

//Map.getTileCoord
//Converts click coords to tile coords
Map.prototype.getTileCoord = function(x,y){
    return {
        x: ~~(x/this.tilesize),
        y: ~~(y/this.tilesize)
    }
}