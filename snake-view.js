(function() {
  var View = Snakes.View = function View($el) {
    this.$el = $el;
    this.board = new Snakes.Board();
    this.$el.on('keydown', this.handleKeyEvent);
    setInterval(this.step, 500);
  };

  var dirCodes = {87: "N", 65: "W", 83: "S", 68: "D" };

  View.prototype.handleKeyEvent = function(event) {
    this.board.snake.turn(dirCodes[event.keyCode]);
  };

  View.prototype.step = function() {
    this.board.snake.move();
    var boardForPage = this.board.render();
    boardForPage.forEach(function(row) {
      this.$el.append('<pre>' + row);
    });
  };
})();
