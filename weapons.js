(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Weapon = Asteroids.Weapon = function(config) {
    this.cooldown = config.cooldown;
    this.radius = config.radius;
    this.damage = config.damage;
    this.speed = config.speed;
    this.lifetime = config.lifetime;
    this.color = config.color;
  }

  Weapon.STANDARD = {
    cooldown: Math.floor(300 / Asteroids.RATE),
    radius: 3,
    damage: 3,
    speed: Asteroids.RATE * 500 / 1000,
    color: 'green',
    lifetime: Asteroids.RATE * 5
  }

  Weapon.FIRE = {
    cooldown: Math.floor(100 / Asteroids.RATE),
    radius: 8,
    damage: 2,
    speed: Asteroids.RATE * 825 / 1000,
    color: 'red',
    lifetime: Math.floor(Asteroids.RATE * 0.75)
  }

  Weapon.BOMB = {
    cooldown: Math.floor(900 / Asteroids.RATE),
    radius: 10,
    damage: 12,
    speed: Asteroids.RATE * 100 / 1000,
    color: 'cyan',
    lifetime: Asteroids.RATE * 8
  }

  Weapon.prototype.getVelocity = function(heading, shipVel) {
    var velocity = [Math.cos(heading) * this.speed, Math.sin(heading) * this.speed];
    velocity[0] += shipVel[0];
    velocity[1] += shipVel[1];
    return velocity;
  }


})(this);
