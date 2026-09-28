import { useState } from 'react';
import { FlyerCard } from './components/FlyerCard';
import { Lightbox } from './components/Lightbox';

const CLOUDFRONT_URL = 'https://d1ok5pur9e1r6c.cloudfront.net';

const flyers = Array.from({ length: 98 }, (_, i) =>
  `${CLOUDFRONT_URL}/flyer%20(${i + 1}).png`
);

export default function App() {
  // Track the index (0 to 97) instead of the raw URL
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < flyers.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-4 sm:p-6 md:p-8 font-sans selection:bg-indigo-500/30">
      <header className="max-w-7xl mx-auto mb-10 md:mb-16 text-center pt-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">
          SN Digital Academy
        </h1>
        <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-light">
          Premium Flyer Design Portfolio
        </p>
      </header>

      <main className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 sm:gap-8 pb-12">
        {flyers.map((url, index) => (
          <FlyerCard
            key={url}
            url={url}
            index={index}
            // Pass the index to state when clicked
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </main>

      <Lightbox
        imageUrl={selectedIndex !== null ? flyers[selectedIndex] : null}
        onClose={() => setSelectedIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={selectedIndex !== null && selectedIndex < flyers.length - 1}
        hasPrev={selectedIndex !== null && selectedIndex > 0}
      />
    </div>
  );
}
