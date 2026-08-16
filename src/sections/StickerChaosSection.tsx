import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { CutiePageConfig, StickerItem } from '../types/config';

interface StickerChaosSectionProps {
  config: CutiePageConfig;
  onNext: () => void;
}

export default function StickerChaosSection({ config, onNext }: StickerChaosSectionProps) {
  const stickersData = config.stickers;
  const items = stickersData?.items || [];
  const [poppedCount, setPoppedCount] = useState(0);

  const handlePop = () => {
    setPoppedCount((prev) => prev + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 9000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: config.theme.background }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8 }}
    >
      <h2 
        className="absolute top-16 sm:top-20 w-full text-center font-handwritten text-2xl sm:text-3xl opacity-80 px-4 z-20"
        style={{ color: config.theme.primary }}
      >
        {stickersData?.title || 'Tap the Stickers! 🎈'}
      </h2>

      {items.map((sticker: StickerItem) => (
        <motion.div
          key={sticker.id}
          className={`absolute ${sticker.size || 'text-5xl'} cursor-pointer drop-shadow-md z-10 select-none`}
          style={{ left: sticker.left, top: sticker.top }}
          initial={{ scale: 0, rotate: sticker.rotate - 45 }}
          animate={{ scale: 1, rotate: sticker.rotate }}
          whileHover={{ scale: 1.25, rotate: sticker.rotate + 15 }}
          whileTap={{ scale: 0.85, rotate: sticker.rotate - 15 }}
          transition={{ type: 'spring', bounce: 0.6, delay: sticker.id * 0.1 }}
          onClick={handlePop}
        >
          {sticker.text}
        </motion.div>
      ))}

      {poppedCount >= 3 && (
        <motion.div
          className="absolute bottom-28 w-full text-center text-base font-bold z-20"
          style={{ color: config.theme.secondary }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          hehe, cutie 🤭
        </motion.div>
      )}

      <motion.button
        className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-white/60 backdrop-blur-md px-6 py-2.5 rounded-full font-bold shadow-md text-xs sm:text-sm active:scale-95 transition-transform border border-white/60 z-20"
        style={{ color: config.theme.primary }}
        onClick={onNext}
      >
        Skip to End
      </motion.button>
    </motion.div>
  );
}
