import { AnimatePresence } from 'framer-motion';
import type { CutiePageConfig, SectionType } from '../types/config';

import HeroSection from '../sections/HeroSection';
import FollowGameSection from '../sections/FollowGameSection';
import CandleSection from '../sections/CandleSection';
import GallerySection from '../sections/GallerySection';
import TimelineSection from '../sections/TimelineSection';
import ReasonsSection from '../sections/ReasonsSection';
import LetterSection from '../sections/LetterSection';
import StickerChaosSection from '../sections/StickerChaosSection';
import FinalRevealSection from '../sections/FinalRevealSection';

interface PageRendererProps {
  config: CutiePageConfig;
  currentSectionIndex: number;
  onNextSection: () => void;
  onRestart: () => void;
}

export default function PageRenderer({
  config,
  currentSectionIndex,
  onNextSection,
  onRestart,
}: PageRendererProps) {
  const enabledSections: SectionType[] = (config.sectionOrder || [
    'hero', 'game', 'candle', 'gallery', 'timeline', 'reasons', 'letter', 'stickers', 'final'
  ]).filter((sectionKey) => config.sections[sectionKey] !== false);

  const activeSectionKey = enabledSections[currentSectionIndex] || enabledSections[0] || 'hero';

  return (
    <AnimatePresence mode="wait">
      {activeSectionKey === 'hero' && (
        <HeroSection key="hero" config={config} onNext={onNextSection} />
      )}
      {activeSectionKey === 'game' && (
        <FollowGameSection key="game" config={config} onNext={onNextSection} />
      )}
      {activeSectionKey === 'candle' && (
        <CandleSection key="candle" config={config} onNext={onNextSection} />
      )}
      {activeSectionKey === 'gallery' && (
        <GallerySection key="gallery" config={config} onNext={onNextSection} />
      )}
      {activeSectionKey === 'timeline' && (
        <TimelineSection key="timeline" config={config} onNext={onNextSection} />
      )}
      {activeSectionKey === 'reasons' && (
        <ReasonsSection key="reasons" config={config} onNext={onNextSection} />
      )}
      {activeSectionKey === 'letter' && (
        <LetterSection key="letter" config={config} onNext={onNextSection} />
      )}
      {activeSectionKey === 'stickers' && (
        <StickerChaosSection key="stickers" config={config} onNext={onNextSection} />
      )}
      {activeSectionKey === 'final' && (
        <FinalRevealSection key="final" config={config} onRestart={onRestart} />
      )}
    </AnimatePresence>
  );
}
