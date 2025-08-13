// src/components/common/Carousel.jsx
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel = ({ children, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = React.Children.count(children);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  if (totalSlides === 0) {
    return null; // Or some placeholder if no children are provided
  }

  return (
    // This div controls the overall position of the carousel AND its arrows AND its dots
    <div className={`relative ${className || ""}`}>
      {/* Inner div for the actual slide content */}
      <div className="relative w-full overflow-hidden rounded-lg shadow-xl pb-12">
        {" "}
        {/* Added pb-12 here */}
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {React.Children.map(children, (child, index) => (
            <div key={index} className="w-full flex-shrink-0">
              {child}
            </div>
          ))}
        </div>
      </div>

      {totalSlides > 1 && (
        // Dots moved outside the carousel content div, still relative to the main carousel container
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {" "}
          {/* Changed bottom- to a positive value as it's now relative to the outer container's bottom */}
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-white scale-125" : "bg-gray-400 hover:bg-gray-300"}`}
              aria-label={`Go to slide ${idx + 1}`}
            ></button>
          ))}
        </div>
      )}

      {totalSlides > 1 && (
        <>
          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full shadow-lg hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-purple-400 z-30 transition-all duration-300
                       left-4 md:-left-20"
            aria-label="Previous slide"
          >
            <ChevronLeft size={28} />
          </button>
          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="absolute top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full shadow-lg hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-purple-400 z-30 transition-all duration-300
                       right-4 md:-right-20"
            aria-label="Next slide"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
