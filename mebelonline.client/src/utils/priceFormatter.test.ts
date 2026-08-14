import { describe, expect, it } from 'vitest';
import priceFormatter from './priceFormatter';

describe('priceFormatter', () => {
  it('formats amounts with uk-UA grouping', () => {
    expect(priceFormatter(15999).replace(/\s/g, ' ')).toBe('15 999');
  });
});
