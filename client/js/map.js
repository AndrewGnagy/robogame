//Temp replace with actual objects
var c;
var img = new Image();

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
    layer.data.forEach(function(tile_idx, i) {
        var size = 16;
        if (!tile_idx) { return; }
        var img_x, img_y, s_x, s_y,
            tile = self.currMap.tilesets[0];
        tile_idx--;
        img_x = (tile_idx % (tile.imagewidth / size)) * size;
        img_y = ~~(tile_idx / (tile.imagewidth / size)) * size;
        s_x = (i % layer.width) * size;
        s_y = ~~(i / layer.width) * size;
        c.drawImage(img, img_x, img_y, size, size,
                          s_x, s_y, size, size);
    });
}
