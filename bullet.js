(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function(superclass){
    function Surrogate () {};
    Surrogate.prototype = superclass.prototype;
    this.prototype = new Surrogate();
  }

  var Bullet = Asteroids.Bullet = function(pos, vel, config, game) {
    this.persistant = true; // it sticks around rather than being recreated each frame
    this.game = game;
    this.lifetime = config.lifetime;
    Asteroids.MovingObject.call(this, pos, vel, config.radius, config.color);
  }

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.prototype.move = function(maxX, maxY) {
    this.lifetime -= 1;
    if (this.lifetime <= 0) {
      this.game.removeBullet(this);
    } else {
      Asteroids.MovingObject.prototype.move.call(this, maxX, maxY);
    }
  }

  Bullet.prototype.hitAsteroids = function() {
    var bullet = this;
    this.game.asteroids.forEach(function(asteroid) {
      if (asteroid.isCollidedWith(bullet)) {
        bullet.game.removeAsteroid(asteroid);
        bullet.game.removeBullet(bullet);
      }
    });
  }

})(this);
