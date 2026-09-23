import { describe, expect, it } from 'vitest';

describe('date behavior', () => {
  it('creates a valid ISO timestamp from a date', () => {
    const date = new Date('2024-06-01T00:00:00.000Z');

    expect(date.toISOString()).toBe('2024-06-01T00:00:00.000Z');
  });

  it('formats a date in the expected en-US style', () => {
    const date = new Date('2024-06-01T00:00:00.000Z');

    expect(
      date.toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    ).toBe('Jun 1, 2024');
  });

  it('detects invalid date values', () => {
    const invalidDate = new Date('not a real date');

    expect(Number.isNaN(invalidDate.getTime())).toBe(true);
  });
});
