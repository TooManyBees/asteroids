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
  Asteroids.RATE = 17

})(this);
