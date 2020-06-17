const Engine = function(time_step, update, render) {
  this.animation_frame_request = undefined,
  this.time = undefined,
  this.time_step = time_step,
  this.updated = false;

  this.update = update;
  this.render = render;

  this.run = function(time_stamp) {
    this.accumulated_time += time_stamp - this.time;
    this.time = time_stamp;

    if (this.accumulated_time >= this.time_step * 3) {
      this.accumulated_time = this.time_step;
    }

    while(this.accumulated_time >= this.time_step) {
      this.accumulated_time -= this.time_step;
      this.update(time_stamp);
      this.updated = true;
    }

    if (this.updated) {
      this.updated = false;
      this.render(time_stamp);
    }

    this.animation_frame_request = window.requestAnimationFrame(this.handleRun)
  }

};
