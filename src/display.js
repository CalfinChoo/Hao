const Display = function(cavnas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.ctx.font = "bold 25pt Courier";
  this.ctx.textAlign = "center";
  this.viewBorderLeft = Math.round(this.canvas.width / 2.4);
  this.viewBorderRight = Math.round(this.canvas.width / 2);
  this.viewBorderTop = Math.round(this.canvas.height /3);
  this.viewBorderBottom = Math.round(this.canvas.height / 2);
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
        else {
          this.img = new Image();
          this.img.src = arr[x][y].sprite;
          this.ctx.drawImage(this.img, 0, 0, 64, 64, arr[x][y].x-this.xOffset, arr[x][y].y-this.yOffset, tileSize, tileSize);
        }
        if (arr[x][y].getDeath()){
          this.img = new Image();
          this.img.src = "assets/spike.png";
          this.ctx.drawImage(this.img, 0, 0, 50, 50, arr[x][y].x-this.xOffset, arr[x][y].y-this.yOffset, tileSize, tileSize);
        }
        else if (arr[x][y].getCheckpoint()) {
          this.img = new Image();
          if (arr[x][y].getTriggered()) this.img.src = "assets/torch_on.png";
          else this.img.src = "assets/torch.png";
          this.ctx.drawImage(this.img, 0, 0, 64, 64, arr[x][y].x-this.xOffset, arr[x][y].y-this.yOffset, tileSize, tileSize);
        }
        if (arr[x][y].getFinish()) {
          this.img = new Image();
          this.img.src = "assets/beacon.png";
          this.ctx.drawImage(this.img, 0, 0, 64, 64, arr[x][y].x-this.xOffset, arr[x][y].y-this.yOffset, tileSize, tileSize);
        }
      }
    }
  };
  this.stockImg = new Image();
  this.stockImg.src = "assets/jump.png"
  this.messages = [
    "A+D to Move",
    "Space to Jump",
    "This is a",
    "Checkpoint",
    ">>>",
    "Shift+W/S",
    "to Climb",
    "Space+A/D",
    "to Wall",
    "Jump",
    "K+WASD",
    "to Dash",
    "This is",
    "the Finish",
    ">>>"
  ];

  this.render = function(game) {
    var playerX = Math.round(game.player.x), playerY = Math.round(game.player.y);
    if (game.player.x < this.viewBorderLeft) this.xOffset = 0;
    if (playerX > this.viewBorderLeft && playerX < this.viewBorderLeft + this.xOffset) {
      this.xOffset += playerX - (this.viewBorderLeft + this.xOffset);
    }
    else if (game.player.x < game.worldRightBorder - (this.canvas.width - this.viewBorderRight) && playerX > this.viewBorderRight + this.xOffset) {
      this.xOffset += playerX - (this.viewBorderRight + this.xOffset);
    }
    else if (game.player.x > game.worldRightBorder - (this.canvas.width - this.viewBorderRight)) this.xOffset = game.worldRightBorder - (this.canvas.width - this.viewBorderRight) - this.viewBorderRight;
    if (this.xOffset > 0) {
      playerX -= this.xOffset;
    }
    if (game.player.y < this.viewBorderTop) this.yOffset = 0;
    if (playerY > this.viewBorderTop && playerY < this.viewBorderTop + this.yOffset) {
      this.yOffset += playerY - (this.viewBorderTop + this.yOffset);
    }
    else if (game.player.y < game.worldBottomBorder - (this.canvas.height - this.viewBorderBottom) && playerY > this.viewBorderBottom + this.yOffset) {
      this.yOffset += playerY - (this.viewBorderBottom + this.yOffset);
    }
    else if (game.player.y > game.worldBottomBorder - (this.canvas.height - this.viewBorderBottom)) this.yOffset = game.worldBottomBorder - (this.canvas.height - this.viewBorderBottom) - this.viewBorderBottom;
    if (this.yOffset > 0) {
      playerY -= this.yOffset;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.parseLevel(game.levels[game.level]);
    this.ctx.fillStyle = "black";
    for (var i = 0; i < game.levelInfo['messages'].length; i++) {
      if (this.messages[i] == undefined) break;
      this.ctx.fillText(this.messages[i + game.messageStartIndex], game.levelInfo['messages'][i][0] - this.xOffset, game.levelInfo['messages'][i][1] - this.yOffset + tileSize/2);
    }
    this.renderSprite(game.player.sprites[game.player.status], playerX, playerY, game.player.isRight, game.player.hasDash);
    this.storeLastPosition(playerX, playerY, this.xOffset, this.yOffset);
    if ((game.player.xVel > game.player.max_xVel || game.player.xVel < -1*game.player.max_xVel || game.player.yVel > game.player.max_yVel || game.player.yVel < -1*game.player.max_yVel) && !game.player.hasDash && !game.player.touchedWall && !game.player.isDying) {
      for (var i = 0; i < this.positions.length; i++) {
        this.ctx.save();
        var ratio = (i + 1) / this.positions.length;
        this.ctx.globalAlpha = ratio;
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
  };
  this.storeLastPosition = function(playerX, playerY, xOff, yOff) {
    this.positions.push({x: playerX, y: playerY, xOffset: xOff, yOffset: yOff});
    if (this.positions.length > this.motionTrailLength) {
      this.positions.shift();
    }
  };

  this.renderSprite = function(sprite, playerX, playerY, isRight, hasDash) {
    var img;
    if (hasDash) img = sprite.image;
    else img = sprite.image_noDash;
    sprite.update();
    var a = sprite.frameIndex * sprite.width;
    var xOffset = sprite.width/4;
    if (!isRight) {
      this.ctx.save();
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(img, a, 0, sprite.width, sprite.height, -1*(playerX-xOffset), playerY - 5, sprite.width*-1, sprite.height);
      this.ctx.restore();
    }
    else this.ctx.drawImage(img, a, 0, sprite.width, sprite.height, playerX-xOffset, playerY - 5, sprite.width, sprite.height);
  };

};
