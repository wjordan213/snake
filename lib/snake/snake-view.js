(function() {
  var View = Snakes.View = function View($el) {
    this.$el = $el;
    this.board = new Snakes.Board();
    $('html').on('keydown', this.handleKeyEvent.bind(this));
    Snakes.intervId = setInterval(this.step.bind(this), 100);
    this.renderBoard();
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
      Snakes.intervId = setInterval(this.step.bind(this), 100);
      this.status = true;
    }
  };

  View.prototype.step = function() {
    var result = this.board.snake.move();
    if (result === false) {
      if (Snakes.highScore < Snakes.score) {
        Snakes.highScore = Snakes.score;
      }
      Snakes.gameOver();
    } else {
      this.renderBoard();
    }
  };

  View.prototype.renderBoard = function() {
    var info = this.board.render();

    $('aside').html('score: ' + Snakes.score + '  High Score: ' + Snakes.highScore);

    $('div.' + (info.newHead[0] * 15 + info.newHead[1])).toggleClass('head').removeClass('apple empty').addClass(info.newHead[2]);

    $('div.' + (info.apple[0] * 15 + info.apple[1])).addClass('apple').removeClass('empty');

    if (info.bodySpot) {
      $('div.' + (info.bodySpot[0] * 15 + info.bodySpot[1])).removeClass('head tail N S E W').addClass('snake ' + info.bodySpot[2]);
    }

    $('div.' + (info.tailSpot[0] * 15 + info.tailSpot[1])).removeClass('snake head N S E W').addClass('tail ' + info.tailSpot[2]);

    if (info.emptySpot) {
      $('div.' + (info.emptySpot[0] * 15 + info.emptySpot[1])).toggleClass('tail').addClass('empty').removeClass('N S E W');
    }
  };

  Snakes.gameOver = function() {
    clearInterval(Snakes.intervId);
    Snakes.intervId = undefined;
    setTimeout(function() {
      $('html').on('keydown', Snakes.restartGame);
    }, 500);
    $('section.gameOver').toggleClass('hidden');
    $('section.gameOver h2').html('Score: ' + Snakes.score);
  };

  Snakes.restartGame = function(event) {
    $('section.gameOver').toggleClass('hidden');
    $('html').off('keydown');

    delete Snakes.currentView;
    Snakes.resetDisplay();
    Snakes.currentView = new Snakes.View($('section'));
  };

  Snakes.resetDisplay = function() {
    $('section.gameCenter').html($('<aside class="score">score: 0</aside><section class="grid"></section>'));
    $('section.gameCenter').prepend('<div class="clearfix"></div>');
    for (var i = 0; i < 15; i++) {
      for (var j = 0; j < 15; j++) {
        $('section.grid').append($('<div class="empty displayed ' + (i * 15 + j) + ' "></div>'));
      }
    }
  };
})();
