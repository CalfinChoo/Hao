const Engine = function(time_step, update, render) {
  this.animation_frame_request = undefined,
  this.time = undefined,
  this.accumulated_time = 0,
  this.time_step = time_step,
  this.updated = false;

  this.update = update;
  this.render = render;

  this.start;
  this.run = function() {
    this.time = 0;
    this.handleRun = function(time_stamp) {
      this.accumulated_time += time_stamp - this.time;
      this.time = time_stamp;
      // console.log(this);

      if (this.accumulated_time >= this.time_step * 3) {
        // console.log("hey");
        this.accumulated_time = this.time_step;
      }

      while(this.accumulated_time >= this.time_step) {
        // console.log("wow");
        this.accumulated_time -= this.time_step;
        this.update();
        this.updated = true;
      }

      if (this.updated) {
        // console.log("up");
        this.updated = false;
        this.render();
      }
      window.requestAnimationFrame(this.handleRun.bind(this));
      // if (this.accumulated_time > ) {
      //   console.log("heyo");
      //   window.requestAnimationFrame(this.handleRun.bind(this));
      // }
    }

    this.animation_frame_request = window.requestAnimationFrame(this.handleRun.bind(this));
  };

};
