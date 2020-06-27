var arrays =
[ ["S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
  ["S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
  ["S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
  ["S","S","S","S","S","G","S","S","S","G","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
  ["S","S","S","S","S","S","S","S","S","G","S","S","G","S","S","S","S","S","S","S","S","S","S","S","S"],
  ["S","S","S","S","S","S","S","S","S","G","S","S","G","S","S","S","S","S","S","S","S","S","S","S","S"],
  ["S","S","S","S","S","G","SD","S","S","G","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
  ["S","S0","S","S","S","G","SD","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
  ["S","S","S","S","S","G","SD","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
  ["G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G"],
  ["G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G"],
  ["G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G"],
  ["G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G"],
  ["G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G"] ];



const Tile = function(x, y, passable, spawn, checkpoint, death, name){
  this.x = x;
  this.y = y;
  this.passable = passable;
  this.isSpawn = spawn;
  this.isCheckpoint = checkpoint;
  this.isDeath = death;
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
  this.getDeath = function() {
    return this.isDeath;
  }
};

const tileSize = 50;
var parser = function(array){
  var arr = [];
  var temp = [];
  var passable, spawn, checkpoint, death, name;
  for (var y = 0; y < array.length; y++){
    for (var x = 0; x < array[y].length; x++){
      passable = false;
      spawn = false;
      checkpoint= false;
      death = false;
      if (array[y][x].includes("0")) spawn = true;
      else if (array[y][x].includes("C")) checkpoint = true;
      else if (array[y][x].includes("D")) death = true;
      if (array[y][x].includes("S")){
        passable = true;
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, "sky"));
      }
      else if (array[y][x].includes("G")) {
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, "ground"));
      }
    }
    arr.push(temp);
    temp = [];
  }
  return arr;
}

var test = parser(arrays);
