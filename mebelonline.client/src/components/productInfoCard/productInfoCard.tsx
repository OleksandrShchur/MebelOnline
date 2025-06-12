import { Card, CardActions, CardContent, IconButton, Tooltip, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

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
        </Card>
    );
};

export default ProductInfoCard;
