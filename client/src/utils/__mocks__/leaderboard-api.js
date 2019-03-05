import { mockEmptyTopPlayers, mockTopPlayersWithUsers } from './mockUtils';
/* eslint-disable import/prefer-default-export */
export const getTopPlayers = jest.fn()
  .mockImplementationOnce(mockEmptyTopPlayers)
  .mockImplementationOnce(mockTopPlayersWithUsers);
