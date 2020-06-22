const Controller = function() {
  this.left = new ButtonInput();
  this.right = new ButtonInput();
  this.up = new ButtonInput();
  this.down = new ButtonInput();
  this.jump = new ButtonInput();
  this.dash = new ButtonInput();
  this.climb = new ButtonInput();

  this.keyDownUp = function(type, key_code) {
    var down = (type == "keydown") ? true:false
    switch(key_code) {
      case 65: this.left.getInput(down); break; //a
      case 87: this.up.getInput(down); break; //w
      case 68: this.right.getInput(down); break; //d
      case 83: this.down.getInput(down); break; //s
      case 32: this.jump.getInput(down); break; //space
      case 75: this.dash.getInput(down); break; //k
      case 16: this.climb.getInput(down); break; //shift
    }

  };
};

const ButtonInput = function() {
    this.input = false;
    this.getInput = function(down) {
      this.input = down;
  };
}
