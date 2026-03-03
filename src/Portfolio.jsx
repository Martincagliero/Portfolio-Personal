import React from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from './LanguageContext.jsx';
import { translations } from './translations.js';
import HeroImage from './assets/hero-avatar.png';
import AboutImage from './assets/about-avatar.png';
import LogoImage from './assets/logo.png';
import LinkedInIcon from './assets/logo-linkedin.png';
import AxusLogo from './assets/logo-axus.jpg';
import AxusDeskLogo from './assets/logo.axusdesk-crm.ico';
import InstagramIcon from './assets/icon-instagram.png';
import TiktokIcon from './assets/icon-tiktok.png';
import WebIcon from './assets/icon-web.png';

gsap.registerPlugin(ScrollTrigger);

function DeviceFrame({ children, type = 'desktop' }) {
  return (
    <div className="hero-capture-screen bg-axus-dark overflow-hidden">
      {children}
    </div>
  );
}

function DeviceMedia({ src, alt, fallbackBg }) {
  if (src) {
    return <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />;
  }

  return <div className="w-full h-full" style={{ background: fallbackBg }} />;
}

function ProjectMockups({ project }) {
  if (project.mediaType === 'video') {
    return (
      <div className="project-mockup-stage">
        <div className="device-laptop">
          <DeviceFrame type="laptop">
            <video
              src={project.videoSrc}
              poster={project.posterImage}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </DeviceFrame>
        </div>
      </div>
    );
  }

  return (
    <div className="project-mockup-stage">
      <div className="device-laptop">
        <DeviceFrame type="laptop">
          <DeviceMedia src={project.desktopImage} alt={`${project.name} desktop`} fallbackBg="transparent" />
        </DeviceFrame>
      </div>
      <div className="device-tablet">
        <DeviceFrame type="tablet">
          <DeviceMedia src={project.heroImage || project.desktopImage} alt={`${project.name} tablet`} fallbackBg="transparent" />
        </DeviceFrame>
      </div>
      <div className="device-mobile">
        <DeviceFrame type="mobile">
          <DeviceMedia src={project.mobileImage} alt={`${project.name} mobile`} fallbackBg="transparent" />
        </DeviceFrame>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const projects = [
    {
      name: t.projects.office.name,
      category: t.projects.office.category,
      description: t.projects.office.description,
      link: '#',
      mockupBg: 'linear-gradient(145deg, #11233A 0%, #4A9FE5 100%)',
      heroTitle: 'High Impact Corporate Web',
      heroSubtitle: 'Information architecture + strategic design',
      heroImage: '/projects/office-auto-care/hero.png',
      desktopImage: '/projects/office-auto-care/office-auto-car-desktop.png',
      mobileImage: '/projects/office-auto-care/mockup-mobile.png',
    },
    {
      name: t.projects.krautermeister.name,
      category: t.projects.krautermeister.category,
      description: t.projects.krautermeister.description,
      link: '#',
      mockupBg: 'linear-gradient(145deg, #0B1220 0%, #38BDF8 100%)',
      heroTitle: 'Premium Online Collection',
      heroSubtitle: 'Modern experience for brand products',
      heroImage: '/projects/krautermeister/hero.png',
      desktopImage: '/projects/krautermeister/mockup-pc.png',
      mobileImage: '/projects/krautermeister/mocup-mobile.png',
    },
    {
      name: t.projects.krautermeister3d.name,
      category: t.projects.krautermeister3d.category,
      description: t.projects.krautermeister3d.description,
      link: '#',
      mockupBg: 'linear-gradient(145deg, #10253F 0%, #34B7F4 100%)',
      heroTitle: 'Immersive 3D Showcase',
      heroSubtitle: 'Visual tour of the project',
      mediaType: 'video',
      videoSrc: '/projects/krautermeister-3d/video-mobile.mp4',
      posterImage: null,
    },
  ];

  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.reveal-item',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
        }
      );

      gsap.utils.toArray('.project-premium-card').forEach((card) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 84%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="premium-portfolio min-h-screen text-white font-sans overflow-x-hidden">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 fade-in-header ${
          scrolled ? 'bg-axus-dark/75 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-5 flex items-center justify-between">
          <a href="#home" className="flex items-center">
            <img src={LogoImage} alt="Martin Cagliero logo" className="h-8 sm:h-9 md:h-11 w-auto object-contain" />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-white/80">
            <a href="#home" className="hover:text-axus-accent transition-colors">{t.navigation.home}</a>
            <a href="#axus" className="hover:text-axus-accent transition-colors">{t.navigation.axus}</a>
            <a href="#projects" className="hover:text-axus-accent transition-colors">{t.navigation.projects}</a>
            <a href="#about" className="hover:text-axus-accent transition-colors">{t.navigation.about}</a>
            <a href="#contact" className="hover:text-axus-accent transition-colors">{t.navigation.contact}</a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 hover:border-axus-accent transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-lg border border-white/15 hover:border-axus-accent text-white/80 hover:text-axus-accent transition-all duration-300 text-sm font-semibold"
              title="Toggle language"
            >
              {language === 'en' ? 'ES' : 'EN'}
            </button>
            <a href="https://www.linkedin.com/in/martin-cagliero-16a617379/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <img src={LinkedInIcon} alt="LinkedIn" className="h-12 w-12 object-contain hover:opacity-80 transition-opacity" />
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-2 py-1 rounded-lg border border-white/15 hover:border-axus-accent text-white/80 hover:text-axus-accent transition-all duration-300 text-xs font-semibold"
              title="Toggle language"
            >
              {language === 'en' ? 'ES' : 'EN'}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-axus-dark/95 backdrop-blur-xl px-4 sm:px-6 py-4">
            <div className="flex flex-col gap-3">
              <a 
                href="#home" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-white/80 hover:bg-white/5 hover:text-axus-accent transition-colors text-sm font-semibold"
              >
                {t.navigation.home}
              </a>
              <a 
                href="#axus"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-white/80 hover:bg-white/5 hover:text-axus-accent transition-colors text-sm font-semibold"
              >
                {t.navigation.axus}
              </a>
              <a 
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-white/80 hover:bg-white/5 hover:text-axus-accent transition-colors text-sm font-semibold"
              >
                {t.navigation.projects}
              </a>
              <a 
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-white/80 hover:bg-white/5 hover:text-axus-accent transition-colors text-sm font-semibold"
              >
                {t.navigation.about}
              </a>
              <a 
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-white/80 hover:bg-white/5 hover:text-axus-accent transition-colors text-sm font-semibold"
              >
                {t.navigation.contact}
              </a>
              <div className="border-t border-white/10 pt-3 flex items-center gap-2">
                <a href="https://www.linkedin.com/in/martin-cagliero-16a617379/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="flex-1">
                  <img src={LinkedInIcon} alt="LinkedIn" className="h-8 w-8 object-contain hover:opacity-80 transition-opacity" />
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="fade-in-main">
        <section id="home" className="bg-grid">
          <div className="relative z-10 max-w-7xl mx-auto min-h-screen px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 md:pt-36 pb-12 sm:pb-16 md:pb-16 flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-10">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <p className="reveal-item text-axus-light text-base sm:text-lg md:text-xl mb-2 sm:mb-3">{t.hero.greeting}</p>
              <h1 className="reveal-item text-3xl sm:text-4xl md:text-[5.4rem] leading-[1.1] md:leading-[0.95] font-extrabold tracking-[-0.02em] mb-3 sm:mb-4">
                {t.hero.name}
              </h1>
              <p className="reveal-item text-lg sm:text-xl md:text-[1.7rem] text-axus-accent font-semibold mb-3 sm:mb-4">
                {t.hero.title}
              </p>
              <p className="reveal-item text-white/85 text-sm sm:text-base md:text-xl leading-relaxed max-w-2xl mb-6 sm:mb-8">
                {t.hero.description}
              </p>
              <a href="#projects" className="reveal-item inline-flex items-center justify-center px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl border border-axus-accent text-axus-light hover:bg-axus-accent/15 transition-colors text-sm sm:text-base">
                {t.hero.cta}
              </a>
            </div>

            <div className="w-full md:w-1/2 flex justify-center reveal-item order-1 md:order-2">
              <img
                src={HeroImage}
                alt="Martin Cagliero avatar"
                className="w-[280px] sm:w-[360px] md:w-[520px] max-w-full object-contain"
              />
            </div>
          </div>
        </section>

        <section id="axus" className="relative overflow-hidden py-12 sm:py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="reveal-item max-w-4xl mx-auto">
              <Link to="/axus" className="axus-highlight-card group block relative">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-axus-blue/30 via-axus-accent/30 to-axus-blue/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Card content */}
                <div className="relative rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl p-5 sm:p-8 md:p-12 transition-all duration-500 group-hover:border-axus-accent/40 group-hover:transform group-hover:scale-[1.02]">
                  <div className="text-center">
                    {/* Logo */}
                    <div className="mb-4 sm:mb-6">
                      <img 
                        src={AxusLogo} 
                        alt="Axus Logo" 
                        className="h-16 sm:h-20 md:h-24 w-auto mx-auto object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500" 
                      />
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-white to-axus-light bg-clip-text text-transparent">
                      {t.axus.title}
                    </h3>
                    <p className="text-white/75 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 max-w-2xl mx-auto">
                      {t.axus.description}
                    </p>
                    
                    <div className="inline-flex items-center gap-2 text-axus-accent font-bold text-base sm:text-lg group-hover:gap-4 transition-all duration-300">
                      <span>{t.axus.cta}</span>
                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </div>

                    {/* Social Links */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10">
                      <a 
                        href="https://www.instagram.com/axusanalytics/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-axus-accent hover:border-axus-accent/40 transition-all duration-300 text-xs sm:text-sm font-semibold flex-1 sm:flex-none justify-center"
                      >
                        <img src={InstagramIcon} alt="Instagram" className="h-4 w-4 object-contain" />
                        <span>Instagram</span>
                      </a>
                      <a 
                        href="https://www.tiktok.com/@axusanalytics" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-axus-accent hover:border-axus-accent/40 transition-all duration-300 text-xs sm:text-sm font-semibold flex-1 sm:flex-none justify-center"
                      >
                        <img src={TiktokIcon} alt="TikTok" className="h-4 w-4 object-contain" />
                        <span>TikTok</span>
                      </a>
                      <a 
                        href="https://axus-analytics.vercel.app/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-axus-accent hover:border-axus-accent/40 transition-all duration-300 text-xs sm:text-sm font-semibold flex-1 sm:flex-none justify-center"
                      >
                        <img src={WebIcon} alt="Website" className="h-4 w-4 object-contain" />
                        <span>Website</span>
                      </a>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section id="projects" className="relative px-4 sm:px-6 md:px-8 pb-16 sm:pb-20 md:pb-28">
          <div className="max-w-7xl mx-auto">
            <div className="reveal-item text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold">{t.projects.heading}</h2>
              <p className="mt-3 sm:mt-4 text-white/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                {t.projects.description}
              </p>
            </div>

            <div className="space-y-6 sm:space-y-8 md:space-y-12">
              {projects.map((project) => (
                <article key={project.name} className="project-premium-card rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-4 sm:p-6 md:p-8">
                  <div className="grid lg:grid-cols-[1.25fr_0.9fr] gap-6 sm:gap-8 items-center">
                    <div className="project-card-visual group">
                      <ProjectMockups project={project} />
                    </div>

                    <div className="project-card-content">
                      <span className="inline-flex px-2.5 sm:px-3 py-1 rounded-full bg-axus-accent/20 text-axus-accent text-xs font-semibold border border-axus-accent/30">
                        {project.category}
                      </span>
                      <h3 className="mt-3 sm:mt-4 text-xl sm:text-2xl md:text-4xl font-bold leading-tight text-white">{project.name}</h3>
                      <p className="mt-3 sm:mt-4 text-white/75 text-sm sm:text-base md:text-lg leading-relaxed">{project.description}</p>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-5 sm:mt-7 inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-white/5 border border-white/15 text-axus-light hover:border-axus-accent hover:bg-axus-accent/15 transition-all duration-300 font-semibold text-sm sm:text-base"
                      >
                        {t.projects.viewMore}
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="reveal-item text-center mt-10 sm:mt-12 md:mt-14">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-axus-accent/20 border border-axus-accent text-axus-light hover:bg-axus-accent/30 transition-all duration-300 font-semibold text-sm sm:text-base"
              >
                {t.projects.viewAll}
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        <section id="about" className="bg-grid-small">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24 reveal-item">
            <div className="grid md:grid-cols-2 items-center gap-6 sm:gap-8 md:gap-16">
              <div className="order-2 md:order-1 flex justify-center md:justify-start">
                <img
                  src={AboutImage}
                  alt="Martin Cagliero about avatar"
                  className="w-[280px] sm:w-[360px] md:w-[520px] max-w-full object-contain"
                />
              </div>

              <div className="order-1 md:order-2">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-5">{t.about.heading}</h2>
                <p className="text-white/80 text-sm sm:text-base md:text-xl leading-relaxed mb-3 sm:mb-4">
                  {t.about.paragraph1}
                </p>
                <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed">
                  {t.about.paragraph2}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="px-4 sm:px-6 md:px-8 pb-10 sm:pb-12 md:pb-16">
          <div className="max-w-6xl mx-auto reveal-item">
            <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.02] px-4 sm:px-6 md:px-8 py-8 sm:py-9 md:py-10 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">{t.contact.heading}</h2>
              <div className="mx-auto mt-2 sm:mt-3 h-1 w-24 sm:w-28 rounded-full bg-gradient-to-r from-axus-blue via-axus-accent to-axus-blue" />

              <p className="mt-4 sm:mt-6 text-white/75 text-xs sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                {t.contact.description}
              </p>

              <a
                href="mailto:martincagliero06@gmail.com"
                className="mt-6 sm:mt-7 inline-flex items-center justify-center px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl border border-axus-accent text-axus-light hover:bg-axus-accent/15 transition-all duration-300 font-semibold text-sm sm:text-base"
              >
                {t.contact.cta}
              </a>

              <div className="mt-6 sm:mt-8 border-t border-axus-accent/50 pt-4 sm:pt-6 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-5">
                <img src={LogoImage} alt="Logo" className="h-6 sm:h-8 w-auto object-contain opacity-95" />

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-6 text-xs sm:text-sm md:text-base font-semibold text-axus-light flex-wrap">
                  <a
                    href="https://wa.me/543493406303"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 sm:px-3 py-1.5 rounded-lg border border-white/15 hover:border-axus-accent hover:text-axus-accent transition-all duration-300"
                  >
                    {t.contact.whatsapp}
                  </a>
                  <a
                    href="mailto:martincagliero06@gmail.com"
                    className="px-2.5 sm:px-3 py-1.5 rounded-lg border border-white/15 hover:border-axus-accent hover:text-axus-accent transition-all duration-300"
                  >
                    {t.contact.mail}
                  </a>
                  <a
                    href="https://www.linkedin.com/in/martin-cagliero-16a617379/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 sm:px-3 py-1.5 rounded-lg border border-white/15 hover:border-axus-accent hover:text-axus-accent transition-all duration-300"
                  >
                    {t.contact.linkedin}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
