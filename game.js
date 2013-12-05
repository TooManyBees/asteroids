(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.paused = false;
    this.score = 0;
    this.timer = 0;
    this.timers = {
      repop: new Asteroids.Timer(
        Asteroids.REPOPTIME,
        this.populateAsteroids.bind(this, {type: 'random'})
      ),
      aim: new Asteroids.Timer(
        Asteroids.REPOPTIME * 2,
        this.aimAsteroid.bind(this)
      )
    };
    this.ctx = ctx;
    this.asteroids = [];
    this.bullets = [];
    this.pickups = [];
    this.damageFields = [];
    this.items = [];
    this.ship = new Asteroids.Ship([Asteroids.DIM_X / 2, Asteroids.DIM_Y / 2],[0,0]);
    // asteroid limit is in 'points'. A regular one is worth 15.
    this.fieldValue = 0
    this.fieldLimit = 150;
    this.populateAsteroids({type: 'random'});
  }

  var img = new Image();
  img.src = 'space.jpg';

  Game.prototype.asteroidValue = function() {
    var sum = 0;
    this.asteroids.forEach(function(asteroid) {
      sum += asteroid.score;
    })
    return sum;
  }

  // Takes an options has of 'limit' and 'type'
  Game.prototype.populateAsteroids = function(o) {
    (o || (o = {})) // Default to an empty object

    while (this.fieldValue < (o.limit || this.fieldLimit)) {
      var newAsteroid = Asteroids.Asteroid.replacementAsteroid(o.type)
      newAsteroid.game = this;
      this.fieldValue += newAsteroid.score;
      this.asteroids.push(newAsteroid);
    }
  }

  Game.prototype.aimAsteroid = function() {
    aimedAsteroid = Asteroids.Asteroid.replacementAsteroid('fast');
    aimedAsteroid.aim(this.ship);
    aimedAsteroid.game = this;
    this.asteroids.push(aimedAsteroid);
  }

  // In practice identical to above, just less work.
  // Can probably remove it later on.
  // Game.prototype.addAsteroids = function(numAsteroids) {
  //   for (var i = 0; i < numAsteroids; i++) {
  //     var newAsteroid = Asteroids.Asteroid.randomAsteroid(Asteroids.DIM_X, Asteroids.DIM_Y)
  //     newAsteroid.game = this;
  //     this.asteroids.push(newAsteroid);
  //   }
  // }

  Game.prototype.addRandomPickup = function(pos) {
    this.pickups.push(
      // while there's just 1 working weapon, hardcoded it in
      new Asteroids.Weapon(
        Asteroids.Weapon.FIRE,
        (pos || Asteroids.randomPosition())
        )
      )
  }

  Game.prototype.removeAsteroid = function(asteroid) {
    var that = this;
    that.score += asteroid.score;
    that.fieldValue -= asteroid.score;

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

  Game.prototype.removePickup = function(pickup) {
    var index = this.pickups.indexOf(pickup);
    this.pickups.splice(index, 1);
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
    this.pickups.forEach (function(pickup) {
      pickup.draw(that.ctx);
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
      if (that.ship.isCollidedWith(asteroid)) {
        // asteroid.bounce()
        that.ship.die();
        that.score -= 20;
      }
    });

    // FYI Pickups probably won't have their own isCollidedWith method
    // but they do have a pos field
    this.pickups.forEach(function(pickup) {
      if (that.ship.isCollidedWith(pickup)) {
        pickup.pickedUpBy(that.ship);
        that.removePickup(pickup);
      }
    });

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
    var self = this;
    this.listenForKeys();
    this.move();
    Object.keys(this.timers).forEach(function(timer) {
      self.timers[timer].tick();
    });

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
    // (so basically the pause button and that's it)
    var that = this;
    key('`', function(){ that.togglePause(); });
    key('space', function(event) {event.preventDefault()});
  }

  Game.prototype.start = function() {
    this.bindKeyHandlers();
    this.resume();
  }

})(this);
