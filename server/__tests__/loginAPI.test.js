import { expect } from 'chai';
import request from 'supertest';
import { getMockUser } from '../src/utils/testUtils';

let mockUser;

const { testServer } = global;

beforeAll(async (done) => {
  mockUser = getMockUser();
  await request(testServer)
    .post('/api/signup')
    .send(mockUser);
  done();
});

// /api/login test suite
describe('Login API', () => {
  it('returns user on logging in with email and password', (done) => {
    const { email, password } = mockUser;
    request(testServer)
      .post('/api/login')
      .send({
        email,
        password,
      })
      .expect(200)
      .end((error, response) => {
        const createdUser = response.body;
        expect(createdUser).to.have.keys('id', 'username');
        done(error);
      });
  });

  it('gives error codes when email or password are missing', (done) => {
    const { email } = mockUser;
    request(testServer)
      .post('/api/login')
      .send({
        email,
      })
      .expect(422)
      .end((error, response) => {
        expect(response.body).to.have.key('errors');
        done(error);
      });
  });

  it('gives error message when email is not found', (done) => {
    const { password } = mockUser;
    request(testServer)
      .post('/api/login')
      .send({
        email: 'thismailcannotexist@nomailaddress.com',
        password,
      })
      .expect(400)
      .end((error, response) => {
        expect(response.body).to.have.key('errors');
        done(error);
      });
  });

  it('gives error message when password does not match', (done) => {
    const { email } = mockUser;
    request(testServer)
      .post('/api/login')
      .send({
        email,
        password: 'wrongpassword',
      })
      .expect(401)
      .end((error, response) => {
        expect(response.body).to.have.key('errors');
        done(error);
      });
  });

  it('sends a JWT in the header on successful login', (done) => {
    const { email, password } = mockUser;
    request(testServer)
      .post('/api/login')
      .send({
        email,
        password,
      })
      .end((error, response) => {
        expect(response.header).to.include.key('x-auth-token');
        done(error);
      });
  });
});
