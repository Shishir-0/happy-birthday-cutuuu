import React from "react";
import { Text, useField, useTheme } from "@cutiepage/template-sdk";
import { motion } from "framer-motion";
import { HeartIcon } from "./icons";
import PhotoCard from "./PhotoCard";
import { useHydrated } from "../hooks/useHydrated";

export default function FinalRevealSection() {
  const theme = useTheme();
  const isHydrated = useHydrated();
  const showFinal = useField<boolean>("showFinal") ?? true;
  const finalPhoto = useField<string>("finalPhoto");
  const creditsRaw = useField<string>("creditsText") ?? "";

  if (showFinal === false) return null;

  const accent = theme.accent ?? "#e0507a";

  // Parse multiline credits: "Label | Value"
  const credits = creditsRaw
    ? creditsRaw
        .split("\n")
        .filter(Boolean)
        .map((line) => {
          const [label, value] = line.split("|").map((s) => s.trim());
          return { label: label || "Role", value: value || "Name" };
        })
    : [
        { label: "Starring", value: "Someone Special" },
        { label: "Directed By", value: "Your Name" },
        { label: "Status", value: "Forever & Always" },
      ];

  // Pre-calculated static particle positions for SSR safety
  const staticParticles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: (i * 45) % 320,
    scale: 0.6 + (i % 4) * 0.1,
    duration: 8 + (i % 5) * 2,
  }));

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center p-6 text-center bg-stone-950 text-white overflow-hidden rounded-t-[3rem]">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse at center, ${accent} 0%, transparent 70%)`,
        }}
      />

      {/* Floating Ambient Hearts (rendered only post-hydration) */}
      {isHydrated && (
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          {staticParticles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute"
              style={{ color: accent, left: `${p.x}px` }}
              initial={{ y: "100vh", scale: p.scale }}
              animate={{
                y: "-20vh",
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <HeartIcon fill="currentColor" size={24} />
            </motion.div>
          ))}
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center max-w-md mx-auto py-12">
        {/* Credits */}
        <div className="mb-10 space-y-4">
          {credits.map((item, idx) => (
            <div key={idx}>
              <div
                className="text-[10px] uppercase tracking-[0.25em] font-extrabold mb-0.5"
                style={{ color: accent }}
              >
                {item.label}
              </div>
              <div className="text-xl sm:text-2xl font-handwritten text-white">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Final Photo Placeholder / Image */}
        <div className="mb-6">
          <PhotoCard
            src={finalPhoto || undefined}
            variant="final"
            caption="Final photo"
          />
        </div>

        <Text
          field="finalHeadline"
          as="h2"
          className="font-handwritten text-4xl sm:text-5xl md:text-6xl leading-tight mb-4 text-pink-100 drop-shadow-lg"
          fallback="thank you for existing"
        />

        <Text
          field="finalMessage"
          as="p"
          className="text-xs uppercase tracking-widest text-stone-300/80 font-bold max-w-xs"
          fallback="Created with CutiePage.in"
        />
      </div>
    </section>
  );
}
