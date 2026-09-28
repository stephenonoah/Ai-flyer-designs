import { useState } from 'react';
import { motion } from 'motion/react';

interface FlyerCardProps {
  url: string;
  index: number;
  onClick: () => void;
}

export function FlyerCard({ url, index, onClick }: FlyerCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      className="group bg-[#0f1424] p-2 rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-indigo-500/20 mb-6 sm:mb-8 break-inside-avoid inline-block w-full"
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      {/* 
        FIX: The min-h-[300px] and bg color only apply while loading (!isLoaded). 
        Once the image loads, they are removed, eliminating the gap. 
      */}
      <div className={`relative overflow-hidden rounded-lg ${!isLoaded ? 'bg-[#0b0f19] min-h-[300px]' : ''}`}>
        
        {!isLoaded && (
          <div className="absolute inset-0 z-10 bg-gray-800 animate-pulse" />
        )}

        <img
          src={url}
          alt={`Flyer Design ${index + 1}`}
          onLoad={() => setIsLoaded(true)}
          loading={index < 4 ? 'eager' : 'lazy'}
          decoding="async"
          className={`w-full h-auto transition-all duration-500 group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </motion.div>
  );
}
