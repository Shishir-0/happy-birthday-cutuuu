import { motion } from 'framer-motion';
import { Heart, Star, Sparkles } from 'lucide-react';
import type { CutiePageConfig } from '../types/config';

interface FloatingDecorationsProps {
  config?: CutiePageConfig;
}

const DECORATIONS = [
  { id: 1, type: 'heart', size: 24, left: '10%', delay: 0, duration: 15 },
  { id: 2, type: 'star', size: 16, left: '25%', delay: 2, duration: 12 },
  { id: 3, type: 'sparkle', size: 20, left: '40%', delay: 5, duration: 18 },
  { id: 4, type: 'heart', size: 32, left: '60%', delay: 1, duration: 20 },
  { id: 5, type: 'star', size: 18, left: '80%', delay: 4, duration: 14 },
  { id: 6, type: 'heart', size: 22, left: '90%', delay: 7, duration: 16 },
  { id: 7, type: 'sparkle', size: 28, left: '50%', delay: 3, duration: 19 },
];

export default function FloatingDecorations({ config }: FloatingDecorationsProps) {
  const primaryColor = config?.theme?.primary || '#FF69B4';
  const secondaryColor = config?.theme?.secondary || '#FF1493';
  const accentColor = config?.theme?.accent || '#FACC15';

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {DECORATIONS.map((dec) => {
        const Icon = dec.type === 'heart' ? Heart : dec.type === 'star' ? Star : Sparkles;
        const color = dec.type === 'heart' ? primaryColor : dec.type === 'star' ? accentColor : secondaryColor;
        
        return (
          <motion.div
            key={dec.id}
            className="absolute bottom-[-50px] opacity-30"
            style={{ left: dec.left, color }}
            initial={{ y: 0, rotate: 0, opacity: 0 }}
            animate={{
              y: ['0vh', '-110vh'],
              rotate: [0, 180, 360],
              opacity: [0, 0.4, 0.4, 0],
            }}
            transition={{
              duration: dec.duration,
              repeat: Infinity,
              delay: dec.delay,
              ease: 'linear',
            }}
          >
            <Icon size={dec.size} fill={dec.type === 'heart' || dec.type === 'star' ? 'currentColor' : 'none'} />
          </motion.div>
        );
      })}
    </div>
  );
}
