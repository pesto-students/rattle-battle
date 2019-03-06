const { createMockgoose } = require('../testUtils');

module.exports = async () => {
  global.MOCKGOOSE = await createMockgoose();
};
