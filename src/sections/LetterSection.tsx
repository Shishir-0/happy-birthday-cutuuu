import { motion } from 'framer-motion';
import type { CutiePageConfig } from '../types/config';
import { Heart, ChevronRight } from 'lucide-react';

interface LetterSectionProps {
  config: CutiePageConfig;
  onNext?: () => void;
}

export default function LetterSection({ config, onNext }: LetterSectionProps) {
  const letterData = config.letter;

  return (
    <motion.div
      className="relative w-full h-full p-4 sm:p-6 overflow-hidden flex flex-col items-center justify-center"
      style={{ backgroundColor: config.theme.mode === 'dark' ? '#0B0F19' : '#FFFDFE' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full h-full relative overflow-y-auto overflow-x-hidden pb-28 hide-scrollbar max-w-lg mx-auto flex flex-col items-center">
        <h2 
          className="text-center font-handwritten text-3xl sm:text-4xl mt-6 mb-6 drop-shadow-sm"
          style={{ color: config.theme.secondary }}
        >
          {letterData?.title || 'A Personal Note'}
        </h2>

        <motion.div 
          className="w-full bg-white/95 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-pink-100/60 relative text-left"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.3, delay: 0.2 }}
        >
          {/* Decorative Stamp */}
          <div className="absolute top-6 right-6 w-12 h-14 border-2 border-dashed border-pink-300/80 rounded-md p-1 flex flex-col items-center justify-center text-center opacity-80 rotate-6">
            <Heart size={16} fill="currentColor" style={{ color: config.theme.primary }} />
            <span className="text-[8px] font-bold uppercase mt-0.5 text-gray-500">Love</span>
          </div>

          {letterData?.salutation && (
            <p className="font-handwritten text-2xl text-gray-900 mb-4">
              {letterData.salutation}
            </p>
          )}

          <div className="font-sans text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line space-y-3">
            {letterData?.content}
          </div>

          {letterData?.signature && (
            <div className="mt-8 pt-4 border-t border-gray-100 flex flex-col items-end">
              <p className="font-handwritten text-2xl text-gray-900" style={{ color: config.theme.secondary }}>
                {letterData.signature}
              </p>
              {letterData.date && (
                <span className="text-xs text-gray-400 mt-1">{letterData.date}</span>
              )}
            </div>
          )}
        </motion.div>

        {onNext && (
          <div className="flex justify-center mt-8 mb-4">
            <button
              onClick={onNext}
              className="flex items-center gap-2 glass-card py-3 px-6 text-sm font-bold rounded-full shadow-lg active:scale-95 transition-transform"
              style={{ color: config.theme.secondary }}
            >
              Continue <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
