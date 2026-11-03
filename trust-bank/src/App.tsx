import React, { useCallback } from 'react';
import { TrustBankCase } from './components/case/TrustBankCase';
import { CaseReveal } from './components/case/CaseReveal';
import { ImageLightbox } from './components/case/ImageLightbox';
import { CursorTrail } from './components/CursorTrail';
import { HOME_URL } from './site';

// Trust Bank case study as its own page (same as #/trust-bank on the Magic Patterns site).
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
            <TrustBankCase onClose={closeCase} />
          </CaseReveal>
        </ImageLightbox>
      </div>
    </>
  );
}
