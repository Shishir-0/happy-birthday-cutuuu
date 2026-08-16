import React, { useEffect, useRef, useState } from "react";
import { useField, useTheme, useMode } from "@cutiepage/template-sdk";
import { motion } from "framer-motion";
import { PlayIcon, PauseIcon } from "./icons";

export default function MusicPlayer() {
  const theme = useTheme();
  const mode = useMode();
  const musicTrack = useField<string>("musicTrack");
  const musicTitle = useField<string>("musicTitle") ?? "Romantic Symphony";
  const musicArtist = useField<string>("musicArtist") ?? "Background Music";

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Pause playback in editor mode
  useEffect(() => {
    if (mode === "edit" && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  }, [mode, isPlaying]);

  if (!musicTrack) return null;

  const accent = theme.accent ?? "#e0507a";
  const secondary = theme.secondary ?? "#9f1239";

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        ?.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <>
      <audio ref={audioRef} src={musicTrack} loop />

      <motion.div
        className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-white/60 p-2 pr-4 rounded-full shadow-xl text-stone-800"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <button
          onClick={toggleMusic}
          className="relative flex items-center justify-center w-11 h-11 bg-stone-900 rounded-full shadow-inner overflow-hidden flex-shrink-0 cursor-pointer"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          <div className="absolute inset-0 rounded-full border-[3px] border-stone-800" />
          <motion.div
            className="absolute w-3.5 h-3.5 rounded-full z-10 flex items-center justify-center"
            style={{ backgroundColor: accent }}
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-1 h-1 bg-white rounded-full" />
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-20">
            {isPlaying ? (
              <PauseIcon size={15} color="white" />
            ) : (
              <PlayIcon size={15} color="white" className="ml-0.5" />
            )}
          </div>
        </button>

        <div className="flex flex-col min-w-[80px] max-w-[130px]">
          <span
            className="text-[9px] uppercase font-extrabold tracking-wider truncate"
            style={{ color: secondary }}
          >
            Music
          </span>
          <span className="text-xs font-bold truncate leading-tight">
            {musicTitle}
          </span>
          <span className="text-[10px] text-stone-400 truncate">
            {musicArtist}
          </span>
        </div>
      </motion.div>
    </>
  );
}
