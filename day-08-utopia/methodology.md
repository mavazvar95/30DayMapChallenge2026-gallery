# COMPÁS Atlántico · V3: vías, servicios y obras

Referencia: 12 de noviembre de 2026. Autor: Miguel Ángel Vázquez Varela.

## Pregunta y mensaje

¿Qué infraestructura y qué oferta permitirían acercar las ciudades de Galicia,
sin confundir un servicio rápido con una vía preparada para su velocidad?
Se propone una red futura exploratoria: Cercanías en siete ciudades, regionales
territoriales, media distancia y conexiones rápidas interiores e internacionales.
No es un proyecto oficial, un óptimo demostrado ni un horario de explotación.

## Escenarios

1. **Horario de referencia**: 160 registros del GTFS en el ámbito de 60 estaciones.
   Cuatro Celta se conservan en el catálogo, pero se excluyen del cálculo y de la
   animación ferroviaria por el autobús sustitutorio Vigo–Valença anunciado por CP.
   Los productos comerciales pueden compartir tren físico.
2. **Más servicios**: añade 396 expediciones propuestas sobre perfiles horarios
   publicados; no demuestra que quepan en la infraestructura. La relación con Porto
   presupone restauración ferroviaria después de las obras.
3. **Obras + servicios futuros**: añade 652 expediciones propuestas. Incrementa la
   frecuencia de cuatro líneas de Cercanías y añade servicios sujetos a nuevas obras.
   Mantiene la oferta publicada como referencia superpuesta; no es un plan de
   sustitución de servicios ni una estimación de demanda.

Los intervalos se repiten a lo largo del día. La V3 ajusta fases de salida en
14 líneas direccionales (C2, C6, M7, A1, A2, A3 y R8), manteniendo 652 expediciones,
intervalos y tiempos de marcha. Dos barridos por coordenadas, candidatos cada 15 min
más la fase inicial, minimizan la suma de tiempos de 192 consultas con igual peso.

La suma de las consultas de ajuste pasa de 32.581 a 28.326 minutos. En otras 192
consultas, con horas distintas, pasa de 34.016 a 31.522: **51 mejoran, 31 empeoran y
110 no cambian**. Se adopta el ajuste porque mejora el conjunto de validación;
no beneficia a cada viaje. No son minutos de pasajeros ni ahorro diario.
`coordination.json` conserva consultas, fases y traza reproducible.

Un primer ensayo con solo 48 consultas sobreajustaba las salidas y empeoró su
validación; fue descartado (`coordination-small-sample-rejected.json`). Se amplió
la cobertura de horas, conservando consultas distintas para comprobar el resultado.
La búsqueda es local, sin capacidad, coste ni demanda; no demuestra el óptimo global.
La optimización antigua V2 no se reutiliza como evidencia de mejora V3.

## Infraestructuras futuras y tiempos objetivo

- **A Coruña–Ferrol**: 50 min semidirecto, 65 min con más paradas. Propuesta propia
  de modernización terrestre, tomando actuaciones oficiales como contexto. Exige
  variantes por tierra, electrificación, señalización y capacidad. No propone
  nuevos puentes o túneles sobre rías. La banda sigue el corredor ferroviario
  existente; no localiza las variantes futuras. Rangos de sensibilidad 45–55 y
  60–70 min, no intervalos estadísticos ni resultados de ingeniería.
- **A Coruña–Lugo**: 55 min con Betanzos y Guitiriz. Propuesta propia de nuevos
  tramos/variantes para 200–250 km/h. El corredor existente sirve de referencia
  territorial, no de trazado apto para esa velocidad. No es un proyecto oficial.
- **Ourense–Vigo por Cerdedo**: 60 min como supuesto propio. El corredor de Cerdedo
  tiene documentación oficial; su representación es esquemática y no reproduce un
  eje constructivo. Mantiene el regional por el Miño.
