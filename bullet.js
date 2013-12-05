(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function(pos, vel, config, game) {
    var self = this;
    // this.persistant = true; // it sticks around rather than being recreated each frame
    this.lifetime = new Asteroids.Timer(config.lifetime, function() {
      game.removeBullet(self);
    });
    this.damage = config.damage;
    Asteroids.MovingObject.call(this, pos, vel, config.radius, config.color);
  }

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.prototype.move = function(maxX, maxY) {
    this.lifetime.tick();
    Asteroids.MovingObject.prototype.move.call(this, maxX, maxY);
  }

})(this);
