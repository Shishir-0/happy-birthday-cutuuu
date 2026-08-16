import React, { useState } from "react";
import { Text, useField, useTheme } from "@cutiepage/template-sdk";
import { motion } from "framer-motion";
import PhotoCard from "./PhotoCard";
import LightboxModal from "./LightboxModal";

export default function GallerySection() {
  const theme = useTheme();
  const showGallery = useField<boolean>("showGallery") ?? true;

  const photo1 = useField<string>("galleryPhoto1");
  const photo2 = useField<string>("galleryPhoto2");
  const photo3 = useField<string>("galleryPhoto3");
  const photo4 = useField<string>("galleryPhoto4");

  const itemsRaw = useField<string>("galleryItems") ?? "";

  const [activeLightboxImage, setActiveLightboxImage] = useState<{
    src: string;
    caption: string;
  } | null>(null);

  if (showGallery === false) return null;

  const secondary = theme.secondary ?? "#9f1239";

  // Parse multiline text items: format "Label | Caption" per line
  const parsedItems = itemsRaw
    ? itemsRaw
        .split("\n")
        .filter(Boolean)
        .map((line) => {
          const [label, caption] = line.split("|").map((s) => s.trim());
          return { label: label || "Memory", caption: caption || "" };
        })
    : [
        { label: "The Beginning", caption: "Where it all started" },
        { label: "Favorite Trip", caption: "Sunsets and laughter" },
        { label: "Late Night Chat", caption: "Talking till 3 AM" },
        { label: "Forever Memory", caption: "A moment locked in time" },
      ];

  const photos = [
    { src: photo1, item: parsedItems[0] || { label: "Memory 1", caption: "" }, variant: "polaroid" as const },
    { src: photo2, item: parsedItems[1] || { label: "Memory 2", caption: "" }, variant: "gallery" as const },
    { src: photo3, item: parsedItems[2] || { label: "Memory 3", caption: "" }, variant: "polaroid" as const },
    { src: photo4, item: parsedItems[3] || { label: "Memory 4", caption: "" }, variant: "gallery" as const },
  ];

  return (
    <section className="py-16 px-6 max-w-4xl mx-auto text-center">
      <Text
        field="galleryTitle"
        as="h2"
        className="text-3xl sm:text-4xl font-bold tracking-tight mb-2"
        style={{ color: secondary }}
        fallback="Photo Archives & Memories"
      />
      <p className="text-xs uppercase tracking-widest font-extrabold text-stone-400 mb-10">
        Tap images to enlarge
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center">
        {photos.map((p, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="w-full flex justify-center"
          >
            <PhotoCard
              src={p.src || undefined}
              title={p.item.label}
              caption={p.item.caption}
              variant={p.variant}
              onClick={() => p.src && setActiveLightboxImage({ src: p.src, caption: p.item.label })}
            />
          </motion.div>
        ))}
      </div>

      <LightboxModal
        isOpen={!!activeLightboxImage}
        imageSrc={activeLightboxImage?.src}
        caption={activeLightboxImage?.caption}
        onClose={() => setActiveLightboxImage(null)}
      />
    </section>
  );
}
