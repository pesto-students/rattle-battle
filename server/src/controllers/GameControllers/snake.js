import SNAKE_CONSTANTS from './gameConstants';
import isPointInBody from './utility';

class Snake {
  /**
   * @param  {string} playerId
   * @param  {Object} initialProperties initial values for snake body and motion.
   * @param  {Object} game instance of game class for status of current game.
   */
  constructor(playerId, username, initialProperties, game) {
    this.ownerId = playerId;
    this.username = username;
    Object.assign(this, initialProperties);
    this.eatFood = game.eatFood.bind(game);
    this.stopGame = game.stopGame.bind(game);
    this.rivalBody = [];
    this.life = SNAKE_CONSTANTS.LIFE;
    this.velocity = SNAKE_CONSTANTS.INITIAL_VELOCITY;
    this.lost = false;
    this.xAxisVelocity = 0; // the x axis movement of snake in each interval;
    this.yAxisVelocity = 0; // the y axis movement of snake in each interval
    this.bodyCoordinates = [];
    this.createInitialSnakeBody(); // populate initial body of snake according to given length.
    this.tild = 0; // to wiggle on the axis
    this.negative = false; // for use of snake wiggling.no
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
    this.carryOver();
    this.makeItWiggle();
    if (this.eatFood(this.head)) {
      this.updateCoordinate();
      this.getFoodReward();
      return true;
    }
    if (this.hasCollidedWithItself()
      || this.hasCollidedWithRival() || this.life < 0) {
      this.lost = true;
      // @TODO: emit a game mechanics event for game lost;
      this.stopGame({ lostUserId: this.ownerId });
      return false;
    }
    this.updateCoordinate();
    return true;
  }

  carryOver() {
    const head = this.getHeadTip();
    if (head.x <= 0) {
      this.head.x = SNAKE_CONSTANTS.GAME_BOARD.WIDTH;
    } else if (head.x >= SNAKE_CONSTANTS.GAME_BOARD.WIDTH) {
      this.head.x = 0;
    } else if (head.y <= 0) {
      this.head.y = SNAKE_CONSTANTS.GAME_BOARD.HEIGHT;
    } else if (head.y >= SNAKE_CONSTANTS.GAME_BOARD.HEIGHT) {
      this.head.y = 0;
    }
  }

  makeItWiggle() {
    if (this.direction === 'left' || this.direction === 'right') {
      this.head.y = this.head.y + this.tild;
    }
    if (this.direction === 'up' || this.direction === 'down') {
      this.head.x = this.head.x + this.tild;
    }
    if (this.negative) {
      this.tild -= 0.1;
    } else {
      this.tild += 0.1;
    }
    if (this.tild > 0.3) {
      this.negative = true;
    }
    if (this.tild < -0.3) {
      this.negative = false;
    }
  }

  getFoodReward() {
    this.length += SNAKE_CONSTANTS.FOOD_LENGTH_REWARD;
    // increasing the life by some constant unit of seconds second on eating food.
    this.life += SNAKE_CONSTANTS.FOOD_LIFE_REWARD;
  }

  /**
   * updates coordinate in snake'body according to new head position
   */
  updateCoordinate() {
    this.bodyCoordinates.push({
      x: this.head.x,
      y: this.head.y,
    });
    // removing one tail element to limit the snake length,-
    // -when snake gets larger than snake length parameter
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
   * We are drawing arcs on each cooridnate point in the snake body-
   * -so to check collision we are getting the most ahead part of the snake head.
   */
  getHeadTip() {
    const arcRadius = SNAKE_CONSTANTS.ARC_RADIUS;
    const { x, y } = this.head;
    const headTipMap = {
      down: { x, y: y + arcRadius },
      up: { x, y: y - arcRadius },
      left: { x: x - arcRadius, y },
      right: { x: x + arcRadius, y },
    };
    return headTipMap[this.direction];
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
   * @param  {String} oppositeDirection the opposite direction of the user clicked arrow,--
   *  --so we can handle some edge cases in direction change.
   * @param  {Integer} xVelocity the velocity that will be given on the direction change on xAxis.
   * @param  {Integer} yVelocity the velocity which will be given on the direction change on yAxis.
   */
  handleDirectionChange(direction, oppositeDirection, xVelocity, yVelocity) {
    // the direction is already on the same direction
    //  or opposite direction snake will not change the directioin
    if (this.direction === direction || this.direction === oppositeDirection) {
      return false;
    }
    // if snake is taking a u-turn then below condition will be true,
    // and it does not collide with itself, so we are giving it a smooth handling of you turn.
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
    // @TODO:Refactor this code in future version,
    //  either user lodash or move it into some utility file.
    this.moveSnakeOneStep();
    this.moveSnakeOneStep();
    this.moveSnakeOneStep();
    this.moveSnakeOneStep();
    this.moveSnakeOneStep();
  }

  getProfile() {
    const {
      ownerId: id,
      username,
      life,
      color,
    } = this;
    return {
      id,
      username,
      life,
      color,
    };
  }
}

export default Snake;
