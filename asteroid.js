(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function(superclass){
    function Surrogate () {};
    Surrogate.prototype = superclass.prototype;
    this.prototype = new Surrogate();
  }

  var Asteroid = Asteroids.Asteroid = function(pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, Asteroid.RADIUS, Asteroid.COLOR);
  }

  Asteroid.COLOR = "brown";
  Asteroid.RADIUS = 10;

  Asteroid.inherits(Asteroids.MovingObject);

  var randomPosition = function(dimX, dimY, ratio) {
    return [Math.random() * dimX * ratio, Math.random() * dimY * ratio];
  }

  Asteroid.randomAsteroid = function(dimX, dimY) {
    startPos = randomPosition(dimX, dimY, 1);
    random_velocity = (Math.random() * 2 - 1) / 40
    startVel = randomPosition(dimX, dimY, random_velocity);
    return new Asteroid(startPos, startVel);
  }

})(this);