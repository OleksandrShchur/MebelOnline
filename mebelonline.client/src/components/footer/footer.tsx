import React from "react";
import { Box, Container, Grid, Typography, Link, Stack, IconButton } from "@mui/material";

const Footer: React.FC = () => {
    return (
        <Box component="footer" sx={{ bgcolor: "#fff", borderTop: "1px solid", borderColor: "grey.200", py: 6 }}>
            <Container maxWidth="xl">
                <Grid container spacing={4}>
                    {/* Logo */}
                    <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <Typography variant="h5" fontWeight={700}>LOGO</Typography>
                    </Grid>

                    {/* Column 1 */}
                    <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <Stack spacing={1}>
                            <Typography fontWeight={600}>Про магазин</Typography>
                            <Link underline="none" color="text.secondary">Про нас</Link>
                            <Link underline="none" color="text.secondary">Контакти</Link>
                            <Link underline="none" color="text.secondary">Каталог</Link>
                            <Link underline="none" color="text.secondary">Відгуки</Link>
                            <Link underline="none" color="text.secondary">Мапа сайту</Link>
                        </Stack>
                    </Grid>

                    {/* Column 2 */}
                    <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <Stack spacing={1}>
                            <Typography fontWeight={600}>Актуально</Typography>
                            <Link underline="none" color="text.secondary">Умови покупки</Link>
                            <Link underline="none" color="text.secondary">Питання та відповіді</Link>
                            <Link underline="none" color="text.secondary">Оплата та доставка</Link>
                        </Stack>
                    </Grid>

                    {/* Social */}
                    <Grid size={{ xs: 12, md: 2 }}>
                        <Typography fontWeight={600} mb={1}>Ми в соцмережах</Typography>
                        <Stack direction="row" spacing={1}>
                            <IconButton>
                                <img
                                    src="https://img.icons8.com/?size=100&id=16733&format=png&color=40C057"
                                    alt="Whatsapp"
                                    width={25}
                                    height={25}
                                />
                            </IconButton>
                            <IconButton>
                                <img
                                    src="https://img.icons8.com/?size=100&id=25104&format=png&color=7950F2"
                                    alt="Viber"
                                    width={25}
                                    height={25}
                                />
                            </IconButton>
                            <IconButton>
                                <img
                                    src="https://img.icons8.com/?size=100&id=YFbzdUk7Q3F8&format=png&color=000000"
                                    alt="Messenger"
                                    width={25}
                                    height={25}
                                />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>

                <Box mt={6} pt={3} borderTop="1px solid" borderColor="grey.200">
                    <Typography variant="body2" color="text.secondary" align="center">
                        © {new Date().getFullYear()} All rights reserved
                    </Typography>
                </Box>
            </Container>
        </Box >
    );
};

export default Footer;