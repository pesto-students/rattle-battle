import { expect } from 'chai';
import request from 'supertest';
import { getMockUser } from './testUtils';

const { testServer } = global;
let JWT;

beforeAll((done) => {
  const mockUser = getMockUser();
  request(testServer)
    .post('/api/signup')
    .send(mockUser)
    .end((err, res) => {
      JWT = res.get('x-auth-token');
      done(err);
    });
});

describe('Validate JWT API', () => {
  it('should give the auth user when a valid JWT is present', (done) => {
    request(testServer)
      .get('/api/validate')
      .set('Authorization', `Bearer ${JWT}`)
      .expect(200)
      .end((err, res) => {
        const decodedToken = res.body;
        expect(decodedToken).to.have.keys(
          'id',
          'username',
          'access',
          'iat',
          'exp',
        );
        done(err);
      });
  });
  it('should give an error when JWT is invalid', (done) => {
    request(testServer)
      .get('/api/validate')
      .expect(401)
      .end((err, res) => {
        expect(res.body).to.have.key('errors');
        done(err);
      });
  });
});
