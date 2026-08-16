import React from "react";
import { Text, useField, useTheme } from "@cutiepage/template-sdk";
import { motion } from "framer-motion";
import { CalendarIcon } from "./icons";
import PhotoCard from "./PhotoCard";

export default function TimelineSection() {
  const theme = useTheme();
  const showTimeline = useField<boolean>("showTimeline") ?? true;
  const timelinePhoto = useField<string>("timelinePhoto");
  const eventsRaw = useField<string>("timelineEvents") ?? "";

  if (showTimeline === false) return null;

  const accent = theme.accent ?? "#e0507a";
  const secondary = theme.secondary ?? "#9f1239";
  const border = theme.border ?? "#e7e5e4";

  // Parse multiline events: "Date | Title | Description"
  const events = eventsRaw
    ? eventsRaw
        .split("\n")
        .filter(Boolean)
        .map((line) => {
          const [date, title, description] = line.split("|").map((s) => s.trim());
          return {
            date: date || "Chapter",
            title: title || "Milestone",
            description: description || "",
          };
        })
    : [
        {
          date: "Chapter 1",
          title: "The First Spark",
          description: "When our story first began with a single conversation.",
        },
        {
          date: "Chapter 2",
          title: "Endless Adventures",
          description: "Unplanned trips, late night laughter, and unforgettable days.",
        },
        {
          date: "Chapter 3",
          title: "Looking Ahead",
          description: "Stepping into the future with unstoppable happiness.",
        },
      ];

  return (
    <section className="py-16 px-6 max-w-xl mx-auto">
      <div className="text-center mb-8">
        <Text
          field="timelineTitle"
          as="h2"
          className="text-3xl sm:text-4xl font-bold tracking-tight mb-1"
          style={{ color: secondary }}
          fallback="Our Journey Timeline"
        />
        <Text
          field="timelineSubtitle"
          as="p"
          className="text-xs uppercase tracking-widest font-extrabold text-stone-500"
          fallback="Moments that defined our story"
        />
      </div>

      <div
        className="relative pl-6 sm:pl-8 border-l-2 border-dashed space-y-8 my-4"
        style={{ borderColor: border }}
      >
        {events.map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            className="relative flex flex-col items-start"
          >
            {/* Timeline Dot */}
            <div
              className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white shadow-md"
              style={{ backgroundColor: accent }}
            >
              <CalendarIcon size={14} />
            </div>

            <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-md border border-stone-200/80 w-full text-left">
              <span
                className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block mb-2"
                style={{
                  backgroundColor: `color-mix(in srgb, ${accent} 15%, transparent)`,
                  color: secondary,
                }}
              >
                {event.date}
              </span>

              <h3 className="text-lg font-bold text-stone-900 leading-snug">
                {event.title}
              </h3>
              {event.description && (
                <p className="text-sm text-stone-600 mt-1 leading-relaxed font-medium">
                  {event.description}
                </p>
              )}

              {i === 0 && (
                <div className="mt-3">
                  <PhotoCard
                    src={timelinePhoto || undefined}
                    variant="timeline"
                    caption="Timeline photo"
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