- **Vigo–Porto**: 60 min como objetivo de referencia del planeamiento portugués.
  Requiere LAV portuguesa, conexión española, Salida Sur e interoperabilidad.
  Los puntos de Braga y Valença son referencias urbanas/estaciones actuales, no
  ubicaciones aprobadas de futuras estaciones AV. Se omiten paradas futuras no
  modelizadas (p. ej., aeropuerto y Ponte de Lima); el patrón dibujado es propio.

No se han calculado pendientes, radios, aceleración, frenado, tiempos de parada
óptimos, capacidad, enclavamientos ni coste. Las velocidades de diseño expresan
requisitos hipotéticos, no autorizaciones sobre las vías actuales. La animación
interpola distancia entre paradas y no simula la dinámica de un tren.

## Categorías e infraestructura existente

Cercanías (verde), Regional (ocre), Media distancia (azul), Larga distancia (coral)
y Alta velocidad (violeta) describen servicios. Infraestructura y servicios tienen
controles separados. El Eixo Atlántico se diferencia como altas prestaciones en
ancho ibérico; no se etiqueta todo el corredor como vía de 300 km/h.

Las etiquetas de infraestructura combinan atributos IGN de ancho/electrificación
con interpretación de corredores ADIF. Los códigos 082, 084, 982 y 984 se identifican
como corredores AV. 850, 848, 824, 842 y la parte norte del 822 representan el Eixo
Atlántico/altas prestaciones. Esta clasificación general **no es un inventario de
velocidades autorizadas**, no separa cada vía de estacionamiento y no garantiza la
compatibilidad del material de cada expedición. Portugal conserva clase convencional
sin atribuir ancho o electrificación a cada segmento OSM.

## Fuentes y licencias

- Renfe GTFS MD/LD/AV: <https://ssl.renfe.com/gtransit/Fichero_AV_LD/google_transit.zip>,
  captura 10/11/2026; Cercanías: <https://ssl.renfe.com/ftransit/Fichero_CER_FOMENTO/fomento_transit.zip>,
  captura 11/11/2026. CC BY 4.0. Se reutilizan los ficheros congelados y sus hashes V2.
- IGN IGR-RT, capa 4: <https://serviciosgis.ign.es/servicios/rest/services/RT/igr_rt_ferrocarril/MapServer/4>.
  Geometrías V2 y atributos consultados 12/11/2026; CC BY 4.0. 9.375 entidades españolas.
- © OpenStreetMap contributors / Geofabrik: <https://download.geofabrik.de/europe/portugal-261110-free.shp.zip>.
  Extracto del 10/11/2026, descargado 12/11/2026, ODbL 1.0. Se distribuye también el
  subconjunto derivado en `osm-portugal.geojson`, bajo ODbL, para acceder a sus geometrías
  y atributos. Las geometrías y rutas derivadas de OSM en `data.json` conservan esa
  licencia; la colección no relicencia las fuentes IGN/Renfe. Atribución y licencia:
  <https://www.openstreetmap.org/copyright>.
- IGN BDDAE, límites de A Coruña, Lugo, Ourense, Pontevedra y Asturias:
  <https://www.ign.es/wfs-inspire/unidades-administrativas>, consultados 12/11/2026,
  CC BY 4.0. Simplificación de 30 m para la visualización; originales conservados.
  La salida GeoJSON usa longitud/latitud aunque se solicite otro srsName; se valida
  y transforma explícitamente a EPSG:25829.
- Natural Earth 1:10m, contexto restante fuera de esas provincias; dominio público. Fuente y
  hash en el manifiesto V2. No es cartografía detallada de costa para validar obras.
- Aviso CP: <https://cp.pt/en/detalhe-aviso/transbordo-celta-2026-2027>.
  Autobús sustitutorio Vigo–Valença del 06/04/2026 al 07/04/2027. El GTFS ferroviario
  no basta para describir el servicio multimodal temporal.
