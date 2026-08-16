import type { CutiePageConfig } from '../types/config';

export const defaultTemplateConfig: CutiePageConfig = {
  site: {
    slug: 'template',
    title: 'A Story Worth Remembering | CutiePage.in',
    description: 'A personalized digital experience for birthdays, anniversaries, love letters, and special celebrations.',
  },
  person: {
    name: 'Someone Special',
    nickname: 'Cutie',
    partnerName: 'Your Name',
    partnerUsername: 'your.handle',
    ageOrMilestone: 'Special Celebration',
  },
  theme: {
    name: 'Editorial Rose Cream',
    mode: 'light',
    primary: '#E11D48',
    secondary: '#9F1239',
    accent: '#F59E0B',
    background: '#FAFAF9',
    surface: '#FFFFFF',
    text: '#1C1917',
    mutedText: '#78716C',
    border: '#E7E5E4',
    glassBg: 'rgba(255, 255, 255, 0.75)',
    fontHeading: "'Pacifico', cursive",
    fontBody: "'Nunito', 'Inter', sans-serif",
  },
  music: {
    enabled: true,
    title: 'Romantic Symphony',
    artist: 'Add your soundtrack',
    audioUrl: '',
    autoplayHint: 'press to play soundtrack 🎵',
  },
  loading: {
    enabled: true,
    phrases: [
      'Unfolding your story...',
      'Opening your memory vault...',
      'Preparing magical moments...',
    ],
    subtitle: 'CutiePage Experience',
  },
  hero: {
    enabled: true,
    eyebrow: 'A Personal Storytelling Experience',
    title: 'For Someone\nTruly Special',
    subtitle: 'Every memory, every smile, every chapter recorded forever.',
    ctaText: 'Explore Our Story',
    stickers: [
      { text: 'main character ✨', rotation: 8, position: 'top-right' },
      { text: 'forever iconic 💖', rotation: -10, position: 'bottom-left' },
    ],
  },
  game: {
    enabled: true,
    title: 'Follow Requests',
    partnerUsername: 'your.handle',
    pendingDurationText: 'pending since day one',
    acceptButtonText: 'Confirm Connection',
    successMessage: 'Connection approved & locked in forever ✨',
    notificationTitle: 'Message Alert 💌',
    notificationMessage: 'You have received a new personal note 💌',
  },
  candle: {
    enabled: true,
    milestoneText: 'MAKE A WISH\nFOR THE FUTURE',
    blowHintText: 'tap the candle to make a wish 🕯️',
    wishGrantedText: '✨ May all your wildest dreams come true! ✨',
  },
  gallery: {
    enabled: true,
    title: 'Photo Archives & Memories',
    items: [
      { id: 1, text: 'The day we first met ☕', type: 'chat', delay: 0.5 },
      { id: 2, text: 'Our favorite spontaneous trip 🌅', type: 'sticky', delay: 1.5, rotation: -3 },
      { id: 3, text: 'Late night laughter till 3 AM 💬', type: 'chat', delay: 2.5 },
      { id: 4, text: 'A core memory locked forever 🌹', type: 'polaroid', delay: 3.5, rotation: 4, caption: 'Add your photo' },
    ],
  },
  timeline: {
    enabled: true,
    title: 'Our Timeline',
    subtitle: 'Moments that defined our journey',
    events: [
      {
        date: 'Chapter 1',
        title: 'The Beginning',
        description: 'Where it all started — the very first conversation.',
        tag: 'Origin',
      },
      {
        date: 'Chapter 2',
        title: 'Core Memories',
        description: 'Unplanned adventures, spontaneous trips, and endless laughter.',
        tag: 'Adventures',
      },
      {
        date: 'Chapter 3',
        title: 'Next Level',
        description: 'Stepping into the future with unstoppable confidence.',
        tag: 'Forever',
      },
    ],
  },
  reasons: {
    enabled: true,
    title: 'Reasons Why You Matter',
    subtitle: 'Tap cards to reveal',
    items: [
      'Your warmth and laughter light up every room you enter',
      'Always keeping it 100% genuine and real',
      'Your incredible ability to make hard days feel easy',
      'The quiet moments that mean everything',
      'Simply being one of one in this world',
    ],
  },
  letter: {
    enabled: true,
    title: 'A Letter From The Heart',
    salutation: 'Dearest Someone Special,',
    content: `Thank you for bringing so much joy, laughter, and light into this world. 

Watching you stay true to yourself and inspire everyone around you is nothing short of incredible.

Here is to creating even more legendary chapters together!`,
    signature: 'With all my love, Your Name ✨',
    date: 'August 2026',
  },
  stickers: {
    enabled: true,
    title: 'Tap the Stickers! 🎈',
    items: [
      { id: 1, text: '✨', size: 'text-4xl', left: '10%', top: '20%', rotate: -15 },
      { id: 2, text: '🎀', size: 'text-5xl', left: '70%', top: '15%', rotate: 20 },
      { id: 3, text: '💖', size: 'text-6xl', left: '40%', top: '40%', rotate: 5 },
      { id: 4, text: '🧁', size: 'text-5xl', left: '20%', top: '60%', rotate: -25 },
      { id: 5, text: '🧸', size: 'text-6xl', left: '80%', top: '70%', rotate: 10 },
      { id: 6, text: '⭐', size: 'text-4xl', left: '50%', top: '80%', rotate: 45 },
      { id: 7, text: '🌸', size: 'text-5xl', left: '15%', top: '85%', rotate: -10 },
    ],
  },
  finalReveal: {
    enabled: true,
    credits: [
      { label: 'Starring', value: 'Someone Special' },
      { label: 'Directed By', value: 'Your Name' },
      { label: 'Status', value: 'Forever & Always' },
    ],
    message: 'thank you for existing,\nyou are truly one of one',
    subtext: 'Created with CutiePage.in',
    buttonText: 'Replay Experience',
  },
  sections: {
    hero: true,
    game: true,
    candle: true,
    gallery: true,
    timeline: true,
    reasons: true,
    letter: true,
    stickers: true,
    final: true,
  },
  sectionOrder: ['hero', 'game', 'candle', 'gallery', 'timeline', 'reasons', 'letter', 'stickers', 'final'],
};
