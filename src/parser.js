var arrays =
[["S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
["S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
["S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
["S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
["S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
["S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
["S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S","S"],
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
};

var parser = function(array){
  var arr = [];
  var temp = [];
  for (var y = 0; y < array.length; y++){
    for (var x = 0; x < array[y].length; x++){
      if (array[y][x] == "S"){
        temp.push(new Tile(x*50, y*50, "yes", "cool", "sky"));
      }
      if (array[y][x] == "G"){
        temp.push(new Tile(x*50, y*50, "no", "cool", "ground"));
      }
    }
    arr.push(temp);
    temp = [];
  }
  return arr;
}

var test = parser(arrays);
