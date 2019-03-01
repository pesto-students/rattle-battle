import User from '../src/database/models/user';

let user;

const mockUserSchema = {
  email: 'abc123@mail.com',
  username: 'abc123',
  password: '1234566',
};

beforeEach(() => {
  user = new User(mockUserSchema);
});

describe('UserSchema', () => {
  test('user should have initial online status set to true ', () => {
    expect(user.onlineStatus).toBe(true);
  });

  test('should should toggle online status on calling `toggleOnlineStatus` method', () => {
    user.toggleOnlineStatus();
    expect(user.onlineStatus).toBe(false);
    user.toggleOnlineStatus();
    expect(user.onlineStatus).toBe(true);
  });
});
