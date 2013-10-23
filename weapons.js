(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Weapon = Asteroids.Weapon = function(config) {
    this.cooldown = config.cooldown;
    this.speed = config.speed;
    this.bullet = config.bullet
  }

  Weapon.STANDARD = {
    cooldown: Math.floor(300 / Asteroids.RATE),
    speed: Asteroids.RATE * 500 / 1000,
    bullet: {
      radius: 3,
      damage: 3,
      color: 'green',
      lifetime: Asteroids.RATE * 5
    }
  }

  Weapon.FIRE = {
    cooldown: Math.floor(100 / Asteroids.RATE),
    speed: Asteroids.RATE * 825 / 1000,
    bullet: {
      radius: 8,
      damage: 1,
      color: 'red',
      lifetime: Math.floor(Asteroids.RATE * 0.75)
    }
  }

  Weapon.BOMB = {
    cooldown: Math.floor(900 / Asteroids.RATE),
    speed: Asteroids.RATE * 100 / 1000,
    bullet: {
      radius: 10,
      damage: 0,
      color: 'cyan',
      lifetime: Asteroids.RATE * 8,
      fuse: function(game) {
        // Remember to bind function to the bullet when called
        console.log("Kaboom!");
        // TODO: Write effects to suit something along the lines of this code:
        // var explosion = new Asteroids.Effect(this.pos, Asteroids.Effect.BOMB);
        // game.effects.push(explosion);
      }
    }
  }

  // Given the heading of the ship, and its velocity, returns the velocity of a new
  // bullet fired from the ship.
  Weapon.prototype.getVelocity = function(heading, shipVel) {
    var velocity = [Math.cos(heading) * this.speed, Math.sin(heading) * this.speed];
    velocity[0] += shipVel[0];
    velocity[1] += shipVel[1];
    return velocity;
  }


})(this);
