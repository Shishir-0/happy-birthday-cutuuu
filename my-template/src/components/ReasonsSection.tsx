import React, { useState } from "react";
import { Text, useField, useTheme } from "@cutiepage/template-sdk";
import { motion, AnimatePresence } from "framer-motion";
import { HeartIcon, SparklesIcon } from "./icons";

export default function ReasonsSection() {
  const theme = useTheme();
  const showReasons = useField<boolean>("showReasons") ?? true;
  const reasonsRaw = useField<string>("reasonsList") ?? "";
  const [revealed, setRevealed] = useState<number[]>([]);

  if (showReasons === false) return null;

  const accent = theme.accent ?? "#e0507a";
  const secondary = theme.secondary ?? "#9f1239";

  const reasons = reasonsRaw
    ? reasonsRaw.split("\n").filter(Boolean)
    : [
        "Your warmth and laughter light up every room you enter",
        "Always keeping it 100% genuine and real",
        "Your incredible ability to make hard days feel easy",
        "The quiet moments that mean everything",
        "Simply being one of one in this world",
      ];

  const toggleReveal = (index: number) => {
    if (revealed.includes(index)) {
      setRevealed(revealed.filter((i) => i !== index));
    } else {
      setRevealed([...revealed, index]);
    }
  };

  return (
    <section className="py-16 px-6 max-w-lg mx-auto text-center">
      <Text
        field="reasonsTitle"
        as="h2"
        className="text-3xl sm:text-4xl font-bold tracking-tight mb-1"
        style={{ color: secondary }}
        fallback="Reasons Why You Matter"
      />
      <Text
        field="reasonsSubtitle"
        as="p"
        className="text-xs uppercase tracking-widest font-extrabold text-stone-500 mb-8"
        fallback="Tap cards to reveal"
      />

      <div className="w-full flex flex-col gap-3.5">
        {reasons.map((reason, i) => {
          const isOpened = revealed.includes(i);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              onClick={() => toggleReveal(i)}
              className="w-full bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-md border border-stone-200/80 cursor-pointer hover:shadow-lg transition-all text-left"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs text-white shadow-sm flex-shrink-0"
                    style={{ backgroundColor: accent }}
                  >
                    #{i + 1}
                  </span>
                  <span className="font-semibold text-sm sm:text-base text-stone-800">
                    {isOpened ? reason : "Tap to unlock reason ✨"}
                  </span>
                </div>
                {isOpened ? (
                  <SparklesIcon size={18} className="text-amber-400 flex-shrink-0" />
                ) : (
                  <HeartIcon size={18} style={{ color: secondary }} className="flex-shrink-0" />
                )}
              </div>

              <AnimatePresence>
                {isOpened && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 pt-2 border-t border-stone-100 text-xs text-stone-400 italic"
                  >
                    Fact verified ❤️
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
