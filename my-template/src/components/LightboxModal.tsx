import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "./icons";

interface LightboxModalProps {
  isOpen: boolean;
  imageSrc?: string;
  caption?: string;
  onClose: () => void;
}

export default function LightboxModal({
  isOpen,
  imageSrc,
  caption,
  onClose,
}: LightboxModalProps) {
  if (!isOpen || !imageSrc) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div
          className="relative max-w-3xl w-full bg-white/10 p-2 rounded-2xl border border-white/20 shadow-2xl flex flex-col items-center overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors"
            aria-label="Close photo"
          >
            <XIcon size={22} />
          </button>

          <img
            src={imageSrc}
            alt={caption || "Enlarged photo"}
            className="max-h-[80vh] w-auto object-contain rounded-xl shadow-lg"
          />

          {caption && (
            <p className="mt-3 font-sans font-semibold text-lg text-white text-center px-4 py-2">
              {caption}
            </p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
