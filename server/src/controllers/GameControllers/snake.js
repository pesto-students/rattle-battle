import SNAKE_CONSTANTS from './gameConstants';

class Snake {
  /**
   * @param  {string} playerId
   * @param  {Object} initialProperties initial values for snake body and motion.
   * @param  {Object} game instance of game class for status of current game.
   */
  constructor(playerId, initialProperties, game) {
    this.ownerId = playerId;
    Object.assign(this, initialProperties);
    this.eatFood = game.eatFood.bind(game);
    this.rivalBody = [];
    this.life = SNAKE_CONSTANTS.LIFE;
    this.lost = false;
    this.xAxisVelocity = 0; // the x axis movement of snake in each interval;
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
    // populating the snake body coordinates of snake
    for (let x = 0; x < this.length; x += 1) {
      this.head.x += this.xAxisVelocity;
      this.head.y += this.yAxisVelocity;
      this.updateCoordinate();
    }
  }

  /**
   * Moves the snakes one steps according to relative change on x axis or y axis.
   */
  moveSnakeOneStep() {
    this.head.x += this.xAxisVelocity; // snake head's new x coordinate
    this.head.y += this.yAxisVelocity; // snake head's new y coordinate
    if (this.eatFood(this.head)) {
      this.updateCoordinate();
      this.getFoodReward();
      return true;
    }
    if (this.hasCollidedWithItself()
      || this.hasCollidedWithRival()) {
      this.lost = true;
      // @TODO: emit a game mechanics event for game lost;
      clearInterval(this.interval);
      return false;
    }
    this.updateCoordinate();
    return true;
  }

  getFoodReward() {
    this.length += SNAKE_CONSTANTS.FOOD_LENGTH_REWARD;
    this.life += SNAKE_CONSTANTS.FOOD_LIFE_REWARD; // increasing the life by some constant unit of seconds second on eating food.
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
    if (this.bodyCoordinates.length > this.length - 1) {
      const { x, y } = this.getHeadTip();
      const collided = this.bodyCoordinates.find((collisionPoint) => {
        if (
          (x > collisionPoint.x - SNAKE_CONSTANTS.ARC_RADIUS) && (x < collisionPoint.x + SNAKE_CONSTANTS.ARC_RADIUS)
          && (y > collisionPoint.y - SNAKE_CONSTANTS.ARC_RADIUS) && (y < collisionPoint.y + SNAKE_CONSTANTS.ARC_RADIUS)
        ) {
          return true;
        }
        return false;
      });
      if (collided) {
        return true;
      }
    }
    return false;
  }

  /**
   * Checks collision of the head with it's rival's body.
   */
  hasCollidedWithRival() {
    const { x, y } = this.getHeadTip();
    const collided = this.rivalBody.find((collisionPoint) => {
      if (
        (x > collisionPoint.x - SNAKE_CONSTANTS.ARC_RADIUS) && (x < collisionPoint.x + SNAKE_CONSTANTS.ARC_RADIUS)
        && (y > collisionPoint.y - SNAKE_CONSTANTS.ARC_RADIUS) && (y < collisionPoint.y + SNAKE_CONSTANTS.ARC_RADIUS)
      ) {
        return true;
      }
      return false;
    });
    if (collided) {
      return true;
    }
    return false;
  }

  /**
   * We are drawing arcs on each cooridnate point in the snake body, so to check collision we are getting the most ahead part of the snake head.
   */
  getHeadTip() {
    const arcRadius = SNAKE_CONSTANTS.ARC_RADIUS;
    switch (this.direction) {
      case 'down': {
        return { x: this.head.x, y: this.head.y + arcRadius };
      }
      case 'up': {
        return { x: this.head.x, y: this.head.y - arcRadius };
      }
      case 'left': {
        return { x: this.head.x - arcRadius, y: this.head.y };
      }
      case 'right': {
        return { x: this.head.x + arcRadius, y: this.head.y };
      }
      default: {
        return null;
      }
    }
  }

  changeDirection(key) {
    // eslint-disable-next-line default-case
    switch (key) {
      case 'ArrowLeft': {
        if (this.direction === 'left' || this.direction === 'right') {
          break;
        }
        if (this.previousDirection === 'right' && this.previousDirection !== 'left') {
          this.makeSmoothUTurn();
        }
        this.yAxisVelocity = 0;
        this.xAxisVelocity = -2;
        this.previousDirection = this.direction;
        this.direction = 'left';
        break;
      }
      case 'ArrowRight': {
        if (this.direction === 'left' || this.direction === 'right') {
          break;
        }
        if (this.previousDirection === 'left' && this.previousDirection !== 'right') {
          this.makeSmoothUTurn();
        }
        this.yAxisVelocity = 0;
        this.xAxisVelocity = +2;
        this.previousDirection = this.direction;
        this.direction = 'right';
        break;
      }
      case 'ArrowUp': {
        if (this.direction === 'up' || this.direction === 'down') {
          break;
        }
        if (this.previousDirection === 'down' && this.previousDirection !== 'up') {
          this.makeSmoothUTurn();
        }
        this.xAxisVelocity = 0;
        this.yAxisVelocity = -2;
        this.previousDirection = this.direction;
        this.direction = 'up';
        break;
      }
      case 'ArrowDown': {
        if (this.direction === 'up' || this.direction === 'down') {
          break;
        }
        if (this.previousDirection === 'up' && this.previousDirection !== 'down') {
          this.makeSmoothUTurn();
        }
        this.xAxisVelocity = 0;
        this.yAxisVelocity = +2;
        this.previousDirection = this.direction;
        this.direction = 'down';
        break;
      }
    }
  }

  /**
   * This function ensures smooth u-turn on board(UI) when user takes 180 degree turn.
   */
  makeSmoothUTurn() {
    // @TODO:Refactor this code in future version, either user lodash or move it into some utility file.
    this.moveSnakeOneStep();
    this.moveSnakeOneStep();
    this.moveSnakeOneStep();
    this.moveSnakeOneStep();
    this.moveSnakeOneStep();
  }
}

export default Snake;
