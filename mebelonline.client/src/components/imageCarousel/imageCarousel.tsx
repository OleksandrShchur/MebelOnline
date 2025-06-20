import React from 'react';
import type { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { NextButton, PrevButton, usePrevNextButtons } from './imageCarouselArrowButton';
import { DotButton, useDotButton } from './imageCarouselDotButton';
import './styles/embla.css';
import type { ProductImageModel } from '../../models/productImageModel';

interface IImageCarouselProps {
    images: ProductImageModel[];
    options?: EmblaOptionsType;
};

const ImageCarousel: React.FC<IImageCarouselProps> = (props) => {
    const { images, options } = props;
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
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {images?.map((image, index) => (
                        <div className="embla__slide" key={index}>
                            <img
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
                            className={'embla__dot '.concat(
                                index === selectedIndex ? ' embla__dot--selected' : ''
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageCarousel;
