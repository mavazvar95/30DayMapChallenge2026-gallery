# COMPÁS Atlántico V7 · Revisión horizontal de las propuestas

13/11/2026. Se mantienen las nuevas conexiones y se añade **Lugo–Ourense**.
Esta edición modifica sus geometrías; no es una validación de ingeniería.

## Qué cambia en el mapa

Cada alternativa distingue accesos sobre vías existentes (verde) y un tramo nuevo
conceptual (violeta; dorado al seleccionarlo). Los puntos de enlace se identifican
al ampliar. Se mantienen el mapa base, el servicio Lugo–Ourense por Sarria y Monforte,
la corrección topológica de ese corredor y las duraciones completas exteriores.

- Coruña–Ferrol y Coruña–Lugo comparten el acceso existente de A Coruña.
- Lugo recibe accesos diferentes desde su corredor norte y su corredor sur.
- Santiago–Lugo conserva la salida ferroviaria norte de Santiago.
- Ourense–Pontevedra reutiliza parte del corredor hacia el entorno de O Carballiño
  y entra desde el norte de Pontevedra. Es una hipótesis propia; **no reproduce
  el proyecto oficial de Cerdedo ni certifica qué línea utilizaría un tren AV**.
- Vigo y Porto mantienen segmentos de acceso procedentes de la red cartografiada.
- Braga sigue siendo una referencia urbana. Su futura estación y los enlaces
  ferroviarios no están resueltos: no se dibuja como existente una vía inventada.
- Lugo–Ourense estudia una alternativa nueva por el interior. Permanece también
  el servicio sobre el corredor existente por Sarria y Monforte.

## Generación de las alternativas

Se reutilizan las fuentes congeladas de V6 (IGN, OSM, límites y horarios) y las
cinco teselas Mapzen Terrain Tiles/Skadi documentadas en `dem-sources-manifest.json`.
La atribución del relieve europeo corresponde a Copernicus EU-DEM, con fuentes
USGS/NOAA según composición del producto. No se afirma precisión constructiva.

CRS de cálculo y GeoJSON exportado: **ETRS89 / UTM 29N, EPSG:25829**. El GeoJSON
lleva CRS explícito; no debe interpretarse automáticamente como lon/lat RFC 7946.

1. Se extraen segmentos de acceso de las geometrías ferroviarias existentes.
   Las longitudes de acceso son supuestos de diseño, no límites oficiales de obra.
2. Se prolonga localmente la dirección del acceso por terreno, hasta 1,5 km si
   la máscara terrestre lo permite. Estos segmentos son parte de la propuesta nueva.
3. La búsqueda de coste de relieve trabaja sobre una malla de 250 m, con pesos
   1 y 3. Se conservan dos alternativas por conexión. Se excluyen mar, nodata,
   retornos inmediatos detrás de los accesos y una franja junto a los accesos
   reutilizados para evitar que el camino nuevo los cruce formando un bucle.
4. Se simplifican los segmentos de control y se aplican **arcos circulares locales**.
   No se usa la spline global que daba un arco único entre ciudades. El radio deseado
   empieza en 4 km y se reduce donde la longitud disponible y la costa lo requieren.
   Esto NO acredita radios compatibles con una velocidad concreta. No se han
   diseñado clotoides, peraltes ni transiciones de rasante.
5. Se comprueba la continuidad geométrica, la ausencia de bucles y el encaje con
   la máscara terrestre. El ángulo entre los segmentos muestreados de acceso debe
   ser menor de 10°. Este control no equivale al proyecto de un aparato de vía.
6. Entre alternativas sin bucle en el recorrido completo se muestra por defecto
   la de menor longitud. No es una optimización económica ni de explotación.

Se evaluaron **14 alternativas**. Una de Ourense–Pontevedra forma un retorno al
intersectar el acceso y queda descartada de la selección. Se conservan sus datos
para auditoría. Las siete alternativas mostradas por defecto pasan los controles
horizontales definidos. No se han comprobado aún sus perfiles verticales.

El relieve sombreado es orientativo, con contraste visual y bordes suavizados donde
termina la cobertura de las teselas. Las zonas sin datos permanecen transparentes;
no se rellenan con alturas inventadas. Puede ocultarse desde el mapa.

## Horarios y animación: separación necesaria

El selector permite alternar entre:

- **Revisión V7:** geometrías nuevas y accesos. Las fichas de las líneas propuestas
  indican marcha por recalcular; sus trenes no se animan con tiempos antiguos.
- **Ensayo V6:** geometrías y tiempos hipotéticos anteriores, conservados para
  comparar. El comparador de viajes y las mallas inferiores siguen correspondiendo
  explícitamente a ese ensayo; no son resultados calculados sobre V7.

El objetivo Coruña–Ferrol inferior a 30 min sigue siendo un objetivo del autor,
no una prestación acreditada de estas nuevas alternativas. No se heredan los
23/35/34 minutos del ensayo anterior como resultados de la revisión.

## Pendiente para una propuesta de infraestructura consolidada

Rasantes, geotecnia, túneles/viaductos, clotoides, velocidades, accesos urbanos,
afecciones, definición de estaciones, material y potencia, capacidad, demanda,
costes y marchas. La geometría del acceso deriva de una reconstrucción cartográfica,
no de un itinerario técnico autorizado. La menor longitud no prueba mayor beneficio.

Los medios de LinkedIn no se regeneran hasta que la nueva propuesta horaria sea
coherente con las geometrías revisadas. V4, V5 y V6 permanecen archivadas.

## Reproducción

```bash
python alignments.py
python build.py
python relief.py
python validate.py
# Servir el repositorio en localhost:8092
node check.cjs
```

Usar el entorno GIS del proyecto (NumPy, SciPy, Shapely, PyProj y Pillow); Chromium
con Playwright para el navegador. El módulo de terreno V4 verifica los hashes de
las teselas antes de usarlas. `sources-manifest.json` identifica la entrada V6 y
el resultado horizontal. QA en `qa.json` y `browser-qa.json`.
