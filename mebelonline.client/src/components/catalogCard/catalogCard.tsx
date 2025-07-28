import { Box, Card, CardContent, CardMedia, Link, Tooltip, Typography } from "@mui/material";
import type { CatalogModel } from "../../models/catalogModel";

const SUBCATEGORIES_COUNT = 4;

interface ICatalogCardProps {
    category: CatalogModel;
};

const CatalogCard: React.FC<ICatalogCardProps> = (props: ICatalogCardProps) => {
    const { category } = props;

    return (
        <Card
            sx={{
                position: 'relative', maxWidth: 400, height: 370, mx: 'auto', display: 'flex', flexDirection: 'column',
                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.15)',
                borderRadius: 2,
                transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
                '&:hover': {
                    boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.3)',
                    transform: 'translateY(-4px)',
                },
            }}>
            <Link underline="none" href={`/category/${category.id}`} color="inherit">
                <CardMedia
                    component="img"
                    height="200"
                    image={category.imageUrl}
                    alt={category.name}
                />
            </Link>

            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Link underline="none" href={`/category/${category.id}`} color="inherit">
                    <CardContent sx={{ flexGrow: 1, px: 2, py: 1 }}>
                        <Tooltip title={category.name} arrow>
                            <Typography variant="subtitle1" fontWeight={500} gutterBottom
                                sx={{
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    WebkitBoxOrient: 'vertical',
                                }}
                            >
                                {category.name}
                            </Typography>
                        </Tooltip>
                        {Array.from({ length: SUBCATEGORIES_COUNT }, (_, index) =>
                            category.subCategories[index] || { name: '\u00A0' }).map((sub, index) => (
                                <Typography key={index} variant="caption" gutterBottom
                                    sx={{
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        WebkitBoxOrient: 'vertical',
                                        minHeight: '1.5em', // Ensures consistent height for empty lines
                                    }}
                                >
                                    {sub.name}
                                </Typography>
                            ))}
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="button">
                                Показати всі...
                            </Typography>
                        </Box>

                    </CardContent>
                </Link>
            </Box>
        </Card>
    );
};

export default CatalogCard;
