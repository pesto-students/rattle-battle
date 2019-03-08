import SNAKE_CONSTANTS from '../src/controllers/GameControllers/gameConstants';
import Snake from '../src/controllers/GameControllers/snake';

describe('Test Snake Class', () => {
  let snake;
  const playerId = 'zarathustra';
  const username = 'vikash';
  const initialProperty = {
    head: { x: 200, y: 200 },
    direction: 'down',
    length: SNAKE_CONSTANTS.INITIAL_LENGTH,
  };
  const game = {
    eatFood() { return false; },
    stopGame() { return true; },
    rivalBody: [],
    gameInterval: 2,
  };
  beforeEach(() => {
    const intialPropertyToPass = JSON.parse(JSON.stringify(initialProperty));
    snake = new Snake(playerId, username, intialPropertyToPass, game);
  });

  afterEach(() => {
    snake = null;
  });

  describe('Checks object initialization of Snake class', () => {
    it('should create a new snake instance from Snake Class', () => {
      expect(snake).toBeDefined();
      expect(snake.ownerId).toEqual(playerId);
      expect(snake.head.x).toEqual(initialProperty.head.x);
      expect(snake.head.y).toEqual(initialProperty.head.y + initialProperty.length * 2);
      expect(snake.direction).toEqual(initialProperty.direction);
      expect(snake.length).toEqual(initialProperty.length);
      expect(snake.rivalBody).toEqual(game.rivalBody);
      expect(snake.interval).toEqual(game.intervalNumber);
      expect(snake.xAxisVelocity).toEqual(0);
      expect(snake.yAxisVelocity).toEqual(SNAKE_CONSTANTS.INITIAL_VELOCITY);
    });

    it('should have a snake\'s initial populated body(bodyCoordinate array length) with given initial length', () => {
      expect(snake.bodyCoordinates.length).toEqual(initialProperty.length);
    });
  });

  describe('method updateCoordinate', () => {
    it('should update coordinate in snake body according to new head position', () => {
      const randomhead = { x: 234, y: 982 };
      snake.head = randomhead;
      const snakeLength = snake.length;
      snake.updateCoordinate();
      expect(randomhead).toEqual(snake.bodyCoordinates[snake.length - 1]);
      expect(snakeLength).toEqual(snake.length);
      expect(snakeLength).toEqual(snake.bodyCoordinates.length);
    });
  });

  describe('method getFoodReward', () => {
    it('should give food reward to corresponding snake', () => {
      snake.eatFood = () => true;
      const bodyArrayLengthOfSnakeBeforeEating = snake.bodyCoordinates.length;
      const snakeLength = snake.length;
      const lifeLine = snake.life;
      snake.getFoodReward();
      expect(snakeLength + SNAKE_CONSTANTS.FOOD_LENGTH_REWARD).toEqual(snake.length);
      expect(bodyArrayLengthOfSnakeBeforeEating).toEqual(snake.bodyCoordinates.length);
      expect(lifeLine + SNAKE_CONSTANTS.FOOD_LIFE_REWARD).toEqual(snake.life);
    });
  });

  describe('method hasCollidedWithItself', () => {
    it('checks snake\'s collision with itself', () => {
      snake.bodyCoordinates = [
        { x: 238, y: 426 }, { x: 236, y: 426 },
        { x: 234, y: 426 }, { x: 232, y: 426 },
        { x: 230, y: 426 }, { x: 228, y: 426 },
        { x: 226, y: 426 }, { x: 224, y: 426 },
        { x: 222, y: 426 }, { x: 220, y: 426 },
        { x: 220, y: 424 }, { x: 220, y: 422 },
        { x: 220, y: 420 }, { x: 220, y: 418 },
        { x: 220, y: 416 }, { x: 220, y: 414 },
        { x: 220, y: 412 }, { x: 220, y: 410 },
        { x: 220, y: 408 }, { x: 222, y: 408 },
        { x: 224, y: 408 }, { x: 226, y: 408 },
        { x: 228, y: 408 }, { x: 230, y: 408 },
        { x: 232, y: 408 }, { x: 234, y: 408 },
        { x: 234, y: 410 }, { x: 234, y: 412 },
        { x: 234, y: 414 }, { x: 234, y: 416 },
      ];
      snake.head = { x: 234, y: 418 };
      expect(snake.hasCollidedWithItself()).toEqual(true);
    });
  });

  describe('method hasCollidedWithRival', () => {
    it('checks snake\'s collision with opponent', () => {
      snake.rivalBody = [
        { x: 238, y: 426 }, { x: 236, y: 426 },
        { x: 234, y: 426 }, { x: 232, y: 426 },
        { x: 230, y: 426 }, { x: 228, y: 426 },
        { x: 226, y: 426 }, { x: 224, y: 426 },
        { x: 222, y: 426 }, { x: 220, y: 426 },
        { x: 220, y: 424 }, { x: 220, y: 422 },
        { x: 220, y: 420 }, { x: 220, y: 418 },
        { x: 220, y: 416 }, { x: 220, y: 414 },
        { x: 220, y: 412 }, { x: 220, y: 410 },
        { x: 220, y: 408 }, { x: 222, y: 408 },
        { x: 224, y: 408 }, { x: 226, y: 408 },
        { x: 228, y: 408 }, { x: 230, y: 408 },
        { x: 232, y: 408 }, { x: 234, y: 408 },
        { x: 234, y: 410 }, { x: 234, y: 412 },
        { x: 234, y: 414 }, { x: 234, y: 416 },
      ];
      snake.head = { x: 234, y: 418 };
      expect(snake.hasCollidedWithRival()).toEqual(true);
    });
  });

  describe('method getHeadTip', () => {
    it('should return correct headTip according to moving direction of snake ', () => {
      const arcRadius = SNAKE_CONSTANTS.ARC_RADIUS;
      snake.direction = 'down';
      let headTip = snake.getHeadTip();
      expect(headTip).toEqual({ x: snake.head.x, y: snake.head.y + arcRadius });
      snake.direction = 'up';
      headTip = snake.getHeadTip();
      expect(headTip).toEqual({ x: snake.head.x, y: snake.head.y - arcRadius });
      snake.direction = 'left';
      headTip = snake.getHeadTip();
      expect(headTip).toEqual({ x: snake.head.x - arcRadius, y: snake.head.y });
      snake.direction = 'right';
      headTip = snake.getHeadTip();
      expect(headTip).toEqual({ x: snake.head.x + arcRadius, y: snake.head.y });
    });
  });

  describe('method changeDirection', () => {
    it('should change the direction of the snake according to given key string. ', () => {
      // the snake shall move to left
      let direction = 'ArrowLeft';
      snake.changeDirection(direction);
      expect(snake.direction).toEqual('left');
      direction = 'ArrowLeft';
      snake.changeDirection(direction);
      expect(snake.direction).toEqual('left');
      direction = 'ArrowRight';
      snake.changeDirection(direction);
      expect(snake.direction).toEqual('left');
      // the snake shall move to up
      direction = 'ArrowUp';
      snake.changeDirection(direction);
      expect(snake.direction).toEqual('up');
      direction = 'ArrowUp';
      snake.changeDirection(direction);
      expect(snake.direction).toEqual('up');
      direction = 'ArrowDown';
      snake.changeDirection(direction);
      expect(snake.direction).toEqual('up');
      // the snake shall move to right
      direction = 'ArrowRight';
      snake.changeDirection(direction);
      expect(snake.direction).toEqual('right');
      direction = 'ArrowRight';
      snake.changeDirection(direction);
      expect(snake.direction).toEqual('right');
      direction = 'ArrowLeft';
      snake.changeDirection(direction);
      expect(snake.direction).toEqual('right');
      // the snake shall move to down
      direction = 'ArrowDown';
      snake.changeDirection(direction);
      expect(snake.direction).toEqual('down');
      direction = 'ArrowDown';
      snake.changeDirection(direction);
      expect(snake.direction).toEqual('down');
      direction = 'ArrowUp';
      snake.changeDirection(direction);
      expect(snake.direction).toEqual('down');
      // the snake shall again move to left
      direction = 'ArrowLeft';
      snake.changeDirection(direction);
      expect(snake.direction).toEqual('left');
      direction = 'ArrowLeft';
      snake.changeDirection(direction);
      expect(snake.direction).toEqual('left');
      direction = 'ArrowRight';
      snake.changeDirection(direction);
      expect(snake.direction).toEqual('left');
    });
  });

  describe('method moveSnakeOneStep', () => {
    it('should move the snake one step on the coordinate/matrix system', () => {
      const headPositionBeforeMove = JSON.parse(JSON.stringify(snake.head));
      const snakeLength = snake.length;
      const velocityOnXaxis = 0;
      const velocityOnYaxis = 8;
      snake.xAxisVelocity = velocityOnXaxis;
      snake.yAxisVelocity = velocityOnYaxis;
      snake.moveSnakeOneStep();
      const newHeadPosition = {
        x: headPositionBeforeMove.x + velocityOnXaxis,
        y: headPositionBeforeMove.y + velocityOnYaxis,
      };
      expect(newHeadPosition).toEqual(snake.head);
      expect(newHeadPosition).toEqual(snake.bodyCoordinates[snake.length - 1]);
      expect(snakeLength).toEqual(snake.length);
      expect(snakeLength).toEqual(snake.bodyCoordinates.length);
    });

    it('should handle the process of eat food.', () => {
      snake.eatFood = () => true;
      const headPositionBeforeMove = JSON.parse(JSON.stringify(snake.head));
      const snakeLength = snake.length;
      const lifeLine = snake.life;
      snake.moveSnakeOneStep();
      const expectedHeadPosition = {
        x: headPositionBeforeMove.x + snake.xAxisVelocity,
        y: headPositionBeforeMove.y + snake.yAxisVelocity,
      };
      expect(expectedHeadPosition).toEqual(snake.head);
      expect(expectedHeadPosition).toEqual(snake.bodyCoordinates[snake.bodyCoordinates.length - 1]);
      expect(snakeLength + SNAKE_CONSTANTS.FOOD_LENGTH_REWARD).toEqual(snake.length);
      expect(snakeLength).toEqual(snake.bodyCoordinates.length);
      expect(snakeLength + SNAKE_CONSTANTS.FOOD_LENGTH_REWARD).toEqual(snake.length);
      expect(lifeLine + SNAKE_CONSTANTS.FOOD_LIFE_REWARD).toEqual(snake.life);
    });

    it('should handle the process of collision itself.', () => {
      snake.hasCollidedWithItself = () => true;
      const oldBodyCoordinates = JSON.parse(JSON.stringify(snake.bodyCoordinates));
      snake.moveSnakeOneStep();
      const newBodyCoordinates = snake.bodyCoordinates;
      expect(snake.lost).toBeTruthy();
      expect(oldBodyCoordinates).toEqual(newBodyCoordinates);
    });

    it('should handle the process of collision itself.', () => {
      snake.hasCollidedWithRival = () => true;
      const oldBodyCoordinates = JSON.parse(JSON.stringify(snake.bodyCoordinates));
      snake.moveSnakeOneStep();
      const newBodyCoordinates = snake.bodyCoordinates;
      expect(snake.lost).toBeTruthy();
      expect(oldBodyCoordinates).toEqual(newBodyCoordinates);
    });
  });
});
