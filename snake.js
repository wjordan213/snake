;(function() {
  if (Snakes === undefined) {
    Snakes = {};
  }

  var Coords = Snakes.Coords = function Coords(x, y) {
    this.coords = [x, y];

    this.plus = function(dir) {
      if (dir === 'x') {
        x += 1;
      } else {
        y += 1;
      }
    };

    this.equals = function(other) {
      return this.coords === other.coords;
    };

    this.isOpposite = function() {

    };
  };

  var Snake = Snakes.Snake = function Snake() {
    this.badDirs = { "N": "S", "S": "N", "W": "E", "E": "W" };
    this.dir = "N";
    this.segments = [];
  };

  Snake.prototype.turn = function(newDir) {
    // TODO: ternary if statement
    if (this.badDirs === newDir) {
      return false;
    } else {
      this.dir = newDir;
    }
  };

  Snake.prototype.move = function() {
    this.coords.forEach(function(coord) {
      coord.plus();
    });
  };

})();
