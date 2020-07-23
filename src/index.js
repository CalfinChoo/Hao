document.getElementById("app").innerHTML = `
<h1>Haoran's Platforming Journey</h1>
<div>
AKA (不)好的平台游戏
</div>
`;

window.addEventListener("load", function(e) {
  var keyDownUp = function(e) {
    controller.keyDownUp(e.type, e.keyCode);
  };
  var render = function() {
    display.render(game);
  };
  var update = function() {
    game.update();
  };
  var time_step = 1000/30;

  var controller = new Controller();
  var display = new Display(document.querySelector("canvas"));
  var game = new Game(controller, time_step);
  var engine = new Engine(time_step, render, update, game);

  //eventlisteners for controller and perhaps resize
  window.addEventListener("keydown", keyDownUp);
  window.addEventListener("keyup", keyDownUp);
  // window.addEventListener("resize", resize);
  //display.resize()
  engine.run();
});

var b = document.getElementById("info");
var m = document.getElementById("message");
b.addEventListener("mousedown", function(){showInfo();});

var message = "Happy Birthday, Haoran!\n\n\
I know you just really wanted a bad platformer game as a birthday present, and I'm just such a great and generous friend that I had to deliver it to you.\n\
All joking aside, I wanted to give you something that you could always revisit, especially since you'll be going to MIT and learning about CS -- thus this JS\n\
platformer was born (my first one!). This has been a project about one month in the making, most of it being done during my free time. While it was good experience\n\
for me as a coder, and though there are plenty of things in the game's code that you could learn from as well, I know for sure that it contains some unfavorable\n\
practices and could be optimized much further (so heads up!). Though the game might not be as long as I would've hoped, I hope you enjoy it!\n\
\n\
Game talk aside, I want to thank you for being such a great friend. It's hard to believe that we started our friendship in middle school and that it never\n\
diminished despite us going to different high schools. I hope that that stays the same as we attend different colleges and even graduate!\n\
Here's to a great MIT experience! I have no doubts you'll be happy and successful in the future!\n\
\n\
Special thanks to Ali for brainstorming with me and at least being able to write parser code under my guidance.\n\
\n\
Sincerely,\n\
Calvin Chu ( AKA your best friend ;) lol don't tell Ali)\
";

var showInfo = function() {
  if (m.innerText.length == 0) {
    m.innerText = message;
    b.innerText = "Hide Info";
  }
  else{
    m.innerText = "";
    b.innerText = "More Info";
  }
};
