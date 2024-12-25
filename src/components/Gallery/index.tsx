"use client"; // Make it a client-side component

import { useEffect } from "react";
import Image from "next/image";
import AboutHeading from "../AboutHeading";
import { useFetchGallery } from "@/hooks/DisplayAllGallery";
import LoadingSpinner from "../LoadingSpinner";

const Gallery = () => {
  const { galleryItems, fetchGalleryItems, loading } = useFetchGallery();
  const imagesToShow = galleryItems.slice(0, 6); // Get the first 6 images

  useEffect(() => {
    fetchGalleryItems(); // Fetch gallery items when the component mounts
  }, [fetchGalleryItems]);

  return (
    <div className="w-full flex gap-[2rem] flex-col justify-center items-center">
      <AboutHeading text="Gallery" />
      {loading && <LoadingSpinner text="Loading Gallery" />}
      <div className="w-full h-fit grid gap-[.5rem] md:gap-[1rem] grid-cols-2 lg:grid-cols-4 grid-rows-auto">
        {imagesToShow.map((image, index) => (
          <div
            key={index}
            className={`w-full h-full relative ${
              index === 2 || index === 3
                ? "col-span-2 row-span-2"
                : "col-span-1 row-span-1"
            }`}
          >
            <Image
              alt="gallery image"
              src={image.imageNew}
              width={500}
              height={500}
              className="w-full h-full rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
