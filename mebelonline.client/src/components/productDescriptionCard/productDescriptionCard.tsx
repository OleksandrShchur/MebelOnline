import {
    Box,
    Card,
    CardActions,
    CardContent,
    Divider,
    ImageList,
    ImageListItem,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import type { ProductAttributeValueModel } from "../../models/productAttributeValueModel";

interface IProductDescriptionCard {
    title: string;
    width?: number;
    height?: number;
    depth?: number;
    description: string;
    attributes: ProductAttributeValueModel[];
};

const ProductDescriptionCard: React.FC<IProductDescriptionCard> = (props: IProductDescriptionCard) => {
    const { title, width, height, depth, description, attributes } = props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const attributeRowCount = isMobile
        ? 2
        : 3;

    return (
        <>
            <Card variant="outlined"
                sx={{
                    boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.15)',
                    borderRadius: 2,
                    transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
                    overflow: 'visible'
                }}
            >
                <CardContent>
                    <Typography variant="h5">Характеристики - {title}</Typography>
                </CardContent>
                {(width || height || depth) &&
                    <>
                        <Divider />
                        <CardActions sx={{ justifyContent: 'space-evenly', alignItems: 'center', p: 2, display: 'flex', flexWrap: 'wrap' }}>
                            {width && (
                                <>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="caption">Ширина</Typography>
                                        <Typography variant="h6">
                                            {new Intl.NumberFormat('uk-UA', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            }).format(width)} см
                                        </Typography>
                                    </Box>
                                    {height && (
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography fontWeight="bold" variant="button" sx={{ mx: 1 }}>×</Typography>
                                        </Box>
                                    )}
                                </>
                            )}
                            {height && (
                                <>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="caption">Висота</Typography>
                                        <Typography variant="h6">
                                            {new Intl.NumberFormat('uk-UA', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            }).format(height)} см
                                        </Typography>
                                    </Box>
                                    {depth && (
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography fontWeight="bold" variant="button" sx={{ mx: 1 }}>×</Typography>
                                        </Box>
                                    )}
                                </>
                            )}
                            {depth && (
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="caption">Глибина</Typography>
                                    <Typography variant="h6">
                                        {new Intl.NumberFormat('uk-UA', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        }).format(depth)} см
                                    </Typography>
                                </Box>
                            )}
                        </CardActions>
                    </>
                }
                {attributes?.length !== 0 &&
                    <>
                        <Divider />
                        <ImageList sx={{ px: 2, py: 0.5 }} variant="masonry" cols={attributeRowCount} gap={8}>
                            {attributes?.map((item) => (
                                <ImageListItem key={item.key}>
                                    <Card>
                                        <CardContent>
                                            <Typography fontWeight="bold">{item.key}</Typography>
                                            <Typography>{item.value}</Typography>
                                        </CardContent>
                                    </Card>
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </>
                }
                {description &&
                    <>
                        <Divider />
                        <CardActions
                            sx={{
                                flexDirection: 'column',
                                alignItems: 'start',
                                px: 2,
                                pb: 2
                            }}>
                            <Typography variant="h6">Опис</Typography>
                            <Typography>{description}</Typography>
                        </CardActions>
                    </>
                }
            </Card>
        </>
    );
};

export default ProductDescriptionCard;
