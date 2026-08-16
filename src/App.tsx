import { useState, useEffect } from 'react';
import { getCutiePageConfig } from './config';
import type { CutiePageConfig } from './types/config';

import PageRenderer from './components/PageRenderer';
import MusicPlayer from './components/MusicPlayer';
import FloatingDecorations from './components/FloatingDecorations';
import LoadingSection from './sections/LoadingSection';

function App() {
  const [config] = useState<CutiePageConfig>(() => getCutiePageConfig());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  const [musicPlaying, setMusicPlaying] = useState<boolean>(false);

  // Apply Theme CSS variables & document title dynamically
  useEffect(() => {
    if (!config) return;

    document.title = config.site.title || 'CutiePage Experience';

    const root = document.documentElement;
    const theme = config.theme;

    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--secondary', theme.secondary);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--background', theme.background);
    root.style.setProperty('--surface', theme.surface);
    root.style.setProperty('--text', theme.text);
    root.style.setProperty('--muted-text', theme.mutedText);
    root.style.setProperty('--border', theme.border);
    root.style.setProperty('--glass-bg', theme.glassBg);

    if (theme.fontHeading) root.style.setProperty('--font-heading', theme.fontHeading);
    if (theme.fontBody) root.style.setProperty('--font-body', theme.fontBody);
  }, [config]);

  const enabledSections = (config.sectionOrder || []).filter(
    (key) => config.sections[key] !== false
  );

  const handleNextSection = () => {
    if (currentSectionIndex < enabledSections.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
    } else {
      setCurrentSectionIndex(0);
    }
  };

  const handleRestart = () => {
    setCurrentSectionIndex(0);
  };

  return (
    <div className="relative w-full h-dvh overflow-hidden select-none">
      <MusicPlayer 
        config={config} 
        isPlaying={musicPlaying} 
        setIsPlaying={setMusicPlaying} 
      />
      
      <FloatingDecorations config={config} />

      {isLoading && config.loading?.enabled ? (
        <LoadingSection 
          config={config} 
          onComplete={() => setIsLoading(false)} 
          setMusicPlaying={setMusicPlaying} 
        />
      ) : (
        <PageRenderer
          config={config}
          currentSectionIndex={currentSectionIndex}
          onNextSection={handleNextSection}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
