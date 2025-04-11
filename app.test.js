const { add } = require('./app');

describe('add', () => {
  test('should return the sum of two numbers', () => {
    expect(add(1, 2)).toBe(3);
    expect(add(-1, 5)).toBe(4);
  });
});