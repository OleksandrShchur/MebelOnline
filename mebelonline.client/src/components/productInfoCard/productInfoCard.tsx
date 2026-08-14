import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import type { ProductOptionModel } from '../../models/productOptionModel';
import ProductOptions from '../productOptions/productOptions';
import { useEffect, useState } from 'react';
import priceFormatter from '../../utils/priceFormatter';
import type { BrandModel } from '../../models/brandModel';
import { MESSENGER_LINKS, SHOP_PHONE_DISPLAY, SHOP_PHONE_TEL } from '../../constants/contacts';

interface IProductInfoCardProps {
  id: number;
  title: string;
  price: number;
  oldPrice?: number | null;
  note?: string | null;
  brand?: BrandModel | null;
  frontOptions?: ProductOptionModel[] | null;
  frameOptions?: ProductOptionModel[] | null;
}

const ProductInfoCard: React.FC<IProductInfoCardProps> = (props: IProductInfoCardProps) => {
  const { id, title, price, oldPrice, note, brand, frontOptions, frameOptions } = props;
  const [selectedFrontOption, setSelectedFrontOption] = useState<string>('');
  const [selectedFrameOption, setSelectedFrameOption] = useState<string>('');
  const fronts = frontOptions ?? [];
  const frames = frameOptions ?? [];

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
    setSelectedFrontOption(option);
  };

  return (
    <Box sx={{ pb: 2 }}>
      <Card
        variant="outlined"
        sx={{
          boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.15)',
          borderRadius: 2,
          overflow: 'visible',
        }}
      >
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            Код товару: {id}
          </Typography>
          {brand?.name && (
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
              Виробник: {brand.name}
            </Typography>
          )}
          <Typography variant="h4" component="h1" sx={{ wordBreak: 'break-word', mt: 1 }}>
            {title}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-start', alignItems: 'flex-end', px: 2 }}>
          <Box>
            {oldPrice ? (
              <Typography variant="h6" sx={{ textDecoration: 'line-through', color: 'gray' }}>
                {priceFormatter(oldPrice)} грн
              </Typography>
            ) : null}
            <Typography variant="h5">{priceFormatter(price)} грн</Typography>
          </Box>
        </CardActions>
        <Divider />
        <CardActions sx={{ px: 2, pb: 2, pt: 2 }}>
          <Box sx={{ width: '100%' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Є питання чи потрібна консультація?
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={2}>
              Зателефонуйте або напишіть у месенджер — допоможемо з вибором меблів.
            </Typography>
            <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap" width="100%">
              <Button variant="outlined" href={`tel:${SHOP_PHONE_TEL}`} sx={{ flex: 1, minWidth: 120, borderRadius: 2 }}>
                {SHOP_PHONE_DISPLAY}
              </Button>
              <Button
                variant="outlined"
                href={MESSENGER_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ flex: 1, minWidth: 120, borderRadius: 2 }}
              >
                WhatsApp
              </Button>
              <Button variant="outlined" href={MESSENGER_LINKS.viber} sx={{ flex: 1, minWidth: 120, borderRadius: 2 }}>
                Viber
              </Button>
            </Stack>
          </Box>
        </CardActions>
        {(frames.length > 0 || fronts.length > 0) && (
          <>
            <Divider />
            <CardActions sx={{ px: 2, pb: 2 }}>
              <Box sx={{ width: '100%' }}>
                <Typography variant="body1" gutterBottom>
                  Кольори та модифікації
                </Typography>
                {frames.length > 0 && (
                  <ProductOptions
                    handleChange={handleFrameOptionChange}
                    title="Колір корпусу"
                    options={frames}
                    selected={selectedFrameOption}
                  />
                )}
                {fronts.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <ProductOptions
                      handleChange={handleFrontOptionChange}
                      title="Колір фасаду"
                      options={fronts}
                      selected={selectedFrontOption}
                    />
                  </Box>
                )}
              </Box>
            </CardActions>
          </>
        )}
        {note && (
          <>
            <Divider />
            <CardActions sx={{ p: 2 }}>
              <Alert severity="info" sx={{ width: '100%' }}>
                {note}
              </Alert>
            </CardActions>
          </>
        )}
      </Card>
    </Box>
  );
};

export default ProductInfoCard;
