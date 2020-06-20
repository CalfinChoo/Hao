const Game = function(controller, time_step) {
  this.mode = 0;

  this.level = test;
  this.time_step = time_step;
  this.worldYAccel = 50.1;

  this.controller = controller;
  this.isLeft = this.controller.left.input;
  this.isRight = this.controller.right.input;
  this.isUp = this.controller.up.input;

  this.initializePlayerSprites = function() {
    var dict = new Object();
    /////////////
    // Walking //
    /////////////
    var img = new Image();
    img.src = "assets/walk.png"
    dict['walk'] = img;
    //////////
    // Idle //
    //////////
    img = new Image();
    img.src = "assets/idle.png"
    dict['idle'] = img;
    /////////////
    // Jumping //
    /////////////
    img = new Image();
    img.src = "assets/jump.png"
    dict['jump'] = img;
    // console.log(dict);
    return dict;
  };
  this.player = new Player(3, this.initializePlayerSprites(), 50, 50, this.level);

  this.tickCount = 0;
  this.tickCounterOn = false;
  this.groundLevel = 500;

  this.update = function() {
    this.isLeft = this.controller.left.input;
    this.isRight = this.controller.right.input;
    this.isUp = this.controller.up.input;
    this.player.status = 'idle';

    if (this.isLeft) {
      // this.player.x -= 9;
      if (this.player.xVel > 0) this.player.xVel = 0;
      this.player.xAccel = -1;
      this.player.isRight = false;
      this.player.isMoving = true;
      this.player.isIdle = false;
    }
    else if (this.isRight) {
      // this.player.x += 9;
      if (this.player.xVel < 0) this.player.xVel = 0;
      this.player.xAccel = 1;
      this.player.isRight = true;
      this.player.isMoving = true;
      this.player.isIdle = false;
    }
    else {
      this.player.isMoving = false;
    }

    ///////////////////////////
    /// Player acceleration ///
    ///////////////////////////
    this.groundLevel = this.player.detectGroundLevel();
    if (this.player.y >= this.groundLevel) this.player.onGround = true;
    else this.player.onGround = false;
    if (this.player.onGround) {
      if (this.isUp) {
        this.tickCounterOn = true;
        this.player.yVel = -150;
        this.tickCount = 0;
        this.player.isJumping = true;
        this.player.isIdle = false;
        this.player.isMoving = false;
      }
      else {
        this.player.isJumping = false;
        this.tickCounterOn = false;
        this.tickCount = 0;
        this.player.yVel = 0;
      }
    }
    else {
      this.tickCounterOn = true;
      this.player.yVel += this.worldYAccel * (this.tickCount / this.time_step);
    }
    if (this.tickCounterOn) this.tickCount += 1;
    else this.tickCount = 0;

    if (this.player.y + this.player.yVel * (this.tickCount / this.time_step) > this.groundLevel) this.player.y = this.groundLevel;
    else this.player.y += this.player.yVel * (this.tickCount / this.time_step);


    if (this.player.isMoving) {
      console.log(this.player.x);
      if (this.player.xVel + this.player.xAccel > this.player.max_xVel) this.player.xVel = this.player.max_xVel;
      else this.player.xVel += this.player.xAccel;
      this.player.x += this.player.xVel;
    }
    else {
      this.player.xAccel = 0;
      this.player.xVel = 0;
    }



    // Status Updates
    if (this.player.isJumping) this.player.status = "jump";
    else if (this.player.isMoving) this.player.status = "walk";
    else this.player.isIdle = true;
    if (this.player.isIdle) this.player.status = "idle";

  };
};

const Player = function(health, sprites, x, y, level) {
  this.maxHealth = health;
  this.currentHealth = health;
  this.x = x;
  this.y = y;
  this.onGround = false;
  this.level = level;
  this.width = 60;
  this.height = 90;
  this.xAccel = 0;
  this.xVel = 0;
  this.max_xVel = 15;

  ///////////////////////
  // Sprite Management //
  ///////////////////////
  this.spritesheets = sprites;
  this.sprites = {};
  this.spriteFrames = {
    'idle': 2,
    'walk': 6,
    'jump': 4
  };
  this.status = 'idle';
  for (var key in this.spritesheets) {
    var s = sprite({
      width: 90,
      height: 90,
      image: this.spritesheets[key],
      ticksPerFrame: 24,
      loop: true,
      numberOfFrames: this.spriteFrames[key]
    });
    if (key.localeCompare("walk") == 0) s.ticksPerFrame = 16;
    else if (key.localeCompare("jump") == 0) {s.ticksPerFrame = 16; s.loop = false;}
    this.sprites[key] = s;
  }
  //console.log(this.sprites['walk']);
  this.frame = 0;
  this.isIdle = true;
  this.isMoving = false;
  this.isJumping = false;
  this.isRight = true;

  this.yVel = 0;

  this.move = function(x, y) {
    this.x += x;
    this.y += y;
  };

  var c = 0;
  this.detectGroundLevel = function() {
    for (var y = 0; y < this.level.length; y++) {
      for (var x = 0; x < this.level[y].length; x++) {
          if (((this.x >= this.level[y][x].getX() && this.x < this.level[y][x].getX() + tileSize) || (this.x <= this.level[y][x].getX() && this.x > this.level[y][x].getX() - tileSize)) && this.y <= this.level[y][x].getY()) {
            if (!this.level[y][x].getPassable()) {
              return this.level[y][x].y - this.height;
            }
          }
      }
    }
  };


}

function sprite(options) {
  var that = {};
  that.frameIndex = 0;
  that.tickCount = 0;
  that.ticksPerFrame = options.ticksPerFrame || 0;
  that.numberOfFrames = options.numberOfFrames || 1;
  that.loop = options.loop;
  that.width = options.width;
  that.height = options.height;
  that.image = options.image;
  that.update = function() {
    that.tickCount += 1;
    if (that.tickCount > that.ticksPerFrame) {
      that.tickCount = 0;
      if (that.frameIndex < that.numberOfFrames - 1) {
        that.frameIndex += 1;
      } else if (that.loop) {
        that.frameIndex = 0;
      }
    }
  };
  return that;
};
