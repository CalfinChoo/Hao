const Game = function(controller, time_step) {
  this.mode = 0;

  this.level = test;
  this.time_step = time_step;
  this.worldYAccel = 30;
  this.worldLeftBorder = 0;
  this.worldRightBorder = 1000;
  this.worldTopBorder = 0;
  this.worldBottomBorder = 600;

  this.controller = controller;
  this.isLeft = this.controller.left.input;
  this.isRight = this.controller.right.input;
  this.isUp = this.controller.up.input;
  this.isDown = this.controller.down.input;
  this.isJump = this.controller.jump.input;
  this.isDash = this.controller.dash.input;
  this.isClimb = this.controller.climb.input;

  this.initializePlayerSprites = function() {
    var dict = new Object();
    ///////////////
    /// Walking ///
    ///////////////
    var img = new Image();
    img.src = "assets/walk.png"
    dict['walk'] = img;
    ////////////
    /// Idle ///
    ////////////
    img = new Image();
    img.src = "assets/idle.png"
    dict['idle'] = img;
    ///////////////
    /// Jumping ///
    ///////////////
    img = new Image();
    img.src = "assets/jump.png"
    dict['jump'] = img;
    ////////////////
    /// Climbing ///
    ////////////////
    img = new Image();
    img.src = "assets/climb.png"
    dict['climb'] = img;
    // console.log(dict);
    return dict;
  };
  this.player = new Player(3, this.initializePlayerSprites(), 50, 250, this.level);

  this.yTickCount = 0;
  this.xTickCount = 0;
  this.yTickCounterOn = false;
  this.xTickCounterOn = false;
  this.groundLevel = 500;
  this.player.canClimb = false;
  this.player.climbTickCount = 0;

  this.update = function() {
    this.isLeft = this.controller.left.input;
    this.isRight = this.controller.right.input;
    this.isUp = this.controller.up.input;
    this.isDown = this.controller.down.input;
    this.isJump = this.controller.jump.input;
    this.isDash = this.controller.dash.input;
    this.isClimb = this.controller.climb.input;
    this.player.status = 'idle';
    this.player.isMoving = false;


    if (this.isLeft && !this.player.isClimbing) {
      this.xTickCounterOn = true;
      if (this.player.xVel > 0) this.player.xVel = 0;
      this.player.xAccel = -50;
      if (this.player.isRight)  this.xTickCount = 0;
      if (this.player.isJumping && this.xTickCount < this.time_step / 2) this.xTickCount = this.time_step / 2;
      this.player.isRight = false;
      this.player.isMoving = true;
      this.player.isIdle = false;
    }
    else if (this.isRight && !this.player.isClimbing) {
      this.xTickCounterOn = true;
      if (this.player.xVel < 0) this.player.xVel = 0;
      this.player.xAccel = 50;
      if (!this.player.isRight)  this.xTickCount = 0;
      if (this.player.isJumping && this.xTickCount < this.time_step / 2) this.xTickCount = this.time_step / 2;
      this.player.isRight = true;
      this.player.isMoving = true;
      this.player.isIdle = false;
    }
    // console.log(this.player.isClimbing);

    ///////////////////////////
    /// Player acceleration ///
    ///////////////////////////
    this.groundLevel = this.player.detectGroundLevel();
    this.ceilingLevel = this.player.detectCeilingLevel();
    if (this.player.y >= this.groundLevel) this.player.onGround = true;
    else this.player.onGround = false;
    if (this.player.onGround) {
      if (this.isJump) {
        this.yTickCounterOn = true;
        this.player.yVel = -100;
        this.yTickCount = 0;
        this.player.isJumping = true;
        this.player.isIdle = false;
        this.player.sprites['jump'].frameIndex = 0;
      }
      else if (this.player.hasDash) {
        this.player.isJumping = false;
        this.yTickCounterOn = false;
        this.yTickCount = 0;
        this.player.yVel = 0;
      }
      this.player.hasDash = true;
    }
    else {
      if (this.player.canClimb && this.isClimb) {
        this.yTickCounterOn = false;
        this.yTickCount = 0;
      }
      else {
        this.yTickCounterOn = true;
        if (this.player.yVel + this.worldYAccel * (this.yTickCount / this.time_step) > this.player.max_yVel) this.player.yVel = this.player.max_yVel;
        else this.player.yVel += this.worldYAccel * (this.yTickCount / this.time_step);
      }
    }
    // console.log(this.player.yVel);
    if (this.yTickCounterOn) this.yTickCount += 1;
    else this.yTickCount = 0;


    if (this.player.y + this.player.yVel * (this.yTickCount / this.time_step) > this.groundLevel) this.player.y = this.groundLevel;
    else if (this.player.y + this.player.yVel * (this.yTickCount / this.time_step) < this.ceilingLevel) {
      this.player.y = this.ceilingLevel + 1;
      this.player.yVel = 0;
    }
    else this.player.y += this.player.yVel * (this.yTickCount / this.time_step);



    this.wall = this.player.detectWall();
    if (this.player.isMoving) {
      ////////////////////
      /// Dash Checker ///
      ////////////////////
      if (this.player.xVel > this.player.max_xVel) {
        this.player.hasDash = false;
        this.player.xVel += 2 * this.player.dashAccel;
      }
      else if (this.player.xVel < -1 * this.player.max_xVel) {
        this.player.hasDash = false;
        this.player.xVel += -2 * this.player.dashAccel;
      }
      else {
        if (this.player.xVel + this.player.xAccel * (this.xTickCount / this.time_step) > this.player.max_xVel) this.player.xVel = this.player.max_xVel;
        else if (this.player.xVel + this.player.xAccel * (this.xTickCount / this.time_step) < -1*this.player.max_xVel) this.player.xVel = -1*this.player.max_xVel;
        else this.player.xVel += this.player.xAccel * (this.xTickCount / this.time_step);
      }
      ////////////////////
      /// Wall Checker ///
      ////////////////////
      if (this.wall && this.player.isRight && this.player.x + this.player.width + this.player.xVel * (this.xTickCount / this.time_step) >= this.wall) {
        this.player.x = this.wall - this.player.width;
        console.log("hi");
        this.player.canClimb = true;
        if (this.player.xVel > this.player.max_xVel && this.player.yVel < 0) this.player.yVel = 0;
      }
      else if (this.wall && !this.player.isRight && this.player.x + this.player.xVel * (this.xTickCount / this.time_step) < this.wall) {
        this.player.x = this.wall + .11;
        console.log("hey");
        this.player.canClimb = true;
        if (this.player.xVel < -1 * this.player.max_xVel && this.player.yVel < 0) this.player.yVel = 0;
      }
      else {
        this.player.canClimb = false;
        //////////////////////
        /// Border Checker ///
        //////////////////////
        if (this.player.x + this.player.xVel * (this.xTickCount / this.time_step) < this.worldLeftBorder) this.player.x = this.worldLeftBorder;
        else if (this.player.x + this.player.xVel * (this.xTickCount / this.time_step) > this.worldRightBorder - tileSize) this.player.x = this.worldRightBorder - tileSize;
        else this.player.x += this.player.xVel * (this.xTickCount / this.time_step);
      }
    }
    else {
      this.player.xAccel = 0;
      this.player.xVel = 0;
    }

    if (this.player.hasDash && this.isDash) {
      this.player.isMoving = true;
      this.xTickCount = this.time_step;
      if (this.isUp && this.isRight) {
        this.player.xVel = Math.cos(Math.PI / 4) * this.player.dashVel;
        this.player.yVel = -1 * Math.sin(Math.PI / 4) * this.player.dashVel;
        this.yTickCounterOn = true;
        this.yTickCount = this.time_step / 2;
      }
      else if (this.isUp && this.isLeft) {
        this.player.xVel = Math.cos(3 * Math.PI / 4) * this.player.dashVel;
        this.player.yVel = -1 * Math.sin(3 * Math.PI / 4) * this.player.dashVel;
        this.yTickCounterOn = true;
        this.yTickCount = this.time_step / 2;
      }
      else if (this.isDown && this.isRight) {
        this.player.xVel = Math.cos(Math.PI / 4) * this.player.dashVel;
        this.player.yVel = Math.sin(Math.PI / 4) * this.player.dashVel;
        this.yTickCount = this.time_step;
      }
      else if (this.isDown && this.isLeft) {
        this.player.xVel = Math.cos(3 * Math.PI / 4) * this.player.dashVel;
        this.player.yVel = Math.sin(3 * Math.PI / 4) * this.player.dashVel;
        this.yTickCount = this.time_step;
      }
      else if (this.isUp) {
        this.player.yVel = -1 * this.player.dashVel;
        this.yTickCount = this.time_step / 2;
      }
      else if (this.isDown) {
        this.player.yVel = this.player.dashVel;
        this.yTickCount = this.time_step;
      }
      else if (this.isRight) {
        this.player.xVel = this.player.dashVel;
      }
      else if (this.isLeft) {
        this.player.xVel = -1* this.player.dashVel;
      }
      this.player.hasDash = false;
    }

    if (this.xTickCounterOn) this.xTickCount += 1;
    else this.xTickCount = 0;
    if (this.player.xVel == 0) this.xTickCounterOn = false;

    ////////////////
    /// Climbing ///
    ////////////////
    if (this.player.canClimb && this.isClimb && this.wall) {
      this.player.yVel = 0;
      this.yTickCount = 0;
      this.xTickCount = 0;
      this.player.isMoving = false;
      this.player.isClimbing = true;
      if (this.isUp) {
        if (this.player.y - 5 < this.ceilingLevel) this.player.y = this.ceilingLevel + 1;
        else this.player.y += -5;
        this.player.sprites['climb'].tickCountOn = true;
      }
      else if (this.isDown) {
        if (this.player.y + 5 > this.groundLevel) this.player.y = this.groundLevel;
        else this.player.y += 5;
        this.player.sprites['climb'].tickCountOn = true;
      }
      else this.player.sprites['climb'].tickCountOn = false;
      if (this.isJump) {

      }
    }
    else {
      this.player.isClimbing = false;
      this.player.climbTickCount = 0;
    }

    //////////////////////
    /// Status Updates ///
    //////////////////////
    if (this.player.isClimbing) this.player.status = "climb";
    else if (this.player.isJumping) this.player.status = "jump";
    else if (this.player.isMoving) this.player.status = "walk";
    else this.player.isIdle = true;
    // if (this.player.isIdle) this.player.status = "idle";
  };
};

