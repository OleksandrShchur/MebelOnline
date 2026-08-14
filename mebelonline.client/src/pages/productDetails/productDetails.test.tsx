import { describe, expect, it, vi, beforeEach } from 'vitest';
import { Route, Routes } from 'react-router-dom';
import { screen } from '@testing-library/react';
import ProductDetails from './productDetails';
import { renderWithProviders } from '../../test/render';
import productService from '../../services/productService';
import categoryService from '../../services/categoryService';
import { productDetailsFixture } from '../../test/fixtures';
import { ApiError } from '../../services/httpClient';

vi.mock('../../services/productService', () => ({
  default: {
    fetchProductDetails: vi.fn(),
    fetchLatest: vi.fn(),
  },
}));

vi.mock('../../services/categoryService', () => ({
  default: {
    fetchAll: vi.fn().mockResolvedValue([]),
    fetchBreadcrumbsForProduct: vi.fn(),
  },
}));

vi.mock('../../components/imageCarousel/imageCarousel', () => ({
  default: ({ productTitle }: { productTitle?: string }) => (
    <div role="region" aria-label={`Зображення: ${productTitle ?? 'Товар'}`}>
      Галерея
    </div>
  ),
}));

const renderProduct = (id = '42') =>
  renderWithProviders(
    <Routes>
      <Route path="/product/:productId" element={<ProductDetails />} />
    </Routes>,
    { route: `/product/${id}` },
  );

describe('Product details', () => {
  beforeEach(() => {
    vi.mocked(productService.fetchProductDetails).mockResolvedValue(productDetailsFixture);
    vi.mocked(categoryService.fetchBreadcrumbsForProduct).mockResolvedValue([
      { name: 'Головна', url: '/' },
      { name: 'Каталог меблів', url: '/catalog' },
      { name: 'Дивани', url: '/catalog/2' },
    ]);
  });

  it('renders API fields, options, specs, and no cart/favorites', async () => {
    renderProduct();

    expect(await screen.findByRole('heading', { name: 'Диван Мілан' })).toBeInTheDocument();
    expect(screen.getByText(/Код товару: 42/)).toBeInTheDocument();
    expect(screen.getByText(/Виробник: MebelUA/)).toBeInTheDocument();
    expect(screen.getByText(/15\s?999 грн/)).toBeInTheDocument();
    expect(screen.getByText('Зручний диван для вітальні')).toBeInTheDocument();
    expect(screen.getByText('Тканина знімна')).toBeInTheDocument();
    expect(screen.getByText('Колір корпусу')).toBeInTheDocument();
    expect(screen.getByText('Колір фасаду')).toBeInTheDocument();
    expect(screen.getByText('Матеріал')).toBeInTheDocument();
    expect(screen.getByText('Ширина')).toBeInTheDocument();
    expect(screen.queryByLabelText(/обране/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /кошик|купити|увійти/i })).not.toBeInTheDocument();
  });

  it('shows a 404 page when the product is missing', async () => {
    vi.mocked(productService.fetchProductDetails).mockRejectedValue(new ApiError(404, 'Товар не знайдено'));
    renderProduct('404');
    expect(await screen.findByRole('heading', { name: 'Товар не знайдено' })).toBeInTheDocument();
  });

  it('uses category routes in breadcrumbs', async () => {
    renderProduct();
    expect(await screen.findByRole('link', { name: 'Дивани' })).toHaveAttribute('href', '/catalog/2');
  });
});
