import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import ProductInfoCard from './productInfoCard';
import { renderWithProviders } from '../../test/render';
import { productDetailsFixture } from '../../test/fixtures';

describe('ProductInfoCard', () => {
  it('shows brand, code, price and hides favorites/cart', () => {
    renderWithProviders(
      <ProductInfoCard
        id={productDetailsFixture.id}
        title={productDetailsFixture.title}
        price={productDetailsFixture.price}
        oldPrice={productDetailsFixture.oldPrice}
        note={productDetailsFixture.note}
        brand={productDetailsFixture.brand}
        frontOptions={productDetailsFixture.frontOptions}
        frameOptions={productDetailsFixture.frameOptions}
      />,
    );

    expect(screen.getByText(/Код товару: 42/)).toBeInTheDocument();
    expect(screen.getByText(/Виробник: MebelUA/)).toBeInTheDocument();
    expect(screen.queryByLabelText(/обране/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /кошик|купити/i })).not.toBeInTheDocument();
  });
});
