# Continuidad de la recarga en tres travesías

## Pregunta y unidad de análisis

¿Puede encadenarse un viaje por carretera con una autonomía útil determinada,
y qué cambia al exigir un conector de al menos 150 kW? Se estudian A Coruña–Almería,
Barcelona–Cádiz y Bilbao–València, fijados antes de obtener los resultados.
Son estudios de corredor, no una estimación de cobertura nacional.

Una observación es un ID oficial de instalación del Geoportal MITECO, consultado
el 04/11/2026. Se mantienen coordenadas y máximo nominal de algún conector.
No se cuentan conectores como instalaciones ni se suma potencia. Los extremos
se fijan en la instalación de mayor potencia de cada municipio, con desempate
por ID. Representan esos emplazamientos concretos, no el centro municipal.

## Rutas, selección y alternativas

OSRM/OpenStreetMap proporciona un recorrido de referencia entre los extremos
y una matriz **dirigida** de distancias y tiempos. Se emplean distancias de las
rutas rápidas, no distancias mínimas en longitud ni distancias en línea recta.
No se usa `fallback_speed`; una celda sin ruta permanece desconocida.

La selección inicial toma instalaciones que avanzan a lo largo del recorrido
y están a ≤5 km de él. La proyección EPSG:25830 sirve solo para esa búsqueda
y para el mapa. No calcula distancias de las etapas.

- Se conservan todas las instalaciones ≥150 kW dentro de esa franja de avance.
- Para potencias inferiores se añade una instalación de bajo alejamiento por
  intervalo de 40 km y umbral 0/50/150 kW. El criterio suma alejamiento y una
  pequeña penalización por distancia al centro del intervalo, con desempate por ID.
- Los extremos se añaden explícitamente y los IDs distintos se conservan,
  incluso cuando comparten coordenadas.
- Si la búsqueda inicial no obtiene cadena ≥150 kW a 150 km útiles, se identifica
  la etapa más larga de la cadena de umbral mínimo. Se amplía una vez la búsqueda
  hasta 25 km de alejamiento en esa ventana, con 20 km adicionales antes y después.
  Todas las nuevas instalaciones ≥150 kW se añaden al mismo conjunto de candidatos
  para todos los escenarios del corredor.
- Solo se admiten nodos cuyo ajuste al grafo viario no supera 100 m. Ese ajuste
  no certifica un acceso físico o público al cargador.

La ampliación añade cuatro IDs en A Coruña–Almería y siete en Bilbao–València.
Permite que Bilbao–València encuentre cadena ≥150 kW a 150 km útiles, cambiando
el umbral de 165 a 144 km. En A Coruña–Almería pasa de 211 a 158 km. Es una
sensibilidad ejecutada que muestra por qué no debe confundirse una búsqueda
estrecha con una ausencia de infraestructura.

## Escenarios y optimización

Se analizan 100, 150, 250 y 350 **kilómetros útiles entre paradas**, con umbrales
0, 50 y 150 kW. Los kilómetros ya descuentan la reserva de batería: no son WLTP
ni prestaciones atribuidas a un modelo de coche. Por ejemplo, 300 km reales a
carga completa, salida al 80 % y reserva del 10 % implicarían 210 km útiles;
es una cuenta de escenario, no un dato de un vehículo concreto.

Una arista dirigida permite ir de una instalación a otra si la distancia vial
cabe en el presupuesto útil. Para buscar el itinerario se exige además avance
en el corredor y una distancia total ≤115 % de la referencia. Se elige el menor
número de etapas y, en empate, la menor distancia. No se minimiza tiempo total
de viaje: faltan curvas de carga, baterías y condiciones de las sesiones.

La programación dinámica conserva para cada número de etapas la llegada de
menor distancia a cada nodo. Retener solo la menor distancia global podría
eliminar una alternativa con menos paradas que también cumpla el presupuesto.
Cada cadena elegida se vuelve a enrutar con sus paradas; se comprueba que cada
etapa y el recorrido total respeten los límites. Se guarda su geometría real.
La simplificación gráfica posterior no interviene en los cálculos.

Se conserva el tiempo **modelizado al volante** del itinerario y su diferencia
respecto a la referencia, sin sumar una duración de recarga inventada. Una ruta
con paradas puede ser más corta en kilómetros y más lenta que la referencia,
porque esta se elige por rapidez. La diferencia de distancia puede ser negativa.

