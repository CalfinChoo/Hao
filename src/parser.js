var arrays =
[ ["S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
  ["S","S","S","F","F","F","F","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
  ["S","S","F","F","F","F","F","F","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
  ["S","F","F","F","F","F","F","F","F","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
  ["F","F","F","F","F","F","F","F","F","F","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
  ["S","L","O","O","O","O","O","O","L","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
  ["S","L","O","O","O","O","O","O","L","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
  ["S","L","O","O0","Z3","Z3","O","O","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
  ["S","L","O","O","O","O","O","O","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
  ["S","L","F","F","F","F","F","F","L","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
  ["G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","S","S","S","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","G","S","S","S","G","G","G","G","G","G"],
  ["I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","S","S","S","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","S","S","S","I","I","I","I","I","I"],
  ["I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","I","S","S","S","I","I","I","I","I","I"],
  ["T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T"],
  ["T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T"],
  ["T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T"],
  ["B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B"],
  ["B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B"] ];



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
      else if (array[y][x].includes("I")) {
        name = "dirt";
        sprite = "assets/dirt.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("L")) {
        name = "log";
        sprite = "assets/log_oak.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("V")) {
        passable = true;
        name = "leaves";
        sprite = "assets/leaves_oak_opaque.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("B")) {
        name = "bedrock";
        sprite = "assets/bedrock.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("R")) {
        name = "brick";
        sprite = "assets/brick.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("O")) {
        passable = true;
        name = "cobblestone";
        sprite = "assets/cobblestone.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("M")) {
        name = "cobblestone_mossy";
        sprite = "assets/cobblestone_mossy.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("A")) {
        name = "daylight_detector";
        sprite = "assets/daylight_detector_top.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("P")) {
        name = "podzol";
        sprite = "assets/dirt_podzol_side.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("E")) {
        name = "emerald";
        sprite = "assets/emerald_block.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("Z1")) {
        passable = true;
        name = "glass";
        sprite = "assets/glass.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("Z2")) {
        passable = true;
        name = "glass_black";
        sprite = "assets/glass_black.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("Z3")) {
        passable = true;
        name = "glass_blue";
        sprite = "assets/glass_blue.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("Z4")) {
        passable = true;
        name = "glass_brown";
        sprite = "assets/glass_brown.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("Z5")) {
        passable = true;
        name = "glass_cyan";
        sprite = "assets/glass_cyan.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("Z6")) {
        passable = true;
        name = "glass_gray";
        sprite = "assets/glass_gray.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("Z7")) {
        passable = true;
        name = "glass_green";
        sprite = "assets/glass_green.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("Z8")) {
        passable = true;
        name = "glass_light_blue";
        sprite = "assets/glass_light_blue.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("Z9")) {
        passable = true;
        name = "glass_lime";
        sprite = "assets/glass_lime.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("1Z")) {
        passable = true;
        name = "glass_magenta";
        sprite = "assets/glass_magenta.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("2Z")) {
        passable = true;
        name = "glass_orange";
        sprite = "assets/glass_orange.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("3Z")) {
        passable = true;
        name = "glass_pink";
        sprite = "assets/glass_pink.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("4Z")) {
        passable = true;
        name = "glass_purple";
        sprite = "assets/glass_purple.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("5Z")) {
        passable = true;
        name = "glass_red";
        sprite = "assets/glass_red.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("6Z")) {
        passable = true;
        name = "glass_silver";
        sprite = "assets/glass_silver.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("7Z")) {
        passable = true;
        name = "glass_white";
        sprite = "assets/glass_white.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("8Z")) {
        passable = true;
        name = "glass_yellow";
        sprite = "assets/glass_yellow.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("N")) {
        name = "snow";
        sprite = "assets/grass_side_snowed.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("Y")) {
        name = "mycelium";
        sprite = "assets/mycelium_side.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("T")) {
        name = "stone";
        sprite = "assets/stone.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("K1")) {
        name = "stonebrick";
        sprite = "assets/stonebrick.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("K2")) {
        name = "stonebrick_cracked";
        sprite = "assets/stonebrick_cracked.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("K3")) {
        name = "stonebrick_mossy";
        sprite = "assets/stonebrick_mossy.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("X")) {
        name = "tnt";
        sprite = "assets/tnt_side.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
      else if (array[y][x].includes("F")) {
        name = "planks_oak";
        sprite = "assets/planks_oak.png";
        temp.push(new Tile(x*tileSize, y*tileSize, passable, spawn, checkpoint, death, name, sprite, size));
      }
    }
    arr.push(temp);
    temp = [];
  }
  return arr;
}

var test = parser(arrays);
