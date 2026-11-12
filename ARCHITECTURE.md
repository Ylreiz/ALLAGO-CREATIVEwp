# ARCHITECTURE --- ALLAGO CREATIVE

**Versión:** 1.1\
**Última actualización:** 2026-11-12\
**Estado:** arquitectura base establecida; infraestructura Core con
módulos cerrados (i18n, Design System, Media Management, Player) y Fase 2
iniciada (definición del piloto).

## 1. Objetivo arquitectónico

ALLAGO CREATIVE mantiene una infraestructura tecnológica propia, modular
y reutilizable para construir sitios web de artistas y creadores. YLREIZ
EL KAMIKAZE es el primer piloto.

La arquitectura debe permitir que cada artista tenga identidad y
contenido independientes mientras consume capacidades compartidas. Debe
crecer por módulos, sin anticipar sistemas que todavía no tienen una
necesidad validada.

## 2. Decisiones técnicas aprobadas

-   Monorepo propiedad de ALLAGO CREATIVE.
-   Vite y JavaScript modular.
-   HTML5 y CSS3.
-   Three.js opcional y solo cuando una experiencia 3D aporte valor
    real.
-   Separación en tres capas: **Core, Identity y Content**.
-   Arquitectura independiente del proveedor de hosting.
-   Netlify como primera opción de despliegue considerada.
-   Contenido inicial mediante JSON y Markdown.
-   Preparación para una futura base de datos y panel administrativo.
-   Multimedia mediante archivos propios e integraciones externas.
-   SEO, rendimiento, accesibilidad, seguridad y responsive desde el
    inicio.
-   No utilizar WordPress ni Elementor.

## 3. Capas y responsabilidades

### Core --- infraestructura reutilizable

-   Design System y base de componentes compartidos.
-   Internacionalización (i18n).
-   Media Management: catálogo de recursos propios y referencias
    externas de audio/vídeo.
-   Player abstraction: reproducción y controles, separada del catálogo
    multimedia.
-   Analytics y estadísticas básicas.
-   Utilidades compartidas.

### Identity --- identidad específica

-   Biografía visual y recursos visuales.
-   Timeline.
-   Configuración de tema por artista.
-   Estadísticas específicas del artista.

### Content --- contenido

-   Fuentes JSON y Markdown para publicaciones, noticias y otros
    contenidos editoriales.
-   Separación entre contenido y presentación.

## 4. Organización del monorepo

``` text
ALLAGO-CREATIVE/
├── apps/
│   └── ylreiz/
│       ├── src/
│       ├── public/
│       └── content/
├── packages/
│   ├── core/
│   ├── shared/
│   └── themes/
├── docs/
├── AGENTS.md
├── PRD.md
├── ARCHITECTURE.md
└── ROADMAP.md
```

La estructura real puede evolucionar si se conserva la separación entre
aplicaciones piloto e infraestructura reutilizable.

## 5. Multimedia y Media Management

Media Management es un módulo de catálogo, no un reproductor ni una
interfaz visual.

Entidades acordadas: - `MediaAsset`: recurso multimedia propio. -
`ExternalMedia`: referencia a un recurso alojado en una plataforma
externa. - `MediaCollection`: agrupación lógica de recursos.

Reglas arquitectónicas aprobadas: - Tipos estructurales de medio:
`audio` y `video`. - Los identificadores son independientes de las rutas
`src`. - Las colecciones referencian IDs de medios. - Los metadatos son
extensibles y descriptivos. - El módulo no incorpora UI, lógica de
reproducción ni SDK específicos de proveedores. - El gestor mantiene
estado aislado por instancia. - Los IDs generados usan
`crypto.randomUUID()` con verificación de unicidad; los IDs manuales son
strings opacos no vacíos y se conservan exactamente. - Las
actualizaciones, errores, colecciones y eliminación en cascada siguen el
contrato técnico aprobado.

El contrato detallado y sus reglas se mantienen en el código y sus
pruebas. El reproductor consume el catálogo desde el módulo Player
abstraction implementado en `packages/core/src/player/`. Con la
validación de integración del Core, Media Management y Player
abstraction se consideran cerrados en la fase actual.

## 6. Internacionalización

-   Idioma predeterminado: español.
-   Inglés como segundo idioma.
-   Arquitectura preparada para incorporar 15 idiomas adicionales.
-   La selección y los fallbacks deben ser consistentes entre
    aplicaciones.

## 7. Integraciones externas

Se contemplan plataformas musicales y de vídeo. Los proveedores
concretos, métodos de integración, permisos y SDK se decidirán al
implementar cada integración. Core debe evitar acoplar el catálogo
genérico a un proveedor específico.

## 8. Rendimiento, accesibilidad y seguridad

Son requisitos transversales desde el inicio del piloto: - Diseño
responsive. - Accesibilidad. - Rendimiento y carga eficiente de
medios. - SEO. - Validación de entradas y tratamiento seguro de datos. -
Pruebas automatizadas y verificaciones por módulo.

## 9. Estado de implementación

Estado reportado al 2026-11-12: - Monorepo/scaffold: creado según
reporte previo. - i18n: implementado y probado. - Design System
Foundation: implementada y auditada (9/9 verificaciones reportadas). -
Media Management: implementada y verificada por pruebas. - Player
abstraction: implementada y verificada por pruebas. - Validación de
integración del Core: completada. - Analytics: aplazado (no requerido para el MVP). - Sitio piloto Ylreiz: pendiente.

Confirmar cada estado contra el repositorio y los resultados de pruebas
antes de marcarlo como cerrado.

## 10. Decisiones aún abiertas

-   Profundidad y alcance de Three.js en el piloto.
-   Mecanismo de configuración de temas por artista.
-   Framework y estrategia completa de pruebas.
-   Proveedores y detalles de integración del reproductor.
-   Cuándo se justifican base de datos y panel administrativo.
-   Hosting definitivo y configuración de producción.

Estas decisiones no bloquean módulos independientes si pueden
implementarse sin anticiparlas ni crear acoplamientos.

## 11. Principio de evolución

La arquitectura debe permitir crecer sin obligar a construir todas las
capacidades desde el principio. Las decisiones reversibles se resuelven
durante la implementación; los cambios estructurales, dependencias
relevantes e integraciones requieren aprobación del propietario.
