(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function(pos, vel, config, game) {
    // this.persistant = true; // it sticks around rather than being recreated each frame
    this.game = game;
    this.lifetime = config.lifetime;
    this.damage = config.damage;
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

})(this);
