import { describe, expect, it, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import MultiLevelSidebar from './sidebar';
import { categoriesFixture } from '../../test/fixtures';
import { renderWithProviders } from '../../test/render';

describe('Category sidebar', () => {
  beforeEach(() => {
    window.matchMedia = (query: string) =>
      ({
        matches: query.includes('min-width'),
        media: query,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
      }) as MediaQueryList;
  });

  it('navigates nested categories to /catalog/:id', () => {
    renderWithProviders(<MultiLevelSidebar categories={categoriesFixture} />);

    expect(screen.getByRole('link', { name: 'Кухні' })).toHaveAttribute('href', '/catalog/1');
    expect(screen.getByRole('link', { name: 'Дивани' })).toHaveAttribute('href', '/catalog/2');
  });
});
