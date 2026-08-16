import { motion } from 'framer-motion';
import type { CutiePageConfig, TimelineEvent } from '../types/config';
import PhotoCard from '../components/PhotoCard';
import { Calendar, ChevronRight } from 'lucide-react';

interface TimelineSectionProps {
  config: CutiePageConfig;
  onNext?: () => void;
}

export default function TimelineSection({ config, onNext }: TimelineSectionProps) {
  const timelineData = config.timeline;
  const events = timelineData?.events || [];

  return (
    <motion.div
      className="relative w-full h-full p-4 sm:p-6 overflow-hidden flex flex-col items-center justify-center"
      style={{ backgroundColor: config.theme.mode === 'dark' ? '#0F172A' : '#FAFAF9' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full h-full relative overflow-y-auto overflow-x-hidden pb-28 hide-scrollbar max-w-xl mx-auto flex flex-col items-center">
        <h2 
          className="text-center font-handwritten text-3xl sm:text-4xl mt-6 mb-2 drop-shadow-sm"
          style={{ color: config.theme.secondary }}
        >
          {timelineData?.title || 'Our Journey Timeline'}
        </h2>
        {timelineData?.subtitle && (
          <p className="text-center text-xs uppercase tracking-widest font-extrabold mb-8 text-stone-500">
            {timelineData.subtitle}
          </p>
        )}

        <div className="relative w-full pl-6 sm:pl-8 border-l-2 border-dashed my-4 space-y-8" style={{ borderColor: config.theme.border }}>
          {events.map((event: TimelineEvent, i: number) => (
            <motion.div
              key={i}
              className="relative flex flex-col items-start"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2, type: 'spring' }}
            >
              {/* Timeline Dot Icon */}
              <div 
                className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white shadow-md"
                style={{ backgroundColor: config.theme.primary }}
              >
                <Calendar size={14} />
              </div>

              <div className="bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-lg border border-stone-200/80 w-full text-left">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span 
                    className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: `${config.theme.primary}18`, color: config.theme.secondary }}
                  >
                    {event.date}
                  </span>
                  {event.tag && (
                    <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md font-semibold">
                      {event.tag}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-stone-900 leading-snug">
                  {event.title}
                </h3>
                <p className="text-sm text-stone-600 mt-1 leading-relaxed">
                  {event.description}
                </p>

                <div className="mt-3">
                  <PhotoCard
                    src={event.image}
                    title={event.title}
                    variant="timeline"
                    caption="Add timeline photo"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {onNext && (
          <div className="flex justify-center mt-8 mb-4">
            <button
              onClick={onNext}
              className="flex items-center gap-2 glass-card py-3 px-6 text-sm font-bold rounded-full shadow-lg active:scale-95 transition-transform cursor-pointer"
              style={{ color: config.theme.secondary }}
            >
              Next Chapter <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
