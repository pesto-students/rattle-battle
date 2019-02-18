const Snake = require('./Snake');

module.exports = class Game {
  constructor(player1) {
    this.gameId = Math.random();
    this.player1 = player1;
    this.freeToJoin = true;
    this.snake1 = new Snake(player1); // make a snake class
    this.food = this.makeFood();
    this.ended = false;
    this.winner = null;
  }

  joinGame(player2) {
    this.player2 = player2;
    this.freeToJoin = false;
    this.snake2 = new Snake();
  }

  running() {
    // move snake
    // blah blah
    // check collisioon
  }

  start() {
    this.interval = setInterval(this.running, 30);
  }
};
