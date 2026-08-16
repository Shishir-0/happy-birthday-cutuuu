import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import type { CutiePageConfig, CreditsItem } from '../types/config';
import PhotoCard from '../components/PhotoCard';

interface FinalRevealSectionProps {
  config: CutiePageConfig;
  onRestart: () => void;
}

export default function FinalRevealSection({ config, onRestart }: FinalRevealSectionProps) {
  const finalData = config.finalReveal;
  const credits = finalData?.credits || [];

  const particles = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      id: i,
      x: (i * 35) % 360,
      scale: 0.5 + (i % 5) * 0.1,
      opacity: 0.2 + (i % 4) * 0.1,
      duration: 10 + (i % 6) * 2,
    }));
  }, []);

  return (
    <motion.div
      className="relative w-full h-full flex flex-col items-center justify-center bg-stone-950 text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-t opacity-30 pointer-events-none" 
        style={{ backgroundImage: `linear-gradient(to top, ${config.theme.primary}50, transparent)` }}
      />

      {/* Floating Ambient Hearts */}
      <div className="absolute inset-0 overflow-hidden opacity-25 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute"
            style={{ color: config.theme.primary, left: `${p.x}px` }}
            initial={{ 
              y: '100vh', 
              scale: p.scale,
              opacity: p.opacity
            }}
            animate={{ 
              y: '-20vh',
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{ 
              duration: p.duration,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Heart fill="currentColor" size={28} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center h-full justify-center w-full max-w-md">
        {/* Rolling Movie Credits */}
        <motion.div
          initial={{ y: '40vh', opacity: 0 }}
          animate={{ y: '-18vh', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 12, ease: 'linear' }}
          className="absolute font-sans text-stone-300 space-y-8 pointer-events-none"
        >
          {credits.map((item: CreditsItem, idx: number) => (
            <div key={idx}>
              <div className="text-xs uppercase tracking-[0.25em] mb-1 font-bold" style={{ color: config.theme.primary }}>
                {item.label}
              </div>
              <div className="text-2xl sm:text-3xl font-handwritten text-white">
                {item.value}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Final Message & Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 11, duration: 1.5 }}
          className="mt-16 flex flex-col items-center"
        >
          <div className="mb-6">
            <PhotoCard
              src={finalData?.imageUrl}
              alt="Final memory"
              variant="final"
              caption="Add final photo"
            />
          </div>

          <h1 
            className="font-handwritten text-4xl sm:text-5xl md:text-6xl drop-shadow-[0_0_20px_rgba(255,182,193,0.5)] leading-tight mb-4 whitespace-pre-line"
            style={{ color: '#FCE7F3' }}
          >
            {finalData?.message || `thank you for existing,\n${config.person.nickname || config.person.name}`}
          </h1>

          {finalData?.subtext && (
            <p className="text-xs uppercase tracking-widest text-pink-300/70 font-semibold mb-8">
              {finalData.subtext}
            </p>
          )}
          
          <motion.button
            onClick={onRestart}
            className="px-8 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-pink-100 font-bold tracking-wide transition-all shadow-xl active:scale-95 text-sm sm:text-base cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {finalData?.buttonText || 'Replay Experience'}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
