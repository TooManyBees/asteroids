(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function(superclass){
    function Surrogate () {};
    Surrogate.prototype = superclass.prototype;
    this.prototype = new Surrogate();
  }

  var Ship = Asteroids.Ship = function(pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, Ship.RADIUS, Ship.COLOR);

    this.weapon = new Asteroids.Weapon(Asteroids.Weapon.STANDARD);
    this.timers.shot = 0;
    this.lives = 3;
    this.heading = Math.PI / 2;
  }

  Ship.RADIUS = 6;
  Ship.COLOR = "blue";

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.power = function(impulse) {
    ship = this;
    this.vel[0] += Math.cos(ship.heading) * impulse / 10;
    this.vel[1] += Math.sin(ship.heading) * impulse / 10;
  }

  Ship.prototype.rotate = function(angle) {
    this.heading += angle * Math.PI/30;
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
    if (this.timers.mercy % 4 != 0) {
      return;
    }
    ship = this;

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

    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.save();
    // Draw life sigils
    for (var i = 0; i < this.lives; i++) {
      ctx.beginPath();
      ctx.moveTo(20,10);
      ctx.lineTo(30,20);
      ctx.lineTo(20,30);
      ctx.lineTo(10,20);
      ctx.closePath();
      ctx.fill();
      ctx.translate(20, 0);
    }
    ctx.restore();
  }

})(this);
