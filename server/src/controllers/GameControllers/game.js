import Snake from './snake';
import SNAKE_CONSTANTS from './gameConstants';

class Game {
  // eslint-disable-next-line object-curly-newline
  constructor({ playerId, username, socket, io }) {
    this.roomId = (Math.random() * 100000000000).toFixed(0);
    this.createSocketEvents(playerId, socket);
    const initialProperties = {
      head: { x: 600, y: 200 },
      direction: 'down',
      color: 'red',
      length: SNAKE_CONSTANTS.INITIAL_LENGTH,
    };
    this.firstSnake = new Snake(playerId, username, initialProperties, this);
    this.secondSnake = null;
    this.creator = playerId;
    this.freeToJoin = true;
    this.winner = null;
    this.ended = false;
    this.io = io;
  }

  joinGame({ playerId, username, socket }) {
    this.createSocketEvents(playerId, socket);
    const initialProperties = {
      head: { x: 100, y: 500 },
      direction: 'up',
      color: 'black',
      length: SNAKE_CONSTANTS.INITIAL_LENGTH,
    };
    this.secondSnake = new Snake(playerId, username, initialProperties, this);
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

  sendData(event, payload = {}) {
    this.io.in(this.roomId).emit(event, payload);
  }

  gameStart() {
    this.sendData('getReady', 'Get Ready to play');
    const prepareToPlay = () => {
      const runFunction = () => {
        this.sendData('stepChange', this.moveSnakes());
      };
      const interval = setInterval(runFunction, 30);
      this.interval = interval;
      this.setIntervalNumber(interval);
      this.startSnakeLives();
    };
    setTimeout(() => {
      this.sendData('lifeChange', [
        this.firstSnake.getScore(),
        this.secondSnake.getScore(),
      ]);
      prepareToPlay();
    }, 3000); // game will start in 3 second.
  }

  setIntervalNumber(number) {
    this.firstSnake.interval = number;
    this.secondSnake.interval = number;
  }

  startSnakeLives() {
    const reduceSnakeLives = () => {
      this.firstSnake.life -= 1;
      this.secondSnake.life -= 1;
      this.sendData('lifeChange', [
        this.firstSnake.getScore(),
        this.secondSnake.getScore(),
      ]);
    };
    this.lifeInterval = setInterval(reduceSnakeLives, 1000);
  }

  /**
   * Creates coordinates for food on the board by checking-
   * -that food is not getting created on the snake bodies;
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
    // let's get food coordinate x and y
    const { x, y } = this.food;
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
        { color: this.firstSnake.color, body: this.firstSnake.bodyCoordinates },
        { color: this.secondSnake.color, body: this.secondSnake.bodyCoordinates },
      ],
      food: this.food,
    };
  }

  changeDirection(info) {
    if (info.player === this.creator) {
      return this.firstSnake.changeDirection(info.key);
    }
    return this.secondSnake.changeDirection(info.key);
  }

  stopGame(gameInfo) {
    clearInterval(this.interval);
    clearInterval(this.lifeInterval);
    this.sendData('gameResult', gameInfo);
  }
}

export default Game;
