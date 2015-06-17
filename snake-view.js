(function() {
  var View = Snakes.View = function View($el, options) {
    this.$el = $el;
    this.board = new Snakes.Board();
    this.$el.on('keydown', this.handleKeyEvent.bind(this));
    this.intervId = setInterval(this.step.bind(this), 500);
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
    this.$el.html('');

    var boardForPage = this.board.render();
    boardForPage.forEach(function(row) {
      row.forEach(function(element) {
        if (element === ".") {
          this.$el.append($('<div class="empty displayed"></div>'));
        } else if (element === "S") {
          this.$el.append($('<div class="snake displayed"></div>'));
        } else {
          this.$el.append($('<div class="apple displayed"></div>'));
        }
      }.bind(this));
      this.$el.append('<div class="clearfix"></div>');
    }.bind(this));
  };

  Snakes.restartGame = function(callback) {
    Snakes.currentView.$el.off();
    clearInterval(Snakes.currentView.intervId);
    Snakes.currentView.board.clear();

    Snakes.currentView = new Snakes.View($('body'), {callback: callback});
  };
})();
