import { describe, expect, it, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import Home from './home';
import { renderWithProviders } from '../../test/render';
import categoryService from '../../services/categoryService';
import productService from '../../services/productService';
import { categoriesFixture, productCardFixture } from '../../test/fixtures';

vi.mock('../../services/categoryService', () => ({
  default: {
    fetchAll: vi.fn(),
  },
}));

vi.mock('../../services/productService', () => ({
  default: {
    fetchLatest: vi.fn(),
  },
}));

describe('Home', () => {
  beforeEach(() => {
    vi.mocked(categoryService.fetchAll).mockResolvedValue(categoriesFixture);
    vi.mocked(productService.fetchLatest).mockResolvedValue([productCardFixture]);
  });

  it('shows Ukrainian hero, novelties, and no cart UI', async () => {
    renderWithProviders(<Home />);

    expect(await screen.findByRole('heading', { name: /Якісні меблі/ })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: 'Новинки' })).toBeInTheDocument();
    expect(await screen.findByText('Диван Мілан')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /кошик|увійти/i })).not.toBeInTheDocument();
  });
});
