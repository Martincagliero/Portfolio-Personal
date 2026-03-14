import React from 'react';
import { gsap } from 'gsap';
import { useLanguage } from './LanguageContext.jsx';

const PRELOADER_COPY = {
  en: {
    eyebrow: 'MARTIN CAGLIERO',
    stages: {
      boot: 'loading',
      sync: 'syncing',
      ready: 'ready',
    },
  },
  es: {
    eyebrow: 'MARTIN CAGLIERO',
    stages: {
      boot: 'cargando',
      sync: 'sincronizando',
      ready: 'listo',
    },
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
      const timeline = gsap.timeline();

      timeline
        .fromTo(
          '.preloader-reveal',
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.1,
          }
        )
        .fromTo(
          '.preloader-visual',
          { scale: 0.92, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
          },
          0.12
        )
        .fromTo(
          '.preloader-meta',
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power2.out',
          },
          0.3
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
      const remaining = Math.max(0, 1450 - elapsed);

      settleTimer = window.setTimeout(() => {
        setProgress(100);
      }, remaining);
    };

    progressTimer = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 94) {
          return current;
        }

        const nextValue = current + Math.floor(Math.random() * 9) + 4;
        return Math.min(nextValue, 94);
      });
    }, 110);

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
      .to('.preloader-progress-fill', { opacity: 0.6, duration: 0.18 })
      .to(
        '.preloader-reveal',
        {
          y: -22,
          opacity: 0,
          duration: 0.42,
          stagger: 0.04,
        },
        0
      )
      .to(
        '.preloader-visual',
        {
          scale: 0.96,
          opacity: 0,
          duration: 0.42,
        },
        0.05
      )
      .to(
        '.preloader-panel',
        {
          y: -20,
          scale: 0.985,
          opacity: 0,
          duration: 0.58,
        },
        0.16
      )
      .to(
        '.preloader-overlay-line',
        {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.48,
        },
        0.22
      )
      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.28,
        },
        0.48
      );

    return () => timeline.kill();
  }, [onComplete, progress, reducedMotion]);

  return (
    <div ref={overlayRef} className="site-preloader" role="status" aria-live="polite" aria-label={stage}>
      <div className="preloader-overlay-line" />
      <div className="preloader-grid" />
      <div className="preloader-glow preloader-glow-left" />
      <div className="preloader-glow preloader-glow-right" />

      <div className="preloader-shell preloader-panel">
        <div className="preloader-topbar preloader-reveal">
          <span>{copy.eyebrow}</span>
          <span>{String(progress).padStart(3, '0')}</span>
        </div>

        <div className="preloader-main">
          <div className="preloader-copy preloader-reveal">
            <div className="preloader-signature">
              <span>portfolio</span>
              <span className="preloader-signature-dot" />
            </div>

            <div className="preloader-meta">
              <span>{stage}</span>
              <span>{String(progress).padStart(3, '0')}%</span>
            </div>
          </div>

          <div className="preloader-visual" aria-hidden="true">
            <div className="preloader-visual-frame preloader-visual-frame-outer" />
            <div className="preloader-visual-frame preloader-visual-frame-mid" />
            <div className="preloader-visual-frame preloader-visual-frame-inner" />
            <div className="preloader-visual-orbit preloader-visual-orbit-a" />
            <div className="preloader-visual-orbit preloader-visual-orbit-b" />
            <div className="preloader-visual-beam" />
            <div className="preloader-visual-core">
              <span>MC</span>
            </div>
          </div>
        </div>

        <div className="preloader-dashboard preloader-reveal">
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