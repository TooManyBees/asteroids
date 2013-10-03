(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, vel, config) {
    this.score = config.score;
    this.hp = config.hp;
    this.child = config.child;
    this.child_count = config.child_count;
    Asteroids.MovingObject.call(this, pos, vel, config.radius, config.color);
  }

  Asteroid.defaults = {
    small: {
      color: "orange",
      radius: 10,
      score: 5,
      hp: 2,
      child: 0
    },
    medium: {
      color: "brown",
      radius: 15,
      score: 10,
      hp: 5,
      child: 'small',
      child_count: 2
    },
    large: {
      color: "brown",
      radius: 20,
      score: 15,
      hp: 10,
      child: 'small',
      child_count: 3
    },
    mega: {
      color: "gray",
      radius: 25,
      score: 20,
      hp: 20,
      child: 'medium',
      child_count: 2
    }
  }

  Asteroid.inherits(Asteroids.MovingObject);

  // TODO: Add a speedUp ratio to the calculations
  // Adds an asteroid at a random location on the canvas
  Asteroid.randomAsteroid = function(dimX, dimY) {
    var startPos = Asteroids.randomPosition(dimX, dimY, 1);
    var startVel = Asteroids.randomVelocity(
      Asteroids.randomVector(),
      Asteroids.RATE / 16,
      Asteroids.RATE / 32
      );
    var newAsteroid = new Asteroid(startPos, startVel, Asteroid.defaults.medium);
    newAsteroid.placeOffScreen();
    return newAsteroid;
  }

  // Adds an asteroid at a random location just barely off the canvas
  Asteroid.replacementAsteroid = function() {
    var dimX = Asteroids.DIM_X, dimY = Asteroids.DIM_Y;
    var newAsteroid = Asteroid.randomAsteroid(dimX, dimY);

  }

  Asteroid.prototype.break = function() {
    var babies = []
    var that = this;
    if (that.child !== 0) {
      for (var i = 0; i < that.child_count; i++) {
        babies.push(new Asteroid(
                      [that.pos[0], that.pos[1]],
                      Asteroids.randomVelocity(
                        Asteroids.randomVector( that.heading, Math.PI/8 ),
                        Asteroids.RATE/16,
                        Asteroids.RATE/32),
                      Asteroid.defaults[that.child]));
      }
      // babies.push(new Asteroid(
      //                 [that.pos[0], that.pos[1]],
      //                 randomVelocity(Asteroids.RATE/16, Asteroids.RATE/32),
      //                 that.child));
      // babies.push(new Asteroid(
      //                 [that.pos[0], that.pos[1]],
      //                 [-that.vel[1], -that.vel[0]],
      //                 that.child));
    }
    return babies;
  }

  Asteroid.prototype.takeDamage = function(damage) {
    this.hp -= damage;
    if (this.game && this.hp <= 0) {
      this.game.removeAsteroid(this);
    }
  };

  Asteroid.prototype.bounce = function() {
    this.vel[0] *= -1;
    this.vel[1] *= -1;
  }

})(this);
