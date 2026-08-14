import { Box, Grid, TablePagination } from '@mui/material';
import ProductCard from '../productCard/productCard';
import type { ProductCardModel } from '../../models/productCardModel';
import { PAGE_SIZE_OPTIONS } from '../../constants/pagination';

interface ISearchProductGridProps {
  items: ProductCardModel[];
  totalCount: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const SearchProductGrid: React.FC<ISearchProductGridProps> = (props) => {
  const { items, totalCount, page, rowsPerPage, onPageChange, onRowsPerPageChange } = props;

  return (
    <Box
      sx={{
        width: '100%',
        minWidth: 0,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Grid container spacing={3}>
        {items.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }} sx={{ display: 'flex' }}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <TablePagination
        labelRowsPerPage="Товарів на сторінці:"
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} з ${count !== -1 ? count : `понад ${to}`}`}
        component="div"
        count={totalCount}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[...PAGE_SIZE_OPTIONS]}
        sx={{
          overflowX: 'auto',
          '.MuiTablePagination-toolbar': {
            flexWrap: 'wrap',
            minHeight: 52,
          },
        }}
      />
    </Box>
  );
};

export default SearchProductGrid;
