import React from "react";
import { CameraIcon, ImageIcon, PlusIcon } from "./icons";

interface PhotoPlaceholderProps {
  label?: string;
  sublabel?: string;
  variant?: "hero" | "gallery" | "polaroid" | "timeline" | "final";
  onClick?: () => void;
  className?: string;
}

export default function PhotoPlaceholder({
  label = "Add Photo",
  sublabel = "A memory worth keeping",
  variant = "gallery",
  onClick,
  className = "",
}: PhotoPlaceholderProps) {
  const variantStyles = {
    hero: "w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-3xl",
    gallery: "w-full h-56 sm:h-64 rounded-2xl",
    polaroid: "w-full h-56 sm:h-64 rounded-sm",
    timeline: "w-full h-44 sm:h-52 rounded-xl",
    final: "w-44 h-44 sm:w-56 sm:h-56 rounded-full",
  };

  if (variant === "polaroid") {
    return (
      <div
        onClick={onClick}
        className={`w-full h-56 sm:h-64 bg-stone-50 rounded-sm border-2 border-dashed border-stone-200 flex flex-col items-center justify-center p-4 text-center group hover:border-pink-300 transition-colors cursor-pointer ${className}`}
      >
        <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-stone-400 group-hover:text-pink-500 group-hover:scale-110 transition-all shadow-sm mb-2 border border-stone-100">
          <CameraIcon size={20} />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-stone-600 group-hover:text-pink-600 transition-colors">
          + {label}
        </span>
        <span className="text-[10px] text-stone-400 mt-0.5">{sublabel}</span>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden bg-stone-50/90 border-2 border-dashed border-stone-200/90 flex flex-col items-center justify-center p-4 text-center group hover:border-pink-300/80 transition-all cursor-pointer ${variantStyles[variant]} ${className}`}
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-stone-400 group-hover:text-pink-500 group-hover:scale-110 transition-all border border-stone-100 mb-2">
        {variant === "hero" ? <PlusIcon size={22} /> : <ImageIcon size={20} />}
      </div>
      <span className="text-xs font-extrabold uppercase tracking-wider text-stone-600 group-hover:text-pink-600 transition-colors">
        + {label}
      </span>
      {sublabel && (
        <span className="text-[10px] text-stone-400 font-medium mt-0.5">
          {sublabel}
        </span>
      )}
    </div>
  );
}
