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
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  Ship.prototype.fireBullet = function(game) {
    var bulletConstant0 = 20 * this.vel[0]/(Math.abs(this.vel[0])+0.00001)
    var bulletConstant1 = 20 * this.vel[1]/(Math.abs(this.vel[1])+0.00001)
    var bulletVelocity = [this.vel[0] + bulletConstant0, this.vel[1] + bulletConstant1]
    var bulletPos = [this.pos[0], this.pos[1]];
    return new Asteroids.Bullet(bulletPos, bulletVelocity, game);
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