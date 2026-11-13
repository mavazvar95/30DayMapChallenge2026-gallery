# COMPÁS V6 · Recuperación de la red futura

13/11/2026. Referencia horaria conservada: 12/11/2026.

Esta edición recupera las seis hipótesis de infraestructura de V4: A Coruña–Ferrol,
A Coruña–Lugo, Santiago–Lugo, Ourense–Pontevedra, Vigo–Braga y Braga–Porto.
Las líneas nuevas vuelven al mapa y a la oferta del escenario futuro.

**Se recuperan las propuestas, no se certifican sus geometrías.** Los arcos
suavizados de V4 siguen pendientes de rediseño de accesos, empalmes, transiciones,
rasantes y afecciones. Los tiempos son hipótesis del ensayo previo, no marchas
acreditadas. Coruña–Ferrol <30 min figura como objetivo. No se afirma que esta
edición haya resuelto un trazado ferroviario realista nuevo.

Se conservan las correcciones de V5:

- Reconstrucción Sarria–Monforte, de 343,687 km erróneos a 34,667 km sobre vías
  existentes. Detalle IGN y corrección documentada de los nodos de OBJECTID 38627.
- Servicio horario Lugo–Ourense, por Sarria y Monforte, basado en perfiles GTFS
  de 105 minutos: 16 expediciones por sentido, sin atribuir aceleración a obras.
- Selección correcta de las expediciones publicadas y duración completa de
  origen a destino. El tramo visible se muestra por separado.

La matriz se recalcula en el navegador con la nueva oferta combinada. Sus
resultados comparan un escenario hipotético con la referencia, no beneficios
verificados de una inversión. Se elimina el informe de optimización de fases
anterior del modelo activo: no valida esta oferta modificada.

Los colores siguen identificando servicios; el trazo violeta discontinuo identifica
las propuestas nuevas. Los regionales y Cercanías conservan los perfiles existentes.
Las hipótesis AV no convierten las vías convencionales en infraestructura de alta
velocidad. No se modelan capacidad, demanda, costes ni potencia real del material.

[Supuestos y fuentes del ensayo V4](prior-methodology.md) ·
[Diagnóstico de planificación V5](review.md) · [Corrección topológica](path-repairs.json).
La decisión de V5 de retirar las propuestas del escenario queda sustituida por esta
recuperación; sus advertencias técnicas siguen vigentes.

Reproducción: `python build.py`, servir el repositorio en localhost:8091 y ejecutar
`node check.cjs`. Los insumos congelados V4/V5 se identifican mediante SHA256 en
`sources-manifest.json`. CRS: ETRS89/UTM29N, EPSG:25829.

La lámina y el vídeo de V4 siguen archivados. No son exportaciones actualizadas de
V6. El diseño definitivo de las nuevas vías y los nuevos medios siguen pendientes.
