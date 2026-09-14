import { motion } from 'motion/react';

interface FlyerCardProps {
  url: string;
  index: number;
  onClick: () => void;
}

export function FlyerCard({ url, index, onClick }: FlyerCardProps) {
  return (
    <motion.div
      className="group bg-[#0f1424] p-2 rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-indigo-500/20 mb-6 sm:mb-8 break-inside-avoid inline-block w-full"
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-lg bg-[#0b0f19]">
        <img
          src={url}
          alt={`Flyer Design ${index + 1}`}
          loading="lazy"
          className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </motion.div>
  );
}
