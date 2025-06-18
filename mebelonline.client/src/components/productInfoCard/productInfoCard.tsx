import { Box, Button, Card, CardActions, CardContent, Divider, Grid, IconButton, ImageList, ImageListItem, Stack, Tooltip, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import type { ProductOptionModel } from "../../models/productOptionModel";

interface IProductInfoCardProps {
    id: number;
    title: string;
    price: number;
    oldPrice?: number;
    frontOptions: ProductOptionModel[];
    frameOptions: ProductOptionModel[];
};

const ProductInfoCard: React.FC<IProductInfoCardProps> = (props: IProductInfoCardProps) => {
    const { id, title, price, oldPrice, frontOptions, frameOptions } = props;

    return (
        <Card variant="outlined"
            sx={{
                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.15)',
                borderRadius: 2,
                transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
                overflow: 'visible'
            }}
        >
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    Код товару: {id}
                </Typography>
                <br />
                <Typography variant="h4" component="div">
                    {title}
                </Typography>
                <br />
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', alignItems: 'flex-end', px: 2 }}>
                <Box>
                    {oldPrice &&
                        <Typography
                            variant="h6"
                            sx={{ textDecoration: 'line-through', color: 'gray' }}
                        >
                            {new Intl.NumberFormat('uk-UA', {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                            }).format(oldPrice)} грн
                        </Typography>
                    }
                    <Typography variant="h5">
                        {new Intl.NumberFormat('uk-UA', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                        }).format(price)} грн
                    </Typography>
                </Box>

                <Tooltip title="Додати в обране">
                    <IconButton
                        sx={{
                            bgcolor: 'white',
                            '&:hover': { bgcolor: '#f5f5f5' },
                        }}
                    >
                        <FavoriteBorderIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>
            <Divider />
            <br />
            <CardActions sx={{ justifyContent: 'space-between', alignItems: 'flex-end', px: 2 }}>
                <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Є питання чи потрібна консультація?
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mb={3}>
                        Напишіть нам у будь-який з месенджерів і ми допоможемо з вибором меблів та оформленням замовлення.
                    </Typography>

                    <Stack direction="row" spacing={2} justifyContent="center" width="100%">
                        <Button
                            variant="outlined"
                            sx={{
                                flex: 1,
                                borderColor: 'linear-gradient(to right, #e1306c, #6a00f4)', // note: won't work directly
                                color: 'linear-gradient(to right, #e1306c, #6a00f4)',
                                borderRadius: 2
                            }}
                            href=""
                            target="_blank"
                        >
                            <img
                                src="https://img.icons8.com/?size=100&id=16733&format=png&color=40C057"
                                alt="Whatsapp"
                                width={24}
                                height={24}
                            />
                        </Button>

                        <Button
                            variant="outlined" sx={{ flex: 1, borderColor: '#665cac', color: '#665cac', borderRadius: 2 }}
                            href="" target="_blank"
                        >
                            <img
                                src="https://img.icons8.com/?size=100&id=25104&format=png&color=7950F2"
                                alt="Viber"
                                width={24}
                                height={24}
                            />
                        </Button>

                        <Button
                            variant="outlined"
                            sx={{ flex: 1, borderColor: '#0088cc', color: '#0088cc', borderRadius: 2 }}
                            href=""
                            target="_blank"
                        >
                            <img
                                src="https://img.icons8.com/?size=100&id=YFbzdUk7Q3F8&format=png&color=000000"
                                alt="Messenger"
                                width={24}
                                height={24}
                            />
                        </Button>
                    </Stack>
                </Box>
            </CardActions>
            <Divider />
            <br />
            <CardActions sx={{ justifyContent: 'space-between', alignItems: 'flex-end', px: 2 }}>
                <Box>
                    <Typography variant="body1" gutterBottom>
                        Кольори та модифікації
                    </Typography>
                    <Box>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                            Колір корпусу
                        </Typography>
                        <Stack spacing={1} direction='row'>
                            {frameOptions?.map((item) => (
                                <Box
                                    key={item.imageUrl}
                                    sx={{ position: 'relative', display: 'inline-block' }}
                                >
                                    <img
                                        src={item.imageUrl}
                                        alt={item.colorName}
                                        loading="lazy"
                                        style={{ width: '48px', height: '48px', borderRadius: '10%', cursor: 'pointer' }}
                                    />
                                    <Box
                                        sx={{
                                            display: 'none',
                                            position: 'absolute',
                                            bottom: 'calc(100% + 10px)',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: 160,
                                            bgcolor: 'background.paper',
                                            boxShadow: 3,
                                            borderRadius: 2,
                                            p: 1,
                                            zIndex: 10,
                                            textAlign: 'center',
                                            '& img': {
                                                width: '100%',
                                                borderRadius: 1,
                                                mb: 1
                                            },
                                            '& .label': {
                                                fontSize: 14,
                                                color: 'text.secondary'
                                            },
                                            '& .main-label': {
                                                fontSize: 13,
                                                color: 'green',
                                                fontWeight: 500
                                            }
                                        }}
                                        className="hover-preview"
                                    >
                                        <img src={item.imageUrl} alt={item.colorName} />
                                        <Typography className="label">{item.colorName}</Typography>
                                    </Box>
                                    <style>
                                        {`
                                            .hover-preview {
                                                pointer-events: none;
                                            }

                                            div:hover > .hover-preview {
                                                display: block;
                                            }
                                        `}
                                    </style>
                                </Box>
                            ))}

                        </Stack>
                    </Box>
                </Box>
            </CardActions>
        </Card>
    );
};

export default ProductInfoCard;
