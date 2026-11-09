# Día 05 · Senses: Sight — A Coruña: la ciudad corta la luz

[Abrir experiencia pública](https://mavazvar95.github.io/30DayMapChallenge2026-gallery/day-05-sight/)

Una maqueta territorial de A Coruña, dos observadores terrestres y sombras proyectadas. Los edificios se construyen con huellas y partes oficiales de Catastro, paredes verticales y alturas muestreadas del LiDAR. Tema oficial 2026: «How do you see something? Maybe map a viewshed?». Interpretación: la posición del observador y el movimiento solar explican cambios distintos; mantener uno permite explorar el otro.

## Experiencia

- **Maqueta territorial:** cámara virtual claramente identificada. Órbita y acercamiento sobre el relieve, escala horizontal/vertical 1:1. Los símbolos de posición no representan edificios.
- **San Pedro:** cámara sobre un camino exterior del parque, ojos a 1,70 m. El descenso desde la maqueta se identifica como transición virtual; la posición final queda fija.
- **Al pie de la Torre:** sendero público al sur del monumento. No se representa la terraza ni la linterna; el faro queda detrás del encuadre inicial hacia Monte Alto.
- **Comparar miradas:** dos cámaras simultáneas, misma fecha/hora y un único sol. Cada mitad usa el campo horizontal correspondiente a su aspecto. El mapa indica posición, orientación y apertura.
- **Fijar la mirada:** inmoviliza la cámara y permite recorrer el día. El control de sombras permite distinguir iluminación de superficies y sombras arrojadas. El recorrido pausa cuando la pestaña no está visible.

Rúa Real y Parrote se retiran de esta escena piloto porque una malla LiDAR de 5 m no resuelve sus fachadas peatonales. Las investigaciones previas de Riazor–Orzán y Bens se conservan en `research/previous-version.md`.

## Datos reales y preparación

Consulta y adquisición: **4 noviembre 2026**. © Instituto Geográfico Nacional de España; atribución visible y política de reutilización compatible con CC BY 4.0. PNOA-LiDAR, primera cobertura (2008–2015); no se afirma que represente la ciudad actual ni se deduce una fecha concreta de vuelo para A Coruña.

1. Terreno: `https://servicios.idee.es/wcs-inspire/mdt`, cobertura `Elevacion4258_5`, paso nominal 5 m.
2. Altura normalizada de edificación: `https://wcs-mds.idee.es/mds`, cobertura `mdsn_e025`, paso original 2,5 m. Se combina con el terreno para estimar la cota de cubierta de cada parte catastral, sin alturas por defecto ni multiplicadores por plantas.
3. WCS 1.0.0 GetCoverage en ambos servicios: CRS solicitado EPSG:4326, bbox `-8.46,43.342,-8.378,43.395`, width `1360`, height `1180`, format `image/tiff`. Las respuestas declaran EPSG:4326; sus valores recibidos están cuantizados en metros.
4. Reproyección rasterio a **ETRS89 / UTM 29N, EPSG:25829**, malla de 5 m: bilineal para terreno, vecino más próximo para edificación. Los ficheros PNG guardan decímetros para conservar la interpolación, no para atribuir precisión decimétrica a la fuente.
5. Terreno triangulado sobre la malla de 5 m, con origen local en coordenadas métricas, X este de cuadrícula, Y altura, Z sur. Los edificios se triangulan desde las huellas vectoriales de Catastro mediante triangulación restringida, preservando los patios, y se cierran con paredes verticales. La cubierta de cada parte es un plano a la cota LiDAR estimada. No se agrandan ni se desplazan hitos. No hay fachadas fotográficas ni detalles arquitectónicos inventados.
6. El mar se representa como plano a cota 0 m. La forma del mapa de posición se deriva de la máscara de terreno >0,05 m y se simplifica a 12 m para el localizador. No es una delimitación jurídica ni una simulación de marea.

Raw TIFF, capacidades, DescribeCoverage y auditoría de SHA-256: `research/pilot/`. Datos publicados: `web/assets/ground.png`, `buildings.png`, `model.json`. El modelo tiene 1.336 × 1.185 nodos, terreno máximo 166 m y altura normalizada máxima 106 m. Esto describe la ventana descargada, no una estadística de edificios individuales.

### Huellas reales y alturas por parte catastral

Fuente: **Dirección General del Catastro**, servicio INSPIRE Buildings de A Coruña, código catastral **15900** (no el código INE 15030), edición del 21 agosto 2026. El feed provincial conserva el enlace, CRS EPSG:25829 y el derecho de reutilización gratuita con atribución. ZIP original y feed en `research/footprints/`; GML descomprimidos excluidos de Git porque se reconstruyen desde el ZIP.

`prepare_footprints.py` trabaja con las partes de edificio sobre rasante; utiliza el edificio completo solo cuando no hay partes. No extruye plantas subterráneas. Recorta por la ventana del modelo y conserva anillos interiores. Las coordenadas se redondean a centímetros para empaquetar, sin atribuir precisión centimétrica a la fuente.

Se solicita de nuevo `mdsn_e025` con width=2720 y height=2360, para muestrear a 2,5 m. Se consideran centros de píxel dentro de la huella erosionada 0,8 m, o la propia huella cuando la erosión la vacía. Hace falta un mínimo de dos muestras con altura ≥2 m y al menos un 45% de correspondencia. La cota de cubierta es el percentil 60 de terreno+altura de esas muestras. Se rechazan cubiertas incompatibles con el terreno de borde. Esto reduce contaminación de vecinos y puntos extremos; no certifica una alineación perfecta entre Catastro de 2026 y LiDAR de 2008–2015.

Resultado: **22.287 polígonos de parte/edificio extruidos** y **22.584 sin altura suficiente**, conservados a ras de suelo en azul gris. Se mantienen **1.490 anillos interiores** en el conjunto. Los polígonos no equivalen a edificios individuales. La suma de áreas con altura es 3.742.005 m² sobre una suma total de 4.412.863 m²; estas sumas no se presentan como superficie geográfica única porque puede haber superposición entre partes.

Los volúmenes se empaquetan en `web/assets/buildings-mesh.bin.gz`; las huellas sin altura en `footprints-unknown.bin.gz`. Cabecera MVBU, número de vértices e índices uint32 little endian, posiciones float32 XYZ métricas e índices uint32. La aplicación descomprime mediante DecompressionStream. `footprints-meta.json` resume fuente, método y recuentos; `research/footprints/audit.json` registra muestras por polígono y SHA-256 de las fuentes. No se inventan alturas para cerrar los huecos de información.

### Observadores contrastados con ortofoto

Ortofotos del servicio WMS PNOA máxima actualidad del IGN, imágenes conservadas como `research/pilot/ortho-sanpedro.jpg` y `ortho-torre.jpg`. Se revisaron visualmente los caminos y la posición relativa a las construcciones. La imagen no acredita una fecha exacta de toma ni una medición de campo.

| Observador | Longitud WGS84 | Latitud WGS84 | Cota MDT, m | Edificación en el punto, m | Azimut inicial |
|---|---:|---:|---:|---:|---:|
| Camino al este de la cúpula, San Pedro | −8,435777 | 43,377275 | ≈129,49 | 0 | 100° |
| Sendero al sur de la Torre | −8,406340 | 43,385300 | ≈43,05 | 0 | 179° |

La altura del ojo se obtiene de la interpolación triangular de la malla dibujada, +1,70 m. Las cotas publicadas se redondean para lectura. No se asignan los 142 m de la cima de San Pedro a este camino, ni los 50 m del emplazamiento de la Torre a todos los senderos de su entorno.

La consulta LiDAR detectó una edificación en la anterior coordenada de San Pedro (la cúpula); el punto fue corregido hacia el camino exterior. La anterior coordenada de Rúa Real también coincidía con edificación: se retira, no se eleva artificialmente la cámara por encima del obstáculo.

### Condiciones de observación

San Pedro: exterior del parque, sujeto al horario municipal. Torre: exterior del monumento; la ficha municipal consultada anuncia el interior temporalmente cerrado por obras hasta el 15 de noviembre. La subida de 234 escalones no permite deducir la cota de una terraza. La cámara nunca se sitúa en el interior ni en una posición elevada de acceso restringido.

## Luz y sombras

Three.js 0.160.1, luz direccional con mapa de profundidad PCFSoft de hasta 4.096², geometrías que arrojan y reciben sombras, sin exageración vertical. Resolución de sombra sobre una ventana de 11,2 km: aproximadamente 2,7 m por texel con 4.096² (menor detalle si el dispositivo limita la textura). Se usa un sesgo normal de 1,2 m para reducir artefactos: no es una herramienta de soleamiento parcelario.

SunCalc 1.9.0: posición solar por fecha/hora civil de Europe/Madrid. El sol de toda la ventana usa la posición de San Pedro como referencia, diferencia angular despreciable para la escala visual del área. Se corrige el norte de cuadrícula con la transformación local del norte geográfico. Sombras en dirección opuesta al sol; sol bajo el horizonte implica ausencia de luz solar directa. No se simulan nubes, vegetación, refracción, penumbra física, mareas ni alumbrado nocturno. El cielo, el agua y los marcadores son representación; el glifo del sol no tiene escala territorial.

## Dirección de arte y revisión

Continúa la firma y la jerarquía editorial de la colección, revisadas en la lámina nocturna del día 04: territorio protagonista, tinta azul profunda, ciudad mineral y luz ámbar. Se abandona el panel lateral del visor anterior; la forma de la península, el relieve y las sombras ocupan el lienzo. El título explica el fenómeno, sin sustituirlo por controles.

Se han inspeccionado las ortofotos y **tres renders nativos de los datos**, con las posiciones y proyecciones de las cámaras previstas, guardados en `research/pilot/native-*.png`. Permiten verificar la forma de la ciudad, la cota ocular, las paredes verticales, las cubiertas planas, los patios abiertos y las oclusiones de cada punto; **no son capturas del navegador ni una aprobación visual del sitio**. La panorámica terrestre de San Pedro incluye la ensenada y edificios lejanos; desde la Torre, el primer frente de Monte Alto oculta el resto. La maqueta general permite interpretar esa diferencia. No se afirma que todos los hitos sean visibles desde todos los observadores.

La migración a GitHub Pages conserva las geometrías y cálculos originales. Las
comprobaciones de modelo se ejecutan con `check_model.mjs` y los controles reales
de Chromium con `check_browser.cjs`, documentados por separado. La emulación de
móvil verifica disposición y controles, no rendimiento de todos los dispositivos.

## Procedencia de la migración

Se ha recuperado el código del proyecto Sites, versión 4, commit
`b5a1b4b4237461c699e14b5c12f7188a6d114e33`. La aplicación de GitHub Pages
incluye las mismas mallas, el terreno y los cálculos solares; `migration.json`
registra hashes. Se incluyen localmente las tipografías y sus licencias para
eliminar esa dependencia externa. El sitio original conserva su acceso privado.

Los scripts originales de preparación se conservan en `recovered-source/` y
requieren la estructura de entradas original. Los datos brutos y auditorías
completas no se incluyen en la galería pública. Esta migración no los ha
regenerado ni acredita una revisión completa de los 44.871 polígonos contra
observaciones de campo.

## Reproducir y comprobar

- `prepare_pilot.py`: requiere numpy, scipy, rasterio, pyproj, shapely y Pillow; usa los TIFF conservados en `research/pilot/` para generar las mallas y metadatos.
- `prepare_footprints.py`: requiere además Shapely ≥2.1/GEOS con triangulación restringida; genera volúmenes catastrales y la auditoría a partir del ZIP oficial y el LiDAR de 2,5 m.
- `node check_model.mjs`: validación de cotas, observadores fuera del raster de edificios, escala, ojos a 1,70 m, giro sin desplazamiento, horario de invierno/verano y cambios DST, vector solar y sentido de la sombra. Comprueba también la geometría enviada: caras de cubierta horizontales, caras de pared con arista vertical, correspondencia de CRS, patios y carga/descompresión real de las mallas en Three.js.
- `node --check dist/pilot.js`: sintaxis del módulo de la experiencia.
- `node export_cameras.mjs`: exporta matrices de cámara y luz para la revisión nativa de los datos.
- `render_data_preview.py`: render nativo auxiliar con ModernGL/EGL, sin usar un navegador. Usa las matrices de cámaras exportadas para QA; los materiales simplificados no reproducen exactamente los de Three.js.
- Abrir `web/` mediante servidor estático. Los datos, el motor y las tipografías están incluidos; la carga de la escena no requiere servicios externos.

No es una cuenca visual ni un estudio de soleamiento certificados.

## Fuentes documentales

- © Dirección General del Catastro, Ministerio de Hacienda, [feed INSPIRE Buildings provincial](https://www.catastro.hacienda.gob.es/INSPIRE/Buildings/15/ES.SDGC.bu.atom_15.xml). Derechos de reutilización con atribución conservados en el propio feed.

- [Tema oficial del reto](https://github.com/tjukanovt/30DayMapChallenge), copia en `research/themes.md`.
- [IGN WCS MDT](https://servicios.idee.es/wcs-inspire/mdt?service=WCS&request=GetCapabilities).
- [IGN WCS MDS normalizado](https://wcs-mds.idee.es/mds?service=WCS&request=GetCapabilities).
- [PNOA: productos y servicios LiDAR](https://pnoa.ign.es/pnoa-lidar/visualizadores-y-servicios-web).
- [IGN: política de datos](https://www.ign.es/web/ign/portal/politica-datos).
- [Concello: vistas de San Pedro](https://www.coruna.gal/descarga/1351649545550/LAS-VISTAS.pdf), segunda página revisada visualmente en la primera investigación: posición y encuadre relacionados en un mapa; no se copia su ilustración.
- [Concello: Torre de Hércules](https://www.coruna.gal/web/es/comunicate/directorio-municipal/servicio-municipal/torre-de-hercules/entidad/1149055943813?argIdioma=es).
