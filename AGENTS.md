# AGENTS.md --- ALLAGO CREATIVE

**Versión:** 2.0\
**Última actualización:** 2026-11-12\
**Ámbito:** repositorio completo de ALLAGO CREATIVE y sus aplicaciones.

## 1. Propósito y contexto

ALLAGO CREATIVE desarrolla infraestructura tecnológica modular y
reutilizable para crear sitios web personalizados de artistas y
creadores.

**YLREIZ EL KAMIKAZE** es el primer proyecto piloto. La infraestructura
compartida pertenece a ALLAGO CREATIVE; la identidad, el contenido y la
experiencia de Ylreiz deben conservar una personalidad artística
independiente.

La tienda de merchandising queda fuera del MVP del sitio principal.

## 2. Roles y autoridad

-   **Propietario/director:** define objetivos, identidad, alcance y
    decisiones finales. Conserva la autoridad de aprobación.
-   **ChatGPT --- Punto de Observación:** arquitectura, estrategia,
    investigación, evaluación técnica, revisión de propuestas y
    supervisión de calidad.
-   **OpenCode:** agente técnico encargado de inspección e
    implementación autorizada en el repositorio, utilizando las
    herramientas disponibles.
-   **REA:** herramienta de investigación e inspección de referencias.
    No autoriza modificar sitios de terceros ni sustituye la evidencia
    de pruebas del proyecto.

Ningún agente puede convertir una recomendación o hipótesis en una
decisión aprobada.

## 3. Principios de trabajo

1.  Trabajar con evidencia y distinguir **hechos, decisiones aprobadas,
    hipótesis, recomendaciones y pendientes**.
2.  No inventar resultados de inspecciones, ejecuciones, pruebas o
    auditorías.
3.  Priorizar soluciones modulares, mantenibles, seguras, accesibles y
    reutilizables.
4.  Resolver las necesidades actuales sin cerrar innecesariamente
    opciones futuras.
5.  Evitar complejidad, abstracciones o dependencias que no aporten
    valor comprobable.
6.  No repetir preguntas ya respondidas ni reabrir decisiones aprobadas
    sin una razón técnica concreta.
7.  Mantener coherentes `AGENTS.md`, `PRD.md`, `ARCHITECTURE.md` y
    `ROADMAP.md`.
8.  Documentar decisiones relevantes y cambios que alteren alcance,
    arquitectura o comportamiento.

## 4. Autonomía y aprobaciones

### Los agentes pueden decidir y ejecutar

-   Detalles internos de implementación que respeten el contrato y la
    arquitectura aprobados.
-   Refactorizaciones locales sin cambio de comportamiento ni ampliación
    de alcance.
-   Nombres internos, organización de archivos y soluciones técnicas
    reversibles.
-   Pruebas, validaciones, correcciones de defectos y mejoras de calidad
    dentro del alcance.
-   Decisiones menores de implementación que no creen dependencias ni
    compromisos externos.

Estas decisiones deben resumirse en el informe de trabajo cuando sean
relevantes.

### Requiere aprobación del propietario

-   Cambios de alcance funcional o de producto.
-   Cambios de arquitectura o de tecnologías principales.
-   Nuevas dependencias con impacto relevante, servicios externos, SDK o
    integraciones.
-   Costos, cuentas, credenciales, publicación, despliegue o acciones
    externas.
-   Decisiones creativas que definan la identidad visual o narrativa.
-   Cambios destructivos, eliminación de datos o modificación de
    archivos fuera del alcance autorizado.
-   Commits, pushes, publicación o despliegue, salvo autorización
    expresa.

Si una decisión pendiente bloquea el trabajo, presentar una
recomendación breve con impacto y alternativa. No detener el avance por
detalles menores reversibles.

## 5. Protocolo de ejecución

1.  Confirmar el repositorio y su raíz antes de trabajar. La ruta de
    referencia es `C:\Users\Personal\Desktop\ALLAGO-CREATIVE`;
    verificarla en cada sesión cuando exista duda.
2.  Inspeccionar el estado real de archivos, Git, dependencias y pruebas
    antes de modificar.
