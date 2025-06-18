import { Grid } from "@mui/material";
import ProductInfoCard from "../productInfoCard/productInfoCard";
import Carousel from "react-material-ui-carousel";
import ProductImageModal from "../productImageModal/productImageModal";
import { useState } from "react";
import type { ProductImageModel } from "../../models/productImageModel";
import type { ProductOptionModel } from "../../models/productOptionModel";

interface IProductAllDetailsProps {
    id: number;
    title: string;
    price: number;
    oldPrice?: number;
    note: string;
    frontOptions: ProductOptionModel[];
    frameOptions: ProductOptionModel[];
    images: ProductImageModel[];
};

const ProductAllDetails: React.FC<IProductAllDetailsProps> = (props: IProductAllDetailsProps) => {
    const { id, title, price, oldPrice, note, frontOptions, frameOptions, images } = props;
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleImageClick = (imageUrl: string) => {
        setSelectedImageUrl(imageUrl);
        setModalOpen(true);
    };

    return (
        <>
            <ProductImageModal isOpen={isModalOpen} handleClose={handleModalClose} imageUrl={selectedImageUrl} />
            <Grid container spacing={2}>
                <Grid size={5}>
                    <ProductInfoCard id={id} 
                        title={title}
                        price={price}
                        oldPrice={oldPrice}
                        note={note}
                        frontOptions={frontOptions}
                        frameOptions={frameOptions}
                    />
                </Grid>
                <Grid size={7}>
                    <Carousel animation="slide" autoPlay={false} navButtonsAlwaysVisible>
                        {
                            images?.map((item) =>
                                <img key={item.url} src={item.url} alt={title}
                                    onClick={() => handleImageClick(item.url)}
                                    style={{
                                        maxHeight: '500px',
                                        width: 'auto',
                                        height: 'auto',
                                        objectFit: 'contain',
                                        display: 'block',
                                        margin: '0 auto',
                                    }}
                                />
                            )
                        }
                    </Carousel>
                </Grid>
            </Grid>
        </>
    );
};

export default ProductAllDetails;
