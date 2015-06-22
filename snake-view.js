(function() {
  var View = Snakes.View = function View($el, options) {
    this.$el = $el;
    this.board = new Snakes.Board();
    $('html').on('keydown', this.handleKeyEvent.bind(this));
    $('strong.restartGame').on('click', Snakes.restartGame);
    Snakes.intervId = setInterval(this.step.bind(this), 80);
    this.renderBoard();
    if (options && options.callback) {
      options.callback();
    }
    this.status = true;
  };

  var dirCodes = {87: "N", 38: "N", 65: "W", 37: "W", 83: "S", 40: "S", 68: "E", 39: "E" };

  View.prototype.handleKeyEvent = function(event) {
    if (this.status) {
      if (event.keyCode === 80) {
        clearInterval(Snakes.intervId);
        Snakes.intervId = undefined;
        this.status = false;
      } else {
        dirCodes[event.keyCode] && this.board.snake.turn(dirCodes[event.keyCode]);
      }
    } else {
      Snakes.intervId = setInterval(this.step.bind(this), 80);
      this.status = true;
    }
  };

  View.prototype.step = function() {
    var result = this.board.snake.move();
    if (result === false) {
      var score = this.board.snake.length * 100;
      if (Snakes.highScore < score) {
        Snakes.highScore = score;
      }
      Snakes.gameOver();
    } else {
      this.renderBoard();
    }
  };

  View.prototype.renderBoard = function() {
    var snakeAndApple = this.board.render();
    var newHead = snakeAndApple.newHead;
    var apple = snakeAndApple.apple;
    var emptySpot = snakeAndApple.emptySpot;
    var score = snakeAndApple.score;
    var bodySpots = snakeAndApple.bodySpots;
    var tailSpot = snakeAndApple.tailSpot;

    $('aside').html('score: ' + score + '  High Score: ' + Snakes.highScore);
    // debugger;
    $('div.' + (newHead[0] * 15 + newHead[1])).toggleClass('head').removeClass('apple empty').addClass(newHead[2]);

    $('div.' + (apple[0] * 15 + apple[1])).addClass('apple').removeClass('empty');

    bodySpots.forEach(function(spot) {
      $('div.' + (spot[0] * 15 + spot[1])).removeClass('head tail N S E W').addClass('snake ' + spot[2]);
    });

    $('div.' + (tailSpot[0] * 15 + tailSpot[1])).removeClass('snake head N S E W').addClass('tail ' + tailSpot[2]);

    if (emptySpot) {
      $('div.' + (emptySpot[0] * 15 + emptySpot[1])).toggleClass('tail').addClass('empty').removeClass('N S E W');
    }
    this.board.snake.bodySpots = [];
  };

  Snakes.gameOver = function() {
    clearInterval(Snakes.intervId);
    Snakes.intervId = undefined;

    $('section.gameOver').toggleClass('hidden');
    $('section.gameOver h2').html('Score: ' + Snakes.currentView.board.snake.length * 100);
  };

  Snakes.restartGame = function(event) {
    $('section.gameOver').toggleClass('hidden');
    $('html').off('keydown');
    $('strong').off('click');


    delete Snakes.currentView.board.snake;
    delete Snakes.currentView.board;
    delete Snakes.currentView.$el;
    delete Snakes.currentView;
    Snakes.resetDisplay();
    Snakes.currentView = new Snakes.View($('section'));
  };

  Snakes.resetDisplay = function() {
    $('section.gameCenter').html($('<aside class="score"></aside><section class="grid"></section>'));
    for (var i = 0; i < 15; i++) {
      for (var j = 0; j < 15; j++) {
        $('section.grid').append($('<div class="empty displayed ' + (i * 15 + j) + ' "></div>'));
      }

      $('section.gameCenter').append('<div class="clearfix"></div>');
    }
  };
})();
