import { expect } from 'chai';
import request from 'supertest';
import {
  getMockPlayers,
  sortPlayersAndGetTopFive,
  seedDatabase,
} from '../src/utils/testUtils';
import { generateJWT } from '../src/utils/encryptUtils';

const { testServer } = global;

let mockPlayers;
let topFivePlayers;

beforeAll(async (done) => {
  mockPlayers = getMockPlayers();
  topFivePlayers = sortPlayersAndGetTopFive(mockPlayers);
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
    it('gives top 5 scores on the leaderboard with the usernames', (done) => {
      request(testServer)
        .get('/api/leaderboard/top')
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.eql(topFivePlayers);
          done(err);
        });
    });
  });
});
