import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import NotFound from './notFound';
import { renderWithProviders } from '../../test/render';

describe('NotFound', () => {
  it('renders Ukrainian 404 copy with catalog and home links', () => {
    renderWithProviders(<NotFound />);
    expect(screen.getByRole('heading', { name: 'Сторінку не знайдено' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'На головну' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'До каталогу' })).toHaveAttribute('href', '/catalog');
  });
});
