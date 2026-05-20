# Segunda iteración — Lo que añadiría

## Experiencia visual

- **Transiciones de página**: `AnimatePresence` de Framer Motion entre rutas — actualmente cada navegación es un hard-cut. Una transición de fade + slide suave elevaría la percepción de calidad.
- **Parallax en hero**: El efecto de parallax tipográfico (texto que se rompe al hacer scroll) descrito en el brief está semi-implementado con `useScroll`/`useTransform`. Completarlo con elementos flotantes asimétricos que se mueven a velocidades distintas.
- **Modo de vista en proyectos**: Añadir toggle Grid / Lista en `/proyectos` con animación de layout.
- **Cursor enhancement**: El cursor actual es limpio pero básico. Añadir estado "reading" (cursor más pequeño) para secciones de texto denso.
- **Grain texture animada**: Reemplazar el SVG estático de noise por un canvas con ruido animado — más atmosférico.

## Funcionalidad

- **Formulario de contacto con Resend**: Migrar de Formspree a una API route propia con Resend SDK (`/app/api/contact/route.ts`) para control total del template de email y sin límites de Formspree.
- **Case study con imágenes reales**: Añadir capturas de pantalla de GastroFit y PsicoApp en `/public/projects/`. Los placeholders actuales son elegantes pero las imágenes reales son más persuasivas.
- **Foto de perfil**: Colocar `profile.jpg` en `/public/` — el componente ya está preparado con `grayscale` → `grayscale-0` en hover.
- **CV descargable**: Añadir el PDF real en `/public/cv/DF-CV-2025.pdf`.
- **Open Graph image generada**: Usar `@vercel/og` para generar la imagen OG dinámicamente por página en lugar del estático `/public/og-image.jpg`.

## Técnico

- **View Transitions API**: Añadir `@view-transition` CSS para transiciones nativas cuando el soporte sea mayor.
- **i18n**: Añadir versión en inglés (`/en`) para alcance internacional — prioridad si se aplica a empresas no españolas.
- **Pruebas E2E**: Playwright para verificar que las rutas de case study funcionan, el formulario de contacto envía y el toggle de dark mode persiste.
- **Bundle analyzer**: `@next/bundle-analyzer` para identificar qué dependencias pesan más y si Framer Motion se puede tree-shake más agresivamente.
- **Image optimization**: Generar versiones WebP/AVIF de las screenshots de proyectos con `sharp` en build time.

## Contenido

- **Tercer proyecto real**: Completar el SaaS Dashboard cuando esté listo — es la pieza que falta para un portfolio de tres proyectos sólidos.
- **Testimonios / referencias**: Una sola cita de un compañero o manager de Adding Technology añadiría credibilidad social sin saturar.
- **Blog / notas**: Una sección `/notas` con 2-3 posts cortos sobre decisiones de diseño o desarrollo — demuestra criterio y mejora SEO long-tail.
