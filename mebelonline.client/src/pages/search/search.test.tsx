import { describe, expect, it, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './search';
import { renderWithProviders } from '../../test/render';
import searchService from '../../services/searchService';
import { pagedProductsFixture, sidebarFixture } from '../../test/fixtures';

vi.mock('../../services/searchService', () => ({
  default: {
    fetchByQuery: vi.fn(),
    fetchSidebar: vi.fn(),
  },
}));

vi.mock('../../services/categoryService', () => ({
  default: {
    fetchAll: vi.fn().mockResolvedValue([]),
  },
}));

describe('Search page', () => {
  beforeEach(() => {
    vi.mocked(searchService.fetchByQuery).mockResolvedValue(pagedProductsFixture);
    vi.mocked(searchService.fetchSidebar).mockResolvedValue(sidebarFixture);
  });

  it('loads from the URL and shows result count', async () => {
    renderWithProviders(<Search />, { route: '/search?searchString=диван&page=0&pageSize=12' });

    expect(await screen.findByText(/Результати пошуку/)).toBeInTheDocument();
    expect(await screen.findByText('Диван Мілан')).toBeInTheDocument();
    expect(screen.getByText(/Знайдено: 1/)).toBeInTheDocument();
  });

  it('keeps searchString when applying filters', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Search />, {
      route: '/search?searchString=диван&page=0&pageSize=12&sortBy=Ascending',
    });

    await screen.findByText('Диван Мілан');
    const filtersToggle = screen.queryByRole('button', { name: /Фільтри/ });
    if (filtersToggle) {
      await user.click(filtersToggle);
    }
    await user.click(await screen.findByLabelText('MebelUA'));
    await user.click(screen.getByRole('button', { name: 'Застосувати' }));

    await waitFor(() => {
      const lastCall = vi.mocked(searchService.fetchByQuery).mock.calls.at(-1)?.[0] as URLSearchParams;
      expect(lastCall.get('searchString')).toBe('диван');
      expect(lastCall.getAll('selectedBrands')).toContain('MebelUA');
    });
  });

  it('shows an empty state when there are no hits', async () => {
    vi.mocked(searchService.fetchByQuery).mockResolvedValue({
      ...pagedProductsFixture,
      items: [],
      totalCount: 0,
    });

    renderWithProviders(<Search />, { route: '/search?searchString=немає&page=0&pageSize=12' });
    expect(await screen.findByText('Нічого не знайдено')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Скинути пошук' }).length).toBeGreaterThan(0);
  });

  it('shows a loading then error state', async () => {
    vi.mocked(searchService.fetchByQuery).mockRejectedValue(new Error('Не вдалося завантажити товари.'));

    renderWithProviders(<Search />, { route: '/search?searchString=диван' });
    expect(await screen.findByText('Не вдалося завантажити товари.')).toBeInTheDocument();
  });
});
