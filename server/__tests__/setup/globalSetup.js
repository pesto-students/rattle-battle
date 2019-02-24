const { createMockgoose } = require('../../src/utils/testUtils');

module.exports = async () => {
  global.MOCKGOOSE = await createMockgoose();
};
