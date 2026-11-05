import React, { useCallback } from 'react';
import { GameCoveCase } from './components/case/GameCoveCase';
import { CaseReveal } from './components/case/CaseReveal';
import { ImageLightbox } from './components/case/ImageLightbox';
import { CursorTrail } from './components/CursorTrail';
import { HOME_URL } from './site';

// GameCove case study as its own page (same as #/gamecove on the Magic Patterns site).
export function App() {
  const closeCase = useCallback(() => {
    window.location.href = HOME_URL;
  }, []);

  return (
    <>
      <CursorTrail />
      <div className="case-grid">
        <ImageLightbox>
          <CaseReveal>
            <GameCoveCase onClose={closeCase} />
          </CaseReveal>
        </ImageLightbox>
      </div>
    </>
  );
}
