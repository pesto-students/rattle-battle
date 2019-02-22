import NodeEnvironment from 'jest-environment-node';
import { createTestServer, createMockgoose } from '../../src/utils/testUtils';

class ExpressEnvironment extends NodeEnvironment {
  async setup() {
    this.global.testServer = await createTestServer();
    this.global.mockgoose = await createMockgoose();
    await super.setup();
  }

  async teardown() {
    await this.global.testServer.close();
    await this.global.mockgoose.shutdown();
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

export default ExpressEnvironment;
