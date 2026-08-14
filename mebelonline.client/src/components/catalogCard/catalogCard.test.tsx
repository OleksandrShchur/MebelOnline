import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import CatalogCard from './catalogCard';
import { catalogFixture } from '../../test/fixtures';
import { renderWithProviders } from '../../test/render';

describe('CatalogCard', () => {
  it('navigates to /catalog/:categoryId instead of search-by-name', () => {
    renderWithProviders(<CatalogCard category={catalogFixture[0]} />);

    expect(screen.getAllByRole('link', { name: 'Кухні' })[0]).toHaveAttribute('href', '/catalog/1');
    expect(screen.getByRole('link', { name: 'Кухонні гарнітури' })).toHaveAttribute(
      'href',
      '/catalog/11',
    );
    expect(screen.getByRole('link', { name: 'Показати всі...' })).toHaveAttribute(
      'href',
      '/catalog/1',
    );
    expect(screen.queryByRole('link', { name: /searchString/ })).not.toBeInTheDocument();
  });
});
