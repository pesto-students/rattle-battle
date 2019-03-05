export const mockEmptyTopPlayers = () => ({
  then: jest.fn(),
});

export const mockTopPlayersWithUsers = () => ({
  then: jest.fn(() => [
    {
      username: 'ABC',
      score: 123,
    },
    {
      username: 'DEF',
      score: 456,
    },
    {
      username: 'XYZ',
      score: 789,
    },
  ]),
});
