import React from 'react';
import { gsap } from 'gsap';
import { useLanguage } from './LanguageContext.jsx';

const PRELOADER_COPY = {
  en: {
    eyebrow: 'MARTIN CAGLIERO',
    label: 'Portfolio system',
    titleTop: 'Crafting',
    titleBottom: 'digital presence',
    description: 'Loading a portfolio designed to feel sharp, premium and deliberate from the first frame.',
    stages: {
      boot: 'Mapping interface layers',
      sync: 'Calibrating motion and detail',
      ready: 'Experience ready',
    },
    metrics: [
      { value: 'UX', label: 'Intentional flows' },
      { value: 'DEV', label: 'Solid frontend' },
      { value: 'MOTION', label: 'Visual rhythm' },
    ],
    rail: ['strategy', 'code', 'identity', 'motion', 'clarity'],
  },
  es: {
    eyebrow: 'MARTIN CAGLIERO',
    label: 'Portfolio system',
    titleTop: 'Construyendo',
    titleBottom: 'presencia digital',
    description: 'Cargando un portfolio pensado para sentirse preciso, premium e intencional desde el primer frame.',
    stages: {
      boot: 'Mapeando capas de interfaz',
      sync: 'Calibrando motion y detalle',
      ready: 'Experiencia lista',
    },
    metrics: [
      { value: 'UX', label: 'Flujos intencionales' },
      { value: 'DEV', label: 'Frontend sólido' },
      { value: 'MOTION', label: 'Ritmo visual' },
    ],
    rail: ['estrategia', 'codigo', 'identidad', 'motion', 'claridad'],
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
          '.preloader-orbit',
          { scale: 0.82, rotate: -18, opacity: 0 },
          {
            scale: 1,
            rotate: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
          },
          0.12
        )
        .fromTo(
          '.preloader-rail-track',
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
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
      const remaining = Math.max(0, 1900 - elapsed);

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
        '.preloader-orbit',
        {
          scale: 0.88,
          opacity: 0,
          duration: 0.48,
        },
        0.05
      )
      .to(
        '.preloader-shutter-top',
        {
          yPercent: -100,
          duration: 0.92,
        },
        0.15
      )
      .to(
        '.preloader-shutter-bottom',
        {
          yPercent: 100,
          duration: 0.92,
        },
        0.15
      )
      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.35,
        },
        0.62
      );

    return () => timeline.kill();
  }, [onComplete, progress, reducedMotion]);

  return (
    <div ref={overlayRef} className="site-preloader" role="status" aria-live="polite" aria-label={stage}>
      <div className="preloader-shutter preloader-shutter-top" />
      <div className="preloader-shutter preloader-shutter-bottom" />
      <div className="preloader-noise" />
      <div className="preloader-grid" />
      <div className="preloader-glow preloader-glow-left" />
      <div className="preloader-glow preloader-glow-right" />

      <div className="preloader-shell">
        <div className="preloader-topbar preloader-reveal">
          <span>{copy.eyebrow}</span>
          <span>2026</span>
        </div>

        <div className="preloader-main">
          <div className="preloader-copy">
            <p className="preloader-label preloader-reveal">{copy.label}</p>
            <h1 className="preloader-title preloader-reveal">
              <span>{copy.titleTop}</span>
              <span>{copy.titleBottom}</span>
            </h1>
            <p className="preloader-description preloader-reveal">{copy.description}</p>

            <div className="preloader-metrics preloader-reveal">
              {copy.metrics.map((metric) => (
                <div key={metric.value} className="preloader-metric-card">
                  <span>{metric.value}</span>
                  <small>{metric.label}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="preloader-orbit" aria-hidden="true">
            <div className="preloader-ring preloader-ring-one" />
            <div className="preloader-ring preloader-ring-two" />
            <div className="preloader-ring preloader-ring-three" />
            <div className="preloader-core">
              <span>MC</span>
            </div>
            <div className="preloader-pulse" />
          </div>
        </div>

        <div className="preloader-dashboard preloader-reveal">
          <div className="preloader-progress-track" aria-hidden="true">
            <div
              className="preloader-progress-fill"
              style={{ transform: `scaleX(${Math.max(progress, 3) / 100})` }}
            />
          </div>

          <div className="preloader-status-row">
            <span>{stage}</span>
            <span>{String(progress).padStart(3, '0')}%</span>
          </div>
        </div>
      </div>

      <div className="preloader-rail">
        <div className="preloader-rail-track">
          {[...copy.rail, ...copy.rail].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}