- Eixo Atlántico: <https://www.adifaltavelocidad.es/sobre-adif-av/red-av/eje-atlantico>.
- Material de ancho variable: <https://grupo.renfe.com/es/es/conoce-renfe/nuestros-trenes/s-106>.
- Actuaciones Ferrol: <https://www.adif.es/documents/20124/2515556/Programa%2Bde%2BActividad%2BADIF%2B2022-2026.pdf>.
- Cerdedo: <https://www.boe.es/boe/dias/2010/03/15/pdfs/BOE-A-2010-4359.pdf>.
- Porto–Vigo: <https://diariodarepublica.pt/dr/detalhe/resolucao-conselho-ministros/77-2025-915239713>.

## Geometría y topología

CRS de análisis y dibujo: ETRS89 / UTM 29N (EPSG:25829). Fuentes geográficas
EPSG:4326 se transforman con `always_xy`. No se mide en grados. La escala del mapa
se actualiza con el zoom; provincias subordinadas gráficamente a las vías.

Las rutas de animación se calculan en una red cartográfica de vías existentes;
no es un grafo operacional con restricciones de señalización o itinerarios.
La unión explícita IGN–OSM se realiza en el **puente ferroviario existente** del
Miño: nodo IGN (528903, 4654218), OSM way 30641209, desplazamiento perpendicular
**0,057 m**. Se inserta un nodo en el grafo derivado; no se altera la geometría
original ni se inventa un enlace fronterizo. El ajuste se registra en `qa.json`.

La costa gallega y asturiana utiliza ahora polígonos provinciales oficiales IGN,
con más detalle que Natural Earth. La prueba de costa es un cribado contra estos
polígonos y el contexto restante, con margen de 250 m. No valida nuevos trazados:
todos los segmentos P-FE reutilizan el corredor existente, incluidas sus obras de
paso, y las variantes terrestres futuras siguen sin localizarse constructivamente.

## Viajes, horarios y recursos

Mínimo 10 min para cambiar de tren, hasta dos transbordos, prioridad a primera
llegada; desempate por menos transbordos y menos tiempo embarcado. Se respetan
restricciones GTFS de subida/bajada. Se incluyen espera inicial, marcha y enlaces.
No se incluye acceso a estaciones, tarifa o desplazamiento entre Vigo-Guixar y
Vigo-Urzaiz. No encontrar ruta no demuestra ausencia de transporte público.

El reloj común es Europe/Madrid. En Portugal, en la fecha de referencia, la hora
local es una hora menos. Las fichas de expediciones publicadas conservan sus
paradas completas fuera de Galicia; las propuestas muestran estaciones seleccionadas,
no todos los apeaderos potenciales. Las rutas a Madrid y otras ciudades exteriores
se describen en el catálogo sin inventar trazados cartográficos fuera del ámbito.

La dotación teórica suma por línea `ceil((ida + vuelta + 30 min) / intervalo)`,
con flotas separadas, 15 min por cabecera, sin reservas, vacíos ni mantenimiento.
No es una flota operativa dimensionada. Horas-tren y expediciones son oferta propuesta,
no viajeros, ahorro social ni justificación económica.

## Verificación y reproducción

`build_network.py` usa las fuentes V2 y los atributos/OSM V3. `acquire_portugal.py`
extrae entradas ZIP verificando CRC; `acquire_attributes.py` recupera atributos IGN
y `acquire_coast.py` los límites provinciales oficiales.
Los hashes originales están en `sources-manifest.json`. Si una URL histórica cambia,
se debe conservar la advertencia y no presentar una descarga nueva como la misma fuente.

Ejecutar con el entorno GIS del proyecto:

```bash
python build_network.py
python coordinate.py
python validate.py
node check.cjs
node media.cjs
node record.cjs
python export_video.py
```

`validation.json` separa PASS, WARNING y NOT_CHECKED. `browser-qa.json` registra
controles reales y equivalencia del router Python/JavaScript. `visual-review.json`
registra inspección de renders, sin atribuir al autor una aprobación no recibida.
