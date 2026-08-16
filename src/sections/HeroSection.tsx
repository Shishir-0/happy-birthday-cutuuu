import { motion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';
import type { CutiePageConfig } from '../types/config';
import PhotoCard from '../components/PhotoCard';

interface HeroSectionProps {
  config: CutiePageConfig;
  onNext: () => void;
}

export default function HeroSection({ config, onNext }: HeroSectionProps) {
  const heroData = config.hero;

  return (
    <motion.div
      className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center overflow-hidden"
      style={{ backgroundColor: config.theme.background }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.8 }}
    >
      {/* Floating Dynamic Badges */}
      {heroData.stickers?.map((sticker, i) => {
        const isTopRight = sticker.position === 'top-right' || i === 0;
        return (
          <motion.div
            key={i}
            className={`absolute ${isTopRight ? 'top-16 right-6 md:top-20 md:right-16' : 'bottom-36 left-6 md:bottom-40 md:left-16'} z-10`}
            animate={{ y: [0, isTopRight ? -10 : 12, 0], rotate: [0, 6, -6, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div 
              className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full sticker-shadow font-sans text-xs sm:text-sm font-extrabold border border-white/60 uppercase tracking-wider"
              style={{ 
                color: i % 2 === 0 ? config.theme.secondary : config.theme.primary,
                transform: `rotate(${sticker.rotation || 0}deg)`
              }}
            >
              {sticker.text}
            </div>
          </motion.div>
        );
      })}

      {/* Main Content Card */}
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', bounce: 0.35 }}
        className="relative z-10 max-w-lg flex flex-col items-center"
      >
        <Sparkles className="absolute -top-12 -left-8 animate-pulse text-amber-400" size={36} />
        <Sparkles className="absolute -bottom-8 -right-6 animate-pulse" style={{ color: config.theme.primary }} size={30} />

        {heroData.eyebrow && (
          <span 
            className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-extrabold px-4 py-1 rounded-full bg-white/70 backdrop-blur-md border border-stone-200/80 mb-5 shadow-sm"
            style={{ color: config.theme.secondary }}
          >
            {heroData.eyebrow}
          </span>
        )}

        {/* Hero Photo Card Placeholder / Image */}
        <div className="mb-6">
          <PhotoCard
            src={heroData.imageUrl || config.person.heroImageUrl}
            alt={config.person.name}
            variant="hero"
            caption="Add hero photo"
          />
        </div>

        <h1 
          className="font-handwritten text-5xl sm:text-6xl md:text-7xl drop-shadow-sm leading-tight whitespace-pre-line"
          style={{ color: config.theme.secondary }}
        >
          {heroData.title}
        </h1>

        {heroData.subtitle && (
          <p className="mt-4 text-base sm:text-lg font-medium text-stone-600 max-w-sm leading-relaxed">
            {heroData.subtitle}
          </p>
        )}
      </motion.div>

      {/* Primary CTA */}
      <motion.button
        className="absolute bottom-14 z-20 flex items-center gap-2 glass-card py-3.5 px-8 font-extrabold text-sm sm:text-base rounded-full shadow-xl active:scale-95 transition-all cursor-pointer"
        style={{ color: config.theme.secondary }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        onClick={onNext}
      >
        {heroData.ctaText || 'Explore Story'} <ChevronRight size={20} />
      </motion.button>
    </motion.div>
  );
}
