(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.asteroids= [];
    this.ship = new Asteroids.Ship([Game.DIM_X / 2, Game.DIM_Y / 2],[0,0]);
  }

  Game.DIM_X = 500;
  Game.DIM_Y = 500;

  Game.prototype.addAsteroids = function(numAsteroids) {
    for (var i = 0; i < numAsteroids; i++) {
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
    }
  }

  Game.prototype.draw = function(){
    that = this;
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.asteroids.forEach (function(asteroid) {
      asteroid.draw(that.ctx);
    });
    this.ship.draw(that.ctx);
  }

  Game.prototype.move = function(){
    this.asteroids.forEach (function(asteroid) {
      asteroid.move(Game.DIM_X, Game.DIM_Y);
    });
    this.ship.move(Game.DIM_X, Game.DIM_Y);
  }

  Game.prototype.checkCollisions = function () {
    that = this;
    this.asteroids.forEach(function(asteroid) {
      if (asteroid.isCollidedWith(that.ship)) {
        alert("Collided with ship!");
      }
    });
  }

  Game.prototype.step = function (){
    this.move();
    this.draw();
    this.checkCollisions();
  }

  Game.prototype.start = function (){
    this.addAsteroids(10);
    setInterval(this.step.bind(this), 33);
  }

})(this);