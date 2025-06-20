import React, { useEffect, useState } from 'react';
import type { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { NextButton, PrevButton, usePrevNextButtons } from './imageCarouselArrowButton';
import { DotButton, useDotButton } from './imageCarouselDotButton';
import './styles/embla.css';
import type { ProductImageModel } from '../../models/productImageModel';

interface IImageCarouselProps {
    images: ProductImageModel[];
    options?: EmblaOptionsType;
    handleOpen?: (index: number) => void;
    slideHeight: string;
};

const ImageCarousel: React.FC<IImageCarouselProps> = (props) => {
    const { images, options, handleOpen, slideHeight } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options);

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi);

    return (
        <>
            <style>
                {`
                    .embla {
                        max-width: 80vw;
                        margin: auto;
                        --slide-height: ${slideHeight};
                        --slide-spacing: 0.2rem;
                        --slide-size: 100%;
                    }
                `}
            </style>
            <div className="embla">
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        {images?.map((image, index) => (
                            <div className="embla__slide" key={index}>
                                <img
                                    onClick={() => handleOpen?.(index)}
                                    className="embla__slide__img"
                                    src={image.url}
                                    alt={image.url}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="embla__controls">
                    <div className="embla__buttons">
                        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                    </div>

                    <div className="embla__dots">
                        {scrollSnaps.map((_, index) => (
                            <DotButton
                                key={index}
                                onClick={() => onDotButtonClick(index)}
                                className={'embla__dot'.concat(
                                    index === selectedIndex ? ' embla__dot--selected' : ''
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ImageCarousel;
