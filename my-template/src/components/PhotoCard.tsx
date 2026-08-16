import React, { useState } from "react";
import { motion } from "framer-motion";
import PhotoPlaceholder from "./PhotoPlaceholder";

export interface PhotoCardProps {
  src?: string;
  alt?: string;
  title?: string;
  caption?: string;
  date?: string;
  variant?: "hero" | "gallery" | "polaroid" | "timeline" | "final";
  onClick?: () => void;
  className?: string;
}

export default function PhotoCard({
  src,
  alt = "Memory photo",
  title,
  caption,
  date,
  variant = "gallery",
  onClick,
  className = "",
}: PhotoCardProps) {
  const [hasError, setHasError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isPlaceholder = !src || hasError;

  const variantStyles = {
    hero: "w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-3xl shadow-2xl",
    gallery: "w-full h-56 sm:h-64 rounded-2xl shadow-lg",
    polaroid: "w-64 sm:w-72 bg-white p-3.5 pb-12 rounded-sm shadow-xl border border-gray-100",
    timeline: "w-full h-44 sm:h-52 rounded-xl shadow-md",
    final: "w-44 h-44 sm:w-56 sm:h-56 rounded-full shadow-2xl border-4 border-white/20",
  };

  if (isPlaceholder) {
    return (
      <PhotoPlaceholder
        label="Add Photo"
        sublabel={caption || "A memory worth keeping"}
        variant={variant}
        onClick={onClick}
        className={className}
      />
    );
  }

  if (variant === "polaroid") {
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
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        {(title || caption) && (
          <div className="font-handwritten text-center text-2xl text-stone-800 leading-snug break-words px-2">
            {title || caption}
          </div>
        )}
        {date && (
          <div className="text-[10px] text-stone-400 text-center font-sans uppercase tracking-widest mt-1">
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
        transition={{ duration: 0.4 }}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      {(title || caption) && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 text-white text-left">
          {title && <div className="font-bold text-sm leading-tight">{title}</div>}
          {caption && (
            <div className="text-xs text-stone-200 font-medium truncate mt-0.5">
              {caption}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
