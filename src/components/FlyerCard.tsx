import { useState } from 'react';
import { motion } from 'motion/react';

interface FlyerCardProps {
  url: string;
  index: number;
  onClick: () => void;
}

export function FlyerCard({ url, index, onClick }: FlyerCardProps) {
  // Track whether the heavy S3 image has finished downloading
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      className="group bg-[#0f1424] p-2 rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-indigo-500/20 mb-6 sm:mb-8 break-inside-avoid inline-block w-full"
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      {/* min-h-[300px] holds the layout steady so cards don't jump around before the image gets its actual height */}
      <div className="relative overflow-hidden rounded-lg bg-[#0b0f19] min-h-[300px]">
        
        {/* Shimmer Skeleton Placeholder: Shows a pulsing grey box until isLoaded is true */}
        {!isLoaded && (
          <div className="absolute inset-0 z-10 bg-gray-800 animate-pulse" />
        )}

        <img
          src={url}
          alt={`Flyer Design ${index + 1}`}
          // Trigger the state change once the network finishes downloading the file
          onLoad={() => setIsLoaded(true)}
          // Eager load the first 4 images immediately, lazy load the rest
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
