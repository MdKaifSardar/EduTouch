"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { useFetchHeroPosters } from "@/hooks/DisplayAllPosters";

const ImageCarousel: React.FC = () => {
  const sliderRef = useRef<Slider | null>(null);
  const { heroPosters, fetchHeroPosters, loading } = useFetchHeroPosters();
  const [activeIndex, setActiveIndex] = React.useState(0);

  useEffect(() => {
    fetchHeroPosters();
  }, [fetchHeroPosters]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    arrows: false, // Disable default arrows
    beforeChange: (_: number, next: number) => setActiveIndex(next), // Track active slide
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="relative pt-[3.4rem] sm:pt-[6rem] w-full overflow-hidden">
      {/* Carousel with Aspect Ratio */}
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        <Slider {...settings} ref={sliderRef} className="w-full h-full">
          {heroPosters.map((poster, index) => (
            <div key={index} className="w-full h-full relative">
              <Image
                src={poster.image}
                width={1920}
                height={1080}
                alt={poster.title}
                className="w-full h-full object-cover"
                priority // Ensures images are loaded quickly
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Custom Dots */}
      <div className="absolute bottom-[1.5rem] sm:bottom-[3rem] md:bottom-[5rem] z-[10] w-full flex justify-center">
        <div className="flex flex-row space-x-2">
          {heroPosters.map((_, index) => (
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
