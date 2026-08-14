import { describe, expect, it, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './header';
import { renderWithProviders } from '../../test/render';
import { categoriesFixture } from '../../test/fixtures';
import categoryService from '../../services/categoryService';

vi.mock('../../services/categoryService', () => ({
  default: {
    fetchAll: vi.fn(),
    fetchCatalog: vi.fn(),
    fetchById: vi.fn(),
    fetchBreadcrumbsForProduct: vi.fn(),
  },
}));

describe('Header', () => {
  beforeEach(() => {
    vi.mocked(categoryService.fetchAll).mockResolvedValue(categoriesFixture);
  });

  it('shows Ukrainian chrome without contacts/about nav or favorites', async () => {
    renderWithProviders(<Header />);

    expect(await screen.findByRole('link', { name: 'Головна' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Каталог' })).toHaveAttribute('href', '/catalog');
    expect(screen.getByLabelText('Пошук товарів')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Контакти' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Про нас' })).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/обране/i)).not.toBeInTheDocument();
  });

  it('opens mobile nav with nested categories from the API', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    await user.click(screen.getByLabelText('Відкрити меню'));
    expect(await screen.findByRole('link', { name: 'Кухні' })).toHaveAttribute('href', '/catalog/1');
    expect(screen.getByRole('link', { name: 'Дивани' })).toHaveAttribute('href', '/catalog/2');
  });
});
