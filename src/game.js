const Game = function(controller, time_step) {
  this.mode = 0;
  this.level;
  this.time_step = time_step;
  this.worldYAccel = 98.1;

  this.controller = controller;
  this.isLeft = this.controller.left.input;
  this.isRight = this.controller.right.input;
  this.isUp = this.controller.up.input;

  this.player = new Player(3, [], 50, 50);

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




    // console.log(this.isLeft);
  };


};

const Player = function(health, sprites, x, y) {
  this.maxHealth = health;
  this.currentHealth = health;
  this.sprites = sprites;
  this.x = x;
  this.y = y;
  this.onGround = false;

  this.yVel = 0;

  this.move = function(x, y) {
    this.x += x;
    this.y += y;
  };


}
