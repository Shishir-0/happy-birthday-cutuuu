import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Wind } from 'lucide-react';
import type { CutiePageConfig } from '../types/config';

interface CandleSectionProps {
  config: CutiePageConfig;
  onNext: () => void;
}

export default function CandleSection({ config, onNext }: CandleSectionProps) {
  const candleData = config.candle;
  const [blown, setBlown] = useState(false);
  const [showWish, setShowWish] = useState(false);

  const handleBlow = () => {
    if (blown) return;
    setBlown(true);
    
    // Canvas confetti burst
    const end = Date.now() + 2 * 1000;
    const colors = [config.theme.primary, config.theme.secondary, config.theme.accent, '#FFFFFF'];

    (function frame() {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    setTimeout(() => {
      setShowWish(true);
    }, 1800);

    setTimeout(() => {
      onNext();
    }, 5500);
  };

  return (
    <motion.div
      className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center overflow-hidden transition-colors duration-1000"
      style={{ backgroundColor: blown ? config.theme.background : '#0B0F19' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1 }}
    >
      <motion.div 
        className="relative flex flex-col items-center cursor-pointer"
        onClick={handleBlow}
        animate={blown ? { x: [-4, 4, -4, 4, 0], y: [-4, 4, -4, 4, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        {/* Candle */}
        <div className="relative w-5 h-26 bg-pink-100 rounded-t-md border-2 border-pink-200 z-10 flex flex-col items-center shadow-lg">
          <div className="absolute top-4 w-full h-2 bg-pink-300 transform -rotate-12 opacity-70" />
          <div className="absolute top-12 w-full h-2 bg-pink-300 transform -rotate-12 opacity-70" />
          <div className="absolute top-20 w-full h-2 bg-pink-300 transform -rotate-12 opacity-70" />
          
          <div className="absolute -top-2 w-1 h-2 bg-gray-800 rounded-full" />
          
          <AnimatePresence>
            {!blown && (
              <motion.div
                className="absolute -top-10 w-6 h-10 bg-yellow-400 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] origin-bottom shadow-[0_0_25px_#facc15,0_0_50px_#f97316]"
                animate={{ 
                  scale: [1, 1.12, 0.9, 1.08, 1],
                  rotate: [-3, 3, -2, 4, 0]
                }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'mirror' }}
                exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
              >
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-4 bg-orange-500 rounded-full opacity-80" />
                <Sparkles className="absolute -top-6 -left-4 text-yellow-200 animate-ping opacity-60" size={16} />
                <Sparkles className="absolute -top-2 -right-6 text-yellow-300 animate-pulse opacity-80" size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cake Base */}
        <div className="relative mt-[-2px] w-52 sm:w-60 h-28 bg-white rounded-2xl border-4 border-pink-100 shadow-[0_12px_24px_rgba(255,105,180,0.2)] z-0 flex justify-center">
          <div className="absolute -top-2 flex w-full justify-around px-2">
            <div className="w-6 h-9 bg-pink-200 rounded-b-full" />
            <div className="w-5 h-7 bg-pink-200 rounded-b-full mt-1" />
            <div className="w-8 h-11 bg-pink-200 rounded-b-full" />
            <div className="w-6 h-6 bg-pink-200 rounded-b-full mt-2" />
            <div className="w-7 h-10 bg-pink-200 rounded-b-full" />
          </div>
          <div className="absolute bottom-4 w-full flex justify-around px-4">
            <div className="w-3.5 h-3.5 bg-red-400 rounded-full shadow-sm" />
            <div className="w-3.5 h-3.5 bg-yellow-400 rounded-full shadow-sm" />
            <div className="w-3.5 h-3.5 bg-blue-400 rounded-full shadow-sm" />
            <div className="w-3.5 h-3.5 bg-purple-400 rounded-full shadow-sm" />
          </div>
        </div>

        {!blown && (
          <motion.div
            className="absolute -bottom-16 flex items-center gap-2 text-white/80 font-sans text-sm font-semibold animate-pulse cursor-pointer"
            onClick={handleBlow}
          >
            <Wind size={18} /> {candleData?.blowHintText || 'tap the candle to blow'}
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence>
        {blown && (
          <motion.div
            className="absolute top-20 sm:top-28 text-center px-4"
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            <h2 
              className="font-handwritten text-4xl sm:text-5xl md:text-6xl drop-shadow-md whitespace-pre-line leading-tight"
              style={{ color: config.theme.secondary }}
            >
              {candleData?.milestoneText || `HAPPY ${config.person.ageOrMilestone || 'SPECIAL DAY'}`}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showWish && (
          <motion.div
            className="absolute bottom-28 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl border border-pink-200 max-w-xs sm:max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-sans font-bold text-sm sm:text-base" style={{ color: config.theme.primary }}>
              {candleData?.wishGrantedText || '✨ Wish granted! ✨'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
