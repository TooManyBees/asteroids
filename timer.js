(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Timer = Asteroids.Timer = function(timeInTicks, callback) {
    this.resetTime = timeInTicks;
    this.counter = timeInTicks;
    this.callback = callback;
  }

  // Ticks down the timer by 1, then calls this.callback when it reaches
  // zero. Optional parameter 'time' overrides what the timer will be
  // reset to if it reaches zero this tick.
  Timer.prototype.tick = function(time) {
    this.counter -= 1;
    if (this.counter <= 0) {
      this.callback();
      this.counter = (time || this.resetTime);
    }
  };

})(this);
