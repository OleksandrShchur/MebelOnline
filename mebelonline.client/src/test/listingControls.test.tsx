import { describe, expect, it, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '../pages/search/search';
import { renderWithProviders } from './render';
import searchService from '../services/searchService';
import { pagedProductsFixture, sidebarFixture, productCardFixture } from './fixtures';

vi.mock('../services/searchService', () => ({
  default: {
    fetchByQuery: vi.fn(),
    fetchSidebar: vi.fn(),
  },
}));

vi.mock('../services/categoryService', () => ({
  default: {
    fetchAll: vi.fn().mockResolvedValue([]),
  },
}));

describe('Listing sort and pagination', () => {
  beforeEach(() => {
    vi.mocked(searchService.fetchSidebar).mockResolvedValue(sidebarFixture);
    vi.mocked(searchService.fetchByQuery).mockResolvedValue({
      ...pagedProductsFixture,
      items: [productCardFixture],
      totalCount: 30,
      totalPages: 3,
    });
  });

  it('changes sort and page via the URL-backed controls', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Search />, {
      route: '/search?searchString=диван&page=0&pageSize=12&sortBy=Ascending',
    });

    await screen.findByText('Диван Мілан');
    await user.click(screen.getByLabelText('Сортування'));
    await user.click(await screen.findByRole('option', { name: 'Назва' }));

    const sortCall = vi.mocked(searchService.fetchByQuery).mock.calls.at(-1)?.[0] as URLSearchParams;
    expect(sortCall.get('sortBy')).toBe('Name');
    expect(sortCall.get('searchString')).toBe('диван');
  });
});
