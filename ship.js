(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function(superclass){
    function Surrogate () {};
    Surrogate.prototype = superclass.prototype;
    this.prototype = new Surrogate();
  }

  var Ship = Asteroids.Ship = function(pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, Ship.RADIUS, Ship.COLOR);
    this.lives = 3;
  }

  Ship.RADIUS = 10;
  Ship.COLOR = "blue";

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0] / 4;
    this.vel[1] += impulse[1] / 4;
  }

  Ship.prototype.getHeading = function() {
    that = this;
    // magnitude = Math.pow(Math.pow(that.vel[0], 2) + Math.pow(that.vel[0], 2), 2);
    // return Math.asin(that.vel[1] / magnitude);
    if (this.vel[1] < 0) {
      return Math.PI + Math.atan(that.vel[1] / that.vel[0]);
    } else {
      return Math.atan(that.vel[1] / that.vel[0]);
    }
  }

  Ship.prototype.fireBullet = function(game) {
    var bMagnitude = 20;
    var heading = this.getHeading();
    var bVelocity = [Math.cos(heading) * bMagnitude, Math.sin(heading) * bMagnitude];
    bVelocity[0] += this.vel[0];
    bVelocity[1] += this.vel[1];
    var bPos = [this.pos[0], this.pos[1]];
    return new Asteroids.Bullet(bPos, bVelocity, game);
  }

  Ship.prototype.draw = function(ctx) {
    Asteroids.MovingObject.prototype.draw.call(this, ctx);

    ctx.fillStyle = this.color;
    ctx.beginPath();

    for (var i = 0; i < this.lives; i++) {

      ctx.arc(
        (i + 1) * 30,
        15,
        this.radius,
        0,
        2 * Math.PI,
        false
      );
      ctx.fill();
    }
  }

})(this);
