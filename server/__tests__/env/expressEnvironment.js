import NodeEnvironment from 'jest-environment-node';
import { createTestServer } from '../testUtils';

class ExpressEnvironment extends NodeEnvironment {
  async setup() {
    this.global.testServer = await createTestServer();
    await super.setup();
  }

  async teardown() {
    await this.global.testServer.close();
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

export default ExpressEnvironment;
