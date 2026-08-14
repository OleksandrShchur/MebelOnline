import { test, expect, type Page } from '@playwright/test';

const categories = [
  {
    id: 1,
    name: 'Кухні',
    childrenCategories: [{ id: 11, name: 'Кухонні гарнітури', childrenCategories: [] }],
  },
  { id: 2, name: 'Дивани', childrenCategories: [] },
];

const catalog = [
  { id: 1, name: 'Кухні', imageUrl: '/kitchen.jpg', subCategories: [] },
  { id: 2, name: 'Дивани', imageUrl: '/sofa.jpg', subCategories: [] },
];

const productCard = {
  id: 42,
  title: 'Диван Мілан',
  price: 15999,
  oldPrice: 18999,
  imageUrl: '/sofa.jpg',
};

const productPageTwo = {
  id: 43,
  title: 'Диван Рим',
  price: 12999,
  oldPrice: null,
  imageUrl: '/sofa-2.jpg',
};

const productDetails = {
  ...productCard,
  description: 'Зручний диван',
  width: 200,
  height: 90,
  depth: 95,
  note: 'Тканина знімна',
  brand: { name: 'MebelUA', description: '' },
  frontOptions: [{ colorName: 'Беж', imageUrl: '/front.jpg' }],
  frameOptions: [{ colorName: 'Графіт', imageUrl: '/frame.jpg' }],
  images: [
    { url: '/sofa.jpg', isPrimary: true },
    { url: '/sofa-2.jpg', isPrimary: false },
  ],
  attributes: [{ key: 'Матеріал', value: 'Тканина' }],
};

async function mockApi(page: Page) {
  await page.route('**/api/categories/all', (route) => route.fulfill({ json: categories }));
  await page.route('**/api/categories/catalog', (route) => route.fulfill({ json: catalog }));
  await page.route('**/api/categories/2', (route) =>
    route.fulfill({
      json: { id: 2, name: 'Дивани', imageUrl: '/sofa.jpg', parent: null, children: [] },
    }),
  );
  await page.route('**/api/categories/999', (route) =>
    route.fulfill({
      status: 404,
      contentType: 'application/problem+json',
      json: { title: 'Not Found', status: 404, detail: 'Категорію не знайдено' },
    }),
  );
  await page.route('**/api/products/latest', (route) => route.fulfill({ json: [productCard] }));
  await page.route('**/api/products/42', (route) => route.fulfill({ json: productDetails }));
  await page.route('**/api/products/404', (route) =>
    route.fulfill({
      status: 404,
      contentType: 'application/problem+json',
      json: { title: 'Not Found', status: 404, detail: 'Товар не знайдено' },
    }),
  );
  await page.route('**/api/categories/breadcrumbs/42', (route) =>
    route.fulfill({
      json: [
        { name: 'Головна', url: '/' },
        { name: 'Каталог меблів', url: '/catalog' },
        { name: 'Дивани', url: '/catalog/2' },
      ],
    }),
  );
  await page.route('**/api/search**', (route) => {
    const url = new URL(route.request().url());
    if (url.pathname.endsWith('/sidebar') || url.pathname.includes('/sidebar')) {
      return route.fulfill({
        json: { minPrice: 1000, maxPrice: 50000, brands: ['MebelUA'], materials: ['Дуб'] },
      });
    }

    const query = url.searchParams.get('searchString') ?? '';
    const pageIndex = Number(url.searchParams.get('page') ?? '0');

    if (query.includes('немає')) {
      return route.fulfill({
        json: { items: [], page: 0, pageSize: 12, totalCount: 0, totalPages: 0 },
      });
    }

    return route.fulfill({
      json: {
        items: pageIndex > 0 ? [productPageTwo] : [productCard],
        page: pageIndex,
        pageSize: 12,
        totalCount: 13,
        totalPages: 2,
      },
    });
  });
}

test.beforeEach(async ({ page }) => {
  await mockApi(page);
});

