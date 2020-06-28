var arrays =
[ ["S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
  ["S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
  ["S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
  ["S","S","S","S","S","G","S","S","S","G","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
  ["S","S","S","S","S","S","S","S","S","G","S","S","G","S","S","S","S","S","S","S","S","S","S","S","S"],
  ["S","S","S","S","S","SC","S","S","S","G","S","S","G","S","S","S","S","S","S","S","S","S","S","S","S"],
  ["S","S","S","S","S","G","SD","S","S","G","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
  ["S","S0","S","S","S","G","SD","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","SD","S"],
  ["S","S","S","S","S","G","SD","S","S","S","S","S","S","SC","S","S","S","S","S","S","S","S","S","S","S"],
  ["G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G"],
  ["G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G"],
  ["G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G"],
  ["G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G"],
  ["G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G"] ];



const Tile = function(x, y, passable, spawn, checkpoint, death, name, sprite, size){
  this.x = x;
  this.y = y;
  this.passable = passable;
  this.isSpawn = spawn;
  this.isCheckpoint = checkpoint;
  this.isDeath = death;
  this.name = name;
  this.sprite = sprite;
  this.size = size;
  this.triggered = false;

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
  };
  this.getCheckpoint = function() {
    return this.isCheckpoint;
  };
  this.getTriggered = function() {
    return this.triggered;
  };
  this.setTriggered = function(e) {
    this.triggered = e;
    return true;
  };
};

const tileSize = 50;
var parser = function(array){
  var arr = [];
  var temp = [];
  var passable, spawn, checkpoint, death, name, sprite, size;
  for (var y = 0; y < array.length; y++){
    for (var x = 0; x < array[y].length; x++){
      passable = false;
      spawn = false;
      checkpoint= false;
      death = false;
      size = 64;
      if (array[y][x].includes("0")) spawn = true;
      else if (array[y][x].includes("C")) checkpoint = true;
      else if (array[y][x].includes("D")) death = true;
      if (array[y][x].includes("S")){
        passable = true;
        name = "sky";
        sprite = "";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("G")) {
        name = "grass";
        sprite = "assets/grass.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
    }
    arr.push(temp);
    temp = [];
  }
  return arr;
}

var test = parser(arrays);
