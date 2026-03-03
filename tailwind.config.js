/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'axus': {
          'blue': '#4A9FE5',      // Azul principal Axus
          'dark': '#0B1220',      // Fondo profundo azulado
          'light': '#E0F2FE',     // Celeste claro para textos
          'lighter': '#11233A',   // Azul secundario para cards
          'accent': '#38BDF8',    // Celeste de acento
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['6rem', { lineHeight: '1.1', fontWeight: '800' }],
        'hero-sm': ['3.5rem', { lineHeight: '1.1', fontWeight: '800' }],
      }
    },
  },
  plugins: [],
}
