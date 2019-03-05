import dotenv from 'dotenv';
import dotenvParseVariables from 'dotenv-parse-variables';

const { parsed: env = {} } = dotenv.config();
const parsedEnv = dotenvParseVariables(env);

const {
  PORT = 4000,
  DB_URL = 'mongodb://localhost:27017/testdb',
  TEST_PORT = 8888,
  JWT_SECRET = 'randomdefaultjwtsecret',
  TRUSTED_ORIGIN = 'http://localhost:3000',
  JWT_DURATION = '7d',
  LEADERBOARD_LIMIT = 5,
} = parsedEnv;

export {
  PORT,
  DB_URL,
  TEST_PORT,
  JWT_SECRET,
  TRUSTED_ORIGIN,
  JWT_DURATION,
  LEADERBOARD_LIMIT,
};
