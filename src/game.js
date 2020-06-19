const Game = function(controller, time_step) {
  this.mode = 0;
  this.level = test;
  console.log(this.level);
  this.time_step = time_step;
  this.worldYAccel = 98.1;

  this.controller = controller;
  this.isLeft = this.controller.left.input;
  this.isRight = this.controller.right.input;
  this.isUp = this.controller.up.input;

  this.player = new Player(3, [], 50, 50, this.level);

  this.count = 0;
  this.counterOn = false;
  this.groundLevel = 500;
  this.update = function() {
    this.isLeft = this.controller.left.input;
    this.isRight = this.controller.right.input;
    this.isUp = this.controller.up.input;

    if (this.isLeft) {this.player.x -= 15;}
    if (this.isRight) {this.player.x += 15;}

    ///////////////////////////
    /// Player acceleration ///
    ///////////////////////////
    this.groundLevel = this.player.detectGroundLevel();
    // console.log(this.groundLevel);
    if (this.player.y >= this.groundLevel) this.player.onGround = true;
    else this.player.onGround = false;
    if (this.player.onGround) {
      if (this.isUp) {
        this.counterOn = true;
        this.player.yVel = -200;
        this.count = 0;
      }
      else {
        this.counterOn = false;
        this.count = 0;
        this.player.yVel = 0;
      }
    }
    else {
      this.counterOn = true;
      this.player.yVel += this.worldYAccel * (this.count / this.time_step);
    }
    if (this.counterOn) this.count += 1;
    else this.count = 0;

    // console.log(this.count);
    if (this.player.y + this.player.yVel * (this.count / this.time_step) > this.groundLevel) this.player.y = this.groundLevel;
    else this.player.y += this.player.yVel * (this.count / this.time_step);
  };
};

const Player = function(health, sprites, x, y, level) {
  this.maxHealth = health;
  this.currentHealth = health;
  this.sprites = sprites;
  this.x = x;
  this.y = y;
  this.onGround = false;
  this.level = level;
  this.width = 10;
  this.height = 10;

  this.yVel = 0;

  this.move = function(x, y) {
    this.x += x;
    this.y += y;
  };
  this.detectGroundLevel = function() {
    var edgeCase = (Math.floor((this.x + this.width) / tileSize) != Math.floor(this.x / tileSize)) || (Math.floor((this.x - this.width) / tileSize) != Math.floor(this.x / tileSize));
    for (var y = 0; y < this.level.length; y++) {
      for (var x = 0; x < this.level[y].length; x++) {
        if (edgeCase) {
          if (((this.x >= this.level[y][x].getX() && this.x < this.level[y][x].getX() + tileSize) || (this.x <= this.level[y][x].getX() && this.x > this.level[y][x].getX() - tileSize)) && this.y <= this.level[y][x].getY()) {
            if (!this.level[y][x].getPassable()) {
              return this.level[y][x].y - this.height;
            }
          }
        }
        else {
          if (this.x >= this.level[y][x].getX() && this.x < this.level[y][x].getX() + tileSize && this.y <= this.level[y][x].getY()) {
            if (!this.level[y][x].getPassable()) {
              return this.level[y][x].y - this.height;
            }
          }
        }


      }
    }

  };


}
