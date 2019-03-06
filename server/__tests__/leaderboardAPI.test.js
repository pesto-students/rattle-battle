import { expect } from 'chai';
import request from 'supertest';
import {
  getMockPlayers,
  sortPlayersAndGetTop,
  seedDatabase,
} from './testUtils';
import { generateJWT } from '../src/utils/encryptUtils';

const { testServer } = global;
const leaderboardLimit = 4;

let mockPlayers;

beforeAll(async (done) => {
  mockPlayers = getMockPlayers();
  await seedDatabase(mockPlayers, request(testServer));
  done();
});

describe('Leaderboard API', () => {
  describe('POST /api/leaderboard', () => {
    let jwt;
    let mockPlayer;

    beforeAll(() => {
      [mockPlayer] = mockPlayers;
      const { id, username } = mockPlayer;
      jwt = generateJWT({
        id,
        username,
        access: 'auth',
      });
    });

    it('adds leaderboard entry with username and score', (done) => {
      const { score } = mockPlayer;
      request(testServer)
        .post('/api/leaderboard')
        .set('Authorization', `Bearer ${jwt}`)
        .send({ score })
        .expect(201)
        .end((err, res) => {
          const leaderboard = res.body;
          expect(leaderboard).to.have.keys('username', 'score');
          done(err);
        });
    });

    it('gives error code and message when score is invalid', (done) => {
      request(testServer)
        .post('/api/leaderboard')
        .set('Authorization', `Bearer ${jwt}`)
        .send({ score: 'abc' })
        .expect(422)
        .end((err, res) => {
          expect(res.body).to.have.key('errors');
          done(err);
        });
    });
  });

  describe('GET /api/leaderboard/top', () => {
    it('gives top scores on the leaderboard with the usernames', (done) => {
      request(testServer)
        .get(`/api/leaderboard/top?limit=${leaderboardLimit}`)
        .expect(200)
        .end((err, res) => {
          const topPlayers = sortPlayersAndGetTop(mockPlayers, leaderboardLimit);
          expect(res.body).to.eql(topPlayers);
          done(err);
        });
    });
  });
});
