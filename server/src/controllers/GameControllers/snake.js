import SNAKE_CONSTANTS from './gameConstants';
import { isPointInBody } from './utility';

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
    this.velocity = SNAKE_CONSTANTS.INITIAL_VELOCITY;
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
    // eslint-disable-next-line default-case
    switch (this.direction) {
      case 'down': {
        this.yAxisVelocity = this.velocity;
        break;
      }
      case 'up': {
        this.yAxisVelocity = -this.velocity;
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
    }
    for (let x = 0; x < this.length; x += 1) { // populating the snake body coordinates of snake
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
      const headTip = this.getHeadTip();
      return isPointInBody(this.bodyCoordinates, headTip);
    }
    return false;
  }

  /**
   * Checks collision of the head with it's rival's body.
   */
  hasCollidedWithRival() {
    const headTip = this.getHeadTip();
    return isPointInBody(this.rivalBody, headTip);
  }

  /**
   * We are drawing arcs on each cooridnate point in the snake body, so to check collision we are getting the most ahead part of the snake head.
   */
  getHeadTip() {
    const arcRadius = SNAKE_CONSTANTS.ARC_RADIUS;
    const { x, y } = this.head;
    let headTip;
    switch (this.direction) {
      case 'down': {
        headTip = { x, y: y + arcRadius };
        break;
      }
      case 'up': {
        headTip = { x, y: y - arcRadius };
        break;
      }
      case 'left': {
        headTip = { x: x - arcRadius, y };
        break;
      }
      case 'right': {
        headTip = { x: x + arcRadius, y };
        break;
      }
      default: {
        break;
      }
    }
    return headTip;
  }

  changeDirection(key) {
    // eslint-disable-next-line default-case
    switch (key) {
      case 'ArrowLeft': {
        this.handleDirectionChange('left', 'right', -2, 0);
        break;
      }
      case 'ArrowRight': {
        this.handleDirectionChange('right', 'left', 2, 0);
        break;
      }
      case 'ArrowUp': {
        this.handleDirectionChange('up', 'down', 0, -2);
        break;
      }
      case 'ArrowDown': {
        this.handleDirectionChange('down', 'up', 0, 2);
        break;
      }
    }
  }

  /**
   * @param  {String} direction the key press direction from the user.
   * @param  {String} oppositeDirection the opposite direction of the user clicked arrow, so we can handle some edge cases in direction change.
   * @param  {Integer} xVelocity the velocity that will be given on the direction change on xAxis.
   * @param  {Integer} yVelocity the velocity which will be given on the direction change on yAxis.
   */
  handleDirectionChange(direction, oppositeDirection, xVelocity, yVelocity) {
    // the direction is already on the same direction or opposite direction snake will not change the directioin
    if (this.direction === direction || this.direction === oppositeDirection) {
      return false;
    }
    // if snake is taking a u-turn then below condition will be true, and it does not collide with itself, so we are giving it a smooth handling of you turn.
    if (this.previousDirection !== direction && this.previousDirection === oppositeDirection) {
      this.makeSmoothUTurn();
    }
    this.xAxisVelocity = xVelocity;
    this.yAxisVelocity = +yVelocity;
    this.previousDirection = this.direction;
    this.direction = direction;
    return true;
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
