
import { expect } from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';
import app from '../src/app/app';
import getMockUser from '../src/utils/testUtils';

const { TEST_PORT = 8888, DB_URL = 'mongodb://localhost:27017/testdb' } = process.env;

let mockUser;
let testServer;
let request;
let mockgoose;

beforeAll(() => {
  mockgoose = new Mockgoose(mongoose);
  mockgoose.prepareStorage().then(() => {
    mongoose.connect(DB_URL, { useNewUrlParser: true, useCreateIndex: true });
  });
});

beforeEach((done) => {
  mockUser = getMockUser();
  testServer = app.listen(TEST_PORT, () => {
    request = supertest(testServer);
    return done();
  });
});

afterEach(done => testServer.close(done));

afterAll(() => mockgoose.shutdown());

// /api/signup test suite
describe('Sign-Up API', () => {
  it('registers a user with email, username and password', (done) => {
    request
      .post('/api/signup')
      .send(mockUser)
      .expect(200)
      .end((err, res) => {
        const createdUser = res.body;
        expect(createdUser).to.have.keys('_id', 'username');
        return done(err);
      });
  });
  it('give error codes when email or username or password are missing', (done) => {
    const { email, username } = mockUser;
    request
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
    request
      .post('/api/signup')
      .send({
        email,
        username,
      })
      .end((err, res) => {
        expect(res.body).to.have.key('errors');
        return done(err);
      });
  });
  it('gives error message when username or email is already taken', (done) => {
    // Create user first
    request
      .post('/api/signup')
      .send(mockUser)
      .end(() => {
        // Create same user
        request
          .post('/api/signup')
          .send(mockUser)
          .expect(409)
          .end((err, res) => {
            expect(res.body).to.have.key('errors');
            return done(err);
          });
      });
  });
  it('sends a JWT in the header on successful sign up', (done) => {
    request
      .post('/api/signup')
      .send(mockUser)
      .end((error, response) => {
        expect(response.header).to.include.key('x-auth-token');
        return done(error);
      });
  });
});
