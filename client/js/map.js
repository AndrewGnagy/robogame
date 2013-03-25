//Temp replace with actual objects
var c;
var img = new Image();
var charCoord = {x:5, y:20};
var canvas = {width: 16, height: 16}; //in tiles

function Map(name) {
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
    this.currMap.layers.forEach($.proxy(this.renderLayer, this));
}
Map.prototype.renderLayer = function(layer){
    var self = this;
    //layer.data.forEach(function(tile_idx, i) {
    for(var x = -1; x < canvas.width + 1; x++){
        for(var y = -1; y < canvas.height + 1; y++){
            var adjustedTile = {
                x: x+character.coord.x-(canvas.width/2),
                y: y+character.coord.y-(canvas.height/2)
            };
            var tile_idx = self.getTileID(adjustedTile.x,adjustedTile.y);
            var i = self.getTileIndex(x+character.coord.x,y+character.coord.y);
            //Draws 1 tile
            var size = 16;
            if (!tile_idx && tile_idx != 0) { continue; }
            var img_x, img_y, s_x, s_y,
                tile = self.currMap.tilesets[0];
            img_x = (tile_idx % (tile.imagewidth / size)) * size;
            img_y = ~~(tile_idx / (tile.imagewidth / size)) * size;
            s_x = (x * size) - character.animationOffset.x;
            s_y = (y * size) - character.animationOffset.y;
            c.drawImage(img, img_x, img_y, size, size,
                              s_x, s_y, size, size);
        }
    }
    //});
}
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
Map.prototype.getTileID = function(x,y){
    return this.currMap.layers[0].data[this.getTileIndex(x,y)] - 1
}
Map.prototype.getTileIndex = function(x,y){
    if(x<0 || y<0 || x>this.currMap.width-1 || y>this.currMap.height-1){
        return false;
    }
    var idx = y * this.currMap.width;
    idx += x;
    return idx;
}
