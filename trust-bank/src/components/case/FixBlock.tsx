import React, { useEffect, useRef, useState } from 'react';

// Same tokens and body text style as TrustBankCase.tsx
const INK = '#000d10';
const HELV = '"Helvetica Neue", Helvetica, Arial, sans-serif';

function Body({ children, className = '', color = INK }: { children: React.ReactNode; className?: string; color?: string }) {
  return (
    <p className={`text-[17px] md:text-[18px] leading-[29px] ${className}`} style={{ fontFamily: HELV, color }}>
      {children}
    </p>
  );
}

/**
 * One fix, with the Corgi interaction: the phone panel stays pinned on the left while the text on the
 * right scrolls past it in two steps. When the second step reaches the middle of the screen, the phone
 * card flips over in 3D (As-is on the front, To-be on the back) and the panel colour changes with it;
 * scrolling back up flips it back. The As-is / To-be pill follows.
 * Right side: step 1 = kicker, title, body; step 2 = the test number.
 * Small screens: no pinning, both phones side by side under the text.
 */
export function FixBlock({
  kicker,
  title,
  body,
  stat,
  statLabel,
  statNote,
  before,
  after,
  alt,
}: {
  kicker: string;
  title: React.ReactNode;
  body: string;
  stat: string;
  statLabel: string;
  statNote: string;
  before: string;
  after: string;
  alt: string;
}) {
  const step2 = useRef<HTMLDivElement>(null);
  const [toBe, setToBe] = useState(false);
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = step2.current;
      if (!el) return;
      // flip once the second text step's top passes the middle of the screen
      setToBe(el.getBoundingClientRect().top < window.innerHeight * 0.55);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const PANEL = 'clamp(520px, 76vh, 680px)';
  const flipT = reduce ? 'none' : 'transform 0.9s cubic-bezier(0.65, 0, 0.35, 1)';

  const textTop = (
    <div>
      <p className="text-[17px] leading-[1.4]" style={{ color: INK }}>
        {kicker}
      </p>
      <p className="mt-[6px] text-[23px] leading-[1.2] font-bold text-[#333]">{title}</p>
      <Body className="mt-6" color="#333">
        {body}
      </Body>
    </div>
  );
  const textBottom = (
    <div>
      <p className="text-[52px] leading-[1.1] font-bold text-[#333]">{stat}</p>
      <p className="mt-[16px] text-[18px] leading-[29px] text-[#333]">{statLabel}</p>
      <p className="mt-1 text-[17px] leading-[24px] text-[#8e8e95]">{statNote}</p>
    </div>
  );
  const pill = (
    <div className="inline-flex rounded-full bg-white/80 p-1 text-[16px] font-medium backdrop-blur" aria-hidden="true">
      {['As-is', 'To-be'].map((l, i) => {
        const on = (i === 1) === toBe;
        return (
          <span
            key={l}
            className="rounded-full px-4 py-[6px] transition-colors duration-500"
            style={{ background: on ? INK : 'transparent', color: on ? '#fff' : '#8e8e95' }}
          >
            {l}
          </span>
        );
      })}
    </div>
  );
  const face = (src: string, label: string, back: boolean) => (
    <img
      src={src}
      alt={`${alt} — ${label}`}
      className="absolute inset-0 h-full w-full object-contain"
      style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: back ? 'rotateY(180deg)' : undefined }}
      loading="lazy"
      decoding="async"
    />
  );

  return (
    <div style={{ fontFamily: HELV }}>
      {/* md and up: pinned flip panel on the left, text scrolling past on the right */}
      <div className="hidden md:grid max-w-[1255px] grid-cols-[minmax(0,640px)_minmax(0,1fr)] gap-10 lg:gap-[100px]">
        <div className="relative">
          <div className="sticky" style={{ top: `calc(50vh - ${PANEL} / 2)` }}>
            <div
              className="relative flex items-end justify-center overflow-hidden rounded-[20px] transition-colors duration-700"
              style={{ height: PANEL, background: toBe ? '#e3f3fa' : '#f2f2f4', perspective: '1600px' }}
            >
              <div className="absolute left-5 top-5 z-10">{pill}</div>
              <div
                className="relative h-[calc(100%-96px)] translate-y-[24px]"
                style={{ aspectRatio: '600 / 1230', transformStyle: 'preserve-3d', transform: `rotateY(${toBe ? 180 : 0}deg)`, transition: flipT }}
              >
                {face(before, 'as-is', false)}
                {face(after, 'to-be', true)}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col justify-center" style={{ minHeight: '100vh' }}>
            {textTop}
          </div>
          <div ref={step2} className="flex flex-col justify-center" style={{ minHeight: '100vh' }}>
            {textBottom}
          </div>
        </div>
      </div>

      {/* small screens: text, then both phones */}
      <div className="md:hidden">
        {textTop}
        <div className="mt-8 grid grid-cols-2 gap-4">
          {[
            ['As-is', before],
            ['To-be', after],
          ].map(([l, src]) => (
            <figure key={l} className="rounded-[16px] bg-[#f2f2f4] px-3 pt-4">
              <figcaption className="text-center text-[16px] font-medium text-[#333]">{l}</figcaption>
              <img src={src} alt={`${alt} — ${l.toLowerCase()}`} className="mt-3 w-full" loading="lazy" decoding="async" />
            </figure>
          ))}
        </div>
        <div className="mt-8">{textBottom}</div>
      </div>
    </div>
  );
}
