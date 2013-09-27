(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function(superclass){
    function Surrogate () {};
    Surrogate.prototype = superclass.prototype;
    this.prototype = new Surrogate();
  }

  var Asteroid = Asteroids.Asteroid = function(pos, vel, config) {
    this.score = config.score;
    Asteroids.MovingObject.call(this, pos, vel, config.radius, config.color);
  }

  var DefaultAsteroid = Asteroids.DefaultAsteroid = {
    color: "brown",
    radius: 15,
    score: 10
  }

  var DefaultAsteroidSmall = Asteroids.DefaultAsteroidSmall = {
    color: "orange",
    radius: 10,
    score: 5
  }

  Asteroid.inherits(Asteroids.MovingObject);

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
    return new Asteroid(startPos, startVel, Asteroids.DefaultAsteroid);
  }

  Asteroid.prototype.break = function() {
    var babies = []
    if (this.radius > 10) {
      babies.push(new Asteroid(
                      [this.pos[0], this.pos[1]],
                      [this.vel[1], this.vel[0]],
                      DefaultAsteroidSmall));
      babies.push(new Asteroid(
                      [this.pos[0], this.pos[1]],
                      [-this.vel[1], -this.vel[0]],
                      DefaultAsteroidSmall));
    }
    return babies;
  }

  Asteroid.prototype.bounce = function() {
    this.vel[0] *= -1;
    this.vel[1] *= -1;
  }

})(this);
