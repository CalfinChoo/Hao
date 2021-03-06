const Game = function(controller, time_step) {
  this.levels = test;
  this.level = 0;
  this.levelInfo = {
    'spawn': [],
    'checkpoints': [],
    'messages': []
  };
  this.deaths = 0;
  this.messageStartIndex = 0;
  this.messageCount = 0;
  this.findLevelInfo = function() {
    this.levelInfo['spawn'] = [];
    this.levelInfo['checkpoints'] = [];
    this.levelInfo['messages'] = [];
    for (var y = 0; y < this.levels[this.level].length; y++) {
      for (var x = 0; x < this.levels[this.level][y].length; x++) {
        if (this.levels[this.level][y][x].getSpawn()) this.levelInfo['spawn'] = [this.levels[this.level][y][x].getX(), this.levels[this.level][y][x].getY()+.1];
        else if (this.levels[this.level][y][x].getCheckpoint()) this.levelInfo['checkpoints'].push([this.levels[this.level][y][x].getX(), this.levels[this.level][y][x].getY()+.1]);
      }
    }
    for (var x = 0; x < this.levels[this.level][0].length; x++) {
      for (var y = 0; y < this.levels[this.level].length; y++) {
        if (this.levels[this.level][y][x].getMessage()) {
          this.levelInfo['messages'].push([this.levels[this.level][y][x].getX(), this.levels[this.level][y][x].getY()]);
          this.messageCount += 1;
        }
      }
    }
  };
  this.findLevelInfo();

  this.time_step = time_step;
  this.worldYAccel = 30;
  this.worldLeftBorder = 0;
  this.worldRightBorder = this.levels[this.level][0].length * tileSize;
  this.worldTopBorder = 0;
  this.worldBottomBorder = this.levels[this.level].length * tileSize;

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
    var temp = [];
    ///////////////
    /// Walking ///
    ///////////////
    var img = new Image();
    img.src = "assets/walk.png";
    temp.push(img);
    img = new Image();
    img.src = "assets/walk_noDash.png";
    temp.push(img);
    dict['walk'] = temp;
    temp = [];
    ////////////
    /// Idle ///
    ////////////
    img = new Image();
    img.src = "assets/idle.png";
    temp.push(img);
    img = new Image();
    img.src = "assets/idle_noDash.png";
    temp.push(img);
    dict['idle'] = temp;
    temp = [];
    ///////////////
    /// Jumping ///
    ///////////////
    img = new Image();
    img.src = "assets/jump.png";
    temp.push(img);
    img = new Image();
    img.src = "assets/jump_noDash.png";
    temp.push(img);
    dict['jump'] = temp;
    temp = [];
    ////////////////
    /// Climbing ///
    ////////////////
    img = new Image();
    img.src = "assets/climb.png";
    temp.push(img);
    img = new Image();
    img.src = "assets/climb_noDash.png";
    temp.push(img);
    dict['climb'] = temp;
    temp = [];
    /////////////
    /// Dying ///
    /////////////
    img = new Image();
    img.src = "assets/blood.png";
    temp.push(img); temp.push(img);
    dict['death'] = temp;
    temp = [];
    return dict;
  };

  this.player = new Player(this.initializePlayerSprites(), this.levelInfo.spawn[0], this.levelInfo.spawn[1], this.levels[this.level]);

  this.yTickCount = 0;
  this.xTickCount = 0;
  this.yTickCounterOn = false;
  this.xTickCounterOn = false;
  this.groundLevel = 500;
  this.player.canClimb = false;
  this.player.climbTickCount = 0;
  this.wallX;
  this.lastX;

  this.update = function() {
    if (this.level > this.levels.length) return;
    ///////////////////////
    /// Level Detection ///
    ///////////////////////
    if (this.player.detectFinish()) {
      this.level += 1;
      if (this.level >= this.levels.length) return;
      if (this.messageCount > 0) this.messageStartIndex = this.messageCount;
      this.findLevelInfo();
      this.player = new Player(this.initializePlayerSprites(), this.levelInfo.spawn[0], this.levelInfo.spawn[1], this.levels[this.level]);
      this.worldRightBorder = this.levels[this.level][0].length * tileSize;
      this.worldBottomBorder = this.levels[this.level].length * tileSize;
    }

    this.isLeft = this.controller.left.input;
    this.isRight = this.controller.right.input;
    this.isUp = this.controller.up.input;
    this.isDown = this.controller.down.input;
    this.isJump = this.controller.jump.input;
    this.isDash = this.controller.dash.input;
    this.isClimb = this.controller.climb.input;
    this.player.status = 'idle';
    this.player.isMoving = false;
    ///////////////////////
    /// Death Detection ///
    ///////////////////////
    if (this.player.detectDeath()) {
      this.player.isDying = true;
      if (this.player.sprites['death'].frameIndex == 7) {
        this.deaths += 1;
        this.player = new Player(this.initializePlayerSprites(), this.player.checkpoint[0], this.player.checkpoint[1], this.levels[this.level]);
      }
    }
    else {
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
        if (this.player.xVel < 0 ) this.player.xVel = 0;
        this.player.xAccel = 50;
        if (!this.player.isRight)  this.xTickCount = 0;
        if (this.player.isJumping && this.xTickCount < this.time_step / 2) this.xTickCount = this.time_step / 2;
        this.player.isRight = true;
        this.player.isMoving = true;
        this.player.isIdle = false;
      }
      ////////////////
      /// Climbing ///
      ////////////////
      if (this.player.canClimb && this.isClimb && (this.wall == this.wallX)) {
        this.player.yVel = 0;
        this.yTickCount = 0;
        this.player.isMoving = false;
        this.player.isClimbing = true;
        if (!this.player.hasDash) this.player.touchedWall = true;
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
          this.player.canClimb = false;
          this.player.isMoving = true;
          this.xTickCount = this.time_step;
          this.xTickCounterOn = true;
          this.player.isClimbing = false;
          if (this.player.isRight && this.player.walljumpCooldown == 0) {
            this.player.xVel = Math.cos(3*Math.PI / 4) * this.player.dashVel / 1.5;
            this.player.yVel = -1 * Math.sin(3*Math.PI / 4) * this.player.dashVel / 1.25;
            this.yTickCounterOn = true;
            this.yTickCount = this.time_step / 1.5;
            this.player.isRight = false;
            this.player.walljumpCooldown = 9;
          }
          else if (!this.player.isRight && this.player.walljumpCooldown == 0) {
            this.player.xVel = Math.cos(Math.PI / 4) * this.player.dashVel / 1.5;
            this.player.yVel = -1 * Math.sin(Math.PI / 4) * this.player.dashVel / 1.25;
            this.yTickCounterOn = true;
            this.yTickCount = this.time_step / 1.5;
            this.player.isRight = true;
            this.player.walljumpCooldown = 9;
          }
        }
      }
      else {
        this.player.isClimbing = false;
        this.player.climbTickCount = 0;
      }
      if (this.player.walljumpCooldown > 0) this.player.walljumpCooldown--;
      ///////////////
      /// Dashing ///
      ///////////////
      if (this.player.hasDash && this.isDash) {
        this.player.canClimb = false;
        this.player.isMoving = true;
        this.xTickCount = this.time_step/2;
        this.player.dashCooldown = 5;
        this.player.hasDash = false;
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
          this.player.yVel = -1 * this.player.dashVel/1.5;
          this.yTickCount = this.time_step/3;
          this.yTickCounterOn = true;
        }
        else if (this.isDown) {
          this.player.yVel = this.player.dashVel;
          this.yTickCount = this.time_step;
        }
        else if (this.isRight) {
          this.player.yVel = 0;
          this.yTickCount = 0;
          this.player.xVel = this.player.dashVel/1.125;
        }
        else if (this.isLeft) {
          this.player.yVel = 0;
          this.yTickCount = 0;
          this.player.xVel = -1* this.player.dashVel/1.125;
        }
      }
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
        this.player.touchedWall = false;
        if (this.player.dashCooldown > 0) this.player.dashCooldown--;
        else this.player.hasDash = true;
      }
      else {
        if (this.player.canClimb && this.isClimb) {
          this.yTickCounterOn = false;
          this.yTickCount = 0;
        }
        else {
          this.player.canClimb = false;
          this.yTickCounterOn = true;
          if (this.player.yVel > this.player.max_yVel) {
            this.player.yVel += this.player.dashAccel;
          }
          else {
            if (this.player.yVel + this.worldYAccel * (this.yTickCount / this.time_step) > this.player.max_yVel) this.player.yVel = this.player.max_yVel;
            else this.player.yVel += this.worldYAccel * (this.yTickCount / this.time_step);
          }
        }
        if (this.player.dashCooldown > 0) this.player.dashCooldown--;
      }
      if (this.yTickCounterOn) this.yTickCount += 1;
      else this.yTickCount = 0;

      if (this.player.yVel != 0 && this.player.y + this.player.yVel * (this.yTickCount / this.time_step) > this.groundLevel) this.player.y = this.groundLevel;
      else if (this.player.yVel != 0 && this.player.y + this.player.yVel * (this.yTickCount / this.time_step) < this.ceilingLevel) {
        this.player.y = this.ceilingLevel + 1;
        this.player.yVel = 0;
      }
      else this.player.y += this.player.yVel * (this.yTickCount / this.time_step);

      this.wall = this.player.detectFrontWall();
      if (this.player.isMoving) {
        ////////////////////
        /// Dash Checker ///
        ////////////////////
        if (this.player.xVel > this.player.max_xVel) {
          this.player.xVel += 2 * this.player.dashAccel;
        }
        else if (this.player.xVel < -1 * this.player.max_xVel) {
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
          this.player.canClimb = true;
          this.wallX = this.wall;
          if (this.player.xVel > this.player.max_xVel && this.player.yVel < 0) this.player.yVel = 0;
        }
        else if (this.wall && !this.player.isRight && this.player.x + this.player.xVel * (this.xTickCount / this.time_step) < this.wall) {
          this.player.x = this.wall + .2;
          this.player.canClimb = true;
          this.wallX = this.wall;
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
      this.player.inWall = this.player.detectInWall();
      if (this.player.inWall) this.player.x = this.lastX;
      else this.lastX = this.player.x;

      if (this.xTickCounterOn) this.xTickCount += 1;
      else this.xTickCount = 0;
      if (this.player.xVel == 0) this.xTickCounterOn = false;

      this.player.activateCheckpoint();
    }

    //////////////////////
    /// Status Updates ///
    //////////////////////
    if (this.player.isDying) this.player.status = "death";
    else if (this.player.isClimbing) this.player.status = "climb";
    else if (this.player.isJumping) this.player.status = "jump";
    else if (this.player.isMoving) this.player.status = "walk";
    else this.player.isIdle = true;
  };
};

