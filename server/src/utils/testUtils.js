import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';
import app from '../app/app';
import {
  TEST_PORT,
  DB_URL,
} from '../app/appConstants';
import mongoConfig from '../database/mongoConfig';
import { generateJWT } from './encryptUtils';

export const getMockUser = () => {
  const testUser = (Math.random() * 10000).toFixed(0);
  const email = `user${testUser}@abc.com`;
  const username = `user${testUser}`;
  const password = `password${testUser}`;
  const score = parseInt((Math.random() * 100).toFixed(0), 10);

  return {
    email,
    username,
    password,
    score,
  };
};

export const createTestServer = async () => {
  const testServer = await app.listen(TEST_PORT);

  return testServer;
};

export const createMockgoose = async () => {
  const mockgoose = new Mockgoose(mongoose);
  await mockgoose.prepareStorage().then(async () => {
    await mongoose.connect(DB_URL, mongoConfig);
  });

  return mockgoose;
};

export const getMockPlayers = () => [1, 2, 3, 4, 5, 6].map(getMockUser);

export const sortPlayersAndGetTopFive = mockPlayers => mockPlayers
  .sort((player1, player2) => {
    const { score: player1Score } = player1;
    const { score: player2Score } = player2;
    if (player1Score === player2Score) return 0;
    if (player1Score < player2Score) return 1;
    return -1;
  })
  .slice(0, 5)
  .map(({ username, score }) => ({ username, score }));

export const seedDatabase = async (mockPlayers, server) => {
  await Promise.all(
    mockPlayers.map(async (player) => {
      const { id, username } = player;
      const token = generateJWT({
        id,
        username,
        access: 'auth',
      });
      await server
        .post('/api/leaderboard')
        .set('Authorization', `Bearer ${token}`)
        .send(player);
    }),
  );
};