test('anonymous visitor can browse home, catalog, category, search, and PDP', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'uk');
  await expect(page.getByRole('heading', { name: /Якісні меблі/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Новинки' })).toBeVisible();
  await expect(page.getByText('Диван Мілан')).toBeVisible();

  await page.getByRole('link', { name: 'Каталог' }).first().click();
  await expect(page).toHaveURL(/\/catalog$/);
  await expect(page.getByRole('heading', { name: 'Каталог меблів' })).toBeVisible();

  await page.getByRole('link', { name: 'Дивани' }).first().click();
  await expect(page).toHaveURL(/\/catalog\/2/);
  await expect(page.getByRole('heading', { name: 'Дивани' })).toBeVisible();

  await page.getByRole('link', { name: /Диван Мілан/ }).first().click();
  await expect(page).toHaveURL(/\/product\/42/);
  await expect(page.getByRole('heading', { name: 'Диван Мілан', exact: true })).toBeVisible();
  await expect(page.getByText(/Виробник: MebelUA/)).toBeVisible();
  await expect(page.getByText('Колір фасаду')).toBeVisible();
  await expect(page.getByText('Колір корпусу')).toBeVisible();
  await expect(page.getByText('Матеріал')).toBeVisible();
  await expect(page.getByText('Ширина')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Дивани' })).toHaveAttribute('href', '/catalog/2');
  await expect(page.getByRole('button', { name: /кошик|купити|увійти/i })).toHaveCount(0);

  await page.getByLabel('Пошук товарів').fill('диван');
  await page.getByLabel('Пошук товарів').press('Enter');
  await expect(page).toHaveURL(/\/search\?searchString=/);
  await expect(page.getByText(/Результати пошуку/)).toBeVisible();
});

test('unknown product shows not-found page', async ({ page }) => {
  await page.goto('/product/404');
  await expect(page.getByRole('heading', { name: 'Товар не знайдено' })).toBeVisible();
});

test('unknown category shows not-found page', async ({ page }) => {
  await page.goto('/catalog/999');
  await expect(page.getByRole('heading', { name: 'Категорію не знайдено' })).toBeVisible();
});

test('search miss shows empty state', async ({ page }) => {
  await page.goto('/search?searchString=%D0%BD%D0%B5%D0%BC%D0%B0%D1%94&page=0&pageSize=12');
  await expect(page.getByText('Нічого не знайдено')).toBeVisible();
});

test('filters preserve searchString and pagination is 0-based', async ({ page }) => {
  await page.goto('/search?searchString=%D0%B4%D0%B8%D0%B2%D0%B0%D0%BD&page=0&pageSize=12&sortBy=Ascending');
  await expect(page.getByText('Диван Мілан')).toBeVisible();

  await page.getByRole('checkbox', { name: 'MebelUA' }).check();
  await page.getByRole('checkbox', { name: 'Дуб' }).check();
  await page.getByRole('button', { name: 'Застосувати' }).click();

  await expect(page).toHaveURL(/searchString=/);
  await expect(page).toHaveURL(/selectedBrands=MebelUA/);
  await expect(page).toHaveURL(/selectedMaterials=/);
  await expect(page).toHaveURL(/page=0/);

  await page.getByLabel('Сортування').click();
  await page.getByRole('option', { name: 'Назва' }).click();
  await expect(page).toHaveURL(/sortBy=Name/);

  await page.getByRole('button', { name: /наступну сторінку/i }).click();
  await expect(page).toHaveURL(/page=1/);
  await expect(page.getByText('Диван Рим')).toBeVisible();
});

test('PDP gallery is keyboard reachable', async ({ page }) => {
  await page.goto('/product/42');
  const gallery = page.getByRole('region', { name: 'Зображення: Диван Мілан' });
  await expect(gallery).toBeVisible();
  await expect(page.getByRole('img', { name: 'Диван Мілан, фото 1' })).toBeVisible();
  await gallery.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('button', { name: 'Наступне зображення' })).toBeVisible();
});

test('mobile viewport exposes Ukrainian nav without cart', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByLabel('Відкрити меню').click();
  await expect(page.getByRole('navigation', { name: 'Мобільна навігація' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Головна' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Каталог' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Пошук' })).toBeVisible();
  await expect(page.getByRole('button', { name: /кошик|купити|увійти/i })).toHaveCount(0);
});
