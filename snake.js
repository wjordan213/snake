;(function() {
  if (typeof Snakes === "undefined") {
    Snakes = {};
  }

  // COORDS CLASS
  var Coords = Snakes.Coords = function Coords(x, y, dir, forward, back) {
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
  };

  // SNAKE CLASS
  var Snake = Snakes.Snake = function Snake(board) {
    this.board = board;
    this.badDirs = { "N": "S", "S": "N", "W": "E", "E": "W" };
    this.head = new Coords(10, 10, "N");
    this.tail = new Coords(this.head.coords[0], this.head.coords[1], "N", this.head, undefined);
    this.tail.moves["S"]();
    this.head.back = this.tail;
    this.board.board[10][10] = 1;
    this.board.occupiedSpaces.add(10 * 15 + 10);
    this.length = 0;
    Snakes.score = 0;
    this.turns = [];
    this.bodySpot = undefined;
  };

  Snake.prototype.turn = function(newDir) {
    if ((this.turns.length === 0 && this.badDirs[this.head.dir] === newDir) || (this.badDirs[this.turns[this.turns.length - 1]] === newDir || this.turns.length >= 2)) {
      return false;
    } else {
      this.turns.push(newDir);
    }
  };

  var outOfBoundsOrOccupied = function(coord) {
    return (coord.coords[0] === 15 || coord.coords[0] === -1 || coord.coords[1] === -1 || coord.coords[1] === 15 || this.board.occupiedSpaces.has(coord.coords[0] * 15 + coord.coords[1]));
  };

  Snake.prototype.eatApple = function() {
    this.board.assignApple();
    this.length += 1;
    this.emptySpot = false;
    Snakes.score += 100;
  };

  Snake.prototype.move = function() {
    var appleEaten;
    if (this.turns.length > 0) {
      this.head.dir = this.turns.shift();
    }

    var newHead = new Coords(this.head.coords[0], this.head.coords[1], this.head.dir, undefined, this.head);
    newHead.moves[this.head.dir]();
    if (outOfBoundsOrOccupied.call(this, newHead)) {
      return false;
    } else {
      this.head.forward = newHead;
      this.head = newHead;
    }

    if (this.board.valueAt(this.head) === 0) {
      appleEaten = true;
      this.eatApple();
    }

    if (this.length >= 1) {
      this.bodySpot = this.head.back.coords.concat(this.head.back.dir);
    }

    this.board.assignValue(this.head, 1);
    this.board.occupiedSpaces.add(this.head.coords[0] * 15 + this.head.coords[1]);

    if (!appleEaten) {
      this.board.assignValue(this.tail, undefined);
      this.emptySpot = this.tail.coords;

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

  Board.prototype.assignValue = function(coord, value) {
    this.board[coord.coords[0]][coord.coords[1]] = value;
  };

  Board.prototype.assignApple = function () {
    var x = Math.floor(Math.random() * 15);
    var y = Math.floor(Math.random() * 15);
    while (typeof this.board[x][y] !== "undefined") {
      x = Math.floor(Math.random() * 15);
      y = Math.floor(Math.random() * 15);
    }
    this.appleLoc = [x, y];
    this.board[x][y] = 0;
  };

  Board.prototype.valueAt = function(coord) {
    return this.board[coord.coords[0]][coord.coords[1]];
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
    return {
      emptySpot: this.snake.emptySpot,
      newHead: this.snake.head.coords.concat(this.snake.head.dir),
      apple: this.appleLoc,
      tailSpot: this.snake.tail.coords.concat(this.snake.tail.dir),
      bodySpot: this.snake.bodySpot
    };
  };
})();
