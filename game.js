(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.score = 0;
    this.timer = 0;
    this.ctx = ctx;
    this.asteroids = [];
    this.bullets = [];
    this.ship = new Asteroids.Ship([Game.DIM_X / 2, Game.DIM_Y / 2],[0,0]);
    this.addAsteroids(10);
  }

  Game.DIM_X = 500;
  Game.DIM_Y = 500;

  var img = new Image();
  img.src = 'space.jpg';

  Game.prototype.addAsteroids = function(numAsteroids) {
    for (var i = 0; i < numAsteroids; i++) {
      newAsteroid = Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y)
      if (this.asteroids.some(function(asteroid) {
        return newAsteroid.isCollidedWith(asteroid);
          }) || newAsteroid.isCollidedWith(this.ship)) {
        console.log("retrying");
        i--;
      } else {
        this.asteroids.push(newAsteroid);
      }
    }
  }

  Game.prototype.removeAsteroid = function(asteroid) {

    if (asteroid.size === 1) {
      this.score += 10;
      var child1 = new Asteroids.AsteroidSmall([asteroid.pos[0]+8, asteroid.pos[1]+6], [asteroid.vel[0], asteroid.vel[1]]);
      var child2 = new Asteroids.AsteroidSmall([asteroid.pos[0]-8, asteroid.pos[1]-6], [asteroid.vel[0]* -1, asteroid.vel[1]* -1]);
      this.asteroids.push(child1);
      this.asteroids.push(child2);
    } else {
      this.score += 5;
    }

    var index = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(index, 1);

  }

  Game.prototype.removeBullet = function(bullet) {
    var index = this.bullets.indexOf(bullet);
    this.bullets.splice(index, 1);
  }

  Game.prototype.drawScore = function() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "20pt Arial";
    this.ctx.textAlign = "right"
    this.ctx.textBaseline = "top";
    this.ctx.beginPath();
    this.ctx.fillText("Score: " + this.score, Game.DIM_X - 25,0);
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
    this.drawScore();
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
        asteroid.bounce()
        that.ship.lives -= 1;
        if (that.ship.lives === 0) {
          alert("You died, repeatedly.");
          that.stop();
        } else {
          that.ship.pos = [Game.DIM_X/2, Game.DIM_Y/2];
          that.ship.vel = [0,0];
          that.ship.bounce_window = 11;
        }
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
    if (this.ship.shotCooldown <== 0) {
      this.bullets.push(this.ship.fireBullet(this));
    }
  }

  Game.prototype.checkWinCondition = function() {
    if (this.asteroids.length === 0) {
      this.stop();
      alert("You win.");
    }
  }

  Game.prototype.listenForKeys = function() {
    // yowzers! decouple from framrate, why don't ya!
    if (key.isPressed('w')) this.ship.power(1);
    if (key.isPressed('a')) this.ship.rotate(-1);
    if (key.isPressed('d')) this.ship.rotate(1);
    if (key.isPressed('space')) this.fireBullet();
  };

  Game.prototype.step = function (){
    this.listenForKeys();
    this.checkWinCondition();
    this.move();
    this.draw();
    this.checkCollisions();
  }

  Game.prototype.bindKeyHandlers = function() {
    that = this;
    key('w', function(){ that.ship.power(1); });
    key('a', function(){ that.ship.rotate(-1); });
    key('d', function(){ that.ship.rotate(1); });
    key('space', function(){ that.fireBullet(); });
  }

  Game.prototype.start = function (){
    // this.bindKeyHandlers();
    this.timer = setInterval(this.step.bind(this), 33);
  }

  Game.prototype.stop = function () {
    clearInterval(this.timer);
  }

})(this);
