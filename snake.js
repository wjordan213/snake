;(function() {
  if (typeof Snakes === "undefined") {
    Snakes = {};
  }

  var Coords = Snakes.Coords = function Coords(x, y, dir) {
    // coord implementation will by linked list
    this.coords = [x, y];
    this.dir = dir;
    this.back = undefined;
    this.forward = undefined;

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

  var Snake = Snakes.Snake = function Snake(board) {
    this.board = board;
    this.badDirs = { "N": "S", "S": "N", "W": "E", "E": "W" };
    this.head = new Coords(10, 10, "N");
    this.tail = this.head;
  };

  Snake.prototype.turn = function(newDir) {
    // TODO: ternary if statement
    if (this.badDirs[this.head.dir] === newDir) {
      return false;
    } else {
      this.head.dir = newDir;
    }
  };

  Snake.prototype.move = function() {
    var cur = this.head;
    var last_dir;
    var last_loc;
    while ((typeof cur !== "undefined")) {
      last_loc = cur.coords;
      cur.moves[cur.dir]();

      if (cur === this.head) {
        // current iteration is head
        // set new head on board
        this.board[cur.coords[0]][cur.coords[1]] = 1;
      }

      if (last_dir) {
        // third iteration and beyond
        cur.dir = last_dir;
      } else if (cur.forward) {
        // second iteration
        last_dir = cur.dir;
        cur.dir = cur.forward.dir;
      }
      cur = cur.back;
    }

    this.board[last_loc[0]][last_loc[1]] = undefined;
  };

  var Board = Snakes.Board = function Board() {
    this.snake = new Snake(this);
    this.board = new Array(25);
    for (var i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(25);
    }
  };

  Board.prototype.render = function() {
    var renderedBoard = new Array(25);
    for (var i = 0; i < this.board.length; i++) {
      renderedBoard[i] = new Array(25);
      for (var j = 0; j < this.board[i].length; j++) {
        // check board coords. also, board needs to be updated on each move
        if (this.board[i][j] === undefined) {
          renderedBoard[i][j] = '.';
        } else {
          renderedBoard[i][j] = 'S';
        }
      }
    }
  };

})();
