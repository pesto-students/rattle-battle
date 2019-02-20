
import request from 'supertest';
import app from '../src/app/app';

const { TEST_PORT = 8888 } = process.env;

describe('Server responds correctly to requests', () => {
  let testServer;

  beforeEach((done) => {
    testServer = app.listen(TEST_PORT, done);
  });

  afterEach(done => testServer.close(done));

  it('should respond to GET `/ping`', (done) => {
    request(testServer)
      .get('/ping')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: 'working' });
        done();
      });
  });

  it('should respond with 404 for unknown routes', async (done) => {
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
