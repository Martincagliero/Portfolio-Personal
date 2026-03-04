import React from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from './LanguageContext.jsx';
import { translations } from './translations.js';
import LogoImage from './assets/logo.png';
import LinkedInIcon from './assets/logo-linkedin.png';

gsap.registerPlugin(ScrollTrigger);

export default function AllProjects() {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const allProjects = [
    { 
      name: t.projects.office.name, 
      description: t.projects.office.description,
      category: t.projects.office.category,
      link: 'https://office-auto-car.vercel.app/',
      heroImage: '/projects/office.png',
      mockupBg: 'linear-gradient(135deg, #11233A 0%, #4A9FE5 100%)'
    },
    { 
      name: t.projects.krautermeister.name, 
      description: t.projects.krautermeister.description,
      category: t.projects.krautermeister.category,
      link: 'https://krautermeister-official.vercel.app/',
      heroImage: '/projects/krautrmeister.png',
      mockupBg: 'linear-gradient(135deg, #0B1220 0%, #38BDF8 100%)'
    },
    { 
      name: 'Web Portfolio', 
      description: language === 'en' 
        ? 'Digital portfolio designed to present projects in a clear, modern, and strategic way, with a focus on user experience and visual structure.'
        : 'Portfolio digital diseñado para presentar proyectos de forma clara, moderna y estratégica, con foco en experiencia de usuario y estructura visual.',
      category: '3D Design',
      link: 'https://portfolio-web-designer-gamma.vercel.app/',
      heroImage: '/projects/portfolio.png',
      mockupBg: 'linear-gradient(135deg, #0B1220 0%, #38BDF8 100%)'
    },
    { 
      name: 'Casi Como Ella', 
      description: language === 'en'
        ? 'Elegant landing page for textile product catalog with attractive visual design and intuitive navigation.'
        : 'Landing page elegante para catálogo de productos textiles con diseño visual atractivo y navegación intuitiva.',
      category: 'Landing Page',
      link: 'https://casi-como-ella.vercel.app/',
      heroImage: '/projects/casicomoella.png',
      mockupBg: 'linear-gradient(135deg, #E0F2FE 0%, #4A9FE5 100%)'
    },
    { 
      name: 'RT.Detail', 
      description: language === 'en'
        ? 'High-impact landing page designed to maximize conversion and engagement.'
        : 'Landing page de alto impacto diseñada para maximizar conversión y engagement.',
      category: 'Landing Page',
      link: 'https://rt-detail.vercel.app/',
      heroImage: '/projects/rtdetail.png',
      mockupBg: 'linear-gradient(135deg, #4A9FE5 0%, #E0F2FE 100%)'
    },
    { 
      name: 'Billoud', 
      description: language === 'en'
        ? 'Website developed for a construction company, focused on streamlining inquiries, presenting services clearly, and optimizing contact with potential clients.'
        : 'Sitio web desarrollado para una constructora, enfocado en agilizar consultas, presentar servicios de forma clara y optimizar el contacto con potenciales clientes.',
      category: language === 'en' ? 'Design + Web Development' : 'Diseño + Desarrollo Web',
      link: 'https://billoud-constructora.vercel.app/',
      heroImage: '/projects/billoud.png',
      mockupBg: 'linear-gradient(135deg, #38BDF8 0%, #4A9FE5 100%)'
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
        '.project-card-modern',
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-axus-dark text-white font-sans overflow-x-hidden fade-in-main">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 fade-in-header ${
          scrolled ? 'bg-axus-dark/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={LogoImage} alt="Martin Cagliero logo" className="h-8 sm:h-9 md:h-11 w-auto object-contain" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <Link to="/#home" className="text-axus-light hover:text-axus-accent transition-colors">{t.navigation.home}</Link>
            <Link to="/#axus" className="text-axus-light hover:text-axus-accent transition-colors">{t.navigation.axus}</Link>
            <Link to="/projects" className="text-axus-accent transition-colors">{t.navigation.projects}</Link>
            <Link to="/#about" className="text-axus-light hover:text-axus-accent transition-colors">{t.navigation.about}</Link>
            <Link to="/#contact" className="text-axus-light hover:text-axus-accent transition-colors">{t.navigation.contact}</Link>
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
                to="/#axus"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-white/80 hover:bg-white/5 hover:text-axus-accent transition-colors text-sm font-semibold"
              >
                {t.navigation.axus}
              </Link>
              <Link 
                to="/projects"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-axus-accent/15 text-axus-accent transition-colors text-sm font-semibold"
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

      <main className="relative z-10 bg-dots">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 md:pt-40 pb-12 sm:pb-16 md:pb-24">
          {/* Back Button */}
          <div className="mb-8 sm:mb-12">
            <Link 
              to="/#projects"
              className="inline-flex items-center gap-2 text-axus-accent hover:text-axus-light transition-colors font-semibold text-sm sm:text-base"
            >
              <span>←</span>
              {language === 'en' ? 'Back to home' : 'Volver al inicio'}
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-12 sm:mb-14 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4">{language === 'en' ? 'All Projects' : 'Todos los Proyectos'}</h1>
            <div className="mx-auto w-24 sm:w-28 md:w-32 h-1 rounded-full bg-gradient-to-r from-axus-blue via-axus-accent to-[#8dd8ff] mb-4 sm:mb-6" />
            <p className="text-white/70 text-sm sm:text-base md:text-xl max-w-2xl mx-auto">
              {language === 'en' 
                ? 'A complete collection of digital solutions developed with passion and precision'
                : 'Una colección completa de soluciones digitales desarrolladas con pasión y precisión'}
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
            {allProjects.map((project, index) => (
              <div key={project.name} className="project-card-modern group">
                {/* Mockup Image */}
                <div className="relative overflow-hidden rounded-lg sm:rounded-xl mb-4 sm:mb-6 aspect-video border border-white/10 bg-white/[0.02]">
                  <div
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                    style={{ background: project.mockupBg }}
                  >
                    {project.heroImage && (
                      <img
                        src={project.heroImage}
                        alt={`${project.name} hero`}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}
                  </div>
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-axus-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="px-2">
                  <span className="inline-block px-2.5 sm:px-3 py-1 rounded-full bg-axus-accent/20 text-axus-accent text-xs font-semibold mb-2 sm:mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 group-hover:text-axus-accent transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed mb-5 sm:mb-6">
                    {project.description}
                  </p>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-axus-light hover:border-axus-accent hover:bg-axus-accent/15 transition-all duration-300 font-semibold text-sm sm:text-base"
                  >
                    {language === 'en' ? 'View project' : 'Ver proyecto'}
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
