import Game from '../src/controllers/GameControllers/game';
import SNAKE_CONSTANTS from '../src/controllers/GameControllers/gameConstants';

describe('Test Game Class', () => {
  let game;
  beforeEach(() => {
    let playerId = 0;
    const socket = { // a socket mock
      emit() { },
      join() { },
      on() { },
    };
    const io = { // a global Socket/IO mock
      in() {
        return {
          emit() { },
        };
      },
    };
    const playerInfo = { playerId, socket, io };
    game = new Game(playerInfo);
    game.gameStart = () => { }; // we don't want to start the game.
    playerId = 1;
    const playerTwoInfo = { playerId, socket };
    game.joinGame(playerTwoInfo);
  });

  afterEach(() => {
    game = null;
  });

  describe('Test Method makeFood', () => {
    it('Should create a new food', () => {
      const newFoodPosition = game.makeFood();
      const inSnakeOneBody = game.firstSnake.bodyCoordinates.find(position => newFoodPosition.x === position.x && newFoodPosition.y === position.y);
      const inSnakeTwoBody = game.secondSnake.bodyCoordinates.find(position => newFoodPosition.x === position.x && newFoodPosition.y === position.y);
      expect(inSnakeOneBody).toEqual(undefined);
      expect(inSnakeTwoBody).toEqual(undefined);
      expect(newFoodPosition.x).toBeLessThan(SNAKE_CONSTANTS.GAME_BOARD.WIDTH);
      expect(newFoodPosition.y).toBeLessThan(SNAKE_CONSTANTS.GAME_BOARD.HEIGHT);
    });
  });

  describe('Test Method eatFood', () => {
    it('Should eat a Food and create a new Food also', () => {
      game.food = game.makeFood();
      const foodPosition = game.food;
      const hasEatenFood = game.eatFood({ x: foodPosition.x - 5, y: foodPosition.y - 3 });
      expect(hasEatenFood).toBeTruthy();
      expect(foodPosition).not.toEqual(game.food);
    });
  });
});

