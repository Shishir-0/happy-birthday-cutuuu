import type { CutiePageConfig, SectionType } from '../types/config';

export function validateCutiePageConfig(inputConfig: unknown): CutiePageConfig {
  if (!inputConfig || typeof inputConfig !== 'object') {
    console.warn('[CutiePage Engine] Invalid configuration input. Using default fallback.');
    return fallbackConfig;
  }

  const raw = inputConfig as Partial<CutiePageConfig>;

  // Ensure site
  const site = {
    slug: raw.site?.slug || 'custom-page',
    title: raw.site?.title || 'CutiePage Story',
    description: raw.site?.description || 'A personalized CutiePage experience',
    favicon: raw.site?.favicon,
    ogImage: raw.site?.ogImage,
  };

  // Ensure person
  const person = {
    name: raw.person?.name || 'Someone Special',
    nickname: raw.person?.nickname || raw.person?.name || 'Cutie',
    partnerName: raw.person?.partnerName,
    partnerUsername: raw.person?.partnerUsername,
    avatarUrl: raw.person?.avatarUrl,
    heroImageUrl: raw.person?.heroImageUrl,
    ageOrMilestone: raw.person?.ageOrMilestone,
  };

  // Ensure theme
  const theme = {
    name: raw.theme?.name || 'Default Theme',
    mode: raw.theme?.mode || 'light',
    primary: raw.theme?.primary || '#FF69B4',
    secondary: raw.theme?.secondary || '#FF1493',
    accent: raw.theme?.accent || '#FACC15',
    background: raw.theme?.background || '#FFF0F5',
    surface: raw.theme?.surface || '#FFFFFF',
    text: raw.theme?.text || '#1F2937',
    mutedText: raw.theme?.mutedText || '#6B7280',
    border: raw.theme?.border || '#FCE7F3',
    glassBg: raw.theme?.glassBg || 'rgba(255, 255, 255, 0.6)',
    fontHeading: raw.theme?.fontHeading || "'Pacifico', cursive",
    fontBody: raw.theme?.fontBody || "'Nunito', 'Inter', sans-serif",
  };

  // Ensure sections mapping
  const defaultSections: Record<SectionType, boolean> = {
    hero: true,
    game: true,
    candle: true,
    gallery: true,
    timeline: true,
    reasons: true,
    letter: true,
    stickers: true,
    final: true,
  };

  const sections = {
    ...defaultSections,
    ...(raw.sections || {}),
  };

  const validSectionKeys: SectionType[] = [
    'hero', 'game', 'candle', 'gallery', 'timeline', 'reasons', 'letter', 'stickers', 'final'
  ];

  const sectionOrder = Array.isArray(raw.sectionOrder)
    ? raw.sectionOrder.filter((key): key is SectionType => validSectionKeys.includes(key as SectionType))
    : validSectionKeys;

  return {
    ...raw,
    site,
    person,
    theme,
    sections,
    sectionOrder,
    hero: {
      enabled: raw.hero?.enabled ?? true,
      title: raw.hero?.title || `For ${person.name}`,
      subtitle: raw.hero?.subtitle,
      eyebrow: raw.hero?.eyebrow,
      ctaText: raw.hero?.ctaText,
      stickers: Array.isArray(raw.hero?.stickers) ? raw.hero?.stickers : [],
    },
    finalReveal: {
      enabled: raw.finalReveal?.enabled ?? true,
      credits: Array.isArray(raw.finalReveal?.credits) ? raw.finalReveal?.credits : [],
      message: raw.finalReveal?.message || `Thank you for being in my life, ${person.name}`,
      subtext: raw.finalReveal?.subtext,
      buttonText: raw.finalReveal?.buttonText || 'Replay',
    },
  } as CutiePageConfig;
}

const fallbackConfig: CutiePageConfig = {
  site: {
    slug: 'default',
    title: 'CutiePage Story',
    description: 'A CutiePage digital experience',
  },
  person: {
    name: 'Special Someone',
    nickname: 'Cutie',
  },
  theme: {
    name: 'Pastel Pink',
    mode: 'light',
    primary: '#FF69B4',
    secondary: '#FF1493',
    accent: '#FACC15',
    background: '#FFF0F5',
    surface: '#FFFFFF',
    text: '#1F2937',
    mutedText: '#6B7280',
    border: '#FCE7F3',
    glassBg: 'rgba(255, 255, 255, 0.6)',
  },
  hero: {
    enabled: true,
    title: 'Hello Cutie',
    ctaText: 'Start Story',
  },
  finalReveal: {
    enabled: true,
    credits: [],
    message: 'Thank you for existing!',
    buttonText: 'Replay',
  },
  sections: {
    hero: true,
    game: false,
    candle: false,
    gallery: false,
    timeline: false,
    reasons: false,
    letter: false,
    stickers: false,
    final: true,
  },
  sectionOrder: ['hero', 'final'],
};
