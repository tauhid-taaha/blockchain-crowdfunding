import React, { useEffect, useRef, useState } from "react";

import img1 from "./img1.jpg";
import img2 from "./img2.jpg";
import img3 from "./img3.jpeg";
import img4 from "./img4.jpeg";
import img5 from "./img5.jpeg";
import img6 from "./img6.jpeg";
import img7 from "./img7.jpeg";
import img8 from "./img8.jpg";
import img9 from "./img9.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

const ReliefCards = () => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % images.length;
        // Scroll container width divided by 4 cards visible to get scroll step
        if (scrollRef.current) {
          const scrollStep = scrollRef.current.scrollWidth / images.length;
          scrollRef.current.scrollTo({
            left: nextIndex * scrollStep,
            behavior: "smooth",
          });
        }
        return nextIndex;
      });
    }, 1200); // faster sliding every 1.5 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 py-12">
      <div
                 ref={scrollRef}
  className="flex space-x-6 overflow-x-scroll px-6 cursor-grab select-none scrollbar-hide"
  style={{
    scrollBehavior: "smooth",
    scrollbarWidth: "none",          // For Firefox
    msOverflowStyle: "none",         // For IE/Edge
  }}
      >
        {images.map((src, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
                key={idx}
  className={`flex-shrink-0 w-60 h-96 rounded-xl overflow-hidden
    transform transition-transform duration-700 ease-in-out
    ${isActive ? "scale-105 shadow-2xl" : "scale-95 opacity-80"}
  `}
            >
              <img
                src={src}
                alt={`Relief ${idx + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReliefCards;


