import React from "react";
import { Text, useField, useTheme } from "@cutiepage/template-sdk";
import { motion } from "framer-motion";
import { SparklesIcon, ChevronDownIcon } from "./icons";
import PhotoCard from "./PhotoCard";

export default function HeroSection() {
  const theme = useTheme();
  const heroPhoto = useField<string>("heroPhoto");
  const showHero = useField<boolean>("showHero") ?? true;

  if (showHero === false) return null;

  const accent = theme.accent ?? "#e0507a";
  const secondary = theme.secondary ?? "#9f1239";
  const background = theme.background ?? "#fafaf9";

  return (
    <section
      className="relative min-h-[90vh] flex flex-col items-center justify-center p-6 text-center overflow-hidden"
      style={{ backgroundColor: background }}
    >
      {/* Decorative Sparkles */}
      <SparklesIcon className="absolute top-16 left-8 text-amber-400 opacity-70 animate-pulse" size={32} />
      <SparklesIcon className="absolute bottom-20 right-8 opacity-60 animate-pulse" style={{ color: accent }} size={28} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-xl flex flex-col items-center"
      >
        <span
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.22em] border shadow-sm mb-6"
          style={{
            backgroundColor: `color-mix(in srgb, ${accent} 12%, transparent)`,
            borderColor: `color-mix(in srgb, ${accent} 25%, transparent)`,
            color: secondary,
          }}
        >
          <span className="size-1.5 rounded-full" style={{ background: accent }} />
          <Text field="heroEyebrow" as="span" fallback="A Story Worth Remembering" />
        </span>

        {/* Hero Photo Card Placeholder / Image */}
        <div className="mb-6">
          <PhotoCard
            src={heroPhoto || undefined}
            variant="hero"
            caption="Main photo"
          />
        </div>

        <Text
          field="heroHeadline"
          as="h1"
          className="text-balance text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.08] tracking-[-0.03em]"
          style={{ color: secondary }}
          fallback="For Someone Truly Special"
        />

        <Text
          field="heroSubhead"
          as="p"
          className="mx-auto mt-5 max-w-md text-pretty text-base sm:text-lg leading-relaxed opacity-75 font-medium"
          fallback="Every smile, every moment, every chapter recorded forever."
        />
      </motion.div>

      <div className="absolute bottom-6 flex flex-col items-center opacity-60 animate-bounce">
        <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">Scroll</span>
        <ChevronDownIcon size={18} style={{ color: secondary }} />
      </div>
    </section>
  );
}
