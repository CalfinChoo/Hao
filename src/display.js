const Display = function(cavnas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');

  this.viewBorderLeft = 250;
  this.viewBorderRight = 300;
  this.viewBorderTop = 200;
  this.viewBorderBottom = 260;
  this.xOffset = 0;
  this.yOffset = 0;
  this.positions = [];
  this.motionTrailLength = 10;

  this.img;
  this.parseLevel = function(arr) {
    for (var x = 0; x < arr.length; x++){
      for (var y = 0; y < arr[x].length; y++){
        if (arr[x][y].name=="sky"){
          this.ctx.fillStyle = "#87ceeb";
          this.ctx.fillRect(arr[x][y].x-this.xOffset, arr[x][y].y-this.yOffset, tileSize, tileSize);
        }
        if (arr[x][y].name=="ground"){
          this.ctx.fillStyle = "#D2691E";
          this.img = new Image();
          this.img.src = "assets/grass.png";
          this.ctx.drawImage(this.img, 0, 0, 400, 400, arr[x][y].x-this.xOffset, arr[x][y].y-this.yOffset, tileSize, tileSize);
          // this.ctx.fillRect(arr[x][y].x-this.xOffset, arr[x][y].y-this.yOffset, tileSize, tileSize);
        }
      }
    }
  };
  this.stockImg = new Image();
  this.stockImg.src = "assets/jump.png"

  this.render = function(game) {
    // console.log(this.xOffset);
    var playerX = Math.round(game.player.x), playerY = Math.round(game.player.y);
    if (game.player.x < this.viewBorderLeft) this.xOffset = 0;
    if (playerX > this.viewBorderLeft && playerX < this.viewBorderLeft + this.xOffset) {
      this.xOffset += playerX - (this.viewBorderLeft + this.xOffset);
    }
    else if (playerX > this.viewBorderRight + this.xOffset) {
      this.xOffset += playerX - (this.viewBorderRight + this.xOffset);
    }
    if (this.xOffset > 0) {
      playerX -= this.xOffset;
    }
    if (game.player.y < this.viewBorderTop) this.yOffset = 0;
    if (playerY < this.viewBorderTop + this.yOffset && playerY > this.viewBorderTop + this.yOffset) {
      this.yOffset += playerY - (this.viewBorderTop + this.yOffset);
    }
    else if (playerY > this.viewBorderBottom + this.yOffset) {
      this.yOffset += playerY - (this.viewBorderBottom + this.yOffset);
    }
    if (this.yOffset < 0) {
      playerY -= this.yOffset;
    }
    //console.log(game.player.y);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.parseLevel(test);
    this.ctx.fillRect(playerX, playerY, game.player.width, game.player.height);
    this.renderSprite(game.player.sprites[game.player.status], playerX, playerY, game.player.isRight);
    this.storeLastPosition(playerX, playerY, this.xOffset, this.yOffset);
    // console.log(game.player.hasDash);
    if ((game.player.xVel > game.player.max_xVel || game.player.xVel < -1*game.player.max_xVel || game.player.yVel > game.player.max_yVel || game.player.yVel < -1*game.player.max_yVel) && !game.player.hasDash) {
      for (var i = 0; i < this.positions.length; i++) {
        this.ctx.save();
        this.ctx.globalAlpha = 0.2;
        // console.log(this.positions[i].xOffset + ", " + this.xOffset);
        if (game.player.isRight) this.ctx.drawImage(this.stockImg, 270, 0, 90, 90, this.positions[i].x-22.5-(this.xOffset-this.positions[i].xOffset), this.positions[i].y, 90, 90);
        else {
          this.ctx.save();
          this.ctx.scale(-1, 1);
          this.ctx.drawImage(this.stockImg, 270, 0, 90, 90, -1*(this.positions[i].x-22.5-(this.xOffset-this.positions[i].xOffset)), this.positions[i].y, -90, 90)
          this.ctx.restore();
        }
        this.ctx.restore();
      }
    }
    // console.log(this.positions);
  };
  this.storeLastPosition = function(playerX, playerY, xOff, yOff) {
    this.positions.push({x: playerX, y: playerY, xOffset: xOff, yOffset: yOff});
    if (this.positions.length > this.motionTrailLength) {
      this.positions.shift();
    }
  };


  this.renderSprite = function(sprite, playerX, playerY, isRight) {
    // this.ctx.imageSmoothingEnabled = true;
    // this.ctx.imageSmoothingQuality = 'high';
    sprite.update();
    var a = sprite.frameIndex * sprite.width;
    var xOffset = sprite.width/4;
    if (!isRight) {
      this.ctx.save();
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(sprite.image, a, 0, sprite.width, sprite.height, -1*(playerX-xOffset), playerY - 5, sprite.width*-1, sprite.height);
      this.ctx.restore();
    }
    else this.ctx.drawImage(sprite.image, a, 0, sprite.width, sprite.height, playerX-xOffset, playerY - 5, sprite.width, sprite.height);
  };

};
