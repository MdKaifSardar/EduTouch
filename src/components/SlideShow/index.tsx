"use client";

import React, { useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Slider from "react-slick";

type ImageCarouselProps = {
  images: StaticImageData[];
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const sliderRef = useRef<Slider | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    arrows: false, // Disable default arrows
    beforeChange: (current: number, next: number) => setActiveIndex(next), // Track active slide
  };

  return (
    <div className="pt-[3.4rem] sm:pt-[6rem] relative w-full h-fit overflow-hidden">
      {/* Carousel */}
      <Slider {...settings} ref={sliderRef} className="w-full h-full">
        {images.map((image, index) => (
          <div key={index} className="w-full h-full relative">
            <Image
              src={image}
              width={300}
              height={300}
              alt={`Slide ${index}`}
              className="w-full h-auto object-contain"
            />
          </div>
        ))}
      </Slider>

      {/* Custom Dots */}
      <div className="absolute bottom-5 w-full flex justify-center">
        <div className="flex flex-row space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => sliderRef.current?.slickGoTo(index)}
              className={`w-3 h-3 rounded-full ${
                index === activeIndex
                  ? "bg-white"
                  : "bg-gray-400 hover:bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
