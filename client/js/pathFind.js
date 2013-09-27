function TileNode(mx, my){
    this.x = mx;
    this.y = my;
    this.f = 0;
    this.cost = 0;
    this.came_from = 0;
}

function Pathfind(){
    this.grid = [];
    this.currPath = [];
}

Pathfind.prototype.findPath = function () {
    //x and y - coordinates relative to top left corner of canvas
    //adjustedTile x and y - coordinates relative to top left corner of map
    for(var x = -1; x < canvas.width + 1; x++){
        this.grid[x] = [];
        for(var y = -1; y < canvas.height + 1; y++){
            var adjustedTile = map.denormalize(x,y);
            var currNode = new TileNode(x,y);
            currNode.cost = (map.getCollision(adjustedTile.x,adjustedTile.y) ? 100 : 0);
            
            this.grid[x][y] = currNode;
        }
    }

    //start = middle of screen, goal = clicked position
    scrCoord = map.getTileCoord(inputEngine.mousePos.x, inputEngine.mousePos.y);
    this.aStar(this.grid[~~(canvas.width/2)][~~(canvas.height/2)], this.grid[scrCoord.x][scrCoord.y]);

}

Pathfind.prototype.aStar = function (start,goal) {
     // The set of nodes already evaluated.
    var closedset = [];
    var openset = [start] // The set of tentative nodes to be evaluated, initially containing the start node
    
    start.g = 0 // Cost from start along best known path.
    // Estimated total cost from start to goal through y.
    start.f = start.g + this.manhattan(start, goal)

    while(openset.length > 0){
        current = openset.sort(function(x,y){return x.f - y.f;})[0]
        if(current.x == goal.x && current.y == goal.y){
            //return reconstructed path
            var node_i = goal;
            var return_path = [];
            while(node_i.came_from){
                return_path.push(node_i);
                node_i = closedset[this.nodeIndex(closedset, node_i.came_from)];
            }
            this.currPath = this.relativePath(return_path);
            return;
        }
    
        openset.splice(this.nodeIndex(openset, current), 1); //remove current from openset
        
        closedset.push(current);
        
        var neighbors = this.neighbor_nodes(current);
        for(var i = 0; i < neighbors.length; i++){
            neighbor = neighbors[i];
            var tentative_g = current.g + neighbor.cost;
            if(this.nodeIndex(closedset, neighbor) != -1){
                if(tentative_g >= neighbor.g){
                    continue
                }
            }
    
            if(this.nodeIndex(openset, neighbor) == -1 || tentative_g < neighbor.g){
                neighbor.came_from = {x:current.x, y:current.y};
                neighbor.g = tentative_g;
                neighbor.f = neighbor.g + this.manhattan(neighbor, goal);
                if(this.nodeIndex(openset, neighbor)){
                    openset.push(neighbor);
                }
            }
        }
    }
this.currPath = []; //Failure
return;
}

Pathfind.prototype.nodeIndex = function (myArray, search) {
    var index = -1;
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i].x == search.x && myArray[i].y == search.y) {
            index = i;
            break;
        }
    }
    return index;
}

Pathfind.prototype.relativePath = function(oldPath){
    var x = canvas.midpoint.x;
    var y = canvas.midpoint.y;
    newPath = [];
    while(oldPath.length){
        var nextTile = oldPath.pop();
        if(nextTile.x > x){
            x++;
            newPath.push('right');
        }
        if(nextTile.x < x){
            x--;
            newPath.push('left');
        }
        if(nextTile.y > y){
            y++;
            newPath.push('down');
        }
        if(nextTile.y < y){
            y--;
            newPath.push('up');
        }
    }
    return newPath.reverse();
}
        
Pathfind.prototype.manhattan = function (pos0, pos1) {
    var d1 = Math.abs(pos1.x - pos0.x);
    var d2 = Math.abs(pos1.y - pos0.y);
    return d1 + d2;
}

Pathfind.prototype.neighbor_nodes = function (node) {
    var ret = [];
    var x = node.x;
    var y = node.y;

    // West
    if(this.grid[x-1] && this.grid[x-1][y]) {
        ret.push(this.grid[x-1][y]);
    }

    // East
    if(this.grid[x+1] && this.grid[x+1][y]) {
        ret.push(this.grid[x+1][y]);
    }

    // South
    if(this.grid[x] && this.grid[x][y-1]) {
        ret.push(this.grid[x][y-1]);
    }

    // North
    if(this.grid[x] && this.grid[x][y+1]) {
        ret.push(this.grid[x][y+1]);
    }

    return ret;
}
