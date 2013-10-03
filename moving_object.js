(function(root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MovingObject = Asteroids.MovingObject = function(pos, vel, radius, color) {
    this.pos = pos;
    this.vel = vel;
    this.heading = Asteroids.getHeading(vel);
    this.radius = radius;
    this.color = color;
    this.timers = {
      mercy : 0
    }
  }

  MovingObject.prototype.tick = function() {
    timers = this.timers;
    Object.keys(timers).forEach(function(key) {
      if (timers[key] > 0) {
        timers[key] -= 1;
      }
    });
  }

  MovingObject.prototype.move = function() {
    this.tick();

    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.flipIfOffscreen();
  }

  MovingObject.prototype.flipIfOffscreen = function() {
    var dX = Asteroids.DIM_X, dY = Asteroids.DIM_Y;
    if (this.pos[0] < 0 - this.radius) {
      this.pos[0] += dX + (2*this.radius);
    } else if (this.pos[0] > dX + this.radius) {
      this.pos[0] -= dX + (2*this.radius);
    }

    if (this.pos[1] < 0 - this.radius) {
      this.pos[1] += dY + (2*this.radius);
    } else if (this.pos[1] > dY + this.radius) {
      this.pos[1] -= dY + (2*this.radius);
    }
  }

  MovingObject.prototype.placeOffScreen = function() {
    var maxX = Asteroids.DIM_X, maxY = Asteroids.DIM_Y;
    var self = this;
    // Finds the general direction that an object is traveling, then places
    // it just offscreen on the correct edge so it will float into view
    if (Math.abs(self.vel[0]) > Math.abs(self.vel[1])) {
      // Mostly traveling horizontally
      self.pos[0] = (self.vel[0] > 0) ? (0 - self.radius) : (maxX + self.radius);
    } else {
      // Mostly traveling vertically
      self.pos[1] = (self.vel[1] > 0) ? (0 - self.radius) : (maxY + self.radius);
    }
  }

  MovingObject.prototype.draw = function(ctx) {
    if (this.timers.mercy % 4 != 0) {
      return;
    }

    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  }

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    dX = this.pos[0] - otherObject.pos[0];
    dY = this.pos[1] - otherObject.pos[1];
    distance = Math.pow(Math.pow(dX,2) + Math.pow(dY, 2), 0.5);

    if ((this.timers.mercy === 0) && (distance <= (this.radius + otherObject.radius))) {
      return true;
    }
    return false;
  }
})(this);
