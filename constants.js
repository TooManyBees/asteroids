(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function(superclass){
    function Surrogate () {};
    Surrogate.prototype = superclass.prototype;
    this.prototype = new Surrogate();
  }

  // Canvas size in pixels
  Asteroids.DIM_X = 500;
  Asteroids.DIM_Y = 500;
  // Frame rate in milliseconds/frame
  Asteroids.RATE = 17;

  Asteroids.randomPosition = function(dimX, dimY, ratio) {
    return [Math.random() * dimX * ratio, Math.random() * dimY * ratio];
  }

  Asteroids.randomVector = function(base, delta) {
    var randomAngle;
    if (base !== undefined) {
      randomAngle = (base - delta) + (Math.random() * 2 * delta);
    } else {
      randomAngle = Math.random() * 2 * Math.PI;
    }
    return [Math.cos(randomAngle), Math.sin(randomAngle)];
  }

  Asteroids.aimedVector = function(startPos, endPos, delta) {
    var heading = (endPos[0] - startPos[0]) / (endPos[1] - startPos[1]);
  }

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
