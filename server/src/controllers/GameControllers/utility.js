import SNAKE_CONSTANTS from './gameConstants';

/**
 * @param  {} coordintes an Array of Coordinates in which we will check--
 * --that the given point comes in the circle of each point in the array
 * @param  {} point the point which we will check in the circles of given array of coordinates.
 */
const isPointInBody = (coordintes, point) => {
  const { x, y } = point;
  const pointExistInBody = coordintes.find((collisionPoint) => {
    if (
      (x > collisionPoint.x - SNAKE_CONSTANTS.ARC_RADIUS)
      && (x < collisionPoint.x + SNAKE_CONSTANTS.ARC_RADIUS)
      && (y > collisionPoint.y - SNAKE_CONSTANTS.ARC_RADIUS)
      && (y < collisionPoint.y + SNAKE_CONSTANTS.ARC_RADIUS)
    ) {
      return true;
    }
    return false;
  });
  if (pointExistInBody) {
    return true;
  }
  return false;
};

export default isPointInBody;
