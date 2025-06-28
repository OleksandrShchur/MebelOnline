import { Alert, Box, Button, Card, CardActions, CardContent, Divider, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import type { ProductOptionModel } from "../../models/productOptionModel";
import ProductOptions from "../productOptions/productOptions";
import { useEffect, useState } from "react";
import priceFormatter from "../../helpers/priceFormatter";

interface IProductInfoCardProps {
    id: number;
    title: string;
    price: number;
    oldPrice?: number;
    note: string;
    frontOptions: ProductOptionModel[];
    frameOptions: ProductOptionModel[];
};

const ProductInfoCard: React.FC<IProductInfoCardProps> = (props: IProductInfoCardProps) => {
    const { id, title, price, oldPrice, note, frontOptions, frameOptions } = props;
    const [selectedFrontOption, setSelectedFrontOption] = useState<string>('');
    const [selectedFrameOption, setSelectedFrameOption] = useState<string>('');

    useEffect(() => {
        if (frontOptions?.length) {
            setSelectedFrontOption(frontOptions[0].colorName);
        }

        if (frameOptions?.length) {
            setSelectedFrameOption(frameOptions[0].colorName);
        }
    }, [frontOptions, frameOptions]);

    const handleFrameOptionChange = (option: string) => {
        setSelectedFrameOption(option);
    };

    const handleFrontOptionChange = (option: string) => {
        setSelectedFrontOption(option)
    };

    return (
        <Box sx={{ pb: 2 }}>
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
                                {priceFormatter(oldPrice)} грн
                            </Typography>
                        }
                        <Typography variant="h5">
                            {priceFormatter(price)} грн
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
                <CardActions sx={{ justifyContent: 'space-between', alignItems: 'flex-end', px: 2, pb: 2 }}>
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
                                    width={25}
                                    height={25}
                                />
                            </Button>

                            <Button
                                variant="outlined" sx={{ flex: 1, borderColor: '#665cac', color: '#665cac', borderRadius: 2 }}
                                href="" target="_blank"
                            >
                                <img
                                    src="https://img.icons8.com/?size=100&id=25104&format=png&color=7950F2"
                                    alt="Viber"
                                    width={25}
                                    height={25}
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
                                    width={25}
                                    height={25}
                                />
                            </Button>
                        </Stack>
                    </Box>
                </CardActions>
                {frameOptions?.length !== 0 && frontOptions?.length !== 0 &&
                    <>
                        <Divider />
                        <br />
                        <CardActions sx={{ justifyContent: 'space-between', alignItems: 'flex-end', px: 2 }}>
                            <Box>
                                <Typography variant="body1" gutterBottom>
                                    Кольори та модифікації
                                </Typography>
                                {frameOptions?.length !== 0 &&
                                    <ProductOptions
                                        handleChange={handleFrameOptionChange}
                                        title='Колір корпусу'
                                        options={frameOptions}
                                        selected={selectedFrameOption}
                                    />
                                }
                                <br />
                                {frontOptions?.length !== 0 &&
                                    <ProductOptions
                                        handleChange={handleFrontOptionChange}
                                        title='Колір фасаду'
                                        options={frontOptions}
                                        selected={selectedFrontOption}
                                    />}
                            </Box>
                        </CardActions>
                    </>
                }
                {note &&
                    <>
                        <Divider />
                        <CardActions sx={{ justifyContent: 'space-between', alignItems: 'flex-end', p: 2 }}>
                            <Alert severity="info">
                                {note}
                            </Alert>
                        </CardActions>
                    </>
                }
            </Card>
        </Box>
    );
};

export default ProductInfoCard;
