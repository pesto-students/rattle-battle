const chai = require('chai');
const supertest = require('supertest');
const mongoose = require('mongoose');
const { Mockgoose } = require('mockgoose');
const app = require('../app/app');

const { User } = require('../database/Models/User');
const { getMockUser } = require('../utils/utils');

const { expect } = chai;
const { TEST_PORT, DB_URL } = process.env;

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

// /api/login test suite
describe('Login API', () => {
  beforeEach((done) => {
    // Create the user
    User.create(mockUser, err => done(err));
  });
  it('returns user on logging in with email and password', (done) => {
    const { email, password } = mockUser;
    request
      .post('/api/login')
      .send({
        email,
        password,
      })
      .expect(200)
      .end((error, response) => {
        const createdUser = response.body;
        expect(createdUser).to.have.keys('_id', 'username');
        return done(error);
      });
  });
  it('gives error codes when email or password are missing', (done) => {
    const { email } = mockUser;
    request
      .post('/api/login')
      .send({
        email,
      })
      .expect(422)
      .end((error, response) => {
        expect(response.body).to.have.key('errors');
        return done(error);
      });
  });
  it('gives error message when email is not found', (done) => {
    const { password } = mockUser;
    request
      .post('/api/login')
      .send({
        email: 'thismailcannotexist@nomailaddress.com',
        password,
      })
      .expect(400)
      .end((error, response) => {
        expect(response.body).to.have.key('errors');
        return done(error);
      });
  });
  it('gives error message when password does not match', (done) => {
    const { email } = mockUser;
    request
      .post('/api/login')
      .send({
        email,
        password: 'wrongpassword',
      })
      .expect(401)
      .end((error, response) => {
        expect(response.body).to.have.key('errors');
        return done(error);
      });
  });
  it('sends a JWT in the header on successful login', (done) => {
    const { email, password } = mockUser;
    request
      .post('/api/login')
      .send({
        email,
        password,
      })
      .end((error, response) => {
        expect(response.header).to.include.key('x-auth-token');
        return done(error);
      });
  });
});
