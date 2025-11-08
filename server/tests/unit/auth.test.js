const { hashPassword, verifyPassword } = require('../../src/utils/auth');

describe('Auth Utilities', () => {
  it('should hash and verify password correctly', async () => {
    const password = 'securePass';
    const hashed = await hashPassword(password);
    const isValid = await verifyPassword(password, hashed);
    expect(isValid).toBe(true);
  });
});
