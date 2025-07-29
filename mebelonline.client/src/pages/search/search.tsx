import { Container } from "@mui/material";
import SearchSidebar from "../../components/searchSidebar/searchSidebar";

const Search: React.FC = () => {
    return (
        <Container sx={{ pt: 9, pb: 2, maxWidth: 'none !important' }}>
            <SearchSidebar />
        </Container>
    );
};

export default Search;
