const { SNAKE } = require('./gameConstants');

class Snake {
  /**
   * @param  {string} playerId
   * @param  {Object} initialProperties initial values for snake body and motion.
   * @param  {Object} game instance of game class for status of current game.
   */
  constructor(playerId, initialProperties, game) {
    this.ownerId = playerId;
    Object.assign(this, initialProperties);
    this.eatFood = game.eatFood;
    this.rivalBody = game.rivalBody;
    this.gameInterval = game.gameInterval; // interval variable, if snake collides we will clear this interval to stop the game
    this.life = SNAKE.LIFE;
    this.lost = false;
    this.xAxisVelocity = 0; // the x axis movement of snake in each interval
    this.yAxisVelocity = 0; // the y axis movement of snake in each interval
    this.bodyCoordinates = [];
    this.createInitialSnakeBody(); // populate initial body of snake according to given length.
  }

  /**
   * This function generates snake body coordinates from the given starting head coordinates
   */
  createInitialSnakeBody() {
    switch (this.direction) {
      case 'down': {
        this.yAxisVelocity = this.velocity;
        break;
      }
      case 'up': {
        this.yAxisVelocity = -this.veloctiy;
        break;
      }
      case 'left': {
        this.xAxisVelocity = -this.velocity;
        break;
      }
      case 'right': {
        this.xAxisVelocity = this.velocity;
        break;
      }
      default: {
        break;
      }
    }
    // populating the snake body coordinates of snake's starting state.
    for (let x = 0; x < this.length; x += 1) {
      this.moveSnakeOneStep();
    }
  }

  /**
   * Moves the snakes one steps according to relative change on x axis or y axis.
   */
  moveSnakeOneStep() {
    this.head.x += this.xAxisVelocity; // snake head's new x coordinate
    this.head.y += this.yAxisVelocity; // snake head's new y coordinate
    if (this.eatFood(this.head)) {
      return this.getFoodReward();
    }
    if (this.hasCollidedWithItself()
      || this.hasCollidedWithRival()) {
      this.lost = true;
      // @TODO: emit a game mechanics event for game lost.
      return null;
    }
    return this.updateCoordinate();
  }

  getFoodReward() {
    this.updateCoordinate();
    this.length += SNAKE.FOOD_LENGTH_REWARD;
    for (let x = 0; x < SNAKE.FOOD_LENGTH_REWARD; x += 1) {
      this.head.x += this.xAxisVelocity; // snake head's new x coordinate
      this.head.y += this.yAxisVelocity;
      this.updateCoordinate();
    }
    this.life += SNAKE.FOOD_LIFE_REWARD; // increasing the life by 5 second on eating food.
  }

  /**
   * updates coordinate in snake'body according to new head position
   */
  updateCoordinate() {
    this.bodyCoordinates.push({
      x: this.head.x,
      y: this.head.y,
    });
    // removing one tail element to limit the snake length, when snake gets larger than snake length parameter
    if (this.bodyCoordinates.length > this.length) {
      this.bodyCoordinates.shift();
    }
  }


  /**
   * Checks collision of the head with it's body
   */
  hasCollidedWithItself() {
    // @TODO: implement the collision logic with itself.
    return false;
  }

  hasCollidedWithRival() {
    // @TODO: implement the collision logic with rival snake.
    return false;
  }
}

module.exports = {
  Snake,
};
