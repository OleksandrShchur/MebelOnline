import React from 'react';
import type { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { NextButton, PrevButton, usePrevNextButtons } from './imageCarouselArrowButton';
import { DotButton, useDotButton } from './imageCarouselDotButton';
import './styles/embla.css';
import type { ProductImageModel } from '../../models/productImageModel';
import ProductImage from '../productImage/productImage';

interface IImageCarouselProps {
  images?: ProductImageModel[] | null;
  options?: EmblaOptionsType;
  handleOpen?: (index: number) => void;
  slideHeight: string;
  productTitle?: string;
}

const ImageCarousel: React.FC<IImageCarouselProps> = (props) => {
  const { images, options, handleOpen, slideHeight, productTitle = 'Товар' } = props;
  const slides = images?.length ? images : [{ url: '', isPrimary: true }];
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      onPrevButtonClick();
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      onNextButtonClick();
    }
  };

  return (
    <>
      <style>
        {`
          .embla {
            max-width: 100%;
            margin: auto;
            --slide-height: ${slideHeight};
            --slide-spacing: 0.2rem;
            --slide-size: 100%;
          }
        `}
      </style>
      <div
        className="embla"
        role="region"
        aria-roledescription="карусель"
        aria-label={`Зображення: ${productTitle}`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((image, index) => (
              <div className="embla__slide" key={`${image.url}-${index}`}>
                <ProductImage
                  src={image.url}
                  alt={`${productTitle}, фото ${index + 1}`}
                  height="100%"
                  objectFit="contain"
                  className="embla__slide__img"
                  onClick={() => handleOpen?.(index)}
                />
              </div>
            ))}
          </div>
        </div>

        {slides.length > 1 && (
          <div className="embla__controls">
            <div className="embla__buttons">
              <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} aria-label="Попереднє зображення" />
              <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} aria-label="Наступне зображення" />
            </div>

            <div className="embla__dots">
              {scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={'embla__dot'.concat(index === selectedIndex ? ' embla__dot--selected' : '')}
                  aria-label={`Зображення ${index + 1}`}
                  aria-current={index === selectedIndex ? 'true' : undefined}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageCarousel;
