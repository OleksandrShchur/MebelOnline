import React from "react";
import { Box, Container, Grid, Typography, Link, Stack, IconButton, useMediaQuery } from "@mui/material";
import theme from "../../theme/theme";

const Footer: React.FC = () => {
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Box component="footer"
            sx={{
                bgcolor: "#fff",
                borderTop: "1px solid",
                borderColor: "grey.200",
                pt: 2
            }}>
            <Container maxWidth="xl">
                {isDesktop
                    ?
                    <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {/* Logo */}
                        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                            <Typography variant="h5" fontWeight={700}>LOGO</Typography>
                        </Grid>

                        <Box mt={6} pt={3}>
                            <Typography variant="body2" color="text.secondary" align="center">
                                © {new Date().getFullYear()} Всі права захищені
                            </Typography>
                        </Box>

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
                    :
                    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {/* Logo */}
                        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                            <Typography variant="h5" fontWeight={700}>LOGO</Typography>
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

                        <Box pt={3}>
                            <Typography variant="body2" color="text.secondary" align="center">
                                © {new Date().getFullYear()} Всі права захищені
                            </Typography>
                        </Box>
                    </Grid>
                }
            </Container>
        </Box >
    );
};

export default Footer;
