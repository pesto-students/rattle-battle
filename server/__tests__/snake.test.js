const { Snake } = require('../Controllers/GameControllers/snake');

describe('Checks snake class object initiation and the methods on a snake object', () => {
  let snake;
  const playerId = 1;
  const initialPositionX = 200;
  const initialPositionY = 200;
  const initialDirection = 'down';
  const snakeColor = 'black';
  const initialSnakeLength = 30;

  beforeEach(() => {
    snake = new Snake(playerId, initialPositionX,
      initialPositionY, initialDirection, snakeColor, initialSnakeLength);
  });

  afterEach(() => {
    snake = null;
  });

  it('should create a new snake instance from Snake Class', () => {
    expect(snake).toBeDefined();
    expect(snake.ownerId).toEqual(playerId);
    expect(snake.head.x).toEqual(initialPositionX);
    expect(snake.head.y).toEqual(initialPositionY);
    expect(snake.direction).toEqual(initialDirection);
    expect(snake.color).toEqual(snakeColor);
    expect(snake.bodyLength).toEqual(initialSnakeLength);
  });
});
