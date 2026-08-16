import { defineTemplate, useTheme } from "@cutiepage/template-sdk";

import "./styles.css";

import HeroSection from "./components/HeroSection";
import IntroSection from "./components/IntroSection";
import GallerySection from "./components/GallerySection";
import TimelineSection from "./components/TimelineSection";
import ReasonsSection from "./components/ReasonsSection";
import LetterSection from "./components/LetterSection";
import FinalRevealSection from "./components/FinalRevealSection";
import MusicPlayer from "./components/MusicPlayer";

export default defineTemplate({
  slug: "my-template",
  name: "Romantic & Personal Storytelling",
  description:
    "A premium, editorial storytelling template for birthdays, anniversaries, proposals, love letters, and special celebrations.",
  category: "celebration",
  tags: ["romantic", "birthday", "anniversary", "proposal", "memories"],

  theme: {
    background: { type: "color", label: "Background Color", default: "#fafaf9" },
    foreground: { type: "color", label: "Text Color", default: "#1c1917" },
    accent: { type: "color", label: "Primary Accent", default: "#e0507a" },
    secondary: { type: "color", label: "Secondary Accent", default: "#9f1239" },
    surface: { type: "color", label: "Surface Card Color", default: "#ffffff" },
    border: { type: "color", label: "Border Color", default: "#e7e5e4" },
    muted: { type: "color", label: "Muted Text Color", default: "#78716c" },
  },

  fieldGroups: {
    hero: {
      label: "Opening / Hero",
      blockType: "hero",
      description: "The cinematic opening experience.",
    },
    intro: {
      label: "Story Intro",
      blockType: "story",
      description: "Narrative introduction.",
    },
    gallery: {
      label: "Photo Archives",
      blockType: "gallery",
      description: "Photo gallery and memory cards.",
    },
    timeline: {
      label: "Timeline & Milestones",
      blockType: "details",
      description: "Milestone timeline.",
    },
    reasons: {
      label: "Reasons Why",
      blockType: "quote",
      description: "Interactive reasons list.",
    },
    letter: {
      label: "Personal Letter",
      blockType: "story",
      description: "Editorial love letter parchment.",
    },
    music: {
      label: "Audio & Soundtrack",
      blockType: "media",
      description: "Floating ambient audio player.",
    },
    final: {
      label: "Final Closing Reveal",
      blockType: "cta",
      description: "Cinematic closing credits and final reveal.",
    },
  },

  fields: {
    // HERO
    showHero: {
      type: "boolean",
      label: "Show Hero Section",
      group: "hero",
      default: true,
    },
    heroEyebrow: {
      type: "text",
      label: "Hero Tagline",
      group: "hero",
      maxLength: 60,
      default: "A Story Worth Remembering",
    },
    heroHeadline: {
      type: "text",
      label: "Hero Title",
      group: "hero",
      required: true,
      maxLength: 60,
      default: "For Someone Truly Special",
    },
    heroSubhead: {
      type: "text",
      label: "Hero Subhead",
      group: "hero",
      maxLength: 160,
      default: "Every smile, every moment, every chapter recorded forever.",
    },
    heroPhoto: {
      type: "image",
      label: "Main Hero Photo",
      group: "hero",
      aspectRatio: "1:1",
    },

    // INTRO
    showIntro: {
      type: "boolean",
      label: "Show Story Intro",
      group: "intro",
      default: true,
    },
    introTitle: {
      type: "text",
      label: "Intro Title",
      group: "intro",
      maxLength: 60,
      default: "Why This Story Matters",
    },
    introBody: {
      type: "text",
      label: "Intro Description",
      group: "intro",
      maxLength: 300,
      default:
        "Some memories are too precious to stay trapped inside a camera roll. This page was created to celebrate our journey, our laughs, and everything that makes us who we are.",
    },

    // GALLERY
    showGallery: {
      type: "boolean",
      label: "Show Photo Gallery",
      group: "gallery",
      default: true,
    },
    galleryTitle: {
      type: "text",
      label: "Gallery Section Title",
      group: "gallery",
      maxLength: 60,
      default: "Photo Archives & Memories",
    },
    galleryItems: {
      type: "text",
      label: "Memory Captions (one per line: Label | Subtext)",
      group: "gallery",
      default:
        "The Beginning | Where it all started\nFavorite Trip | Sunsets and laughter\nLate Night Chat | Talking till 3 AM\nForever Memory | A moment locked in time",
    },
    galleryPhoto1: { type: "image", label: "Gallery Photo 1", group: "gallery", aspectRatio: "3:4" },
    galleryPhoto2: { type: "image", label: "Gallery Photo 2", group: "gallery", aspectRatio: "1:1" },
    galleryPhoto3: { type: "image", label: "Gallery Photo 3", group: "gallery", aspectRatio: "3:4" },
    galleryPhoto4: { type: "image", label: "Gallery Photo 4", group: "gallery", aspectRatio: "1:1" },

    // TIMELINE
    showTimeline: {
      type: "boolean",
      label: "Show Timeline Section",
      group: "timeline",
      default: true,
    },
    timelineTitle: {
      type: "text",
      label: "Timeline Title",
      group: "timeline",
      maxLength: 60,
      default: "Our Journey Timeline",
    },
    timelineSubtitle: {
      type: "text",
      label: "Timeline Subtitle",
      group: "timeline",
      maxLength: 80,
      default: "Moments that defined our story",
    },
    timelineEvents: {
      type: "text",
      label: "Timeline Events (one per line: Date | Title | Description)",
      group: "timeline",
      default:
        "Chapter 1 | The First Spark | When our story first began with a single conversation.\nChapter 2 | Endless Adventures | Unplanned trips, late night laughter, and unforgettable days.\nChapter 3 | Looking Ahead | Stepping into the future with unstoppable happiness.",
    },
    timelinePhoto: {
      type: "image",
      label: "Featured Timeline Photo",
      group: "timeline",
      aspectRatio: "16:9",
    },

    // REASONS
    showReasons: {
      type: "boolean",
      label: "Show Reasons Section",
      group: "reasons",
      default: true,
    },
    reasonsTitle: {
      type: "text",
      label: "Reasons Title",
      group: "reasons",
      maxLength: 60,
      default: "Reasons Why You Matter",
    },
    reasonsSubtitle: {
      type: "text",
      label: "Reasons Subtitle",
      group: "reasons",
      maxLength: 60,
      default: "Tap cards to reveal",
    },
    reasonsList: {
      type: "text",
      label: "Reasons List (one item per line)",
      group: "reasons",
      default:
        "Your warmth and laughter light up every room you enter\nAlways keeping it 100% genuine and real\nYour incredible ability to make hard days feel easy\nThe quiet moments that mean everything\nSimply being one of one in this world",
    },

    // LETTER
    showLetter: {
      type: "boolean",
      label: "Show Love Letter",
      group: "letter",
      default: true,
    },
    letterTitle: {
      type: "text",
      label: "Letter Section Title",
      group: "letter",
      maxLength: 60,
      default: "A Personal Note",
    },
    letterSalutation: {
      type: "text",
      label: "Salutation",
      group: "letter",
      maxLength: 60,
      default: "Dearest Someone Special,",
    },
    letterBody: {
      type: "text",
      label: "Letter Content",
      group: "letter",
      default:
        "Thank you for bringing so much joy, laughter, and light into this world.\n\nWatching you stay true to yourself and inspire everyone around you is nothing short of incredible.\n\nHere is to creating even more legendary chapters together!",
    },
    letterSignature: {
      type: "text",
      label: "Signature",
      group: "letter",
      maxLength: 60,
      default: "With all my love, Your Name ✨",
    },
    letterDate: {
      type: "text",
      label: "Date Label",
      group: "letter",
      maxLength: 30,
      default: "August 2026",
    },

    // MUSIC
    musicTrack: {
      type: "audio",
      label: "Background Soundtrack Track",
      group: "music",
    },
    musicTitle: {
      type: "text",
      label: "Song Title",
      group: "music",
      maxLength: 40,
      default: "Romantic Symphony",
    },
    musicArtist: {
      type: "text",
      label: "Artist Name",
      group: "music",
      maxLength: 40,
      default: "Background Soundtrack",
    },

    // FINAL
    showFinal: {
      type: "boolean",
      label: "Show Final Closing Section",
      group: "final",
      default: true,
    },
    finalHeadline: {
      type: "text",
      label: "Closing Headline",
      group: "final",
      maxLength: 60,
      default: "thank you for existing",
    },
    finalMessage: {
      type: "text",
      label: "Closing Subtext",
      group: "final",
      maxLength: 100,
      default: "Created with CutiePage.in",
    },
    finalPhoto: {
      type: "image",
      label: "Final Closing Photo",
      group: "final",
      aspectRatio: "1:1",
    },
    creditsText: {
      type: "text",
      label: "Movie Credits (one per line: Role | Name)",
      group: "final",
      default:
        "Starring | Someone Special\nDirected By | Your Name\nStatus | Forever & Always",
    },
  },

  render: () => {
    const theme = useTheme();
    const background = theme.background ?? "#fafaf9";
    const foreground = theme.foreground ?? "#1c1917";

    return (
      <main
        className="relative min-h-screen overflow-x-hidden transition-colors duration-300 font-sans"
        style={{
          backgroundColor: background,
          color: foreground,
        }}
      >
        <MusicPlayer />
        <HeroSection />
        <IntroSection />
        <GallerySection />
        <TimelineSection />
        <ReasonsSection />
        <LetterSection />
        <FinalRevealSection />
      </main>
    );
  },
});
