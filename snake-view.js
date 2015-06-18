(function() {
  var View = Snakes.View = function View($el, options) {
    this.$el = $el;
    this.board = new Snakes.Board();
    $('body').on('keydown', this.handleKeyEvent.bind(this));
    this.intervId = setInterval(this.step.bind(this), 300);
    this.renderBoard();
    if (options && options.callback) {
      options.callback();
    }
    this.status = true;
  };

  var dirCodes = {87: "N", 65: "W", 83: "S", 68: "E" };

  View.prototype.handleKeyEvent = function(event) {
    if (this.status) {
      if (event.keyCode === 80) {
        clearInterval(this.intervId);
        this.status = false;
      } else {
        dirCodes[event.keyCode] && this.board.snake.turn(dirCodes[event.keyCode]);
      }
    } else {
      this.intervId = setInterval(this.step.bind(this), 300);
      this.status = true;
    }
  };

  View.prototype.step = function() {
    var result = this.board.snake.move();
    if (result === false) {
      var score = this.board.snake.length * 100;
      Snakes.restartGame(function() {window.alert('you lose with a score of ' + score);});
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

    $('aside').html('your score is ' + score);

    $('div.' + (newHead[0] * 15 + newHead[1])).toggleClass('snake').removeClass('apple').removeClass('empty');

    $('div.' + (apple[0] * 15 + apple[1])).addClass('apple').removeClass('empty');

    if (emptySpot) {
      $('div.' + (emptySpot[0] * 15 + emptySpot[1])).toggleClass('snake').toggleClass('empty');
    }
  };

  Snakes.restartGame = function(callback) {
    $('body').off();
    clearInterval(Snakes.currentView.intervId);
    delete Snakes.currentView.board;
    delete Snakes.currentView.snake;
    delete Snakes.currentView;
    Snakes.resetDisplay();
    Snakes.currentView = new Snakes.View($('section'), {callback: callback});
  };

  Snakes.resetDisplay = function() {
    $('section.grid').html('');
    for (var i = 0; i < 15; i++) {
      for (var j = 0; j < 15; j++) {
        $('section.grid').append($('<div class="empty displayed ' + (i * 15 + j) + ' "></div>'));
      }

      $('section').append('<div class="clearfix"></div>');
    }
  };
})();
