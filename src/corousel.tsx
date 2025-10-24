import {  useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  items: {
    image: string;
    name?: string;
    quote?: string;
    alt?: string;
  }[];
}

export default function FramerCarousel({ items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  const itemWidth = 320; 
  const maxIndex = items.length - 1;

  const handleNext = async () => {
    const newIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    await controls.start({ x: -newIndex * itemWidth, transition: { type: "spring", stiffness: 200, damping: 30 } });
  };

  const handlePrev = async () => {
    const newIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
    setCurrentIndex(newIndex);
    await controls.start({ x: -newIndex * itemWidth, transition: { type: "spring", stiffness: 200, damping: 30 } });
  };

  return (
    <div className="relative w-full">
      <button
        onClick={handlePrev}
        aria-label="Geser ke kiri"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#6E1A7E] text-white p-3 rounded-full shadow-md hover:bg-[#52135f] transition"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="overflow-hidden w-full">
        <motion.div
          className="flex gap-6"
          animate={controls}
          drag="x"
          dragConstraints={{ left: -maxIndex * itemWidth, right: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="min-w-[280px] sm:min-w-[320px] md:min-w-[360px] bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col items-center border border-[#6E1A7E]/20 hover:scale-[1.02] transition-transform"
            >
              <img
                src={item.image}
                alt={item.alt || item.name}
                className="w-full h-48 object-cover object-center"
                loading="lazy"
              />
              <div className="p-4 text-center">
                {item.quote && (
                  <p className="italic text-gray-600 text-sm mb-3">“{item.quote}”</p>
                )}
                {item.name && <p className="font-bold text-[#6E1A7E]">{item.name}</p>}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <button
        onClick={handleNext}
        aria-label="Geser ke kanan"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#6E1A7E] text-white p-3 rounded-full shadow-md hover:bg-[#52135f] transition"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
