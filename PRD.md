# PRD --- ALLAGO CREATIVE

## Piloto: YLREIZ EL KAMIKAZE

**Versión:** 1.1\
**Última actualización:** 2026-11-12\
**Estado:** alcance funcional base definido; criterios de aceptación y
detalles del piloto sujetos a validación progresiva.

## 1. Propietario y objetivo

-   **Propietario:** ALLAGO CREATIVE.
-   **Piloto:** YLREIZ EL KAMIKAZE.
-   **Objetivo:** construir infraestructura tecnológica propia, modular
    y reutilizable para desarrollar sitios personalizados de artistas y
    creadores.

El sitio de Ylreiz será el núcleo de su presencia digital: identidad,
narrativa artística, música, contenido y experiencias interactivas. No
será únicamente un portafolio.

## 2. Alcance funcional del piloto

### 2.1 Inicio cinematográfico

-   Homepage cinematográfica.
-   Pantalla de introducción breve y descartable.

### 2.2 Música y multimedia

-   Reproductor propio e integraciones externas.
-   Vídeos musicales.
-   Efectos de sonido sutiles y opcionales.
-   Reproductor inferior expandible con control de volumen.

### 2.3 Identidad y contenido del artista

-   Biografía visual y timeline.
-   Integraciones con plataformas musicales y redes sociales.
-   Noticias y publicaciones.
-   Estadísticas básicas.

### 2.4 Participación

-   Contacto por correo y formulario.
-   Newsletter.

### 2.5 Experiencia

-   Animaciones cinematográficas adaptativas.
-   Tema visual configurable por artista.
-   Diseño responsive para escritorio, tablet y móvil.

### 2.6 Idiomas

-   Español predeterminado.
-   Inglés.
-   Preparación arquitectónica para 15 idiomas adicionales.

## 3. Requisitos no funcionales

-   SEO desde el inicio.
-   Rendimiento y carga eficiente de recursos.
-   Accesibilidad.
-   Seguridad.
-   Responsive design.
-   Preparación para internacionalización y ampliación futura.

## 4. Exclusiones del MVP

-   Tienda de merchandising.
-   Funcionalidades administrativas o de base de datos que no sean
    necesarias para validar el piloto.
-   Integraciones, animaciones 3D o efectos que no aporten valor
    comprobable a la experiencia.

## 5. Criterios de aceptación propuestos

Estos criterios sirven como base de validación y se concretarán durante
el diseño y las pruebas del piloto:

1.  La homepage presenta una introducción breve que puede descartarse.
2.  El reproductor inferior puede expandirse, controlar volumen y
    reproducir los medios admitidos por las integraciones implementadas.
3.  Los vídeos musicales se presentan mediante la estrategia multimedia
    definida.
4.  El sitio funciona en móvil, tablet y escritorio.
5.  Se verifican requisitos base de SEO, rendimiento, accesibilidad y
    seguridad.
6.  El idioma inicial es español; inglés está disponible y la
    arquitectura admite los idiomas adicionales previstos.

## 6. Estado del trabajo relacionado

-   Investigación funcional de referencia: realizada en el alcance
    documentado.
-   Infraestructura inicial: scaffold reportado como creado.
-   i18n: implementado y probado.
-   Design System Foundation: implementada y auditada.
-   Media Management: implementado y probado.
-   Player abstraction: implementado y probado.
-   Validación de integración del Core: completada.
-   Analytics: aplazado para el MVP del piloto.
-   Sitio piloto Ylreiz: pendiente.

El estado de implementación no modifica por sí solo el alcance funcional
del producto.

## 7. Principios de alcance

-   Ylreiz es el primer piloto de una infraestructura compartida de
    ALLAGO CREATIVE.
-   Las capacidades reutilizables deben residir en Core/shared/themes;
    la identidad y el contenido propios viven en la aplicación del
    artista.
-   Preparar extensibilidad sin implementar anticipadamente todas las
    funciones futuras.
-   Los cambios de alcance, integraciones relevantes y compromisos
    técnicos estructurales requieren aprobación del propietario.
-   Los detalles reversibles de implementación pueden resolverse durante
    el desarrollo, documentando decisiones importantes.

## 8. Pendientes de definición

-   Validación final de los criterios de aceptación.
-   Dirección visual y narrativa específica del sitio Ylreiz.
-   Selección de integraciones musicales y audiovisuales concretas.
-   Alcance de Three.js y animaciones.
-   Detalles operativos de contacto y newsletter.
-   Requisitos finales de publicación y analítica.
