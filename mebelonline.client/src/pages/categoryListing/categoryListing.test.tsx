import { describe, expect, it, vi, beforeEach } from 'vitest';
import { Route, Routes } from 'react-router-dom';
import { screen } from '@testing-library/react';
import CategoryListing from './categoryListing';
import { renderWithProviders } from '../../test/render';
import categoryService from '../../services/categoryService';
import searchService from '../../services/searchService';
import { categoryDetailsFixture, pagedProductsFixture, sidebarFixture } from '../../test/fixtures';
import { ApiError } from '../../services/httpClient';

vi.mock('../../services/categoryService', () => ({
  default: {
    fetchAll: vi.fn().mockResolvedValue([]),
    fetchById: vi.fn(),
  },
}));

vi.mock('../../services/searchService', () => ({
  default: {
    fetchByQuery: vi.fn(),
    fetchSidebar: vi.fn(),
  },
}));

const renderCategory = (id = '2') =>
  renderWithProviders(
    <Routes>
      <Route path="/catalog/:categoryId" element={<CategoryListing />} />
    </Routes>,
    { route: `/catalog/${id}` },
  );

describe('Category listing', () => {
  beforeEach(() => {
    vi.mocked(categoryService.fetchById).mockResolvedValue(categoryDetailsFixture);
    vi.mocked(searchService.fetchByQuery).mockResolvedValue(pagedProductsFixture);
    vi.mocked(searchService.fetchSidebar).mockResolvedValue(sidebarFixture);
  });

  it('loads products by categoryId rather than searchString', async () => {
    renderCategory();

    expect(await screen.findByRole('heading', { name: 'Дивани' })).toBeInTheDocument();
    await screen.findByText('Диван Мілан');

    const params = vi.mocked(searchService.fetchByQuery).mock.calls[0][0];
    expect(params.get('categoryId')).toBe('2');
    expect(params.get('searchString')).toBeNull();
  });

  it('shows 404 UI for a missing category', async () => {
    vi.mocked(categoryService.fetchById).mockRejectedValue(new ApiError(404, 'Категорію не знайдено'));
    renderCategory('999');
    expect(await screen.findByRole('heading', { name: 'Категорію не знайдено' })).toBeInTheDocument();
  });

  it('builds /catalog/{id} breadcrumbs from nested API parents', async () => {
    vi.mocked(categoryService.fetchById).mockResolvedValue({
      id: 34,
      name: 'Прямі дивани з нішею',
      imageUrl: null,
      parent: {
        id: 30,
        name: 'Прямі дивани',
        parent: { id: 10, name: 'Дивани', parent: null },
      },
      children: [],
    });

    renderCategory('34');

    expect(await screen.findByRole('heading', { name: 'Прямі дивани з нішею' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Дивани' })).toHaveAttribute('href', '/catalog/10');
    expect(screen.getByRole('link', { name: 'Прямі дивани' })).toHaveAttribute('href', '/catalog/30');
  });
});
