(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.paused = false;
    this.score = 0;
    this.timer = 0;
    this.ctx = ctx;
    this.asteroids = [];
    this.bullets = [];
    this.damageFields = [];
    this.items = [];
    this.ship = new Asteroids.Ship([Asteroids.DIM_X / 2, Asteroids.DIM_Y / 2],[0,0]);
    this.addAsteroids(10);
    this.asteroidLimit = 10;
  }

  var img = new Image();
  img.src = 'space.jpg';

  Game.prototype.addAsteroids = function(numAsteroids) {
    for (var i = 0; i < numAsteroids; i++) {
      var newAsteroid = Asteroids.Asteroid.randomAsteroid(Asteroids.DIM_X, Asteroids.DIM_Y)
      // if (this.asteroids.some(function(asteroid) {
      //   return newAsteroid.isCollidedWith(asteroid);
      //     }) || newAsteroid.isCollidedWith(this.ship)) {
      //   console.log("retrying");
      //   i--;
      // } else {
        newAsteroid.game = this;
        this.asteroids.push(newAsteroid);
      // }
    }
  }

  Game.prototype.removeAsteroid = function(asteroid) {
    var that = this;
    that.score += asteroid.score;

    var babies = asteroid.break();
    var index = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(index, 1);

    if (babies.length > 0) {
      babies.forEach(function(baby) {
        baby.game = that;
        baby.timers.mercy = Math.ceil(Asteroids.RATE / 2);
        that.asteroids.push(baby);
      });
    }

  }

  Game.prototype.removeBullet = function(bullet) {
    var index = this.bullets.indexOf(bullet);
    this.bullets.splice(index, 1);
  }

  Game.prototype.drawScore = function() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "20pt Arial";
    this.ctx.textAlign = "right";
    this.ctx.textBaseline = "top";
    this.ctx.beginPath();
    this.ctx.fillText("Score: " + this.score, Asteroids.DIM_X - 25,0);
  }

  Game.prototype.draw = function(){
    var that = this;
    this.ctx.clearRect(0, 0, Asteroids.DIM_X, Asteroids.DIM_Y);
    this.ctx.drawImage(img,0,0);

    this.asteroids.forEach (function(asteroid) {
      asteroid.draw(that.ctx);
    });
    this.bullets.forEach (function(bullet) {
      bullet.draw(that.ctx);
    });
    this.ship.draw(that.ctx);
    this.drawScore();
  }

  Game.prototype.move = function(){
    this.asteroids.forEach (function(asteroid) {
      asteroid.move();
    });

    this.bullets.forEach (function(bullet) {
      bullet.move();
    });

    this.ship.move();
  }

  Game.prototype.checkCollisions = function () {
    var that = this;
    this.asteroids.forEach(function(asteroid) {
      if (asteroid.isCollidedWith(that.ship)) {
        asteroid.bounce()
        that.ship.lives -= 1;
        that.score -= 20;
        that.ship.pos = [Asteroids.DIM_X/2, Asteroids.DIM_Y/2];
        that.ship.vel = [0,0];
        that.ship.timers.mercy = Asteroids.RATE * 3;
      }
    });

    // for (asteroid1 in this.asteroids) {
    //   for (asteroid2 in this.asteroids) {
    //     if (asteroid1 !== asteroid2) {
    //       if (this.asteroids[asteroid1].isCollidedWith(this.asteroids[asteroid2])) {
    //         this.asteroids[asteroid1].bounce()
    //         break;
    //       }
    //     }
    //   }
    // }

    this.bullets.forEach(function(bullet) {
      bullet.hitAsteroids();
    });
  }

  Game.prototype.fireBullet = function () {
    if (this.ship.timers['shot'] <= 0) {
      this.bullets.push(this.ship.fireBullet(this));
    }
  }

  Game.prototype.printEndMessage = function(message) {
    this.ctx.fillStyle = "white";
    this.ctx.font = "80pt Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.beginPath();
    this.ctx.fillText(message, Asteroids.DIM_X / 2, Asteroids.DIM_Y / 2);
  };

  Game.prototype.checkEndCondition = function() {
    if (this.asteroids.length <= 0) {
      this.stop();
      this.printEndMessage("You win.");
    } else if (this.ship.lives <= 0) {
      this.stop();
      this.printEndMessage("You lose.");
    }
  }

  Game.prototype.listenForKeys = function() {
    if (key.isPressed('w')) this.ship.power(1);
    if (key.isPressed('a')) this.ship.rotate(-1);
    if (key.isPressed('d')) this.ship.rotate(1);
    if (key.isPressed('space')) this.fireBullet();
  };

  Game.prototype.step = function (){
    this.listenForKeys();
    this.move();
    this.draw();
    this.checkEndCondition();
    this.checkCollisions();
  }

  Game.prototype.resume = function (){
    this.paused = false;
    this.timer = setInterval(this.step.bind(this), Asteroids.RATE);
  }

  Game.prototype.stop = function () {
    clearInterval(this.timer);
    this.paused = true;
  }

  Game.prototype.togglePause = function() {
    if (this.paused) {
      this.resume();
    } else {
      this.stop();
    }
  }

  Game.prototype.bindKeyHandlers = function() {
    // These are for keys that don't need to be checked every frame
    // (so basically toggle pause and that's it)
    var that = this;
    key('`', function(){ that.togglePause(); });
  }

  Game.prototype.start = function() {
    this.bindKeyHandlers();
    this.resume();
  }

})(this);
