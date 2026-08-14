import { describe, expect, it, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Catalog from './catalog';
import { renderWithProviders } from '../../test/render';
import categoryService from '../../services/categoryService';
import { catalogFixture } from '../../test/fixtures';

vi.mock('../../services/categoryService', () => ({
  default: {
    fetchAll: vi.fn().mockResolvedValue([]),
    fetchCatalog: vi.fn(),
  },
}));

describe('Catalog page', () => {
  beforeEach(() => {
    vi.mocked(categoryService.fetchCatalog).mockResolvedValue(catalogFixture);
  });

  it('renders category cards that go to /catalog/:id', async () => {
    renderWithProviders(<Catalog />);

    expect(await screen.findByRole('heading', { name: 'Каталог меблів' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Кухні' })[0]).toHaveAttribute('href', '/catalog/1');
    expect(screen.getAllByRole('link', { name: 'Дивани' })[0]).toHaveAttribute('href', '/catalog/2');
  });

  it('shows an empty catalog state', async () => {
    vi.mocked(categoryService.fetchCatalog).mockResolvedValue([]);
    renderWithProviders(<Catalog />);
    expect(await screen.findByText('Каталог порожній')).toBeInTheDocument();
  });

  it('shows an error with retry', async () => {
    vi.mocked(categoryService.fetchCatalog).mockRejectedValueOnce(new Error('Не вдалося завантажити каталог.'));
    vi.mocked(categoryService.fetchCatalog).mockResolvedValueOnce(catalogFixture);
    const user = userEvent.setup();
    renderWithProviders(<Catalog />);

    expect(await screen.findByText('Не вдалося завантажити каталог.')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Спробувати ще раз' }));
    expect(await screen.findAllByRole('link', { name: 'Кухні' })).not.toHaveLength(0);
  });
});
