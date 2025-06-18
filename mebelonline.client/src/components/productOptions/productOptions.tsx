import { Box, Stack, Typography } from "@mui/material";
import type { ProductOptionModel } from "../../models/productOptionModel";

interface IProductOptionsProps {
    title: string;
    options: ProductOptionModel[];
}

const ProductOptions: React.FC<IProductOptionsProps> = (props: IProductOptionsProps) => {
    const { title, options } = props;

    return (
        <>
            <Typography variant="body2" color="text.secondary" mb={1}>
                {title}
            </Typography>
            <Stack spacing={1} direction='row'>
                {options?.map((item) => (
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

                                div:hover > .hover-preview, div:active > .hover-preview {
                                    display: block;
                                }
                            `}
                        </style>
                    </Box>
                ))}
            </Stack>
        </>
    );
};

export default ProductOptions;
