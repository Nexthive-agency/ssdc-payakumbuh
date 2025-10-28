import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselItem {
  image?: string; 
  name?: string;
  quote?: string;
  alt?: string;
  [key: string]: unknown; 
}

interface CarouselProps {
  items: CarouselItem[];
  children?: React.ReactNode; 
}

const ITEM_WIDTH = 320; 
const GAP = 24; 
const ITEM_FULL_WIDTH = ITEM_WIDTH + GAP;

export default function FramerCarousel({ items, children }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  
  const totalItems = children ? React.Children.count(children) : items.length;
  const maxIndex = totalItems > 0 ? totalItems - 1 : 0; 

  const handleNext = async () => {
    if (currentIndex < maxIndex) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      await controls.start({ 
        x: -newIndex * ITEM_FULL_WIDTH, 
        transition: { type: "spring", stiffness: 200, damping: 30 } 
      });
    }
  };

  const handlePrev = async () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      await controls.start({ 
        x: -newIndex * ITEM_FULL_WIDTH, 
        transition: { type: "spring", stiffness: 200, damping: 30 } 
      });
    }
  };
  
  const dragConstraintsLeft = -(maxIndex * ITEM_FULL_WIDTH);

  const carouselContent = children || items.map((item, i) => (
    <motion.div
        key={i}
        className="min-w-[280px] sm:min-w-[320px] bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col items-center border border-gray-200 hover:scale-[1.02] transition-transform"
    >
        {item.image && (
          <img
              src={item.image}
              alt={item.alt || item.name}
              className="w-full h-48 object-cover object-center"
              loading="lazy"
          />
        )}
        <div className="p-4 text-center">
            {item.quote && (
                <p className="italic text-gray-600 text-sm mb-3">“{item.quote}”</p>
            )}
            {item.name && <p className="font-bold text-[#6E1A7E]">{item.name}</p>}
        </div>
    </motion.div>
  ));

  return (
    <div className="relative w-full">
      <button
        onClick={handlePrev}
        aria-label="Geser ke kiri"
        disabled={currentIndex === 0}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-md transition
          ${currentIndex === 0 
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
            : 'bg-[#6E1A7E] text-white hover:bg-[#52135f]'}
        `}
      >
        <ChevronLeft size={24} />
      </button>

      <div className="overflow-hidden w-full">
        <motion.div
          className="flex gap-6"
          animate={controls}
          drag="x"
          dragConstraints={{ left: dragConstraintsLeft, right: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {carouselContent}
        </motion.div>
      </div>

      <button
        onClick={handleNext}
        aria-label="Geser ke kanan"
        disabled={currentIndex === maxIndex}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-md transition
          ${currentIndex === maxIndex 
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
            : 'bg-[#6E1A7E] text-white hover:bg-[#52135f]'}
        `}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}