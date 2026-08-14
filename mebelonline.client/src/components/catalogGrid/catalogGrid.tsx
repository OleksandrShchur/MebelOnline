import { Grid, Typography } from '@mui/material';
import type { CatalogModel } from '../../models/catalogModel';
import CatalogCard from '../catalogCard/catalogCard';

interface ICatalogGridProps {
  catalog: CatalogModel[];
}

const CatalogGrid: React.FC<ICatalogGridProps> = (props: ICatalogGridProps) => {
  const { catalog } = props;

  return (
    <>
      <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom>
        Каталог меблів
      </Typography>
      <Grid container spacing={3}>
        {catalog.map((category) => (
          <Grid key={category.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }} sx={{ display: 'flex' }}>
            <CatalogCard category={category} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CatalogGrid;
