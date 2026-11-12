# ROADMAP --- ALLAGO CREATIVE

**Versión:** 2.0\
**Última actualización:** 2026-11-12\
**Estado general:** infraestructura Core con módulos cerrados (i18n, Design
System, Media Management, Player); Fase 2 iniciada (definición del piloto).

## 1. Objetivo

Construir infraestructura propia, modular y reutilizable para
desarrollar sitios web personalizados de artistas y creadores. **YLREIZ
EL KAMIKAZE** es el primer piloto que validará la infraestructura y su
capacidad de adaptarse a una identidad artística concreta.

La hoja de ruta distingue el trabajo ya realizado, el trabajo en curso y
la dirección futura. Los estados deben actualizarse con evidencia del
repositorio y de las pruebas.

## 2. Resumen de progreso

  -----------------------------------------------------------------------
  Área                    Estado                  Nota
  ----------------------- ----------------------- -----------------------
  Investigación de        Completada en su        Se utilizó como
  referencia Andsot       alcance documentado     referencia funcional;
                                                  no se copiará su
                                                  implementación ni
                                                  identidad.

  Documentación           Establecida             AGENTS, PRD,
  fundacional                                     Architecture y Roadmap
                                                  se mantienen como
                                                  documentos vivos.

  Monorepo y scaffold     Completado según        Verificar estado actual
                          reporte previo          del repositorio antes
                                                  de nuevas
                                                  intervenciones.

  Internacionalización    Implementada y probada  Español por defecto,
  (i18n)                                          inglés y preparación
                                                  para idiomas
                                                  adicionales; 16 pruebas
                                                  reportadas.

  Design System           Implementada y auditada 9/9 verificaciones
  Foundation                                      reportadas como
                                                  satisfactorias.

  Media Management        Implementada y probada  Contrato técnico
                                                  aprobado; OpenCode está
                                                  ejecutando la
                                                  implementación y sus
                                                  pruebas.

  Player abstraction      Implementada y probada  Consumirá el catálogo
                                                  multimedia; no forma
                                                  parte de Media
                                                  Management.

  Analytics y utilidades  Aplazado (MVP)        Definir e implementar
  compartidas                                     cuando corresponda
                                                  dentro de Core.

  Sitio piloto Ylreiz     Pendiente               Depende de una base
                                                  Core suficiente y de la
                                                  definición
                                                  visual/funcional del
                                                  piloto.

  Publicación             Futura                  Hosting independiente;
                                                  Netlify es la primera
                                                  opción considerada, no
                                                  un despliegue
                                                  realizado.
  -----------------------------------------------------------------------

## 3. Fases

### Fase 0 --- Investigación y definición fundacional

**Estado: completada.**

-   Ingeniería inversa de Andsot como referencia funcional.
-   Definición del propósito de ALLAGO y del piloto Ylreiz.
-   Establecimiento de PRD, arquitectura, roadmap e instrucciones de
    agentes.
-   Identificación de alcance, exclusiones y decisiones pendientes.

**Cierre operativo:** no reabrir la investigación salvo que aparezca una
necesidad concreta o evidencia nueva.

### Fase 1 --- Infraestructura reutilizable (Core)

**Estado: completada.**

**Completado según reportes previos** - Monorepo y estructura inicial. -
Internacionalización. - Fundamentos del Design System y validaciones
asociadas.

**Completado** - Media Management en `packages/core`, conforme al contrato
aprobado: completado.

**Siguiente dentro de Core** - Analytics y utilidades compartidas cuando
se concrete su alcance. - Iniciar Fase 2: definición del piloto YLREIZ EL
KAMIKAZE.

**Criterio de salida:** Core ofrece una base estable y reutilizable para
construir el piloto, con contratos y pruebas para sus módulos
principales. No requiere implementar desde ahora un panel administrativo
o una base de datos.

### Fase 2 --- Definición e implementación del piloto YLREIZ

**Estado: en definición.**

-   Definir arquitectura de información y navegación del sitio.
-   Aprobar dirección visual propia de Ylreiz.
-   Configurar identidad, tema y contenido del artista.
-   Implementar homepage cinematográfica, introducción breve,
    reproductor inferior, música, vídeos, biografía, timeline, redes,
    publicaciones y contacto/newsletter según el PRD.
-   Integrar las capacidades Core sin mezclar la lógica específica del
    artista con la infraestructura compartida.

**Criterio de salida:** piloto funcional, responsive y aceptado por el
propietario.

### Fase 3 --- Validación integral

**Estado: pendiente.**

-   Pruebas funcionales y de integración.
-   Escritorio, tablet y móvil.
-   Accesibilidad, rendimiento, SEO, seguridad y compatibilidad.
-   Corrección de defectos y aceptación del propietario.

### Fase 4 --- Publicación y operación

**Estado: pendiente.**

-   Selección y configuración definitiva de dominio y hosting.
-   Preparación de producción, despliegue y verificación.
-   Mantenimiento y procedimiento de actualización.

Netlify es la primera opción contemplada; la decisión final y el
despliegue siguen pendientes.

### Fase 5 --- Reutilización y expansión de ALLAGO

**Estado: futura.**

-   Reutilizar Core para nuevos artistas y creadores.
-   Consolidar configuración de temas e identidades independientes.
-   Evaluar persistencia, base de datos y panel administrativo según
    necesidades reales.
-   Ampliar integraciones y capacidades sin comprometer la modularidad.

## 4. Principios de secuencia

-   Priorizar primero una base Core útil, no una plataforma
    sobredimensionada.
-   El catálogo multimedia y el reproductor son módulos separados.
-   Preparar extensibilidad sin implementar anticipadamente todas las
    funciones futuras.
-   El contenido inicial puede gestionarse con JSON y Markdown.
-   La infraestructura compartida vive en `packages/core`,
    `packages/shared` y `packages/themes`; el piloto vive en
    `apps/ylreiz`.
-   La tienda de merchandising permanece fuera del MVP.
-   No iniciar una fase dependiente hasta que sus prerrequisitos estén
    suficientemente validados.

## 5. Próximo hito

**Cerrar la Fase 1:** validar la integración del Core y registrar el
cierre documental. **Inicio de la Fase 2:** definir el piloto YLREIZ EL
KAMIKAZE. Después, continuar con la definición del piloto sin reabrir
decisiones ya aprobadas salvo que surja una necesidad concreta.

## 6. Mantenimiento del roadmap

Actualizar este documento al cerrar hitos o cambiar prioridades. Los
estados deben reflejar evidencia, no intención. Mantener el nivel de
detalle ejecutivo: qué se hizo, dónde estamos, qué sigue y qué condición
permite avanzar.
