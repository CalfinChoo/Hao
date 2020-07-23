const Engine = function(time_step, update, render) {
  this.animation_frame_request = undefined,
  this.accumulated_time = 0,
  this.time_step = time_step,
  this.updated = false;

  this.update = update;
  this.render = render;

  this.start;
  this.run = function() {
    this.then = Date.now();
    this.handleRun = function() {
      this.now = Date.now();
      this.accumulated_time = this.now - this.then;
      this.update();
      if (this.accumulated_time > time_step) {
        this.then = this.now - (this.accumulated_time % time_step);
        this.render();
      }
      window.requestAnimationFrame(this.handleRun.bind(this));
    }
    this.animation_frame_request = window.requestAnimationFrame(this.handleRun.bind(this));
  };

};
