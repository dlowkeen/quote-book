import { delay } from './helpers';

describe('utils helper functions', () => {
  describe('delay', () => {
    it('waits for designated # of ms', async () => {
      const now = Date.now();
      await delay(500);
      const later = Date.now();

      // test that the math is within 50ms
      expect(later - now).toBeCloseTo(500, -2);
    });
  });
});
