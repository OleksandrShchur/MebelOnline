import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import Footer from './footer';
import { renderWithProviders } from '../../test/render';

describe('Footer', () => {
  it('shows informational contacts without commerce controls', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText('Контакти')).toBeInTheDocument();
    expect(screen.getByText('Про нас')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /\+380/ })).toHaveAttribute('href', 'tel:+380123456789');
    expect(screen.queryByRole('button', { name: /увійти|кошик|оформити/i })).not.toBeInTheDocument();
  });
});
