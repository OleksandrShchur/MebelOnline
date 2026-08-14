import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductOptions from './productOptions';
import { renderWithProviders } from '../../test/render';

describe('ProductOptions', () => {
  it('selects a swatch with keyboard without calling a write API', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    renderWithProviders(
      <ProductOptions
        title="Колір фасаду"
        selected="Беж"
        options={[
          { colorName: 'Беж', imageUrl: '/a.jpg' },
          { colorName: 'Графіт', imageUrl: '/b.jpg' },
        ]}
        handleChange={handleChange}
      />,
    );

    const graphite = screen.getByRole('button', { name: 'Колір фасаду: Графіт' });
    graphite.focus();
    await user.keyboard('{Enter}');
    expect(handleChange).toHaveBeenCalledWith('Графіт');
  });
});
