import { Button, Card, CardActions, CardContent, Divider, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TelegramIcon from '@mui/icons-material/Send';

interface IProductInfoCardProps {
    id: number;
    title: string;
    price: number;
    oldPrice?: number;
};

const ProductInfoCard: React.FC<IProductInfoCardProps> = (props: IProductInfoCardProps) => {    
    const { id, title, price, oldPrice } = props;

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    Код товару: {id}
                </Typography>
                <Typography variant="h4" component="div">
                    {title}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                <Typography variant="h6">{oldPrice} грн</Typography>
                <Typography variant="h6">{price} грн</Typography>

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
            <CardActions>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Є питання чи потрібна консультація?
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={3}>
                    Напишіть нам у будь-який з месенджерів і ми допоможемо з вибором меблів та оформленням замовлення.
                </Typography>

                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                        variant="outlined"
                        // sx={{
                        //     borderColor: 'transparent',
                        //     // background: 'linear-gradient(to right, #e1306c, #6a00f4)',
                        //     color: '#fff',
                        //     minWidth: 64,
                        //     borderRadius: 2,
                        // }}
                        sx={{
                            borderColor: 'linear-gradient(to right, #e1306c, #6a00f4)',
                            color: 'linear-gradient(to right, #e1306c, #6a00f4)',
                            minWidth: 64,
                            borderRadius: 2,
                        }}
                        href=""
                        target="_blank"
                    >
                        <img src="https://img.icons8.com/?size=100&id=16733&format=png&color=40C057" 
                            alt="Whatsapp" width={24} height={24} />
                    </Button>

                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: '#665cac',
                            color: '#665cac',
                            minWidth: 64,
                            borderRadius: 2,
                        }}
                        href=""
                        target="_blank"
                    >
                        <img src="https://img.icons8.com/?size=100&id=25104&format=png&color=7950F2" 
                            alt="Viber" width={24} height={24} />
                    </Button>

                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: '#0088cc',
                            color: '#0088cc',
                            minWidth: 64,
                            borderRadius: 2,
                        }}
                        href=""
                        target="_blank"
                    >
                        <img src="https://img.icons8.com/?size=100&id=YFbzdUk7Q3F8&format=png&color=000000" 
                            alt="Messenger" width={24} height={24} />
                    </Button>
                </Stack>
            </CardActions>
        </Card>
    );
};

export default ProductInfoCard;
