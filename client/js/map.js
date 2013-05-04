//Temp replace with actual objects
var c;
var img = new Image();
var SIZE = 16;
var charCoord = {x:5, y:20};
var canvas = {width: 16, height: 16, midpoint:{x:8,y:8}}; //in tiles

function Map(name) {
    this.tilesize = 16;
    this.name = name;
}
//load
//takes "Tiled" generated JSON map object and loads it
Map.prototype.load = function(name) {
    $.getJSON("maps/" + name + ".json", $.proxy(this.loadMap, this));
}
Map.prototype.loadMap = function(tileset){
    this.currMap = tileset;
    img.onload = $.proxy(this.drawMap, this);

    img.src = this.currMap.tilesets[0].image;
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
            c.drawImage(img, img_x, img_y, SIZE, SIZE,
                            s_x, s_y, SIZE, SIZE);

        }
    }
    for(x = -1; x < canvas.width + 1; x++){
        for(y = -1; y < canvas.height + 1; y++){
            //Draw visible NPCs
            var adjustedTile = self.denormalize(x,y);
            var i = self.getTileIndex(adjustedTile.x,adjustedTile.y); //1D array index
            var npc_id = this.currMap.layers[1].data[i];

            if(!npc_id) { continue; }
            var npc = NPCs[npc_id];
            if(!npc) { continue; }

            var npc_sprite = new Image();
            npc_sprite.src = npc.image;
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
    var tileProp = this.currMap.tilesets[0].tileproperties[idx];
    if(tileProp){
        return !tileProp.walk;
    }
    else{
        return true;
    }
}
//getTileID
//specifies the kind of tile (returned as integer id)
//x and y are overall map coords (not canvas)
Map.prototype.getTileID = function(x,y){
    return this.currMap.layers[0].data[this.getTileIndex(x,y)] - 1
}
//getTileIndex
//Tiles are stored in 1D array, this translates for x,y to that index
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
        x: x-character.coord.x+(canvas.width/2),
        y: y-character.coord.y+(canvas.height/2)
    };
}
//Map.denormalize
//Take coordinates for canvas tiles and convert to map coordinates
Map.prototype.denormalize = function(x,y){
    return {
        x: x+character.coord.x-(canvas.width/2),
        y: y+character.coord.y-(canvas.height/2)
    };
}

Map.prototype.getTileCoord = function(x,y){
    return {
        x: ~~(x/this.tilesize),
        y: ~~(y/this.tilesize)
    }
}
