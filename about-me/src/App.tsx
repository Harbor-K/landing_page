import React from 'react';
import { AboutPage } from './components/about/AboutPage';
import { CursorTrail } from './components/CursorTrail';

// About page as its own app (same as #/about on the Magic Patterns site).
export function App() {
  return (
    <>
      <CursorTrail />
      <AboutPage />
    </>
  );
}
