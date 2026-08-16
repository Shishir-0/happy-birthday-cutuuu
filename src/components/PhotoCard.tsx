import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Image as ImageIcon, Plus } from 'lucide-react';

export interface PhotoCardProps {
  src?: string;
  alt?: string;
  title?: string;
  caption?: string;
  date?: string;
  variant?: 'hero' | 'gallery' | 'polaroid' | 'timeline' | 'final';
  onClick?: () => void;
  className?: string;
}

export default function PhotoCard({
  src,
  alt = 'Photo memory',
  title,
  caption,
  date,
  variant = 'gallery',
  onClick,
  className = '',
}: PhotoCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const isPlaceholder = !src || hasError;

  // Variant Specific Layout Classes
  const variantStyles = {
    hero: 'w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-3xl shadow-2xl',
    gallery: 'w-full h-56 sm:h-64 rounded-2xl shadow-lg',
    polaroid: 'w-64 sm:w-72 bg-white p-3.5 pb-12 rounded-sm shadow-xl border border-gray-100',
    timeline: 'w-full h-44 sm:h-52 rounded-xl shadow-md',
    final: 'w-48 h-48 sm:w-60 sm:h-60 rounded-full shadow-2xl border-4 border-white/20',
  };

  if (isPlaceholder) {
    if (variant === 'polaroid') {
      return (
        <div 
          onClick={onClick}
          className={`bg-white p-3.5 pb-12 rounded-sm shadow-xl border border-gray-100 w-64 sm:w-72 cursor-pointer transform transition-transform hover:scale-[1.02] ${className}`}
        >
          <div className="w-full h-56 sm:h-64 bg-stone-50 rounded-sm border-2 border-dashed border-stone-200 flex flex-col items-center justify-center p-4 text-center group hover:border-pink-300 transition-colors">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 group-hover:text-pink-500 group-hover:scale-110 transition-all shadow-inner mb-2">
              <Camera size={22} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 group-hover:text-pink-600 transition-colors">
              + Add Photo
            </span>
            <span className="text-[10px] text-stone-400 mt-1">A memory worth keeping</span>
          </div>
          {title && (
            <div className="font-handwritten text-center text-xl text-gray-800 leading-snug mt-3">
              {title}
            </div>
          )}
        </div>
      );
    }

    return (
      <div 
        onClick={onClick}
        className={`relative overflow-hidden bg-stone-50/90 border-2 border-dashed border-stone-200/90 flex flex-col items-center justify-center p-4 text-center group hover:border-pink-300/80 transition-all cursor-pointer ${variantStyles[variant]} ${className}`}
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-stone-400 group-hover:text-pink-500 group-hover:scale-110 transition-all border border-stone-100 mb-2">
          {variant === 'hero' ? <Plus size={24} /> : <ImageIcon size={22} />}
        </div>
        <span className="text-xs font-extrabold uppercase tracking-wider text-stone-600 group-hover:text-pink-600 transition-colors">
          + Add Photo
        </span>
        <span className="text-[10px] text-stone-400 font-medium mt-0.5">
          {caption || 'Your memory slot'}
        </span>
      </div>
    );
  }

  // Populated Photo State
  if (variant === 'polaroid') {
    return (
      <div 
        onClick={onClick}
        className={`bg-white p-3.5 pb-12 rounded-sm shadow-xl border border-gray-100 w-64 sm:w-72 cursor-pointer transform transition-transform hover:scale-[1.02] relative ${className}`}
      >
        <div className="w-full h-56 sm:h-64 bg-stone-100 rounded-sm mb-3 overflow-hidden relative shadow-inner">
          <motion.img 
            src={src} 
            alt={alt}
            onLoad={() => setImageLoaded(true)}
            onError={() => setHasError(true)}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: imageLoaded ? 1 : 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        {(title || caption) && (
          <div className="font-handwritten text-center text-2xl text-gray-800 leading-snug break-words px-2">
            {title || caption}
          </div>
        )}
        {date && (
          <div className="text-[10px] text-gray-400 text-center font-sans uppercase tracking-widest mt-1">
            {date}
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className={`relative overflow-hidden bg-stone-100 group cursor-pointer ${variantStyles[variant]} ${className}`}
    >
      <motion.img 
        src={src} 
        alt={alt}
        onLoad={() => setImageLoaded(true)}
        onError={() => setHasError(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      {(title || caption) && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 text-white text-left">
          {title && <div className="font-bold text-sm leading-tight">{title}</div>}
          {caption && <div className="text-xs text-stone-200 font-medium truncate mt-0.5">{caption}</div>}
        </div>
      )}
    </div>
  );
}
