const Display = function(cavnas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.width = canvas.width;
  this.height = canvas.height;
  this.viewWidth, this.viewHeight;
  // console.log(this.width);

  this.parseLevel = function(arr, game) {
    for (var x = 0; x < arr.length; x++){
      for (var y = 0; y < arr[x].length; y++){
        if (arr[x][y].name=="sky"){
          this.ctx.fillRect(arr[x][y].x, arr[x][y].y, 50, 50);
          this.ctx.fillStyle = "#87ceeb";
        }
        if (arr[x][y].name=="ground"){
          this.ctx.fillRect(arr[x][y].x, arr[x][y].y, 50, 50);
          this.ctx.fillStyle = "#D2691E";
        }
        console.log(x);
        console.log(y);
      }
    }
  };

  this.render = function(game) {
    // console.log(game);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.parseLevel(test, game);
    this.ctx.fillRect(game.player.x, game.player.y, 20, 20);
  };
};
