;(function() {
  if (typeof Snakes === "undefined") {
    Snakes = {};
  }

  // COORDS CLASS

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

    this.moves = { "N" : this.minus.bind(this, 'x'), "E" : this.plus.bind(this, 'y'), "S" : this.plus.bind(this, 'x'), "W" : this.minus.bind(this, 'y') };


    this.equals = function(otherCoords) {
      return this.coords === otherCoords;
    };

    this.isOpposite = function() {
    };
  };



  // SNAKE CLASS

  var Snake = Snakes.Snake = function Snake(board) {
    this.board = board;
    this.badDirs = { "N": "S", "S": "N", "W": "E", "E": "W" };
    this.head = new Coords(10, 10, "N");
    this.board.board[10][10] = 1;
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
      last_loc = cur.coords.slice(0);
      cur.moves[cur.dir]();

      if (cur === this.head) {
        // current iteration is head
        // set new head on board
        if (cur.coords[0] === 25 || cur.coords[0] === -1 || cur.coords[1] === -1 || cur.coords[1] === 25) {
          return false;
        }
        var x = this.board.board[cur.coords[0]][cur.coords[1]];
        if (x === 0) {
          this.eatApple();
        }
        this.board.board[cur.coords[0]][cur.coords[1]] = 1;
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
    this.board.board[last_loc[0]][last_loc[1]] = undefined;
  };

  Snake.prototype.eatApple = function() {
    console.log('ate');
  };


  // BOARD CLASS

  var Board = Snakes.Board = function Board() {
    this.board = new Array(25);
    for (var i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(25);
    }
    this.snake = new Snake(this);
    this.assignApple();
  };

  Board.prototype.assignApple = function () {
    var x = Math.floor(Math.random() * 25);
    var y = Math.floor(Math.random() * 25);

    while (typeof this.board[x][y] !== "undefined") {
      x = Math.floor(Math.random() * 25);
      y = Math.floor(Math.random() * 25);
    }

    this.board[x][y] = 0;
  };

  Board.prototype.clear = function () {
    // clears the snake off the board and all the elements about the snake off the board
    delete this.snake;
    this.clearBoard();
  };

  Board.prototype.clearBoard = function() {
    for (var i = 0; i < this.board.length; i++) {
      for (var j = 0; j < this.board[i].length; j++) {
        this.board[i][j] = undefined;
      }
    }
  };

  Board.prototype.render = function() {
    var renderedBoard = new Array(25);
    for (var i = 0; i < this.board.length; i++) {
      renderedBoard[i] = new Array(25);
      for (var j = 0; j < this.board[i].length; j++) {
        // check board coords. also, board needs to be updated on each move
        if (typeof this.board[i][j] === "undefined") {
          renderedBoard[i][j] = '.';
        } else if (this.board[i][j] === 1) {
          renderedBoard[i][j] = 'S';
        } else {
          renderedBoard[i][j] = 'a';
        }
      }
    }
    return renderedBoard;
  };

})();
