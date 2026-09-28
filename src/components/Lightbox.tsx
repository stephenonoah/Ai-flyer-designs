import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LightboxProps {
  imageUrl: string | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export function Lightbox({
  imageUrl,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}: LightboxProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasNext) onNext();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
    };

    if (imageUrl) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [imageUrl, onClose, onNext, onPrev, hasNext, hasPrev]);

  // Touch event handlers for mobile swiping
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && hasNext) onNext();
    if (isRightSwipe && hasPrev) onPrev();
  };

  return (
    <AnimatePresence>
      {imageUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 select-none"
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[60]"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close fullscreen view"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Previous arrow */}
          {hasPrev && (
            <button
              className="absolute left-3 sm:left-6 p-2.5 sm:p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-[60]"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              aria-label="Previous flyer"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          )}

          {/* Flyer image with motion and mobile touch listeners */}
          <div
            className="relative max-w-full max-h-full flex items-center justify-center touch-pan-y"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <motion.img
              key={imageUrl}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              src={imageUrl}
              alt="Full screen flyer"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl pointer-events-none"
              draggable={false}
            />
          </div>

          {/* Next arrow */}
          {hasNext && (
            <button
              className="absolute right-3 sm:right-6 p-2.5 sm:p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-[60]"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              aria-label="Next flyer"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
