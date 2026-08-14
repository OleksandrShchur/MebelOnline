import React from 'react';
import { Box, Container, Grid, Typography, Stack, Link, Divider } from '@mui/material';
import {
  MESSENGER_LINKS,
  SHOP_ADDRESS,
  SHOP_DESCRIPTION,
  SHOP_EMAIL,
  SHOP_HOURS,
  SHOP_NAME,
  SHOP_PHONE_DISPLAY,
  SHOP_PHONE_TEL,
} from '../../constants/contacts';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#fff',
        borderTop: '1px solid',
        borderColor: 'grey.200',
        pt: 4,
        pb: 3,
        mt: 2,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              {SHOP_NAME}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {SHOP_DESCRIPTION}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {SHOP_HOURS}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }} component="address" sx={{ fontStyle: 'normal' }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Контакти
            </Typography>
            <Stack spacing={0.75}>
              <Link href={`tel:${SHOP_PHONE_TEL}`} underline="hover" color="inherit">
                {SHOP_PHONE_DISPLAY}
              </Link>
              <Link href={`mailto:${SHOP_EMAIL}`} underline="hover" color="inherit">
                {SHOP_EMAIL}
              </Link>
              <Typography variant="body2">{SHOP_ADDRESS}</Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Про нас
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Інформаційний каталог меблів. Замовлення оформлюється за телефоном або в месенджерах.
            </Typography>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Месенджери
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              <Link href={MESSENGER_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" underline="hover">
                WhatsApp
              </Link>
              <Link href={MESSENGER_LINKS.viber} underline="hover">
                Viber
              </Link>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />
        <Typography variant="body2" color="text.secondary" align="center">
          © {year} {SHOP_NAME}. Усі права захищені.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
