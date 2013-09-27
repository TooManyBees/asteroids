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
    cooldown: 10,
    radius: 2,
    damage: 2,
    speed: 20,
    color: 'green',
    lifetime: 50
  }

  Weapon.FIRE = {
    cooldown: 2,
    radius: 8,
    damage: 2,
    speed: 25,
    color: 'red',
    lifetime: 10
  }

  Weapon.prototype.getVelocity = function(heading, shipVel) {
    var velocity = [Math.cos(heading) * this.speed, Math.sin(heading) * this.speed];
    velocity[0] += shipVel[0];
    velocity[1] += shipVel[1];
    return velocity;
  }

})(this);
