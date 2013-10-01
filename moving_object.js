(function(root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MovingObject = Asteroids.MovingObject = function(pos, vel, radius, color, onScreen) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
    this.onScreen = (onScreen === undefined) ? true : onScreen ;
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
    if (this.onScreen) {
      this.flipIfOffscreen();
    } else {
      this.arriveIfOnscreen();
    }
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

  MovingObject.prototype.arriveIfOnscreen = function() {
    var dX = Asteroids.DIM_X, dy = Asteroids.DIM_Y;
    if (this.pos[0] > 0 - this.radius || this.pos[0] < dX + this.radius) {
      this.onScreen = true;
    }
    if (this.pos[1] > 0 - this.radius || this.pos[1] < dX + this.radius) {
      this.onScreen = true;
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
