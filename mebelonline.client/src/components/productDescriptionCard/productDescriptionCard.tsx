import { Box, Card, CardActions, CardContent, Divider, ImageList, ImageListItem, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
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
                        <CardActions sx={{ justifyContent: 'space-evenly', alignItems: 'flex-end', p: 2 }}>
                            {width &&
                                <>
                                    <Box>
                                        <Typography variant="subtitle2">Ширина</Typography>
                                        <Typography variant="h5">
                                            {new Intl.NumberFormat('uk-UA', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            }).format(width)} см
                                        </Typography>
                                    </Box>
                                    <Typography>
                                        <CloseIcon />
                                    </Typography>
                                </>
                            }
                            {height &&
                                <>
                                    <Box>
                                        <Typography variant="subtitle2">Висота</Typography>
                                        <Typography variant="h5">
                                            {new Intl.NumberFormat('uk-UA', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            }).format(height)} см
                                        </Typography>
                                    </Box>
                                    <Typography>
                                        <CloseIcon />
                                    </Typography>
                                </>
                            }
                            {depth &&
                                <Box>
                                    <Typography variant="subtitle2">Глибина</Typography>
                                    <Typography variant="h5">
                                        {new Intl.NumberFormat('uk-UA', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        }).format(depth)} см
                                    </Typography>
                                </Box>
                            }
                        </CardActions>
                    </>
                }
                {attributes?.length !== 0 &&
                    <>
                        <Divider />
                        <ImageList sx={{px: 2, py: 0.5}} variant="masonry" cols={3} gap={8}>
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
