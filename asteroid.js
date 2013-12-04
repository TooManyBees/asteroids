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
    fast: {
      color: "cyan",
      radius: 10,
      score: 40,
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
  Asteroid.randomAsteroid = function(dimX, dimY, type) {
    (type || (type = 'medium')) // Default to medium asteroid

    if (type === 'random') {
      var types = Object.keys(Asteroid.defaults)
      // We're skipping the first two asteroid types, as they're special
      // ('small' is only created when an asteroid dies, 'fast' is only
      // created when it's manually aimed at the ship)
      var i = Math.floor((types.length - 2) * Math.random()) + 2
      type = types[i]
    }

    var asteroidType = Asteroid.defaults[type]

    var startPos = Asteroids.randomPosition(dimX, dimY, 1);
    var startVel = Asteroids.randomVelocity(
      Asteroids.randomVector(),
      Asteroids.RATE / 16,
      Asteroids.RATE / 32
      );
    var newAsteroid = new Asteroid(startPos, startVel, asteroidType);
    newAsteroid.placeOffScreen();
    return newAsteroid;
  }

  // Adds an asteroid at a random location just barely off the canvas
  Asteroid.replacementAsteroid = function(type) {
    (type || (type = 'medium')) // Default to medium asteroid

    var dimX = Asteroids.DIM_X, dimY = Asteroids.DIM_Y;
    var newAsteroid = Asteroid.randomAsteroid(dimX, dimY, type);
    return newAsteroid;
  }

  Asteroid.prototype.aim = function(target) {
    var self = this;

    var newVel = Asteroids.randomVelocity(
      Asteroids.aimedVector(self.pos, target.pos),
      Asteroids.RATE / 4,
      Asteroids.RATE / 8
      );
    this.vel = newVel;
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
