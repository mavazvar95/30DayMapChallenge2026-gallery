# Método y fuentes · COMPÁS V5

Revisión: 13 noviembre 2026. Datos horarios: 12 noviembre 2026.

[Revisión ferroviaria integral](review.md) · [Método base y licencias](base-methodology.md).
El método base describe la edición histórica V3: sus obras y objetivos ya no son
el escenario activo. Las diferencias aplicables son las de este documento.

Se conservan las vías IGN/OSM, límites IGN/Natural Earth y expediciones GTFS de
la V4; no se modifican sus geometrías. CRS horizontal: ETRS89/UTM29N, EPSG:25829.
Los recorridos enlazados siguen siendo una reconstrucción cartográfica de la red,
no itinerarios técnicos certificados ni geometrías de proyectos nuevos.

Se retiran todas las claves P-* y los trenes que las utilizaban. Se mantienen
el horario de referencia y el escenario anterior de más servicios. La propuesta
revisada añade frecuencias sobre vías existentes y un servicio horario Lugo–Ourense
con las llamadas de los Intercity 00558 y 00560. Ambos perfiles duran 105 minutos.
No se han acelerado trenes ni atribuido beneficios a obras nuevas sin definir.

Las fases de la propuesta revisada son explícitas: salidas desde 06:00 con el
intervalo de cada línea; I1 inverso empieza a las 06:30. No se declara ajuste óptimo
ni se reutiliza la validación de fases de V4. La referencia publicada se conserva,
por lo que la oferta aditiva no puede empeorar el mejor viaje calculable: esto
es una propiedad del modelo, no evidencia de capacidad ferroviaria.

El comparador incluye espera inicial, marcha y transbordos, mínimo 10 min y máximo
dos transbordos. Mantiene separados Vigo-Urzáiz y Vigo-Guixar y excluye el Celta
sustituido por autobús de la referencia ferroviaria. El servicio futuro por Viana
sigue condicionado al restablecimiento de la circulación ferroviaria.

La ficha de cada expedición publicada calcula `última llegada − primera salida`
sobre `full_calls`, cuando está disponible. El tramo regional se muestra aparte.
Los valores pueden superar 24 horas y se conservan como minutos absolutos; las horas
se rotulan con el día siguiente cuando corresponde. No se recortan a Galicia los
tiempos anunciados para Madrid, Barcelona u otros destinos externos.

Las fichas de inversión son propuestas de estudio. La geometría dorada representa
el corredor **existente**, no una variante futura. Santiago–Lugo y otros enlaces
sin cartografía contrastada muestran cabeceras, no una curva indicativa que pueda
confundirse con un trazado diseñado.

Documentación histórica de Cerdedo:
https://www.boe.es/boe/dias/2010/03/15/pdfs/BOE-A-2010-4359.pdf
Planeamiento portugués citado en versiones anteriores:
https://diariodarepublica.pt/dr/detalhe/resolucao-conselho-ministros/77-2025-915239713
No se afirma que estos documentos acrediten por sí solos el estado de los proyectos
al 13/11/2026 ni se ha extraído de ellos una nueva alineación vectorial.

Reproducir: `python build.py`, `python validate.py`; servir el repositorio en
localhost:8091 y ejecutar `node check.cjs`. Datos derivados en `data.json`,
procedencia en `sources-manifest.json`; controles ejecutados en `qa.json` y
`browser-qa.json`. Requiere Node/Playwright y Chromium para las pruebas visuales.

### Excepción documentada a la conservación geométrica

La inspección posterior detectó la discontinuidad Sarria–Monforte. Se descargó
el detalle oficial IGN sin simplificación el 13/11/2026 y se documentó la corrección
de dos nodos derivados del segmento OBJECTID 38627 (línea 800), con offsets de la
fuente inferiores a 1 m. Se rehacen únicamente las rutas Sarria–Monforte en ambos
sentidos. Véase `path-repairs.json` y la sección correspondiente de `review.md`.
Los originales permanecen intactos en `data/raw/day-08-utopia/v5/`.

La reproducción incluye `python repair_paths.py` después de `build.py` y antes
de `validate.py`. Requiere NumPy/SciPy para la búsqueda espacial. `path-repairs.json`
registra otras alternativas no adoptadas que requieren comprobar el itinerario
ferroviario. No se consideran fallos resueltos por disponer de una ruta más corta.
