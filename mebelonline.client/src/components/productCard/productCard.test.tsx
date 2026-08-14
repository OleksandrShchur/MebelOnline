import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import ProductCard from './productCard';
import { productCardFixture } from '../../test/fixtures';
import { renderWithProviders } from '../../test/render';

describe('ProductCard', () => {
  it('links to the product page and shows UAH price without favorites', () => {
    renderWithProviders(<ProductCard product={productCardFixture} />);

    expect(screen.getAllByRole('link', { name: /Диван Мілан/ })[0]).toHaveAttribute(
      'href',
      '/product/42',
    );
    expect(screen.getByText(/15\s?999 грн/)).toBeInTheDocument();
    expect(screen.getByText(/18\s?999 грн/)).toBeInTheDocument();
    expect(screen.queryByLabelText(/обране/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /кошик|купити|увійти/i })).not.toBeInTheDocument();
  });
});
