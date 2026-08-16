import React from "react";
import { Text, useField, useTheme } from "@cutiepage/template-sdk";
import { motion } from "framer-motion";

export default function IntroSection() {
  const theme = useTheme();
  const showIntro = useField<boolean>("showIntro") ?? true;

  if (showIntro === false) return null;

  const secondary = theme.secondary ?? "#9f1239";
  const border = theme.border ?? "#e7e5e4";

  return (
    <section className="py-16 px-6 max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-lg border border-stone-200/80 relative"
      >
        <div className="w-12 h-1 rounded-full mx-auto mb-6 opacity-40" style={{ backgroundColor: secondary }} />
        
        <Text
          field="introTitle"
          as="h2"
          className="text-2xl sm:text-3xl font-bold tracking-tight mb-4"
          style={{ color: secondary }}
          fallback="Why This Story Matters"
        />

        <Text
          field="introBody"
          as="p"
          className="text-base sm:text-lg text-stone-600 leading-relaxed font-medium whitespace-pre-line"
          fallback="Some memories are too precious to stay trapped inside a camera roll. This page was created to celebrate our journey, our laughs, and everything that makes us who we are."
        />

        <div className="mt-8 pt-6 border-t border-dashed flex justify-center opacity-60" style={{ borderColor: border }}>
          <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-stone-400">Our Story • Chapter One</span>
        </div>
      </motion.div>
    </section>
  );
}
