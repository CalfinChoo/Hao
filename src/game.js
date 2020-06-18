const Game = function(controller) {
  this.mode = 0;
  this.level;

  this.controller = controller;
  this.isLeft = this.controller.left.input;
  this.isRight = this.controller.right.input;
  this.isUp = this.controller.up.input;

  this.player = new Player(3, [], 50, 50);

  this.update = function() {
    this.isLeft = this.controller.left.input;
    this.isRight = this.controller.right.input;
    this.isUp = this.controller.up.input;

    if (this.isLeft) {this.player.x -= 2;}
    if (this.isRight) {this.player.x += 2;}
    if (this.isUp && (this.player.y > this.height - 5)) {this.player.y -= 2;}

    // console.log(this.isLeft);
  };


};

const Player = function(health, sprites, x, y) {
  this.maxHealth = health;
  this.currentHealth = health;
  this.sprites = sprites;
  this.x = x;
  this.y = y;

  this.move = function(x, y) {
    this.x += x;
    this.y += y;
  };


}
