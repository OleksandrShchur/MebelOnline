import { ThemeProvider } from '@mui/material/styles';
import { render, type RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { ReactElement, ReactNode } from 'react';
import theme from '../theme/theme';
import { CategoriesProvider } from '../context/categoriesContext';

type Options = Omit<RenderOptions, 'wrapper'> & {
  route?: string;
  withCategories?: boolean;
};

export const renderWithProviders = (ui: ReactElement, options: Options = {}) => {
  const { route = '/', withCategories = true, ...renderOptions } = options;

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[route]}>
        {withCategories ? <CategoriesProvider>{children}</CategoriesProvider> : children}
      </MemoryRouter>
    </ThemeProvider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};
