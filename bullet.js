(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function(superclass){
    function Surrogate () {};
    Surrogate.prototype = superclass.prototype;
    this.prototype = new Surrogate();
  }

  var Bullet = Asteroids.Bullet = function(pos, vel, game) {
    this.game = game;
    this.lifetime = 100;
    Asteroids.MovingObject.call(this, pos, vel, Bullet.RADIUS, Bullet.COLOR);
  }

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.RADIUS = 2;
  Bullet.COLOR = "green";

  Bullet.prototype.move = function(maxX, maxY) {
    this.lifetime -= 1;
    if (this.lifetime <= 0) {
      console.log("bullet expired")
      this.game.removeBullet(this);
    } else {
      Asteroids.MovingObject.prototype.move.call(this, maxX, maxY);
    }
  }

  Bullet.prototype.hitAsteroids = function() {
    bullet = this;
    this.game.asteroids.forEach(function(asteroid) {
      if (asteroid.isCollidedWith(bullet)) {
        bullet.game.removeAsteroid(asteroid);
        bullet.game.removeBullet(bullet);
      }
    });
  }


})(this);