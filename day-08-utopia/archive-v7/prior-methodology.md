# COMPÁS Atlántico V4 · Menos rodeos, más conexiones

Autor: Miguel Ángel Vázquez Varela. Referencia de horarios: 12/11/2026.

## Qué propone esta revisión

Una red que conserva los servicios sobre vías existentes y añade **seis ejes
preliminares nuevos**, definidos geográficamente: Coruña–Ferrol, Coruña–Lugo,
Santiago–Lugo, Ourense–Pontevedra, Vigo–Braga y Braga–Porto. Ourense–Vigo reutiliza
el Eixo Atlántico entre Pontevedra y Vigo. Los Cercanías y regionales conservan
sus perfiles horarios de referencia; aumentar frecuencia no acelera esos trenes.

Los ejes nuevos son **propuestas propias**, no vías existentes, proyectos aprobados
ni reproducción del trazado oficial de Cerdedo o de la LAV portuguesa. Esas relaciones
pueden tener proyectos oficiales; las geometrías aquí calculadas no se atribuyen a
sus promotores. Tampoco se localizan nuevas estaciones AV aprobadas en Braga o Valença.

El objetivo Coruña–Ferrol <30 min se contrasta, no se impone al cálculo. La
alternativa seleccionada tiene unos 50 km y un tiempo preliminar de 23 min bajo
los supuestos indicados; a un máximo de 200 km/h la sensibilidad da 25 min. Ese
resultado **no prueba viabilidad**: exige grandes intervenciones y accesos urbanos
sin estudiar. Se rodean las rías por tierra; no se añaden puentes/túneles marítimos.

## Fuentes reales

Se mantienen las fuentes congeladas de V3: Renfe GTFS, IGN IGR-RT, IGN BDDAE,
OpenStreetMap/Geofabrik Portugal y Natural Earth. Sus licencias y detalles están en
[base-methodology.md](base-methodology.md) y [base-sources-manifest.json](base-sources-manifest.json).

Relieve nuevo: **Mapzen Terrain Tiles / Skadi HGT**, descargado el 12/11/2026 desde
<https://registry.opendata.aws/terrain-tiles/>. Cinco teselas de un grado, un segundo
de arco, muestras de altura en metros, verificadas mediante CRC gzip y SHA256.
Las celdas sin datos se excluyen. El muestreo del relieve es bilineal; la búsqueda
trabaja sobre una malla métrica de 250 m, no con una precisión constructiva de 30 m.

Atribución del servicio: Mapzen; relieve europeo producido utilizando datos e
información Copernicus financiados por la Unión Europea, capas EU-DEM; fuentes
globales SRTM/GMTED2010 de USGS y ETOPO1 de NOAA, según composición del servicio.
Condiciones y atribuciones completas:
<https://github.com/tilezen/joerd/blob/master/docs/attribution.md>.
La descarga no identifica qué proveedor contribuye a cada píxel; no se atribuye
el conjunto exclusivamente a SRTM ni se afirma una fecha de vuelo reciente.

Todas las distancias se calculan en **ETRS89 / UTM 29N (EPSG:25829)**. Las alturas
son las del producto compuesto, sin nivelación topográfica local ni ajuste de
cota real de andenes. Transformación horizontal con `always_xy=True`.

## Alternativas horizontales

1. Para cada pareja se recorta un ámbito de búsqueda con 18 km de margen respecto
   a sus extremos. Se excluyen mar, celdas sin altura y una franja terrestre de
   100 m junto al litoral; se comprueban también los enlaces entre celdas.
2. Un grafo de ocho vecinos minimiza distancia ponderada por rugosidad y altitud.
   Se ensayan tres pesos del relieve: 0,15 / 1 / 3. La rugosidad procede del
   gradiente del relieve suavizado; **no es la pendiente de la futura vía**.
3. Se simplifican y suavizan los recorridos con curvas cúbicas. Toda curva que
   atraviese la máscara marina se rechaza. La alternativa final se remuestrea a
   unos 100 m y se vuelve a comprobar contra tierra. No se unen ciudades con rectas
   presentadas como líneas ferroviarias reales.
4. El suavizado cambia el camino obtenido en la malla; no se afirma que el
   resultado suavizado siga siendo el mínimo global de la función de coste.

No se incluyen parcelas, edificios, espacios protegidos, patrimonio, fallas,
servicios afectados o disponibilidad de suelo. Por ello son corredores preliminares,
no trazados listos para construir. La restricción terrestre se contrasta con los
polígonos disponibles; no sustituye hidrología ni una evaluación de ríos interiores.

## Perfil vertical y exigencia de obra

Para cada alternativa se minimiza la suma de diferencias absolutas entre rasante
y terreno. Es un indicador de intervención, **no volumen de tierras ni coste**.
Se fijan las cotas de los extremos al relieve muestreado y se imponen:

- Pendiente máxima absoluta: 25‰.
- Radio vertical aproximado mínimo: 20 km, mediante diferencias de pendientes.
- Separación inicial máxima: 200 m por debajo o por encima del terreno.

