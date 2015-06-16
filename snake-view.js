(function() {
  var View = Snakes.View = function View($el) {
    this.$el = $el;
    this.board = new Snakes.Board();
    this.$el.on('keydown', this.handleKeyEvent.bind(this));
    this.intervId = setInterval(this.step.bind(this), 500);
  };

  var dirCodes = {87: "N", 65: "W", 83: "S", 68: "E" };

  View.prototype.handleKeyEvent = function(event) {
    dirCodes[event.keyCode] && this.board.snake.turn(dirCodes[event.keyCode]);
  };

  View.prototype.step = function() {
    this.$el.html('');
    var result = this.board.snake.move();

    if (result === false) {
      window.alert('you lose');
      Snakes.restartGame();
    }
    var boardForPage = this.board.render();
    boardForPage.forEach(function(row) {
      row.forEach(function(element) {
        if (element === ".") {
          this.$el.append($('<div class="empty"></div>'));
        } else {
          this.$el.append($('<div class="full"></div>'));
        }
      }.bind(this));
      this.$el.append('<div class="clearfix"></div>');
    }.bind(this));
    // debugger;
  };

  Snakes.restartGame = function() {
    // debugger;
    Snakes.currentView.$el.off();
    clearInterval(Snakes.currentView.intervId);
    Snakes.currentView.board.clear();

    Snakes.currentView = new Snakes.View($('body'));
    // debugger;
  };
})();
