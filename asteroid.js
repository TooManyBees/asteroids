(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function(superclass){
    function Surrogate () {};
    Surrogate.prototype = superclass.prototype;
    this.prototype = new Surrogate();
  }

  var Asteroid = Asteroids.Asteroid = function(pos, vel) {
    this.size = 1;
    this.score = Asteroid.SCORE;
    Asteroids.MovingObject.call(this, pos, vel, Asteroid.RADIUS_BIG, Asteroid.COLOR);
  }

  var AsteroidSmall = Asteroids.AsteroidSmall = function(pos, vel) {
    this.size = 2;
    this.score = Asteroid.SCORE_SMALL;
    Asteroids.MovingObject.call(this, pos, vel, Asteroid.RADIUS_SMALL, Asteroid.COLOR_SMALL);
  }

  Asteroid.COLOR = "brown";
  Asteroid.COLOR_SMALL = "orange";
  Asteroid.RADIUS_BIG = 15;
  Asteroid.RADIUS_SMALL = 10;
  Asteroid.SCORE = 10;
  Asteroid.SCORE_SMALL = 15

  Asteroid.inherits(Asteroids.MovingObject);
  AsteroidSmall.inherits(Asteroids.Asteroid);

  var randomPosition = function(dimX, dimY, ratio) {
    return [Math.random() * dimX * ratio, Math.random() * dimY * ratio];
  }

  var randomVelocity = function(max, min) {
    randomAngle = Math.random() * 2 * Math.PI;
    s = Math.random() * (max - min) + min
    return [Math.cos(randomAngle)*s, Math.sin(randomAngle)*s];
  }

  Asteroid.randomAsteroid = function(dimX, dimY) {
    startPos = randomPosition(dimX, dimY, 1);
    startVel = randomVelocity(2,1);
    return new Asteroid(startPos, startVel);
  }

  Asteroid.prototype.bounce = function() {
    this.vel[0] *= -1;
    this.vel[1] *= -1;
    this.bounce_window = 5;
  }

})(this);