## Qué significan los clusters

Se calculan componentes fuertemente conexos de los candidatos y las aristas
permitidas por autonomía y potencia. Dentro de cada componente existe una
cadena de recargas en ambos sentidos. Es una agrupación funcional condicionada
al escenario, distinta de un hotspot DBSCAN de cinco kilómetros.

Esos componentes no imponen el presupuesto total de desvío ni el avance que
sí exige la búsqueda del viaje. La conectividad de un componente y la existencia
de un itinerario que cumpla todas las restricciones no son equivalentes.

Se retira por separado cada parada intermedia de una cadena y se repite la
búsqueda. Si no aparece otra cadena, esa instalación es crítica **en esta muestra**.
Es un ensayo hipotético sobre IDs, no una tasa de avería ni un análisis de fallos
correlacionados de emplazamientos, operadores o conexiones eléctricas.

## Resultado y lectura de transporte

A 150 km útiles se encuentran cadenas ≥50 kW en tres recorridos y ≥150 kW en dos.
Los umbrales enteros mínimos de los grafos estudiados son:

| Recorrido | ≥50 kW | ≥150 kW |
| --- | ---: | ---: |
| A Coruña–Almería | 86 km | 158 km |
| Barcelona–Cádiz | 71 km | 84 km |
| Bilbao–València | 61 km | 144 km |

La comparación muestra que exigir potencia cambia las etapas y alternativas
que admite una misma autonomía. La concentración geográfica por sí sola no
responde a la continuidad de un viaje. La búsqueda ampliada también cambia la
conclusión: salir del corredor de referencia puede conectar una cadena.

No encontrar cadena a 150 km en A Coruña–Almería no demuestra que el viaje sea
imposible: siguen sin explorarse todos los recorridos, accesos e instalaciones.
Los umbrales son del modelo y su muestra, no requisitos universales de cada eje.

## Datos ausentes y límites

El inventario no acredita exhaustividad ni actualización operativa. No se ha
certificado acceso público, compatibilidad del conector, horarios, disponibilidad,
ocupación, tarifas o potencia efectiva. Las instalaciones de menor potencia no
se incorporan exhaustivamente. No se modelan consumo, relieve, temperatura,
velocidad, carga del vehículo ni incertidumbre de la autonomía.

Las rutas OSRM son cálculos estáticos de un proveedor, no tiempos observados.
La fecha de consulta no es una fecha acreditada de edición del grafo OSM. La
capa HERMES conserva las clases oficiales para contexto; no se transforma en
un grafo enrutable a partir de sus cruces dibujados.

El producto describe **continuidad teórica de tres corredores**. No certifica
un viaje sin problemas, no demuestra un déficit nacional ni atribuye causalmente
la adopción del vehículo eléctrico a los cargadores. Esas preguntas requieren
red completa y datos de servicio, parque y demanda.

## Fuentes, atribución y trazabilidad

- MITECO: captura y auditoría originales del día 04, huella del GeoPackage en
  `analysis.json`; no se alteran los originales.
- [OSRM Route/Table API](https://project-osrm.org/docs/v5.24.0/api/): respuestas
  archivadas con URL, parámetros, fecha y SHA-256 en la caché local ignorada.
  59 peticiones únicas utilizadas, a un máximo de una cada dos segundos, con
  identificador y caché. El HTML no consulta el servicio al utilizarse.
- [Política del servicio](https://routing.openstreetmap.de/about.html): se evita
  la explotación masiva y se limita el estudio a tres corredores. Nuevas peticiones
  requieren `--fetch`; renderizar o usar la web no genera solicitudes de rutas.
- © OpenStreetMap contributors, ODbL, para datos de enrutamiento derivados.
- HERMES / Ministerio de Transportes: contexto tipificado, generalizado para
  dibujo. Su campo de derechos no confirma licencia específica; no se le asigna
  una licencia por analogía. Esa incertidumbre se conserva.
- GISCO 2024 / © EuroGeographics: límite de España, uso no comercial.

`analysis.json` conserva candidatos, matrices, escenarios, geometrías, huellas
de código y capturas utilizadas. `results.csv` facilita revisar los 36 escenarios.
`browser-qa.json`, `qa.json` y `publication/manifest.json` documentan verificaciones.
