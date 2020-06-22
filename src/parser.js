var arrays =
[["S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
["S","S","S","S","S","G","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
["S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
["S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
["S","S","S","S","S","G","S","G","S","S","S","S","S","S","S","S","S","S","S","S"],
["S","S","S","S","S","G","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
["S","S","S","S","S","G","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
["G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G"],
["G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G"],
["G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G"],
["G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G"],
["G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G"]];



const Tile = function(x, y, passable, sprite, name){
  this.x = x;
  this.y = y;
  this.passable = passable;
  this.sprite = sprite;
  this.name = name;
  this.getX = function() {
    return this.x;
  };
  this.getY = function() {
    return this.y;
  };
  this.getPassable = function() {
    return this.passable;
  };
};

const tileSize = 50;
var parser = function(array){
  var arr = [];
  var temp = [];
  for (var y = 0; y < array.length; y++){
    for (var x = 0; x < array[y].length; x++){
      if (array[y][x] == "S"){
        temp.push(new Tile(x*tileSize, y*tileSize, true, "cool", "sky"));
      }
      if (array[y][x] == "G"){
        temp.push(new Tile(x*tileSize, y*tileSize, false, "cool", "ground"));
      }
    }
    arr.push(temp);
    temp = [];
  }
  return arr;
}

var test = parser(arrays);
