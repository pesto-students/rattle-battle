import Snake from './snake';
import SNAKE_CONSTANTS from './gameConstants';

class Game {
  constructor(playerOne, socketOne, io) {
    this.roomId = (Math.random() * 100000000000).toFixed(0);
    this.createSocketEvents(playerOne, socketOne);
    const initialProperties = {
      head: { x: 600, y: 200 },
      direction: 'down',
      length: SNAKE_CONSTANTS.INITIAL_LENGTH,
    };
    this.firstSnake = new Snake(playerOne, initialProperties, this);
    this.secondSnake = null;
    this.freeToJoin = true;
    this.winner = null;
    this.ended = false;
    this.io = io;
  }

  joinGame(PlayerTwo, socketTwo) {
    this.createSocketEvents(PlayerTwo, socketTwo);
    const initialProperties = {
      head: { x: 100, y: 500 },
      direction: 'up',
      length: SNAKE_CONSTANTS.INITIAL_LENGTH,
    };
    this.secondSnake = new Snake(PlayerTwo, initialProperties, this);
    this.firstSnake.rivalBody = this.secondSnake.bodyCoordinates;
    this.secondSnake.rivalBody = this.firstSnake.bodyCoordinates;
    this.freeToJoin = false;
    this.food = this.makeFood();
    this.gameStart();
  }

  createSocketEvents(playerId, socket) {
    socket.emit('assignPlayerId', playerId);
    socket.join(this.roomId);
    socket.on('keyPress', this.changeDirection.bind(this));
  }

  gameStart() {
    const runFunction = () => {
      this.io.in(this.roomId).emit('stepChange', this.moveSnakes());
    };
    const interval = setInterval(runFunction.bind(this), 30);
    this.interval = interval;
    this.setIntervalNumber(interval);
  }

  setIntervalNumber(number) {
    this.firstSnake.interval = number;
    this.secondSnake.interval = number;
  }

  /**
   * Creates coordinates for food on the board by checking that food is not getting created on the snake bodies;
   */
  makeFood() {
    const snakeBodies = [
      ...this.firstSnake.bodyCoordinates,
      ...this.secondSnake.bodyCoordinates,
    ];
    let foodInSnakebody = true;
    let x; // the name is not bad, it is just x axis coordinate :)
    let y; // same as above, coordinate of y axis.
    while (foodInSnakebody) {
      x = Math.round(Math.random() * SNAKE_CONSTANTS.GAME_BOARD.WIDTH);
      y = Math.round(Math.random() * SNAKE_CONSTANTS.GAME_BOARD.HEIGHT);
      // eslint-disable-next-line no-loop-func
      foodInSnakebody = snakeBodies.find(position => x === position.x && y === position.y);
    }
    return { x, y };
  }

  eatFood(snakeHead) {
    const { x, y } = this.food; // again here, the variable names are not bad, they are just x,y coordinate
    if (
      (x > snakeHead.x - 10) && (x < snakeHead.x + 10)
      && (y > snakeHead.y - 10) && (y < snakeHead.y + 10)
    ) {
      this.food = this.makeFood();
      return true;
    }
    return false;
  }

  moveSnakes() {
    this.firstSnake.moveSnakeOneStep();
    this.secondSnake.moveSnakeOneStep();
    return {
      snakeBodies: [
        ...this.firstSnake.bodyCoordinates,
        ...this.secondSnake.bodyCoordinates,
      ],
      food: this.food,
    };
  }

  changeDirection(info) {
    if (info.player === 0) {
      return this.firstSnake.changeDirection(info.key);
    }
    return this.secondSnake.changeDirection(info.key);
  }

  stopGame() {
    clearTimeout(this.interval);
  }
}

export default Game;
