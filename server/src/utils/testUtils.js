import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';
import app from '../app/app';
import { TEST_PORT, DB_URL } from '../app/appConstants';

export const getMockUser = () => {
  const testUser = (Math.random() * 10000).toFixed(0);
  const email = `user${testUser}@abc.com`;
  const username = `user${testUser}`;
  const password = `password${testUser}`;

  return {
    email,
    username,
    password,
  };
};

export const createTestServer = async () => {
  const testServer = await app.listen(TEST_PORT);

  return testServer;
};

export const createMockgoose = async () => {
  const mockgoose = new Mockgoose(mongoose);
  await mockgoose.prepareStorage().then(async () => {
    await mongoose.connect(DB_URL, { useNewUrlParser: true, useCreateIndex: true });
  });

  return mockgoose;
};
