import { Box, Card, CardContent, CardMedia, Link, Tooltip, Typography } from "@mui/material";
import type { CatalogModel } from "../../models/catalogModel";

const SUBCATEGORIES_COUNT = 4;

interface ICatalogCardProps {
    category: CatalogModel;
}

const CatalogCard: React.FC<ICatalogCardProps> = ({ category }) => {
    const categorySearchUrl = `/search?searchString=${category.name}&page=0&pageSize=10&sortBy=Ascending`;
    
    return (
        <Card
            sx={{
                position: "relative",
                maxWidth: 400,
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.15)",
                borderRadius: 2,
                transition: "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
                "&:hover": {
                    boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.3)",
                    transform: "translateY(-4px)",
                },
            }}
        >
            <Link underline="none" href={categorySearchUrl} color="inherit">
                <CardMedia
                    component="img"
                    image={category.imageUrl}
                    alt={category.name}
                    sx={{
                        aspectRatio: "16 / 9",
                        objectFit: "cover",
                    }}
                />
            </Link>

            <CardContent
                sx={{
                    px: 2,
                    py: 1,
                    flexGrow: 1,
                    '&:last-child': {
                        paddingBottom: 1,
                    },
                }}>
                <Link underline="none" href={categorySearchUrl} color="inherit">
                    <Tooltip title={category.name} arrow>
                        <Typography
                            variant="subtitle1"
                            fontWeight={500}
                            gutterBottom
                            sx={{
                                display: "-webkit-box",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                            }}
                        >
                            {category.name}
                        </Typography>
                    </Tooltip>
                </Link>

                {Array.from({ length: SUBCATEGORIES_COUNT }, (_, index) =>
                    category.subCategories[index] || { name: "\u00A0" }
                ).map((sub, index) => (
                    <Typography
                        key={index}
                        variant="caption"
                        gutterBottom
                        sx={{
                            display: "-webkit-box",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 1,
                            minHeight: "1.5em",
                        }}
                    >
                        {sub.name}
                    </Typography>
                ))}

                <Box sx={{ textAlign: "right", mt: 1 }}>
                    <Link underline="none" href={categorySearchUrl} color="inherit">
                        <Typography variant="button">Показати всі...</Typography>
                    </Link>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CatalogCard;
