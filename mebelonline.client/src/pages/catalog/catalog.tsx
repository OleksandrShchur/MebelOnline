import { Box, Container } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import type { CatalogModel } from '../../models/catalogModel';
import categoryService from '../../services/categoryService';
import CatalogGrid from '../../components/catalogGrid/catalogGrid';
import StatusState from '../../components/statusState/statusState';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const Catalog: React.FC = () => {
  const [catalog, setCatalog] = useState<CatalogModel[]>([]);
  const [status, setStatus] = useState<'loading' | 'success' | 'empty' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);
  useDocumentTitle('Каталог меблів');

  const populateCatalog = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const data = await categoryService.fetchCatalog();
      setCatalog(data);
      setStatus(data.length === 0 ? 'empty' : 'success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не вдалося завантажити каталог.');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    populateCatalog();
  }, [populateCatalog]);

  return (
    <Container sx={{ py: 3, maxWidth: 'none !important' }}>
      <Box sx={{ width: '100%', px: { xs: 1, md: 2 }, minWidth: 0 }}>
        {status !== 'success' && (
          <StatusState
            loading={status === 'loading'}
            error={status === 'error' ? error : null}
            onRetry={populateCatalog}
            empty={status === 'empty'}
            emptyTitle="Каталог порожній"
            emptyDescription="Категорії з'являться, коли їх додадуть до бази."
          />
        )}
        {status === 'success' && <CatalogGrid catalog={catalog} />}
      </Box>
    </Container>
  );
};

export default Catalog;
