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
    this.heading = Math.PI / 2;
  }

  Ship.RADIUS = 6;
  Ship.COLOR = "blue";

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.power = function(impulse) {
    this.vel[0] += Math.acos(impulse);
    this.vel[1] += Math.asin(impulse);
  }

  Ship.prototype.rotate = function(angle) {
    this.heading += angle * Math.PI/60;
  }

  Ship.prototype.fireBullet = function(game) {
    var heading = this.heading;
    var bMagnitude = 20;
    var bVelocity = [Math.cos(heading) * bMagnitude, Math.sin(heading) * bMagnitude];
    bVelocity[0] += this.vel[0];
    bVelocity[1] += this.vel[1];
    var bPos = [this.pos[0], this.pos[1]];
    return new Asteroids.Bullet(bPos, bVelocity, game);
  }

  Ship.prototype.draw = function(ctx) {
    ship = this;
    // Asteroids.MovingObject.prototype.draw.call(this, ctx);
    ctx.save()

    ctx.fillStyle = this.color;

    ctx.translate(ship.pos[0], ship.pos[1]);
    ctx.rotate(ship.heading);
    ctx.translate(-ship.pos[0], -ship.pos[1]);

    ctx.beginPath();
    ctx.moveTo(ship.pos[0] + 10, ship.pos[1]);
    ctx.lineTo(ship.pos[0]-10, ship.pos[1]+7);
    ctx.lineTo(ship.pos[0]-10, ship.pos[1]-7);
    ctx.closePath();

    ctx.fill();
    ctx.restore();

    // ctx.fillStyle = this.color;
    // ctx.beginPath();

    // for (var i = 0; i < this.lives; i++) {

    //   ctx.arc(
    //     (i + 1) * 30,
    //     15,
    //     this.radius,
    //     0,
    //     2 * Math.PI,
    //     false
    //   );
    //   ctx.fill();
    // }
  }

})(this);
