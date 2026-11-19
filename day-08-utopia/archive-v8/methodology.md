# COMPÁS Atlántico · Día 08 / Utopia

Edición 14 noviembre 2026. Referencia de horarios: 12 noviembre 2026.

## Pregunta y alcance

¿Qué cambiaría si Galicia combinase mejores conexiones ferroviarias entre ciudades
con servicios metropolitanos y transbordos coordinados? Se presenta un escenario
exploratorio propio, no un plan oficial, un proyecto constructivo ni un horario
comercial. Las siete conexiones nuevas se conservan. Mapa, horarios, animación,
comparador y medios publicados usan ahora los mismos recorridos y tiempos.

## Trazados y fuentes

Se reutilizan las fuentes congeladas Renfe GTFS, IGN, OpenStreetMap/Geofabrik,
Natural Earth y cinco teselas Mapzen/Skadi (Copernicus EU-DEM, USGS, NOAA).
Los manifiestos adjuntos conservan fechas, atribuciones y hashes. La cartografía
existente no certifica velocidades ni itinerarios técnicos autorizados. Se mantiene
la reparación documentada de Sarria–Monforte: geometría oficial detallada y ajuste
de conectividad submétrico, sin alterar la fuente original.

Cálculos y geometrías exportadas: ETRS89 / UTM 29N, EPSG:25829. El GeoJSON lleva
CRS explícito; no es GeoJSON RFC 7946 en longitud/latitud.

Las propuestas separan accesos existentes y tramo nuevo. Se buscan alternativas
sobre una malla de terreno de 250 m, con pesos de relieve 1 y 3; Coruña–Ferrol
incluye además 0,15. Se excluyen mar, nodata y retornos sobre los accesos. El
suavizado usa arcos circulares locales, con radio deseado de 4 km reducido cuando
el espacio y la máscara terrestre lo requieren. No se emplea una spline global
entre cabeceras. Se comprueban continuidad, ausencia de bucles y enlaces locales.
Son corredores conceptuales, no alineaciones ferroviarias listas para construir:
faltan clotoides, peraltes definitivos, afecciones, geotecnia y aparatos de vía.

Se ensayan 15 alternativas: 14 aceptadas por los controles horizontales y una de
Ourense–Pontevedra descartada por retorno. Se selecciona el menor tiempo estimado,
con desempate por profundidad y orden de alternativa; no por coste o beneficio.
Las propuestas no reproducen el proyecto oficial de Cerdedo ni la LAV portuguesa.
Braga es una referencia urbana: su estación futura y enlaces siguen sin resolver.

## Marchas preliminares

El tramo nuevo se remuestrea cada 100 m. La rasante se ajusta por programación
lineal, con pendiente máxima de 25‰, radio vertical aproximado de 20 km y margen
vertical de ±200 m respecto al terreno. Todas las alternativas elegidas se resuelven
con ese margen; el código admite un segundo ensayo a 600 m solo ante fallo.

La velocidad del núcleo nuevo se limita por curvatura y por un máximo de 250 km/h,
con sensibilidad a 200 km/h. Supuestos: ancho 1.668 mm, suma de peralte e
insuficiencia 250 mm, aceleración 0,45 m/s² y frenado 0,6 m/s², corregidos por
pendiente. Los dos primeros y últimos kilómetros se limitan a 80 km/h. Se calcula
cada sentido y se toma el más lento; se supone detención en ambos extremos del
núcleo, incluso si son enlaces. Se añade un 20 % y 3 minutos, redondeando al alza.
No hay modelo validado de potencia, masa, adherencia ni material rodante.

Los accesos reutilizados se calculan a **80 km/h de media supuesta**. No es una
velocidad autorizada ni observada en GTFS; exige comprobar y, en su caso, mejorar
infraestructura y explotación. El tiempo completo suma núcleo y accesos y se
redondea al minuto superior. Las longitudes bajo/sobre el terreno corresponden
solo al núcleo nuevo: no son inventarios certificados de túneles o viaductos.

| Conexión | Estimación | Sensibilidad: núcleo a 200 km/h |
|---|---:|---:|
| A Coruña–Ferrol | 35 min | 36 min |
| A Coruña–Lugo | 41 min | 46 min |
| Santiago–Lugo | 43 min | 48 min |
| Ourense–Pontevedra | 50 min | 54 min |
| Vigo–Braga | 38 min | 43 min |
| Braga–Porto | 26 min | 28 min |
| Lugo–Ourense | 40 min | 44 min |

**Coruña–Ferrol no alcanza el objetivo inferior a 30 minutos** en las tres
alternativas ensayadas. No se han ajustado cifras para forzar ese resultado.
Vigo–Porto suma 72 min con parada supuesta de 8 min en Braga; no demuestra una
operación viable en una estación todavía sin definir. Ourense–Vigo suma 65 min:
50 hasta Pontevedra, 1 de parada y 14 del tramo existente heredado del escenario.
Lugo–Ourense mantiene también la propuesta I1 por Sarria–Monforte (105 min).

## Servicios, coordinación y comparación

Los servicios nuevos son hipótesis. Se mantienen los servicios metropolitanos de
las siete ciudades, vía métrica hacia Asturias y trenes exteriores; sus fichas
muestran el viaje completo y distinguen el tramo visible. Animación ilustrativa
entre paradas: no representa bloqueos, señalización o circulación validada.

La coordinación prueba dos barridos sobre 20 líneas direccionales, en una rejilla
de fases de 15 min más la fase inicial. Mantiene 748 salidas propuestas. En 896
consultas de ajuste reduce la suma de tiempos de 116.050 a 101.232 min. En otras
896 consultas de validación pasa de 122.423 a 107.870 min: mejoran 354, empeoran
152 y 390 no cambian. Se adopta por mejora agregada de validación. Todas las
consultas pesan igual; no hay demanda ni garantía de óptimo global o capacidad.

A las 08:00 mejoran 37 de 42 relaciones dirigidas comparables entre las siete
ciudades gallegas; ninguna empeora. Se incluyen espera inicial y transbordos.
La mediana de ahorro es 113,5 min, sin ponderación por viajeros; no representa
un ahorro típico real ni una comparación a todas las horas. Se comparan redes
y ofertas completas, por lo que el efecto no se atribuye solo a las vías nuevas.

## Verificación y límites

`validation.json`: rasantes, longitudes, máscara terrestre y coherencia temporal.
`browser-qa.json`: selectores, geometría reparada y duración completa exterior.
`interaction-qa.json`: paridad Python/JavaScript, animación, zoom y móvil.
`visual-review.json`: inspección de exportaciones. El objetivo de 30 min figura
como NOT_MET; superar controles de software no acredita viabilidad ferroviaria.

No se han validado demanda, costes, financiación, impacto ambiental, disponibilidad
de suelo, estaciones futuras, capacidad, ancho interoperable o velocidades
reglamentarias. La lámina y el post deben presentarse como una utopía razonada.

## Reproducción

Con el entorno GIS del proyecto y las fuentes archivadas:

```sh
python extra_ferrol.py
python model.py
python build.py
python coordinate.py
python validate.py
# Servir la raíz del repositorio por HTTP en el puerto 8093
node check.cjs
node check_interactions.cjs
node media.cjs
node record.cjs
python export_video.py
python publish.py
```

Dependencias: NumPy, SciPy, Shapely, PyProj, Pillow y módulos de las ediciones
anteriores; Playwright, Chromium y FFmpeg para verificación y medios.
Las ediciones anteriores se conservan como archivo, sin mezclarlas en el escenario.
