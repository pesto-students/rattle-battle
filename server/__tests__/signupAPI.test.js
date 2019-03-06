import { expect } from 'chai';
import request from 'supertest';
import { getMockUser } from './testUtils';

let mockUser;

const { testServer } = global;

beforeEach((done) => {
  mockUser = getMockUser();
  done();
});

// /api/signup test suite
describe('Sign-Up API', () => {
  it('registers a user with email, username and password', (done) => {
    request(testServer)
      .post('/api/signup')
      .send(mockUser)
      .expect(200)
      .end((err, res) => {
        const createdUser = res.body;
        expect(createdUser).to.have.keys('id', 'username');
        expect(createdUser.username).to.eql(mockUser.username);
        done(err);
      });
  });

  it('give error codes when email or username or password are missing', (done) => {
    const { email, username } = mockUser;
    request(testServer)
      .post('/api/signup')
      .send({
        email,
        username,
      })
      .expect(422)
      .end(() => done());
  });

  it('gives error messages when email or username or password are missing', (done) => {
    const { email, username } = mockUser;
    request(testServer)
      .post('/api/signup')
      .send({
        email,
        username,
      })
      .end((err, res) => {
        expect(res.body).to.have.key('errors');
        done(err);
      });
  });

  it('gives error message when username or email is already taken', async (done) => {
    // Create user first
    await request(testServer)
      .post('/api/signup')
      .send(mockUser);
    // Create same user
    request(testServer)
      .post('/api/signup')
      .send(mockUser)
      .expect(422)
      .end((err, res) => {
        expect(res.body).to.have.key('errors');
        done(err);
      });
  });

  it('sends a JWT in the header on successful sign up', (done) => {
    request(testServer)
      .post('/api/signup')
      .send(mockUser)
      .end((error, response) => {
        expect(response.header).to.include.key('x-auth-token');
        done(error);
      });
  });
});