3.  Leer las instrucciones y documentos relevantes para la tarea.
4.  Implementar en incrementos pequeños y coherentes con los módulos
    existentes.
5.  No sobrescribir ni eliminar trabajo existente sin autorización.
6.  Ejecutar las pruebas pertinentes y comprobar el resultado real.
7.  Revisar los cambios realizados y reportar archivos afectados.
8.  No hacer commits ni despliegues sin autorización expresa.

Cuando el propietario esté ejecutando una tarea paso a paso, dar **una
sola instrucción accionable por mensaje**, con aplicación, ubicación,
comando y resultado esperado cuando corresponda.

## 6. Ritmo y comunicación

El objetivo es mantener rigor sin convertir la revisión en un cuello de
botella.

-   No solicitar aprobación para cada detalle de implementación
    reversible.
-   No abrir rondas adicionales de revisión por asuntos menores que
    puedan resolverse con pruebas.
-   Agrupar hallazgos relacionados y presentar solo decisiones que
    realmente necesiten al propietario.
-   Los informes deben priorizar: **resultado, archivos afectados,
    pruebas, problemas y decisiones pendientes**.
-   Ser conciso y concreto; evitar informes ceremoniales o repetir
    contexto ya establecido.
-   Si algo no se verificó, declararlo explícitamente.

## 7. Estándares técnicos y de calidad

-   Código modular, mantenible, seguro y reutilizable.
-   Separación clara entre infraestructura compartida y funcionalidades
    específicas de cada artista.
-   Responsive design, accesibilidad, rendimiento, SEO y seguridad desde
    el inicio del producto.
-   Validación de entradas y manejo explícito de errores.
-   Pruebas automatizadas para contratos y comportamientos importantes.
-   No declarar una tarea completa solo porque el código fue escrito:
    debe verificarse mediante pruebas o evidencia equivalente.

## 8. Límites del proyecto

-   No copiar código, recursos protegidos ni identidad visual de sitios
    de referencia.
-   No modificar sitios de terceros durante la investigación.
-   No adoptar WordPress o Elementor para este proyecto.
-   No implementar la tienda de merchandising en el MVP.
-   No introducir interfaces visuales, lógica de reproducción o SDK de
    proveedores dentro de módulos Core que deban permanecer
    independientes.
-   No implementar funcionalidades futuras solo porque la arquitectura
    permita incorporarlas.

## 9. Estado de referencia

Al actualizar este documento, el estado reportado del proyecto es:

-   Monorepo y estructura inicial creados.
-   Módulo de internacionalización implementado y probado; español por
    defecto e inglés, con preparación para más idiomas.
-   Design System Foundation implementado y auditado: 9/9 verificaciones
    reportadas como satisfactorias.
-   Contrato de Media Management aprobado técnicamente y su
    implementación completada y verificada mediante pruebas.
-   Player abstraction implementada y verificada mediante pruebas.
-   Validación de integración del Core completada.
-   Analytics aplazado: no requerido para el MVP.
-   La web específica de Ylreiz todavía no debe considerarse terminada
    ni validada.
-   Siguiente fase: definición del piloto YLREIZ EL KAMIKAZE.

Este apartado es una fotografía del estado a la fecha indicada, no una
afirmación permanente. Verificar el repositorio antes de actualizarlo.

## 10. Documentación y control de cambios

Los cuatro documentos base cumplen funciones distintas:

-   `AGENTS.md`: autoridad, límites y forma de trabajo de los agentes.
-   `PRD.md`: necesidades, alcance y criterios del producto.
-   `ARCHITECTURE.md`: estructura y decisiones técnicas.
-   `ROADMAP.md`: progreso, secuencia y dirección del proyecto.

Actualizar únicamente los documentos afectados por un cambio.
Mantenerlos coherentes entre sí. Registrar como pendiente cualquier
decisión no aprobada.

**Regla final:** avanzar con autonomía dentro de los límites aprobados;
escalar únicamente aquello que cambie el producto, comprometa la
arquitectura o requiera autoridad del propietario.
