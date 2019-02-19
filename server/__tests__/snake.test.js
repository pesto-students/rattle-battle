const { SNAKE } = require('../Controllers/GameControllers/gameConstants');
const { Snake } = require('../Controllers/GameControllers/snake');

describe('Test Snake Class', () => {
  let snake;
  const playerId = 'zarathustra';
  const initialProperty = {
    head: { x: 200, y: 200 },
    direction: 'down',
    velocity: 2,
    color: 'black',
    length: SNAKE.INITIAL_LENGTH,
  };
  const game = {
    eatFood() { return false; },
    rivalBody: [],
    gameInterval: 2,
  };
  beforeEach(() => {
    const intialPropertyToPass = JSON.parse(JSON.stringify(initialProperty));
    snake = new Snake(playerId, intialPropertyToPass, game);
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
      expect(snake.velocity).toEqual(initialProperty.velocity);
      expect(snake.color).toEqual(initialProperty.color);
      expect(snake.length).toEqual(initialProperty.length);
      expect(snake.eatFood).toEqual(game.eatFood);
      expect(snake.rivalBody).toEqual(game.rivalBody);
      expect(snake.interval).toEqual(game.intervalNumber);
      expect(snake.xAxisVelocity).toEqual(0);
      expect(snake.yAxisVelocity).toEqual(initialProperty.velocity);
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
      const randomhead = { x: 234, y: 982 };
      snake.head = randomhead;
      const snakeLength = snake.length;
      const lifeLine = snake.life;
      snake.getFoodReward();
      expect(randomhead).toEqual(snake.head);
      expect(randomhead).toEqual(snake.bodyCoordinates[snake.length - 1]);
      expect(snakeLength + SNAKE.FOOD_LENGTH_REWARD).toEqual(snake.length);
      expect(snakeLength + SNAKE.FOOD_LENGTH_REWARD).toEqual(snake.bodyCoordinates.length);
      expect(lifeLine + SNAKE.FOOD_LIFE_REWARD).toEqual(snake.life);
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
      const newHeadPosition = { x: headPositionBeforeMove.x + velocityOnXaxis, y: (headPositionBeforeMove.y + velocityOnYaxis) };
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
      const velocityOnXaxis = 0;
      const velocityOnYaxis = 8;
      snake.xAxisVelocity = velocityOnXaxis;
      snake.yAxisVelocity = velocityOnYaxis;
      snake.moveSnakeOneStep();
      const pointerXOnOneStep = headPositionBeforeMove.x + velocityOnXaxis;
      const pointerYOnOneStep = headPositionBeforeMove.y + velocityOnYaxis;
      const changeInYpointerOnFoodReward = 15 * velocityOnYaxis;
      const newYPointer = pointerYOnOneStep + changeInYpointerOnFoodReward;
      const newHeadPosition = { x: pointerXOnOneStep, y: newYPointer };
      expect(newHeadPosition).toEqual(snake.head);
      expect(newHeadPosition).toEqual(snake.bodyCoordinates[snake.length - 1]);
      expect(snakeLength + SNAKE.FOOD_LENGTH_REWARD).toEqual(snake.length);
      expect(snakeLength + SNAKE.FOOD_LENGTH_REWARD).toEqual(snake.bodyCoordinates.length);
      expect(lifeLine + SNAKE.FOOD_LIFE_REWARD).toEqual(snake.life);
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
