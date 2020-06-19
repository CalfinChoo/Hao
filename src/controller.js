const Controller = function() {
  this.left = new ButtonInput(this.playerStatus);
  this.right = new ButtonInput(this.playerStatus);
  this.up = new ButtonInput(this.playerStatus);

  this.keyDownUp = function(type, key_code) {
    var down = (type == "keydown") ? true:false
    switch(key_code) {
      case 37: this.left.getInput(down); break;
      case 38: this.up.getInput(down); break;
      case 39: this.right.getInput(down); break;
    }

  };
};

const ButtonInput = function(playerStatus) {
    this.input = false;
    this.getInput = function(down) {
      this.input = down;
  };
}