Si no existe solución con estas restricciones, la alternativa aparece rechazada.
Las tres alternativas Ourense–Pontevedra fallan ese ensayo. Se añade explícitamente
una **sensibilidad con cobertura de túnel hasta 600 m**, que sí encuentra perfil;
no se cambia el límite silenciosamente ni se presenta como una obra sencilla.

Los kilómetros con rasante más de 15 m por debajo o por encima del terreno se
muestran como indicadores para estudiar túneles, viaductos, desmontes o rellenos.
No se anuncian longitudes certificadas de túneles o estructuras. Falta geotecnia,
sección transversal, gálibos, drenaje, portales, cimentaciones y evaluación ambiental.

La selección utiliza el índice:

`minutos de escenario + 0,5 × km bajo terreno + 0,75 × km sobre terreno`.

Los coeficientes son preferencias explícitas de este ejercicio, no precios,
beneficio social o ponderaciones calibradas. No se demuestra un óptimo de red,
económico ni de ingeniería. Las alternativas descartadas siguen disponibles.

## Estimación de marcha

Se calcula una envolvente cinemática sobre la alternativa elegida, en ambos sentidos,
y se adopta el mayor tiempo. Supuestos:

- Máximo de escenario de 250 km/h; segunda evaluación a 200 km/h.
- Ancho ibérico hipotético de 1,668 m para integración territorial; interoperabilidad
  futura por resolver. No describe necesariamente el ancho final de proyectos oficiales.
- Curvatura horizontal a partir de ternas de puntos; velocidad limitada mediante
  equilibrio lateral con peralte + insuficiencia supuestos de 250 mm en total
  (150 + 100 mm). No son autorizaciones de circulación por tramo.
- Acceso limitado a 80 km/h en los primeros y últimos 2 km de cada eje nuevo.
- Aceleración base 0,45 m/s² y frenado 0,60 m/s², penalizados por la pendiente.
- Parada completa en ambos extremos de cada eje. Se añade un 20 % de margen y
  3 min por eje; son supuestos del escenario, no una norma de explotación.

No se modelan curvas de potencia/adhesión, masa real, resistencia aerodinámica,
transiciones de peralte, señalización ni conflictos. La marcha es una estimación
preliminar idealizada, **no una simulación validada de material rodante**. Una cota
calculada de 23 min no autoriza afirmar que se podrá viajar así comercialmente.

Ourense–Vigo suma el eje nuevo hasta Pontevedra, una parada de un minuto y **14 min
publicados** Pontevedra–Vigo del perfil GTFS M1 utilizado. Los tiempos de ese tramo
existente no se estiman con el modelo de 250 km/h. Las llamadas inversas conservan
correctamente marcha y parada, sin restar un minuto al tramo nuevo.

## Servicios y mejora del sistema

La oferta de referencia conserva el GTFS; cuatro Celta se excluyen de cálculo y
animación ferroviaria por el autobús sustitutorio Vigo–Valença anunciado por CP.
Las líneas futuras complementan la referencia, con material y capacidad adicionales.
Los Cercanías sobre infraestructura existente no reciben los tiempos del nuevo directo.

Se ajustan fases de salida de 16 líneas direccionales a igual número de trenes,
intervalos y marchas. `coordination.json` registra consultas, resultados y adopción
(o rechazo) según otras horas de validación. Un ensayo con horas enteras que empeoró
las consultas intermedias fue descartado; se amplió el muestreo dentro de la hora.
La muestra final usa 896 consultas de ajuste y 896 con otras horas para validar.
En validación, 296 mejoran y 187 empeoran; el resto no cambia. La suma pasa de
112.777 a 100.956 minutos, sin ponderar demanda. No se presenta el ajuste como
un horario operativo óptimo.

La matriz muestra las siete ciudades gallegas y Porto: **56 relaciones dirigidas**,
con disponibilidad a las 08:00. Se incluyen espera inicial y transbordos, mínimo
10 min para cambiar de tren y máximo dos transbordos. Vigo se representa por Urzaiz;
no se inventa un traslado automático a Guixar. La mediana y el recuento de mejoras
usan solo las relaciones gallegas con resultado en ambos escenarios. Como se conserva la oferta anterior, que ningún viaje empeore frente a la
referencia es una consecuencia del escenario aditivo, no una prueba de viabilidad.
No son viajeros ni beneficios sociales; la mejora combina infraestructura, frecuencia y coordinación.

Las propuestas pueden compartir corredores parcialmente. La suma de sus longitudes
no deduplica esos tramos: no se debe presentar como kilómetros netos de obra ni como
una red optimizada bajo presupuesto. La matriz permite valorar conectividad, pero
faltan demanda, coste, capacidad y una comparación económica de inversiones.

## Reproducción y control

```bash
python acquire_dem.py
python corridors.py
python build.py
python coordinate.py
python validate.py
# Servir el repositorio en localhost:8090
node check.cjs
node media.cjs
node record.cjs
python export_video.py
```

`corridors.geojson` contiene alternativas propias y su condición de seleccionadas o
rechazadas. `corridors.json` incluye perfiles y parámetros. `validation.json` separa
comprobaciones ejecutadas de aspectos NOT_CHECKED; `browser-qa.json` comprueba la
aplicación y la igualdad del cálculo de viajes Python/JavaScript. La inspección de
renders no equivale a aprobación del autor ni a certificación de trazados.
