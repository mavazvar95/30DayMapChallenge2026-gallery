# 07/30 · 10 minute map — España entre raíles

Lámina ferroviaria ilustrada para revisión del autor. Ámbito peninsular;
clasificación oficial por ancho, con tramos de tipo Tren y estado En servicio
según la captura del IGN. No representa horarios, frecuencia, tráfico, tiempos
de viaje ni la necesidad de transbordar.

## Tiempo y versiones

- Inicio: **10/11/2026, 00:01:07 Europe/Madrid** (23:01:07 UTC del día anterior).
- Exportación del intento: **9 min 30,16 s** desde el inicio.
- Primera revisión visual terminada a **9 min 35 s**.
- Después del límite se detectó que ArcGIS había ampliado el BBOX solicitado
  para ajustarlo a la relación 2200:1650 de la imagen. La colocación inicial
  había utilizado el BBOX solicitado. Se conservan los archivos de ese intento
  sin alterarlos, verificados por SHA-256 en `frozen.json`.
- **La edición corregida no se presenta como realizada en diez minutos.**
  Sus archivos están en `publication/corrected/`; la corrección usa la extensión
  real devuelta por el servicio y confirmada con una segunda consulta.
- Documentar, guardar en Git y alojar las imágenes se realiza fuera del tiempo
  de creación; no se incluye dentro de los 9 min 30 s.

La definición de tema, búsqueda de fuentes/metadatos y dirección de arte se
habían discutido antes con el autor. El intervalo cronometrado incluye intentos
de descarga, adquisición del render oficial, código, composición, dibujo de
los símbolos, primera revisión y exportaciones PNG/JPG. Tipografías y herramientas
ya existían en el proyecto. No había geometrías o mapas calculados para este día.

## Entregables

- `publication/corrected/07-rail-gauges-linkedin.jpg`: versión corregida,
  3200 × 4000 px; recomendada para revisar y compartir.
- `publication/corrected/07-rail-gauges-preview.png`: previsualización.
- `publication/corrected/07-rail-gauges-corrected.svg`: composición con texto y
  dibujos vectoriales y la red oficial embebida como imagen PNG.
- `publication/07-rail-gauges-*`: intento dentro del tiempo, con el error de
  colocación descrito; no usarlo como mapa final.
- `timing.json`, `frozen.json`, `correction.json`: registros de tiempos y hashes.
- `data-qa.json`: estado de las comprobaciones durante el intento.
- `postflight-qa.json`: comprobaciones adicionales, fuera del tiempo.

## Fuentes, licencia y CRS

Red: [IGN IGR-RT ferroviario, capa 4 Ancho de vía](https://serviciosgis.ign.es/servicios/rest/services/RT/igr_rt_ferrocarril/MapServer/4).
Consulta 10/11/2026. No se ha identificado una fecha de edición completa de la
base en los metadatos, por lo que la fecha de consulta no se presenta como año
de actualización de todos los tramos. [Condiciones IGN, CC BY 4.0](https://www.ign.es/resources/licencia/Condiciones_licenciaUso_IGN.pdf).

La descarga de entidades vectoriales agotó el tiempo del servicio en dos
estrategias. Se utilizó su endpoint `export`, con renderer por `AnchoVia` y
expresión `TipoLinea = 'Tren' AND EstadoFis = 'En servicio'`. Las cuatro tintas
y el gris de desconocidos se comprobaron en los píxeles del PNG. No se afirma
haber validado todas las geometrías ni contar los tramos representados. Los
51.393 IDs de la consulta inicial no se presentan como número de vías del mapa.

La capa declara origen EPSG:3857. El render se solicitó en **EPSG:25830** y su
respuesta confirma ese CRS. La edición corregida usa exactamente el extent
real devuelto por ArcGIS. Los parámetros y ambas respuestas quedan en
`data/raw/day-07-ten-minute-map/`. El PNG es el render oficial temático; no se
han inventado geometrías ni reconstruido trazados.

Contexto: [Natural Earth 1:50m, países](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_admin_0_countries.geojson),
[dominio público](https://www.naturalearthdata.com/about/terms-of-use/). Se
reutilizan España, Portugal y Francia, transformados de EPSG:4326 a EPSG:25830.
La máscara peninsular usa el polígono continental con una tolerancia de 6 km
para la generalización de costa; no representa una delimitación administrativa
precisa ni una nueva geometría ferroviaria.

Tipografías: Manrope, Libre Caslon Display y Libre Caslon Text, SIL OFL;
licencias existentes en `../day-06-vintage/web/fonts/`. El pequeño tren y las
traviesas son símbolos editoriales vectoriales originales. Los esquemas de
vía carecen de escala; el mixto ilustra el principio sin identificar las
combinaciones de ancho de cada tramo. La flecha marca norte de cuadrícula.

## Reproducción

`build.py` reproduce el intento original con los assets guardados, pero se
bloquea deliberadamente tras existir `frozen.json`, para no sobrescribir la
edición cronometrada. `correct_extent.py` parte de ese SVG congelado y produce
la composición corregida en una carpeta separada. No confundir la reproducción
posterior de archivos con el tiempo histórico de creación.

`capture.cjs` fue el exportador del intento, mediante Chromium y Playwright.
La corrección conserva el diseño y cambia la colocación del raster de acuerdo
con su extensión real. El SVG contiene el render raster y no es una extracción
vectorial de la red. No se ha generado una aplicación GIS interactiva.
