
document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

window.addEventListener("load", function(e) {
  var keyDownUp = function(e) {
    controller.keyDownUp(e.type, e.keyCode);
  };
  var render = function() {
    display.render();
  };
  var update = function() {
    game.update();
  };

  var controller = new Controller();
  var display = new Display(document.querySelector("canvas"));
  var game = new Game();
  var engine = new Engine(1000/30, render, update);

  //eventlisteners for controller and perhaps resize
  window.addEventListener("keydown", keyDownUp);
  window.addEventListener("keyup", keyDownUp);
  // window.addEventListener("resize", resize);
  //display.resize()
  engine.run();
});
