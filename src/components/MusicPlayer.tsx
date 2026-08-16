import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import type { CutiePageConfig } from '../types/config';

interface MusicPlayerProps {
  config: CutiePageConfig;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function MusicPlayer({ config, isPlaying, setIsPlaying }: MusicPlayerProps) {
  const musicConfig = config.music;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showPrompt, setShowPrompt] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowPrompt(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!musicConfig?.enabled) return;

    if (isPlaying) {
      audioRef.current?.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, setIsPlaying, musicConfig?.enabled]);

  if (!musicConfig || !musicConfig.enabled) return null;

  const toggleMusic = () => {
    setShowPrompt(false);
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={musicConfig.audioUrl}
        loop
      />
      
      <motion.div
        drag
        dragConstraints={{ left: -100, right: 100, top: 0, bottom: 300 }}
        dragElastic={0.2}
        className="fixed top-4 right-4 z-50 flex items-center gap-3 glass bg-white/70 backdrop-blur-xl border border-white/60 p-2 pr-4 rounded-full shadow-xl text-gray-800"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5, delay: 1 }}
      >
        <button
          onClick={toggleMusic}
          className="relative flex items-center justify-center w-12 h-12 bg-gray-900 rounded-full shadow-inner overflow-hidden flex-shrink-0 cursor-pointer"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {/* Vinyl Texture */}
          <div className="absolute inset-0 rounded-full border-[4px] border-gray-800" />
          <div className="absolute inset-2 rounded-full border border-gray-700" />
          
          <motion.div
            className="absolute w-4 h-4 rounded-full z-10 flex items-center justify-center"
            style={{ backgroundColor: config.theme.primary }}
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/40 z-20"
            whileHover={{ opacity: 1 }}
            animate={{ opacity: isPlaying ? 0 : 1 }}
          >
            {isPlaying ? <Pause size={16} color="white" /> : <Play size={16} color="white" className="ml-0.5" />}
          </motion.div>
          
          {isPlaying && (
            <motion.div 
              className="absolute inset-0 bg-white/20 z-0 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)' }}
            />
          )}
        </button>

        <div className="flex flex-col min-w-[90px] max-w-[140px]">
          <span 
            className="text-[9px] uppercase font-extrabold tracking-wider truncate"
            style={{ color: config.theme.secondary }}
          >
            Now Playing
          </span>
          <span className="text-xs font-bold truncate leading-tight">
            {musicConfig.title}
          </span>
          <span className="text-[10px] text-gray-500 truncate">
            {musicConfig.artist}
          </span>
          <div className="flex items-end gap-[2px] h-2.5 mt-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 rounded-t-sm"
                style={{ backgroundColor: config.theme.primary }}
                animate={isPlaying ? {
                  height: ['20%', '100%', '40%', '80%', '30%'],
                } : { height: '20%' }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {showPrompt && !isPlaying && musicConfig.autoplayHint && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 right-4 z-40 bg-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-pink-200 animate-bounce cursor-pointer"
          style={{ color: config.theme.secondary }}
          onClick={toggleMusic}
        >
          {musicConfig.autoplayHint}
        </motion.div>
      )}
    </>
  );
}
