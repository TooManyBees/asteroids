(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function(superclass){
    function Surrogate () {};
    Surrogate.prototype = superclass.prototype;
    this.prototype = new Surrogate();
  }

  // Canvas size in pixels
  Asteroids.DIM_X = 600;
  Asteroids.DIM_Y = 600;
  // Frame rate in milliseconds/frame
  Asteroids.RATE = 17;
  Asteroids.REPOPTIME = 15 * Asteroids.RATE;

  Asteroids.WEAPONTIMER = 25 * Asteroids.RATE;

  Asteroids.randomPosition = function(dimX, dimY) {
    (dimX || (dimX = Asteroids.DIM_X));
    (dimY || (dimY = Asteroids.DIM_Y));
    return [Math.random() * dimX, Math.random() * dimY];
  }

  // Returns a random unit vector. If no arguments are given, it has a random
  // direction. If a base and delta (angles in radians) are given, it a vector
  // with a random direction of base +/- delta.
  Asteroids.randomVector = function(base, delta) {
    var randomAngle;
    if (base !== undefined) {
      randomAngle = (base - delta) + (Math.random() * 2 * delta);
    } else {
      randomAngle = Math.random() * 2 * Math.PI;
    }
    return [Math.cos(randomAngle), Math.sin(randomAngle)];
  }

  // This is not currently used, and doesn't yet incorporate the delta "jitter"
  Asteroids.aimedVector = function(startPos, endPos, delta) {
    var horizontal = (endPos[0] - startPos[0]);
    var vertical = (endPos[1] - startPos[1]);
    var magnitude = Math.pow(Math.pow(horizontal, 2) + Math.pow(vertical, 2), 0.5);

    return [horizontal/magnitude, vertical/magnitude]
  }

  // Accepts a unit vector (i.e. from randomVector() above) and returns
  // the same vector multiplied by a random magnitude between min and max
  Asteroids.randomVelocity = function(vector, min, max) {
    var s = Math.random() * (max - min) + min;
    return [vector[0]*s, vector[1]*s];
  }

  Asteroids.getHeading = function(vel) {
    var angle = Math.atan2(vel[1], vel[0]);
    if (angle < 0) {
      angle += Math.PI * 2;
    }
    return angle;
  }

})(this);