const Player = function(health, sprites, x, y, level) {
  this.maxHealth = health;
  this.currentHealth = health;
  this.x = x;
  this.y = y;
  this.onGround = false;
  this.level = level;
  this.width = 45;
  this.height = 87;
  this.xAccel = 0;
  this.xVel = 0;
  this.yVel = 0;
  this.max_xVel = 10;
  this.max_yVel = 30;
  this.canClimb = false;
  this.hasDash = true;
  this.dashVel = 150;
  this.dashAccel = -10;

  ///////////////////////
  // Sprite Management //
  ///////////////////////
  this.spritesheets = sprites;
  this.sprites = {};
  this.spriteFrames = {
    'idle': 2,
    'walk': 6,
    'jump': 4,
    'climb': 2
  };
  this.status = 'idle';
  for (var key in this.spritesheets) {
    var s = sprite({
      width: 90,
      height: 90,
      image: this.spritesheets[key],
      ticksPerFrame: 32,
      loop: true,
      numberOfFrames: this.spriteFrames[key]
    });
    if (key.localeCompare("walk") == 0) s.ticksPerFrame = 18;
    else if (key.localeCompare("jump") == 0) {s.ticksPerFrame = 18; s.loop = false;}
    else if (key.localeCompare("climb") == 0) {s.ticksPerFrame = 16; s.tickCountOn = false;}
    this.sprites[key] = s;
  }

  this.frame = 0;
  this.isIdle = true;
  this.isMoving = false;
  this.isJumping = false;
  this.isDashing = false;
  this.isClimbing = false;
  this.isRight = true;

  this.move = function(x, y) {
    this.x += x;
    this.y += y;
  };

  this.detectGroundLevel = function() {
    for (var y = 0; y < this.level.length; y++) {
      for (var x = 0; x < this.level[y].length; x++) {
          if (((this.x >= this.level[y][x].getX() && this.x < this.level[y][x].getX() + tileSize) || (this.x <= this.level[y][x].getX() && this.x + this.width > this.level[y][x].getX())) && this.y <= this.level[y][x].getY()) {
            if (!this.level[y][x].getPassable()) {
              return this.level[y][x].y - this.height;
            }
          }
      }
    }
  };

  this.detectCeilingLevel = function() {
    var highest;
    for (var y = 0; y < this.level.length; y++) {
      for (var x = 0; x < this.level[y].length; x++) {
          if (((this.x >= this.level[y][x].getX() && this.x < this.level[y][x].getX() + tileSize) || (this.x <= this.level[y][x].getX() && this.x + this.width > this.level[y][x].getX())) && this.y >= this.level[y][x].getY()) {
            if (!this.level[y][x].getPassable()) {
              if (highest === undefined) highest = this.level[y][x].y;
              else if (this.level[y][x].y > highest) highest = this.level[y][x].y;
            }
          }
      }
    }
    return highest + tileSize;
  };

  this.detectWall = function() {
    if (this.isRight) {
      for (var y = 0; y < this.level.length; y++) {
        for (var x = 0; x < this.level[y].length; x++) {
          if ((this.x < this.level[y][x].getX() && this.y <= this.level[y][x].getY() + tileSize && this.y + this.height > this.level[y][x].getY())) {
            if (!this.level[y][x].getPassable()) {
              return this.level[y][x].getX();
            }
          }
        }
      }
    }
    else {
      var highest;
      for (var y = 0; y < this.level.length; y++) {
        for (var x = 0; x < this.level[y].length; x++) {
          if ((this.x > this.level[y][x].getX() + tileSize && this.y <= this.level[y][x].getY() + tileSize && this.y + this.height > this.level[y][x].getY())) {
            if (!this.level[y][x].getPassable()) {
              if (highest === undefined) highest = this.level[y][x].getX();
              else if (this.level[y][x].x > highest) highest = this.level[y][x].getX();
            }
          }
        }
      }
      return highest + tileSize;
    }
    return false;
  };
}

function sprite(options) {
  var that = {};
  that.frameIndex = 0;
  that.tickCount = 0;
  that.tickCountOn = true;
  that.ticksPerFrame = options.ticksPerFrame || 0;
  that.numberOfFrames = options.numberOfFrames || 1;
  that.loop = options.loop;
  that.width = options.width;
  that.height = options.height;
  that.image = options.image;
  that.update = function() {
    if (this.tickCountOn) {
      that.tickCount += 1;
      if (that.tickCount > that.ticksPerFrame) {
        that.tickCount = 0;
        if (that.frameIndex < that.numberOfFrames - 1) {
          that.frameIndex += 1;
        } else if (that.loop) {
          that.frameIndex = 0;
        }
      }
    }
  };
  return that;
};
