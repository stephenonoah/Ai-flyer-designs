import { useState } from 'react';
import { FlyerCard } from './components/FlyerCard';
import { Lightbox } from './components/Lightbox';

// Dynamically generate 91 flyer image URLs
const flyers = Array.from({ length: 91 }, (_, i) =>
  `https://res.cloudinary.com/ducmb5htf/image/upload/v1789384565/flyers_${i + 1}.png`
);

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
            onClick={() => setSelectedImage(url)}
          />
        ))}
      </main>

      <Lightbox
        imageUrl={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}
