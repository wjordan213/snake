;(function() {
  if (typeof Snakes === "undefined") {
    Snakes = {};
  }

  // COORDS CLASS

  var Coords = Snakes.Coords = function Coords(x, y, dir, forward, back) {
    // coord implementation will by linked list
    this.coords = [x, y];
    this.dir = dir;
    this.back = back;
    this.forward = forward;

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
  };



  // SNAKE CLASS

  var Snake = Snakes.Snake = function Snake(board) {
    this.board = board;
    this.badDirs = { "N": "S", "S": "N", "W": "E", "E": "W" };
    this.head = new Coords(10, 10, "N");
    this.board.board[10][10] = 1;
    this.board.occupiedSpaces.add(10 * 15 + 10);
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
    // update board at this.head.coords
    var appleEaten;

    var newHead = new Coords(this.head.coords[0], this.head.coords[1], this.head.dir, undefined, this.head);
    newHead.moves[this.head.dir]();
    if (newHead.coords[0] === 15 || newHead.coords[0] === -1 || newHead.coords[1] === -1 || newHead.coords[1] === 15 || this.board.occupiedSpaces.has(newHead.coords[0] * 15 + newHead.coords[1])) {
      return false;
    }

    this.head.forward = newHead;
    this.head = newHead;

    var x = this.board.board[this.head.coords[0]][this.head.coords[1]];
    if (x === 0) {
      appleEaten = true;
      this.board.assignApple();
    }

    this.board.board[this.head.coords[0]][this.head.coords[1]] = 1;
    this.board.occupiedSpaces.add(this.head.coords[0] * 15 + this.head.coords[1]);

    if (!appleEaten) {
      this.board.board[this.tail.coords[0]][this.tail.coords[1]] = undefined;
      this.board.occupiedSpaces.delete(this.tail.coords[0] * 15 + this.tail.coords[1]);
      this.tail = this.tail.forward;
    }
  };


  // BOARD CLASS

  var Board = Snakes.Board = function Board() {
    this.board = new Array(15);
    this.occupiedSpaces = new Set();
    for (var i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(15);
    }
    this.snake = new Snake(this);
    this.assignApple();
  };

  Board.prototype.assignApple = function () {
    var x = Math.floor(Math.random() * 15);
    var y = Math.floor(Math.random() * 15);
    while (typeof this.board[x][y] !== "undefined") {
      x = Math.floor(Math.random() * 15);
      y = Math.floor(Math.random() * 15);
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
    this.occupiedSpaces.clear();
  };

  Board.prototype.render = function() {
    var renderedBoard = new Array(15);
    for (var i = 0; i < this.board.length; i++) {
      renderedBoard[i] = new Array(15);
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
