const Display = function(cavnas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.width = canvas.width;
  this.height = canvas.height;
  this.viewWidth, this.viewHeight;
  // console.log(this.width);

  this.parseLevel = function(arr) {
    for (var x = 0; x < arr.length; x++){
      for (var y = 0; y < arr[x].length; y++){
        if (arr[x][y].name=="sky"){
          this.ctx.fillStyle = "#87ceeb";
          this.ctx.fillRect(arr[x][y].x, arr[x][y].y, tileSize, tileSize);
        }
        if (arr[x][y].name=="ground"){
          this.ctx.fillStyle = "#D2691E";
          this.ctx.fillRect(arr[x][y].x, arr[x][y].y, tileSize, tileSize);
        }
      }
    }
  };

  this.render = function(game) {
    // console.log(game);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.parseLevel(test);
    this.ctx.fillRect(game.player.x, game.player.y, game.player.width, game.player.height);
  };
};
