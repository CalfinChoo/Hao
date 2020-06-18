const Display = function(cavnas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.width = canvas.width;
  this.height = canvas.height;
  this.viewWidth, this.viewHeight;
  // console.log(this.width);

  this.render = function(game) {
    // console.log(game);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillRect(game.player.x, game.player.y, 20, 20);
  };

  this.parseLevel = function() {

  };
};
