const Controller = function() {
  this.left = new ButtonInput();
  this.right = new ButtonInput();
  this.up = new ButtonInput();
  this.space = new ButtonInput();

  this.keyDownUp = function(type, key_code) {
    var down = (type == "keydown") ? true:false
    switch(key_code) {
      case 65: this.left.getInput(down); break;
      case 87: this.up.getInput(down); break;
      case 68: this.right.getInput(down); break;
      case 32: this.space.getInput(down); break;
    }

  };
};

const ButtonInput = function() {
    this.input = false;
    this.getInput = function(down) {
      this.input = down;
  };
}
