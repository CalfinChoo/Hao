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
    this.renderSprite(game.player.sprites[game.player.status], game);

  };



  this.renderSprite = function(sprite, game) {
    // this.ctx.imageSmoothingEnabled = true;
    // this.ctx.imageSmoothingQuality = 'high';
    sprite.update();
    var a = sprite.frameIndex * sprite.width;
    var xOffset = sprite.width/4;
    if (!game.player.isRight) {
      this.ctx.save();
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(sprite.image, a, 0, sprite.width, sprite.height, -1*(game.player.x-xOffset), game.player.y, sprite.width*-1, sprite.height);
      this.ctx.restore();
    }
    else this.ctx.drawImage(sprite.image, a, 0, sprite.width, sprite.height, game.player.x-xOffset, game.player.y, sprite.width, sprite.height);
  };

};
