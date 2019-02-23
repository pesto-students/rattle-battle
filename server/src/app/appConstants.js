const {
  PORT = 4000,
  DB_URL = 'mongodb://localhost:27017/testdb',
  TEST_PORT = 8888,
  JWT_SECRET = 'randomdefaultjwtsecret',
  TRUSTED_ORIGIN = 'http://localhost:3000',
} = process.env;

export {
  PORT, DB_URL, TEST_PORT, JWT_SECRET, TRUSTED_ORIGIN,
};
