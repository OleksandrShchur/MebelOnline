import { describe, expect, it, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HeaderSearch from './headerSearch';
import { renderWithProviders } from '../../test/render';

const navigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

describe('HeaderSearch', () => {
  beforeEach(() => {
    navigate.mockReset();
    document.cookie = 'searchHistory=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  });

  it('navigates to /search with 0-based paging on Enter', async () => {
    const user = userEvent.setup();
    renderWithProviders(<HeaderSearch />);

    const input = screen.getByLabelText('Пошук товарів');
    await user.type(input, 'диван{Enter}');

    expect(navigate).toHaveBeenCalledWith(
      '/search?searchString=%D0%B4%D0%B8%D0%B2%D0%B0%D0%BD&page=0&pageSize=12&sortBy=Ascending',
    );
  });

  it('does not send whitespace-only queries as searchString', async () => {
    const user = userEvent.setup();
    renderWithProviders(<HeaderSearch />);

    await user.type(screen.getByLabelText('Пошук товарів'), '   {Enter}');
    expect(navigate).toHaveBeenCalledWith('/search');
  });

  it('bounds the query to 100 characters', async () => {
    const user = userEvent.setup();
    renderWithProviders(<HeaderSearch />);

    const input = screen.getByLabelText('Пошук товарів');
    await user.click(input);
    await user.paste('д'.repeat(120));
    await user.keyboard('{Enter}');

    const calledWith = navigate.mock.calls.at(-1)?.[0] as string;
    const params = new URLSearchParams(calledWith.split('?')[1]);
    expect(params.get('searchString')?.length).toBe(100);
  });
});
