// src/components/Carousel.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Carousel = ({ slides, autoplayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides]);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      goToNext();
    }, autoplayInterval);
    return () => clearTimeout(timer);
  }, [currentIndex, autoplayInterval, goToNext]);

  return (
    <div className="relative h-[550px] w-full rounded-lg overflow-hidden shadow-2xl">
      <div
        className="flex transition-transform ease-in-out duration-700"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative min-w-full h-full">
            <img src={slide.image} alt={slide.title} className="w-full h-auto" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center p-4">
              <h2 className="text-4xl font-extrabold text-white drop-shadow-lg">{slide.title}</h2>
              <p className="text-lg text-gray-200 mt-2 drop-shadow-lg">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-accent transition"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-accent transition"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 ${
              currentIndex === slideIndex ? 'bg-accent' : 'bg-white/50'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

// Update the export name
export default Carousel;