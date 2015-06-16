;(function() {
  if (Snakes === undefined) {
    Snakes = {};
  }

  var Coords = Snakes.Coords = function Coords(x, y) {
    this.coords = [x, y];

    this.plus = function(dir) {
      if (dir === 'x') {
        this.coords[0] += 1;
      } else {
        this.coords[1] += 1;
      }
    };

    this.minus = function(dir) {
      if (dir === 'x') {
        this.coords[0] -= 1;
      } else {
        this.coords[1] -= 1;
      }
    };

    this.moves = {"N" : this.plus.bind(this, 'y'), "E" : this.plus.bind(this, 'x'), "S" : this.minus.bind(this, 'y'), "W" : this.minus.bind(this, 'x') };


    this.equals = function(otherCoords) {
      return this.coords === otherCoords;
    };

    this.isOpposite = function() {
    };
  };

  var Snake = Snakes.Snake = function Snake() {
    this.badDirs = { "N": "S", "S": "N", "W": "E", "E": "W" };
    this.dir = "N";
    this.segments = [];
    this.coords = new Coords(5, 5);
  };

  Snake.prototype.turn = function(newDir) {
    // TODO: ternary if statement
    if (this.badDirs[this.dir] === newDir) {
      return false;
    } else {
      this.dir = newDir;
    }
  };

  Snake.prototype.move = function() {
    this.coords.forEach(function(coords) {coords.moves[this.dir]();}.bind(this));
  };

  var Board = Snakes.Board = function Board() {
    this.snake = new Snake();
    this.board = new Array(100);
    for (var i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(100);
      for (var j = 0; j < this.board[i].length; j++) {
        this.board[i][j] = '.';
      }
    }

    this.board[50][50] = 'S';
  };

})();
