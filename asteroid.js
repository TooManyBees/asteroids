(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function(superclass){
    function Surrogate () {};
    Surrogate.prototype = superclass.prototype;
    this.prototype = new Surrogate();
  }

  var Asteroid = Asteroids.Asteroid = function(pos, vel, config) {
    this.score = config.score;
    this.child = config.child;
    Asteroids.MovingObject.call(this, pos, vel, config.radius, config.color);
  }

  var DefaultAsteroidSmall = Asteroids.DefaultAsteroidSmall = {
    color: "orange",
    radius: 10,
    score: 5,
    child: 0
  }

  var DefaultAsteroid = Asteroids.DefaultAsteroid = {
    color: "brown",
    radius: 15,
    score: 10,
    child: DefaultAsteroidSmall
  }

  Asteroid.inherits(Asteroids.MovingObject);

  var randomPosition = function(dimX, dimY, ratio) {
    return [Math.random() * dimX * ratio, Math.random() * dimY * ratio];
  }

  var randomVelocity = function(max, min) {
    randomAngle = Math.random() * 2 * Math.PI;
    s = (Math.random() * (max - min) + min)
    return [Math.cos(randomAngle)*s, Math.sin(randomAngle)*s];
  }

  // TODO: Add a speedUp ratio to the calculations
  Asteroid.randomAsteroid = function(dimX, dimY) {
    startPos = randomPosition(dimX, dimY, 1);
    startVel = randomVelocity(Asteroids.RATE / 16, Asteroids.RATE / 32);
    return new Asteroid(startPos, startVel, Asteroids.DefaultAsteroid);
  }

  Asteroid.prototype.break = function() {
    var babies = []
    var that = this;
    if (that.child !== 0) {
      babies.push(new Asteroid(
                      [that.pos[0], that.pos[1]],
                      [that.vel[1], that.vel[0]],
                      that.child));
      babies.push(new Asteroid(
                      [that.pos[0], that.pos[1]],
                      [-that.vel[1], -that.vel[0]],
                      that.child));
    }
    return babies;
  }

  Asteroid.prototype.bounce = function() {
    this.vel[0] *= -1;
    this.vel[1] *= -1;
  }

})(this);
