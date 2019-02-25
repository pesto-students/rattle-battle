import User from '../database/models/user';
/* eslint-disable import/prefer-default-export */
export const checkUserExists = async (userDetails) => {
  const user = await User.findOne(userDetails);
  if (user) {
    throw new Error('is taken');
  }

  return Promise.resolve();
};