const Player = function(sprites, x, y, level) {
  this.x = x;
  this.y = y;
  this.xAccel = 0;
  this.xVel = 0;
  this.yVel = 0;
  this.max_xVel = 7;
  this.max_yVel = 30;
  this.onGround = false;

  this.width = 45;
  this.height = 85;

  this.hasDash = true;
  this.dashVel = 150;
  this.dashAccel = -10;
  this.dashCooldown = 0;

  this.canClimb = false;
  this.walljumpCooldown = 0;
  this.inWall = false;
  this.touchedWall = false;

  this.level = level;
  this.checkpoint = [x, y];
  /////////////////////////
  /// Sprite Management ///
  /////////////////////////
  this.spritesheets = sprites;
  this.sprites = {};
  this.spriteFrames = {
    'idle': 2,
    'walk': 6,
    'jump': 4,
    'climb': 2,
    'death': 8
  };
  this.status = 'idle';
  for (var key in this.spritesheets) {
    var s = sprite({
      width: 90,
      height: 90,
      image: this.spritesheets[key][0],
      image_noDash: this.spritesheets[key][1],
      ticksPerFrame: 16, //32
      loop: true,
      numberOfFrames: this.spriteFrames[key]
    });
    if (key.localeCompare("walk") == 0) s.ticksPerFrame = 9; //18
    else if (key.localeCompare("jump") == 0) {s.ticksPerFrame = 9; s.loop = false;} //18
    else if (key.localeCompare("climb") == 0) {s.ticksPerFrame = 8; s.tickCountOn = false;} //16
    else if (key.localeCompare("death") == 0) {s.ticksPerFrame = 4; s.loop = false; s.width = 120; s.height = 120;} //10
    this.sprites[key] = s;
  }

  this.frame = 0;
  this.isIdle = true;
  this.isMoving = false;
  this.isJumping = false;
  this.isClimbing = false;
  this.isRight = true;
  this.isDying = false;

  this.move = function(x, y) {
    this.x += x;
    this.y += y;
  };

  /////////////////////////////
  /// Environment Detection ///
  /////////////////////////////
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
  this.detectFrontWall = function() {
    if (this.isRight) {
      var lowest;
      for (var y = 0; y < this.level.length; y++) {
        for (var x = 0; x < this.level[y].length; x++) {
          if ((this.x < this.level[y][x].getX() && this.y <= this.level[y][x].getY() + tileSize && this.y + this.height > this.level[y][x].getY())) {
            if (!this.level[y][x].getPassable()) {
              if (lowest === undefined || this.level[y][x].getX() < lowest) lowest = this.level[y][x].getX();
            }
          }
        }
      }
      return lowest;
    }
    else {
      var highest;
      for (var y = 0; y < this.level.length; y++) {
        for (var x = 0; x < this.level[y].length; x++) {
          if ((this.x > this.level[y][x].getX() + tileSize && this.y <= this.level[y][x].getY() + tileSize && this.y + this.height > this.level[y][x].getY())) {
            if (!this.level[y][x].getPassable()) {
              if (highest === undefined || this.level[y][x].getX() > highest) highest = this.level[y][x].getX();
            }
          }
        }
      }
      return highest + tileSize;
    }
    return false;
  };
  this.detectInWall = function() {
    for (var y = 0; y < this.level.length; y++) {
      for (var x = 0; x < this.level[y].length; x++) {
          if (((this.x >= this.level[y][x].getX() && this.x < this.level[y][x].getX()+tileSize)||(this.x+this.width > this.level[y][x].getX() && this.x+this.width <= this.level[y][x].getX()+tileSize)) && this.y <= this.level[y][x].getY() + tileSize && this.y + this.height > this.level[y][x].getY())
          if (!this.level[y][x].getPassable()) return true;
        }
      }
    return false;
  };
  this.detectDeath = function() {
    for (var y = 0; y < this.level.length; y++) {
      for (var x = 0; x < this.level[y].length; x++) {
          if (((this.x >= this.level[y][x].getX() && this.x < this.level[y][x].getX()+tileSize)||(this.x+this.width > this.level[y][x].getX() && this.x+this.width <= this.level[y][x].getX()+tileSize)) && this.y <= this.level[y][x].getY() + tileSize && this.y + this.height > this.level[y][x].getY())
          if (this.level[y][x].getDeath()) return true;
        }
      }
    return false;
  };
  this.activateCheckpoint = function() {
    for (var y = 0; y < this.level.length; y++) {
      for (var x = 0; x < this.level[y].length; x++) {
          if (((this.x >= this.level[y][x].getX() && this.x < this.level[y][x].getX()+tileSize)||(this.x+this.width > this.level[y][x].getX() && this.x+this.width <= this.level[y][x].getX()+tileSize)) && this.y <= this.level[y][x].getY() + tileSize && this.y + this.height > this.level[y][x].getY())
          if (this.level[y][x].getCheckpoint() && !this.level[y][x].getTriggered()) {
            this.checkpoint = [this.level[y][x].getX(), this.level[y][x].getY() - tileSize +.1];
            this.level[y][x].setTriggered(true);
            break;
          }
        }
      }
    return false;
  };
  this.detectFinish = function() {
    for (var y = 0; y < this.level.length; y++) {
      for (var x = 0; x < this.level[y].length; x++) {
          if (((this.x >= this.level[y][x].getX() && this.x < this.level[y][x].getX()+tileSize)||(this.x+this.width > this.level[y][x].getX() && this.x+this.width <= this.level[y][x].getX()+tileSize)) && this.y <= this.level[y][x].getY() + tileSize && this.y + this.height > this.level[y][x].getY())
          if (this.level[y][x].getFinish()) {return true;}
        }
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
  that.image_noDash = options.image_noDash;
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
