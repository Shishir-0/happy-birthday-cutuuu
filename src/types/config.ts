export type MediaSource = {
  type?: 'image' | 'video' | 'placeholder';
  src?: string;
  alt?: string;
  caption?: string;
  label?: string;
};

export type ThemeTokens = {
  name: string;
  mode: 'light' | 'dark' | 'glass';
  primary: string;       // e.g. "#E11D48"
  secondary: string;     // e.g. "#9F1239"
  accent: string;        // e.g. "#F59E0B"
  background: string;    // e.g. "#FAFAF9"
  surface: string;       // e.g. "#FFFFFF"
  text: string;          // e.g. "#1C1917"
  mutedText: string;     // e.g. "#78716C"
  border: string;        // e.g. "#E7E5E4"
  glassBg: string;       // e.g. "rgba(255, 255, 255, 0.75)"
  fontHeading?: string;  // e.g. "'Pacifico', cursive"
  fontBody?: string;     // e.g. "'Nunito', 'Inter', sans-serif"
};

export type SectionType = 
  | 'hero' 
  | 'game' 
  | 'candle' 
  | 'gallery' 
  | 'timeline' 
  | 'reasons' 
  | 'letter' 
  | 'stickers' 
  | 'final';

export type GalleryItem = {
  id: string | number;
  type: 'chat' | 'sticky' | 'polaroid' | 'photo';
  text: string;
  image?: string;
  caption?: string;
  rotation?: number;
  delay?: number;
};

export type TimelineEvent = {
  date: string;
  title: string;
  description: string;
  image?: string;
  tag?: string;
};

export type StickerItem = {
  id: number;
  text: string;
  size?: string;
  left: string;
  top: string;
  rotate: number;
};

export type CreditsItem = {
  label: string;
  value: string;
};

export type CutiePageConfig = {
  site: {
    slug: string;
    title: string;
    description: string;
    favicon?: string;
    ogImage?: string;
  };
  person: {
    name: string;
    nickname?: string;
    partnerName?: string;
    partnerUsername?: string;
    avatarUrl?: string;
    heroImageUrl?: string;
    ageOrMilestone?: string;
  };
  theme: ThemeTokens;
  music?: {
    enabled: boolean;
    title: string;
    artist: string;
    audioUrl?: string;
    autoplayHint?: string;
  };
  loading?: {
    enabled: boolean;
    phrases: string[];
    subtitle?: string;
  };
  hero: {
    enabled: boolean;
    eyebrow?: string;
    title: string;
    subtitle?: string;
    ctaText?: string;
    imageUrl?: string;
    stickers?: Array<{ text: string; rotation?: number; position: 'top-right' | 'bottom-left' | 'top-left' | 'bottom-right' }>;
  };
  game?: {
    enabled: boolean;
    title: string;
    partnerUsername: string;
    pendingDurationText: string;
    acceptButtonText: string;
    successMessage: string;
    notificationTitle: string;
    notificationMessage: string;
  };
  candle?: {
    enabled: boolean;
    milestoneText: string;
    blowHintText: string;
    wishGrantedText: string;
  };
  gallery?: {
    enabled: boolean;
    title?: string;
    items: GalleryItem[];
  };
  timeline?: {
    enabled: boolean;
    title?: string;
    subtitle?: string;
    events: TimelineEvent[];
  };
  reasons?: {
    enabled: boolean;
    title?: string;
    subtitle?: string;
    items: string[];
  };
  letter?: {
    enabled: boolean;
    title?: string;
    content: string;
    salutation?: string;
    signature?: string;
    date?: string;
  };
  stickers?: {
    enabled: boolean;
    title?: string;
    items: StickerItem[];
  };
  finalReveal: {
    enabled: boolean;
    credits: CreditsItem[];
    message: string;
    subtext?: string;
    buttonText: string;
    imageUrl?: string;
  };
  sections: Record<SectionType, boolean>;
  sectionOrder: SectionType[];
};
