
const getMockUser = () => {
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

module.exports = {
  getMockUser,
};
