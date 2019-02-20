const request = require('supertest');
const server = require('../src/index');

describe('Server responds correctly to requests', () => {
  let testServer;

  beforeEach(() => {
    testServer = server;
  });

  afterEach(() => {
    testServer.close();
  });

  test('should respond to GET `/ping`', (done) => {
    request(testServer)
      .get('/ping')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: 'working' });
        done();
      });
  });

  test('should respond with 404 for unknown routes', async (done) => {
    const randomRoute = () => `/abc${(Math.random() * 10000).toFixed(0)}`;

    await request(testServer)
      .get(randomRoute())
      .expect(404);

    await request(testServer)
      .post(randomRoute())
      .expect(404);

    await request(testServer)
      .put(randomRoute())
      .expect(404);

    done();
  });
});
