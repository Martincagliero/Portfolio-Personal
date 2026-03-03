# 🚀 Portfolio Martin Cagliero

Portfolio web moderno y minimalista inspirado en [joacomesa.com.ar](https://www.joacomesa.com.ar/)

## 📋 Descripción

Web personal de Martin Cagliero, estudiante de Ingeniería Informática en ICES. Portfolio profesional con diseño minimalista, animaciones suaves con GSAP y una paleta de colores en tonos azules/celestes.

## ✨ Características

- ⚡ **Vite + React** - Desarrollo rápido y moderno
- 🎨 **Tailwind CSS** - Estilos utilitarios con tema personalizado
- 🎭 **GSAP Animations** - Animaciones fluidas y profesionales
- 📱 **Responsive Design** - Adaptado a todos los dispositivos
- 🎯 **Minimalista** - Diseño limpio y enfocado en el contenido

## 🎨 Paleta de Colores Axus

```js
{
  'axus-blue': '#2D5F8D',      // Azul oscuro principal
  'axus-dark': '#1A3A52',      // Azul más oscuro para textos
  'axus-light': '#E8F1F8',     // Celeste muy claro para fondos
  'axus-lighter': '#F5F9FC',   // Celeste ultraclaro
  'axus-accent': '#4A90C9',    // Azul medio para acentos
}
```

## 🛠️ Instalación

### Prerrequisitos

- Node.js 16+ y npm instalados

### Pasos

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Agregar las imágenes**
   - Coloca `hero-avatar.png` y `about-avatar.png` en la carpeta `src/assets/`
   - Las imágenes deben ser PNG con fondo transparente, estilo 3D
   - Dimensiones recomendadas: 512x512px o superiores

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```
   
   El sitio estará disponible en `http://localhost:5173`

4. **Construir para producción**
   ```bash
   npm run build
   ```
   
   Los archivos optimizados se generarán en la carpeta `dist/`

5. **Vista previa de la build de producción**
   ```bash
   npm run preview
   ```

## 📁 Estructura del Proyecto

```
Portfolio/
├── src/
│   ├── assets/
│   │   ├── hero-avatar.png      # Imagen principal
│   │   ├── about-avatar.png     # Imagen sección "Sobre mí"
│   │   └── README.md
│   ├── Portfolio.jsx            # Componente principal
│   ├── main.jsx                 # Punto de entrada
│   └── index.css                # Estilos globales + Tailwind
├── index.html                   # HTML base
├── package.json
├── tailwind.config.js           # Configuración de Tailwind
├── vite.config.js               # Configuración de Vite
└── README.md
```

## 🎯 Secciones del Portfolio

1. **Hero** - Presentación principal con imagen 3D
2. **Axus** - Descripción de la agencia creada
3. **Proyectos** - Grid con proyectos destacados
4. **Sobre mí** - Información personal y académica
5. **Contacto** - Enlaces a redes sociales

## 🔧 Personalización

### Modificar proyectos

Edita el array `projects` en `src/Portfolio.jsx`:

```jsx
const projects = [
  { name: 'Nombre del Proyecto', link: 'https://...' },
  // Agrega más proyectos aquí
];
```

### Cambiar colores

Modifica `tailwind.config.js` en la sección `theme.extend.colors`.

### Ajustar animaciones

Las animaciones GSAP están en el `useEffect` del componente Portfolio. Modifica:
- `y`: desplazamiento vertical
- `opacity`: opacidad inicial
- `duration`: duración de la animación
- `stagger`: retraso entre elementos

## 📦 Tecnologías Utilizadas

- React 18
- Vite 5
- Tailwind CSS 3
- GSAP 3
- PostCSS
- Autoprefixer

## 🌐 Deploy

Puedes deployar este proyecto en:

- **Vercel** - `npm i -g vercel && vercel`
- **Netlify** - Arrastra la carpeta `dist/` o conecta con Git
- **GitHub Pages** - Configura GitHub Actions

## 📝 Licencia

Proyecto personal de Martin Cagliero © 2026

---

Hecho con ❤️ por Martin Cagliero
