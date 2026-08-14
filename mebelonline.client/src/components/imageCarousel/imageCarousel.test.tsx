import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageCarousel from './imageCarousel';
import { renderWithProviders } from '../../test/render';

vi.mock('embla-carousel-react', () => ({
  default: () => [vi.fn(), undefined],
}));

describe('ImageCarousel', () => {
  it('exposes Ukrainian alt text and keyboard controls', async () => {
    const user = userEvent.setup();
    const handleOpen = vi.fn();

    renderWithProviders(
      <ImageCarousel
        productTitle="Диван Мілан"
        slideHeight="40vh"
        handleOpen={handleOpen}
        images={[
          { url: '/a.jpg', isPrimary: true },
          { url: '/b.jpg', isPrimary: false },
        ]}
      />,
    );

    expect(screen.getByRole('region', { name: 'Зображення: Диван Мілан' })).toBeInTheDocument();
    expect(screen.getByAltText('Диван Мілан, фото 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Попереднє зображення')).toBeInTheDocument();
    expect(screen.getByLabelText('Наступне зображення')).toBeInTheDocument();

    await user.tab();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('region')).toHaveAttribute('aria-roledescription', 'карусель');
  });
});
