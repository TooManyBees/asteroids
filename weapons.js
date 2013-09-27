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

  var Weapon.STANDARD = {
    cooldown: 10,
    radius: 2,
    damage: 2,
    speed: 20,
    color: 'green',
    lifetime: 50
  }

  var Weapon.FIRE = {
    cooldown: 3,
    radius: 5,
    damage: 2,
    speed: 40,
    color: 'red',
    lifetime: 10
  }

})(this);