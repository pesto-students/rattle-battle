
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

// Remove default export when more methods are added to testUtils
export default getMockUser;
