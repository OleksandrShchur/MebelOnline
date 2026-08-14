import { Box, Button, Typography } from '@mui/material';
import SearchSidebar from '../searchSidebar/searchSidebar';
import SearchProductGrid from '../searchProductGrid/searchProductGrid';
import StatusState from '../statusState/statusState';
import SortSelect from '../sortSelect/sortSelect';
import useProductListing from '../../hooks/useProductListing';

interface IProductListingLayoutProps {
  categoryId?: number;
  resetLabel?: string;
}

const ProductListingLayout: React.FC<IProductListingLayoutProps> = ({
  categoryId,
  resetLabel = 'Скинути фільтри',
}) => {
  const listing = useProductListing({ categoryId });
  const totalCount = listing.products?.totalCount ?? 0;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        width: '100%',
        minWidth: 0,
      }}
    >
      <SearchSidebar
        priceRange={listing.priceRange}
        onRangeChange={listing.handleRangeChange}
        priceMinInput={listing.priceMinInput}
        onPriceMinInputChange={listing.handlePriceMinInputChange}
        onPriceMinSubmit={listing.handlePriceMinSubmit}
        priceMaxInput={listing.priceMaxInput}
        onPriceMaxInputChange={listing.handlePriceMaxInputChange}
        onPriceMaxSubmit={listing.handlePriceMaxSubmit}
        brandItems={listing.brandItems}
        selectedBrands={listing.selectedBrands}
        onBrandToggle={listing.handleBrandToggle}
        materialItems={listing.materialItems}
        selectedMaterials={listing.selectedMaterials}
        onMaterialToggle={listing.handleMaterialToggle}
        onApply={listing.handleApply}
      />

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Typography variant="body1" component="p">
            {listing.status === 'success' || listing.status === 'empty'
              ? `Знайдено: ${totalCount}`
              : ' '}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <SortSelect value={listing.sortBy} onChange={listing.handleSortChange} />
            <Button variant="outlined" onClick={listing.handleReset}>
              {resetLabel}
            </Button>
          </Box>
        </Box>

        {listing.status !== 'success' && (
          <StatusState
            loading={listing.status === 'loading'}
            error={listing.status === 'error' ? listing.error : null}
            onRetry={listing.reload}
            empty={listing.status === 'empty'}
            emptyTitle="Нічого не знайдено"
            emptyDescription="Спробуйте змінити запит або скинути фільтри."
            emptyAction={
              <Button variant="contained" onClick={listing.handleReset}>
                {resetLabel}
              </Button>
            }
          />
        )}

        {listing.status === 'success' && listing.products && (
          <SearchProductGrid
            items={listing.products.items}
            totalCount={totalCount}
            page={listing.page}
            rowsPerPage={listing.rowsPerPage}
            onPageChange={listing.handlePageChange}
            onRowsPerPageChange={listing.handleRowsPerPageChange}
          />
        )}
      </Box>
    </Box>
  );
};

export default ProductListingLayout;
