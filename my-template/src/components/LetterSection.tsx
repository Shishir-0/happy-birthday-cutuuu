import React from "react";
import { Text, useField, useTheme } from "@cutiepage/template-sdk";
import { motion } from "framer-motion";
import { HeartIcon } from "./icons";

export default function LetterSection() {
  const theme = useTheme();
  const showLetter = useField<boolean>("showLetter") ?? true;

  if (showLetter === false) return null;

  const accent = theme.accent ?? "#e0507a";
  const secondary = theme.secondary ?? "#9f1239";

  return (
    <section className="py-16 px-6 max-w-lg mx-auto text-center">
      <Text
        field="letterTitle"
        as="h2"
        className="text-3xl sm:text-4xl font-bold tracking-tight mb-6"
        style={{ color: secondary }}
        fallback="A Personal Note"
      />

      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-white/95 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-stone-200/80 relative text-left"
      >
        {/* Decorative Stamp */}
        <div className="absolute top-6 right-6 w-12 h-14 border-2 border-dashed border-stone-300/80 rounded-md p-1 flex flex-col items-center justify-center text-center opacity-70 rotate-6">
          <HeartIcon size={16} fill="currentColor" style={{ color: accent }} />
          <span className="text-[8px] font-bold uppercase mt-0.5 text-stone-500">Love</span>
        </div>

        <Text
          field="letterSalutation"
          as="p"
          className="font-handwritten text-2xl text-stone-900 mb-4"
          fallback="Dearest Someone Special,"
        />

        <Text
          field="letterBody"
          as="div"
          className="font-sans text-sm sm:text-base text-stone-700 leading-relaxed whitespace-pre-line space-y-3 font-medium"
          fallback={`Thank you for bringing so much joy, laughter, and light into this world.

Watching you stay true to yourself and inspire everyone around you is nothing short of incredible.

Here is to creating even more legendary chapters together!`}
        />

        <div className="mt-8 pt-4 border-t border-stone-100 flex flex-col items-end">
          <Text
            field="letterSignature"
            as="p"
            className="font-handwritten text-2xl text-stone-900"
            style={{ color: secondary }}
            fallback="With all my love, Your Name ✨"
          />
          <Text
            field="letterDate"
            as="span"
            className="text-xs text-stone-400 mt-1"
            fallback="August 2026"
          />
        </div>
      </motion.div>
    </section>
  );
}
