const sum = (a, b) => a + b;

/**
 * This is just for testing that testing works. Remove this once we add REAL tests.
 */
describe('`sum` function adds two numbers', () => {
  test('should add 2 and 2', () => {
    expect(sum(2, 2)).toBe(4);
  });
});
