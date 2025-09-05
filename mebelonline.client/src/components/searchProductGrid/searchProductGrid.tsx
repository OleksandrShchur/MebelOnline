import { Box, Grid, TablePagination } from "@mui/material";
import ProductCard from "../productCard/productCard";
import type { ProductCardModel } from "../../models/productCardModel";

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
        <Box sx={{
            width: '80%',
            padding: 2,
            marginTop: 2,
            position: "relative",
            display: "flex",
            flexDirection: "column"
        }}>
            <Grid container spacing={3}>
                {items.map((product) => (
                    <Grid size={{ xs: 6, md: 4, lg: 3 }} sx={{ justifyContent: "flex-end", alignItems: "stretch", mx: 'auto' }}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
            <TablePagination
                component="div"
                count={totalCount}
                page={page}
                onPageChange={onPageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={onRowsPerPageChange}
            />
        </Box>
    );
}

export default SearchProductGrid;
