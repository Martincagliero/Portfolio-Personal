import React from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from './LanguageContext.jsx';
import { translations } from './translations.js';
import LogoImage from './assets/logo.png';
import LinkedInIcon from './assets/logo-linkedin.png';
import AxusLogo from './assets/logo-axus.jpg';
import AxusDeskLogo from './assets/logo.axusdesk-crm.ico';
import InstagramIcon from './assets/icon-instagram.png';
import TiktokIcon from './assets/icon-tiktok.png';
import WebIcon from './assets/icon-web.png';

gsap.registerPlugin(ScrollTrigger);

export default function AxusPage() {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];
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
          <Link to="/" className="flex items-center">
            <img src={LogoImage} alt="Martin Cagliero logo" className="h-8 sm:h-9 md:h-11 w-auto object-contain" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-white/80">
            <Link to="/#home" className="hover:text-axus-accent transition-colors">{t.navigation.home}</Link>
            <Link to="/axus" className="text-axus-accent transition-colors">{t.navigation.axus}</Link>
            <Link to="/#projects" className="hover:text-axus-accent transition-colors">{t.navigation.projects}</Link>
            <Link to="/#about" className="hover:text-axus-accent transition-colors">{t.navigation.about}</Link>
            <Link to="/#contact" className="hover:text-axus-accent transition-colors">{t.navigation.contact}</Link>
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
              <Link 
                to="/#home"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-white/80 hover:bg-white/5 hover:text-axus-accent transition-colors text-sm font-semibold"
              >
                {t.navigation.home}
              </Link>
              <Link 
                to="/axus"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-axus-accent/15 text-axus-accent transition-colors text-sm font-semibold"
              >
                {t.navigation.axus}
              </Link>
              <Link 
                to="/#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-white/80 hover:bg-white/5 hover:text-axus-accent transition-colors text-sm font-semibold"
              >
                {t.navigation.projects}
              </Link>
              <Link 
                to="/#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-white/80 hover:bg-white/5 hover:text-axus-accent transition-colors text-sm font-semibold"
              >
                {t.navigation.about}
              </Link>
              <Link 
                to="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-white/80 hover:bg-white/5 hover:text-axus-accent transition-colors text-sm font-semibold"
              >
                {t.navigation.contact}
              </Link>
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
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-28">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1a] via-[#0d1421] to-[#11233a] opacity-95" />
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-96 h-96 bg-axus-blue/10 rounded-full blur-3xl" />
            <div className="absolute bottom-32 right-20 w-[32rem] h-[32rem] bg-axus-accent/8 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="text-center mb-12 sm:mb-16 md:mb-20 reveal-item">
              {/* Logo 3D Floating */}
              <div className="axus-logo-3d mb-8 sm:mb-10 md:mb-12">
                <img 
                  src={AxusLogo} 
                  alt="Axus Logo" 
                  className="h-24 sm:h-28 md:h-32 lg:h-40 w-auto mx-auto object-contain drop-shadow-2xl"
                />
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] md:leading-[1.1] tracking-tight mb-4 sm:mb-6 md:mb-8">
                <span className="bg-gradient-to-r from-white via-axus-light to-white bg-clip-text text-transparent">
                  Transformando ideas en
                </span>
                <br />
                <span className="bg-gradient-to-r from-axus-accent via-axus-blue to-axus-accent bg-clip-text text-transparent">
                  soluciones digitales
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/75 leading-relaxed max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12">
                Axus fue creado y liderado por mí, combinando estrategia, diseño y desarrollo para convertir ideas en resultados tangibles.
                <span className="block mt-2 sm:mt-3 text-white/60 text-xs sm:text-sm md:text-base">
                  Un proyecto que refleja mi visión de crear productos digitales que automatizan procesos y potencian negocios.
                </span>
              </p>

              {/* Social Links */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10">
                <a 
                  href="https://www.instagram.com/axusanalytics/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-axus-accent hover:border-axus-accent/40 hover:scale-105 transition-all duration-300 font-semibold text-sm w-full sm:w-auto justify-center"
                >
                  <img src={InstagramIcon} alt="Instagram" className="h-4 sm:h-5 w-4 sm:w-5 object-contain" />
                  <span>Instagram</span>
                </a>
                <a 
                  href="https://www.tiktok.com/@axusanalytics" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-axus-accent hover:border-axus-accent/40 hover:scale-105 transition-all duration-300 font-semibold text-sm w-full sm:w-auto justify-center"
                >
                  <img src={TiktokIcon} alt="TikTok" className="h-4 sm:h-5 w-4 sm:w-5 object-contain" />
                  <span>TikTok</span>
                </a>
                <a 
                  href="https://axusanalytics.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="axus-cta-button group flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-axus-blue to-axus-accent text-white font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 text-sm w-full sm:w-auto justify-center"
                >
                  <img src={WebIcon} alt="Website" className="h-4 sm:h-5 w-4 sm:w-5 object-contain" />
                  <span>Visitar sitio</span>
                  <span className="transform group-hover:translate-x-1 transition-transform hidden sm:inline">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Axus Desk Section */}
        <section className="relative px-4 sm:px-6 md:px-8 pb-16 sm:pb-20 md:pb-32">
          <div className="max-w-7xl mx-auto">
            <div className="reveal-item max-w-5xl mx-auto">
              <div className="axus-desk-card group relative">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-axus-blue/30 via-axus-accent/30 to-axus-blue/30 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Card content */}
                <div className="relative rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl p-5 sm:p-8 md:p-12 transition-all duration-500 group-hover:border-axus-accent/40">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 md:gap-10">
                    {/* Logo con efecto 3D */}
                    <div className="flex-shrink-0 axus-desk-logo">
                      <img 
                        src={AxusDeskLogo} 
                        alt="Axus Desk Logo" 
                        className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 object-contain drop-shadow-xl" 
                      />
                    </div>
                    
                    <div className="flex-grow text-center md:text-left">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 bg-gradient-to-r from-white to-axus-light bg-clip-text text-transparent">
                        Axus Desk
                      </h2>
                      <p className="text-axus-accent font-semibold text-base sm:text-lg mb-3 sm:mb-4">
                        CRM & Automation Platform
                      </p>
                      <p className="text-white/75 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-7 max-w-2xl mx-auto md:mx-0">
                        Desarrollé esta plataforma integral de CRM para automatizar procesos, gestionar relaciones y potenciar la productividad. Un proyecto donde apliqué arquitectura escalable, diseño intuitivo y funcionalidades avanzadas.
                      </p>
                      <a 
                        href="https://axus-desk.vercel.app/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-axus-accent to-axus-blue text-axus-dark hover:from-axus-blue hover:to-axus-accent font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-sm sm:text-base"
                      >
                        <span>Abrir plataforma</span>
                        <span>→</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div className="text-center mt-12 sm:mt-14 md:mt-16">
              <Link 
                to="/#axus"
                className="inline-flex items-center gap-2 text-axus-accent hover:text-axus-light transition-colors font-semibold text-sm sm:text-base"
              >
                <span>←</span>
                {language === 'en' ? 'Back to portfolio' : 'Volver al portfolio'}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
