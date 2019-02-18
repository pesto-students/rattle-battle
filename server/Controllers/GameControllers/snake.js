class Snake {
  constructor(playerId, initialPositionX, initialPositionY,
    initialDirection, snakeColor, initialSnakeLength) {
    this.ownerId = playerId;
    this.head = { x: initialPositionX, y: initialPositionY };
    this.direction = initialDirection;
    this.color = snakeColor;
    this.bodyLength = initialSnakeLength;
    this.bodyCoordinates = [];
  }
}

module.exports = {
  Snake,
};
