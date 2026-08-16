import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CutiePageConfig, GalleryItem } from '../types/config';
import LightboxModal from '../components/LightboxModal';
import PhotoCard from '../components/PhotoCard';
import { ChevronRight } from 'lucide-react';

interface GallerySectionProps {
  config: CutiePageConfig;
  onNext?: () => void;
}

export default function GallerySection({ config, onNext }: GallerySectionProps) {
  const galleryData = config.gallery;
  const items = useMemo(() => galleryData?.items || [], [galleryData?.items]);
  const [visibleItems, setVisibleItems] = useState<Array<string | number>>([]);
  const [activeLightboxImage, setActiveLightboxImage] = useState<{ src: string; caption: string } | null>(null);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    items.forEach((item, index) => {
      const delayTime = (item.delay ?? index * 1.2) * 1000;
      const timer = setTimeout(() => {
        setVisibleItems((prev) => [...prev, item.id]);
      }, delayTime);
      timers.push(timer);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [items]);

  return (
    <motion.div
      className="relative w-full h-full p-4 sm:p-6 overflow-hidden flex flex-col items-center"
      style={{ backgroundColor: config.theme.mode === 'dark' ? '#090D16' : '#FAFAF9' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full h-full relative overflow-y-auto overflow-x-hidden pb-28 hide-scrollbar max-w-xl mx-auto">
        <h2 
          className="text-center font-handwritten text-3xl sm:text-4xl mt-6 mb-8 drop-shadow-sm opacity-90"
          style={{ color: config.theme.primary }}
        >
          {galleryData?.title || 'Photo Archives & Memories'}
        </h2>

        <div className="flex flex-col gap-8 relative px-2">
          <AnimatePresence>
            {items.map((item: GalleryItem, index: number) => {
              if (!visibleItems.includes(item.id)) return null;

              const isLeft = index % 2 === 0;

              if (item.type === 'chat') {
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: isLeft ? -40 : 40, scale: 0.88 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    className={`flex ${isLeft ? 'justify-start' : 'justify-end'} my-1`}
                  >
                    <div 
                      className={`max-w-[85%] break-words whitespace-normal rounded-2xl px-5 py-3 shadow-md text-base font-medium ${
                        isLeft 
                          ? 'bg-white text-gray-800 rounded-tl-none border border-stone-200/80' 
                          : 'text-white rounded-tr-none'
                      }`}
                      style={!isLeft ? { backgroundColor: config.theme.primary } : {}}
                    >
                      {item.text}
                    </div>
                  </motion.div>
                );
              }

              if (item.type === 'sticky') {
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0, rotate: (item.rotation || 0) - 15 }}
                    animate={{ opacity: 1, scale: 1, rotate: item.rotation || 0 }}
                    className={`flex ${isLeft ? 'justify-end pr-4' : 'justify-start pl-4'} my-4`}
                  >
                    <div className="w-52 sm:w-60 min-h-[12rem] bg-amber-50/90 shadow-md px-4 py-8 flex flex-col items-center justify-center text-center relative rounded-sm border border-amber-200/80">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-6 bg-white/40 backdrop-blur-sm transform -rotate-3 shadow-sm" />
                      <div className="font-handwritten text-2xl text-stone-800 leading-snug break-words w-full flex-1 flex items-center justify-center">
                        {item.text}
                      </div>
                    </div>
                  </motion.div>
                );
              }

              if (item.type === 'polaroid' || item.type === 'photo') {
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 80, rotate: (item.rotation || 0) + 8 }}
                    animate={{ opacity: 1, y: 0, rotate: item.rotation || 0 }}
                    className="flex justify-center my-6"
                  >
                    <PhotoCard
                      src={item.image}
                      title={item.text}
                      caption={item.caption || 'Tap to view'}
                      variant="polaroid"
                      onClick={() => item.image && setActiveLightboxImage({ src: item.image, caption: item.text })}
                    />
                  </motion.div>
                );
              }

              return null;
            })}
          </AnimatePresence>
        </div>

        {onNext && (
          <div className="flex justify-center mt-12 mb-6">
            <button
              onClick={onNext}
              className="flex items-center gap-2 glass-card py-3 px-6 text-sm font-bold rounded-full shadow-lg active:scale-95 transition-transform"
              style={{ color: config.theme.secondary }}
            >
              Continue Story <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      <LightboxModal
        isOpen={!!activeLightboxImage}
        imageSrc={activeLightboxImage?.src}
        caption={activeLightboxImage?.caption}
        onClose={() => setActiveLightboxImage(null)}
      />
    </motion.div>
  );
}
