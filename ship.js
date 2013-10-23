(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, Ship.RADIUS, Ship.COLOR);

    // see weapons.js for more varieties
    this.weapon = new Asteroids.Weapon(Asteroids.Weapon.STANDARD);
    this.timers.shot = 0;
    this.lives = 3;
    this.heading = Math.PI / 2;
  }

  Ship.RADIUS = 6;
  Ship.COLOR = "blue";

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.power = function(impulse) {
    var ship = this;
    this.vel[0] += Math.cos(ship.heading) * impulse / (2*Asteroids.RATE);
    this.vel[1] += Math.sin(ship.heading) * impulse / (2*Asteroids.RATE);
  }

  Ship.prototype.rotate = function(angle) {
    // Asteroids.RATE is in milliseconds; 2 seconds per revolution
    this.heading += angle * (Math.PI * Asteroids.RATE / 1000);
  }

  Ship.prototype.fireBullet = function(game) {
    var ship = this;
    ship.timers.shot = ship.weapon.cooldown;
    var bPos = [ship.pos[0], ship.pos[1]];
    var bVelocity = this.weapon.getVelocity(ship.heading, ship.vel)
    return new Asteroids.Bullet(bPos, bVelocity, ship.weapon.bullet, game);
  }

  Ship.prototype.draw = function(ctx) {
    // mercy invincibility makes you flash, don't ya know
    if (this.timers.mercy % 4 != 0) {
      return;
    }

    var ship = this;

    ctx.save()
    ctx.fillStyle = this.color;

    // Draw triangular ship
    ctx.translate(ship.pos[0], ship.pos[1]);
    ctx.rotate(ship.heading);
    ctx.translate(-ship.pos[0], -ship.pos[1]);

    ctx.beginPath();
    ctx.moveTo(ship.pos[0] + 10, ship.pos[1]);
    ctx.lineTo(ship.pos[0] - 10, ship.pos[1] + 7);
    ctx.lineTo(ship.pos[0] - 10, ship.pos[1] - 7);
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
