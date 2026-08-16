import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';
import type { CutiePageConfig } from '../types/config';

interface LoadingSectionProps {
  config: CutiePageConfig;
  onComplete: () => void;
  setMusicPlaying: (playing: boolean) => void;
}

export default function LoadingSection({ config, onComplete, setMusicPlaying }: LoadingSectionProps) {
  const [progress, setProgress] = useState(0);
  const loadingData = config.loading;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (config.music?.enabled) setMusicPlaying(true);
            onComplete();
          }, 600);
          return 100;
        }
        return prev + Math.floor(Math.random() * 18) + 8;
      });
    }, 280);

    return () => clearInterval(interval);
  }, [config.music?.enabled, onComplete, setMusicPlaying]);

  const phraseIndex = Math.min(
    Math.floor((progress / 100) * (loadingData?.phrases.length || 1)),
    (loadingData?.phrases.length || 1) - 1
  );

  return (
    <motion.div
      className="absolute inset-0 z-40 flex flex-col items-center justify-center p-6 text-center"
      style={{ backgroundColor: config.theme.background }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <div className="relative w-64 h-64 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        >
          <Heart className="absolute top-0 left-1/2 -translate-x-1/2" style={{ color: config.theme.primary }} size={32} fill="currentColor" />
          <Star className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{ color: config.theme.accent }} size={24} fill="currentColor" />
          <Sparkles className="absolute top-1/2 left-0 -translate-y-1/2 text-purple-400" size={28} />
          <Heart className="absolute top-1/2 right-0 -translate-y-1/2" style={{ color: config.theme.secondary }} size={20} fill="currentColor" />
        </motion.div>
        
        <div className="glass-card flex flex-col items-center justify-center z-10 w-48 h-48 rounded-full shadow-2xl">
          <span 
            className="font-handwritten text-4xl mb-2"
            style={{ color: config.theme.secondary }}
          >
            {progress}%
          </span>
          <div className="w-24 h-2 bg-gray-200/50 rounded-full overflow-hidden">
            <motion.div 
              className="h-full"
              style={{ backgroundColor: config.theme.primary }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
      
      <motion.div 
        className="mt-8 px-6 max-w-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-xl font-bold text-gray-800 leading-snug">
          {loadingData?.phrases[phraseIndex] || `Loading ${config.person.name}...`}
        </p>
        {loadingData?.subtitle && (
          <span 
            className="text-xs uppercase tracking-widest font-extrabold mt-2 block"
            style={{ color: config.theme.secondary }}
          >
            {loadingData.subtitle}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
