(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.timer = 0;
    this.ctx = ctx;
    this.asteroids = [];
    this.bullets = [];
    this.addAsteroids(10);
    this.ship = new Asteroids.Ship([Game.DIM_X / 2, Game.DIM_Y / 2],[0,0]);
  }

  Game.DIM_X = 500;
  Game.DIM_Y = 500;

  var img = new Image();
  // img.onload = function() {
//     ctx.drawImage(img, 0,0);
//   };
  img.src = 'space.jpg';

  Game.prototype.addAsteroids = function(numAsteroids) {
    for (var i = 0; i < numAsteroids; i++) {
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
    }
  }

  Game.prototype.removeAsteroid = function(asteroid) {
    var index = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(index, 1);
  }

  Game.prototype.removeBullet = function(bullet) {
    var index = this.bullets.indexOf(bullet);
    this.bullets.splice(index, 1);
  }

  Game.prototype.draw = function(){
    that = this;
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.ctx.drawImage(img,0,0);

    this.asteroids.forEach (function(asteroid) {
      asteroid.draw(that.ctx);
    });
    this.bullets.forEach (function(bullet) {
      bullet.draw(that.ctx);
    });
    this.ship.draw(that.ctx);
  }

  Game.prototype.move = function(){
    this.asteroids.forEach (function(asteroid) {
      asteroid.move(Game.DIM_X, Game.DIM_Y);
    });

    this.bullets.forEach (function(bullet) {
      bullet.move(Game.DIM_X, Game.DIM_Y);
    });

    this.ship.move(Game.DIM_X, Game.DIM_Y);
  }

  Game.prototype.checkCollisions = function () {
    that = this;
    this.asteroids.forEach(function(asteroid) {
      if (asteroid.isCollidedWith(that.ship)) {
        that.ship.lives -= 1;
        if (that.ship.lives === 0) {
          alert("You died, repeatedly.");
          that.stop();
        } else {
          that.ship.pos = [Game.DIM_X/2, Game.DIM_Y/2];
          that.ship.vel = [0,0];
        }
      }
    });
    this.bullets.forEach(function(bullet) {
      bullet.hitAsteroids();
    });
  }

  Game.prototype.fireBullet = function () {
    if (this.ship.vel.join('') !== '00') {
      this.bullets.push(this.ship.fireBullet(this));
    }
  }

  Game.prototype.step = function (){
    this.move();
    this.draw();
    this.checkCollisions();
  }

  Game.prototype.bindKeyHandlers = function() {
    that = this;
    key('w', function(){ that.ship.power([0,-1]); });
    key('a', function(){ that.ship.power([-1,0]); });
    key('s', function(){ that.ship.power([0,1]); });
    key('d', function(){ that.ship.power([1,0]); });
    key('space', function(){ that.fireBullet(); });
  }

  Game.prototype.start = function (){
    this.bindKeyHandlers();
    this.timer = setInterval(this.step.bind(this), 33);
  }

  Game.prototype.stop = function () {
    clearInterval(this.timer);
  }

})(this);