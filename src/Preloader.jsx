import React from 'react';
import { gsap } from 'gsap';
import { useLanguage } from './LanguageContext.jsx';

const PRELOADER_COPY = {
  en: {
    eyebrow: 'MARTIN CAGLIERO',
    edition: 'Portfolio Sequence 2026',
    label: 'Engineered presence',
    title: ['Digital', 'systems', 'with aura'],
    note: 'A short brand-grade intro before the work takes over.',
    stages: {
      boot: 'loading surfaces',
      sync: 'shaping motion',
      ready: 'launching portfolio',
    },
    tags: ['frontend', 'ux', 'identity'],
  },
  es: {
    eyebrow: 'MARTIN CAGLIERO',
    edition: 'Portfolio Sequence 2026',
    label: 'Presencia diseñada',
    title: ['Sistemas', 'digitales', 'con aura'],
    note: 'Una intro breve, más cercana a una pieza de marca que a un loader común.',
    stages: {
      boot: 'cargando superficies',
      sync: 'moldeando motion',
      ready: 'abriendo portfolio',
    },
    tags: ['frontend', 'ux', 'identidad'],
  },
};

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);

    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  return reducedMotion;
}

export default function Preloader({ onComplete }) {
  const { language } = useLanguage();
  const copy = PRELOADER_COPY[language] ?? PRELOADER_COPY.en;
  const reducedMotion = useReducedMotion();

  const [progress, setProgress] = React.useState(0);
  const overlayRef = React.useRef(null);
  const completeRef = React.useRef(false);

  const stage = React.useMemo(() => {
    if (progress >= 100) {
      return copy.stages.ready;
    }

    if (progress >= 56) {
      return copy.stages.sync;
    }

    return copy.stages.boot;
  }, [copy.stages, progress]);

  React.useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  React.useEffect(() => {
    if (reducedMotion) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      timeline
        .fromTo(
          '.preloader-word-line',
          { yPercent: 135, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.07,
          }
        )
        .fromTo(
          '.preloader-fade',
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.06,
          },
          0.08
        )
        .fromTo(
          '.preloader-monolith',
          { scale: 0.88, rotate: -9, opacity: 0 },
          {
            scale: 1,
            rotate: 0,
            opacity: 1,
            duration: 1,
          },
          0.16
        );
    }, overlayRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  React.useEffect(() => {
    let progressTimer;
    let settleTimer;
    const startTime = performance.now();

    const finishLoading = () => {
      const elapsed = performance.now() - startTime;
      const remaining = Math.max(0, 1650 - elapsed);

      settleTimer = window.setTimeout(() => {
        setProgress(100);
      }, remaining);
    };

    progressTimer = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 94) {
          return current;
        }

        const nextValue = current + Math.floor(Math.random() * 7) + 5;
        return Math.min(nextValue, 94);
      });
    }, 120);

    if (document.readyState === 'complete') {
      finishLoading();
    } else {
      window.addEventListener('load', finishLoading, { once: true });
    }

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(settleTimer);
      window.removeEventListener('load', finishLoading);
    };
  }, []);

  React.useEffect(() => {
    if (progress < 100 || completeRef.current) {
      return undefined;
    }

    completeRef.current = true;

    if (reducedMotion) {
      const timeoutId = window.setTimeout(() => {
        onComplete?.();
      }, 220);

      return () => window.clearTimeout(timeoutId);
    }

    const timeline = gsap.timeline({
      defaults: { ease: 'power4.inOut' },
      onComplete: () => onComplete?.(),
    });

    timeline
      .to('.preloader-progress-fill', { opacity: 0.7, duration: 0.18 })
      .to(
        '.preloader-word-line',
        {
          yPercent: -120,
          opacity: 0,
          duration: 0.42,
          stagger: 0.05,
        },
        0
      )
      .to(
        '.preloader-fade',
        {
          y: -18,
          opacity: 0,
          duration: 0.32,
          stagger: 0.03,
        },
        0.05
      )
      .to(
        '.preloader-monolith',
        {
          scale: 1.12,
          rotate: 8,
          opacity: 0,
          duration: 0.42,
        },
        0.02
      )
      .to(
        '.preloader-shell',
        {
          clipPath: 'inset(18% 24% 22% 24% round 42px)',
          scale: 0.9,
          opacity: 0,
          duration: 0.72,
        },
        0.12
      )
      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.2,
        },
        0.56
      );

    return () => timeline.kill();
  }, [onComplete, progress, reducedMotion]);

  return (
    <div ref={overlayRef} className="site-preloader" role="status" aria-live="polite" aria-label={stage}>
      <div className="preloader-ambient-orb preloader-ambient-orb-a" />
      <div className="preloader-ambient-orb preloader-ambient-orb-b" />
      <div className="preloader-grid" />
      <div className="preloader-noise" />
      <div className="preloader-overlay-line" />

      <div className="preloader-shell">
        <div className="preloader-corner preloader-corner-tl" />
        <div className="preloader-corner preloader-corner-tr" />
        <div className="preloader-corner preloader-corner-bl" />
        <div className="preloader-corner preloader-corner-br" />

        <div className="preloader-topbar preloader-fade">
          <span>{copy.eyebrow}</span>
          <span>{copy.edition}</span>
        </div>

        <div className="preloader-main">
          <div className="preloader-copy">
            <p className="preloader-label preloader-fade">{copy.label}</p>

            <h1 className="preloader-title" aria-label={copy.title.join(' ')}>
              {copy.title.map((line) => (
                <span key={line} className="preloader-word-mask">
                  <span className="preloader-word-line">{line}</span>
                </span>
              ))}
            </h1>

            <p className="preloader-note preloader-fade">{copy.note}</p>

            <div className="preloader-tags preloader-fade" aria-hidden="true">
              {copy.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>

          <div className="preloader-monolith" aria-hidden="true">
            <div className="preloader-monolith-halo" />
            <div className="preloader-monolith-orbit preloader-monolith-orbit-a" />
            <div className="preloader-monolith-orbit preloader-monolith-orbit-b" />

            <div className="preloader-monolith-stack">
              <div className="preloader-monolith-panel preloader-monolith-panel-back" />
              <div className="preloader-monolith-panel preloader-monolith-panel-mid" />
              <div className="preloader-monolith-panel preloader-monolith-panel-front">
                <div className="preloader-monolith-grid" />
                <div className="preloader-monolith-ribbon preloader-monolith-ribbon-a" />
                <div className="preloader-monolith-ribbon preloader-monolith-ribbon-b" />
                <div className="preloader-monolith-core">
                  <span>MC</span>
                  <small>{String(progress).padStart(3, '0')}</small>
                </div>
                <div className="preloader-monolith-node preloader-monolith-node-a" />
                <div className="preloader-monolith-node preloader-monolith-node-b" />
                <div className="preloader-monolith-axis" />
              </div>
            </div>
          </div>
        </div>

        <div className="preloader-meta preloader-fade">
          <span>{stage}</span>
          <span>{String(progress).padStart(3, '0')}%</span>
        </div>

        <div className="preloader-dashboard preloader-fade">
          <div className="preloader-progress-track" aria-hidden="true">
            <div
              className="preloader-progress-fill"
              style={{ transform: `scaleX(${Math.max(progress, 3) / 100})` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}