import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CutiePageConfig } from '../types/config';
import { Heart, Sparkles, ChevronRight } from 'lucide-react';

interface ReasonsSectionProps {
  config: CutiePageConfig;
  onNext?: () => void;
}

export default function ReasonsSection({ config, onNext }: ReasonsSectionProps) {
  const reasonsData = config.reasons;
  const items = reasonsData?.items || [];
  const [revealed, setRevealed] = useState<number[]>([]);

  const toggleReveal = (index: number) => {
    if (revealed.includes(index)) {
      setRevealed(revealed.filter((i) => i !== index));
    } else {
      setRevealed([...revealed, index]);
    }
  };

  return (
    <motion.div
      className="relative w-full h-full p-4 sm:p-6 overflow-hidden flex flex-col items-center"
      style={{ backgroundColor: config.theme.mode === 'dark' ? '#0F172A' : '#FFF0F5' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full h-full relative overflow-y-auto overflow-x-hidden pb-28 hide-scrollbar max-w-lg mx-auto flex flex-col items-center">
        <h2 
          className="text-center font-handwritten text-3xl sm:text-4xl mt-6 mb-2 drop-shadow-sm"
          style={{ color: config.theme.secondary }}
        >
          {reasonsData?.title || 'Reasons Why You Are Special'}
        </h2>
        <p className="text-center text-xs font-bold uppercase tracking-wider text-gray-500 mb-6">
          {reasonsData?.subtitle || 'Tap cards to reveal'}
        </p>

        <div className="w-full flex flex-col gap-3.5 my-2">
          {items.map((item, i) => {
            const isOpened = revealed.includes(i);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => toggleReveal(i)}
                className="w-full bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-md border border-white/60 cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span 
                      className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white shadow-sm flex-shrink-0"
                      style={{ backgroundColor: config.theme.primary }}
                    >
                      #{i + 1}
                    </span>
                    <span className="font-semibold text-sm sm:text-base text-gray-800">
                      {isOpened ? item : 'Tap to unlock reason ✨'}
                    </span>
                  </div>
                  {isOpened ? (
                    <Sparkles size={18} className="text-yellow-400 animate-spin-slow flex-shrink-0" />
                  ) : (
                    <Heart size={18} style={{ color: config.theme.secondary }} className="flex-shrink-0" />
                  )}
                </div>

                <AnimatePresence>
                  {isOpened && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 pt-2 border-t border-pink-100 text-xs text-gray-500 text-left italic"
                    >
                      Fact verified ❤️
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {onNext && (
          <div className="flex justify-center mt-8 mb-4">
            <button
              onClick={onNext}
              className="flex items-center gap-2 glass-card py-3 px-6 text-sm font-bold rounded-full shadow-lg active:scale-95 transition-transform"
              style={{ color: config.theme.secondary }}
            >
              Read Love Letter <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
