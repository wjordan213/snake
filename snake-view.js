(function() {
  var View = Snakes.View = function View($el, options) {
    this.$el = $el;
    this.board = new Snakes.Board();
    this.$el.on('keydown', this.handleKeyEvent.bind(this));
    this.intervId = setInterval(this.step.bind(this), 300);
    this.renderBoard();
    if (options && options.callback) {
      options.callback();
    }
  };

  var dirCodes = {87: "N", 65: "W", 83: "S", 68: "E" };

  View.prototype.handleKeyEvent = function(event) {
    dirCodes[event.keyCode] && this.board.snake.turn(dirCodes[event.keyCode]);
  };

  View.prototype.step = function() {
    var result = this.board.snake.move();
    if (result === false) {
      Snakes.restartGame(function() {window.alert('you lose');});
    }
    this.renderBoard();
  };

  View.prototype.renderBoard = function() {
    var snakeAndApple = this.board.render();
    var newHead = snakeAndApple[0];
    var apple = snakeAndApple[1];
    var emptySpot = snakeAndApple[2];

    $('div.' + (newHead[0] * 15 + newHead[1])).toggleClass('snake').removeClass('apple').removeClass('empty');

    $('div.' + (apple[0] * 15 + apple[1])).addClass('apple').removeClass('empty');

    if (emptySpot) {
      $('div.' + (emptySpot[0] * 15 + emptySpot[1])).toggleClass('snake').toggleClass('empty');
    }
  };

  Snakes.restartGame = function(callback) {
    Snakes.currentView.$el.off();
    clearInterval(Snakes.currentView.intervId);
    Snakes.currentView.board.clear();
    Snakes.resetDisplay();
    Snakes.currentView = new Snakes.View($('body'), {callback: callback});
  };

  Snakes.resetDisplay = function() {
    $('body').html('');
    for (var i = 0; i < 15; i++) {
      for (var j = 0; j < 15; j++) {
        // debugger;
        $('body').append($('<div class="empty displayed ' + (i * 15 + j) + ' "></div>'));
      }

      $('body').append('<div class="clearfix"></div>');
    }
  };
})();
