# 08/30 · Utopia — COMPÁS Atlántico

Autor: Miguel Ángel Vázquez Varela. Edición: 11/11/2026.

## Pregunta y conclusión

¿Cómo cambia un viaje desde Ferrol si se añade una expedición que permite
aprovechar servicios posteriores del eje atlántico?

Para estar disponible en Ferrol desde las **15:30 del 12/11/2026**, el modelo
encuentra llegada a **Vigo-Urzáiz a las 21:29** con el horario publicado. Con
la expedición hipotética **C01, Ferrol 15:45–A Coruña 17:02**, encuentra llegada
a **19:26**. La diferencia es **123 minutos**. El viaje del escenario pasa por
A Coruña: conexión con el MD 09183 de las 18:00, con 58 minutos de transbordo.

La espera en origen pasa de 131 a 15 minutos; el tiempo en tren de 168 a 163;
la espera de transbordo de 60 a 58. **116 de los 123 minutos de diferencia
proceden de esperar menos antes del primer tren.** Es un ejemplo definido por
origen, destino, fecha y hora disponible, no un ahorro general para todo viajero.

El refuerzo conserva el horario de todos los trenes existentes. Ese supuesto
explica que el enrutamiento no empeore: no se han simulado conflictos en la vía.
El resultado cuantifica un beneficio potencial y no demuestra viabilidad ni
rentabilidad. No es un servicio comercial ni una recomendación para reservar.

## Fuente y captura

- Renfe Data: [horarios AV, LD y MD](https://data.renfe.com/es/dataset/horarios-de-alta-velocidad-larga-distancia-y-media-distancia).
- [ZIP GTFS oficial](https://ssl.renfe.com/gtransit/Fichero_AV_LD/google_transit.zip).
- Descarga conservada: **10/11/2026**, sin refrescar al cambiar de día.
- Licencia declarada por el catálogo: **Creative Commons Attribution 4.0**.
- SHA-256: `64eba25b729ef32fb6ea3d4328a694c2406fb936c806948a4a52e9c46a346f96`.
- El fichero excluye Cercanías y FEVE. No incluye otros operadores.
- Fechas de estudio: **11, 12 y 14/11/2026**, hora de agencia Europe/Madrid.
- La captura incluye los calendarios que cubren esas fechas; no son mediciones
  de circulación real, puntualidad u ocupación.

El original se conserva en el repositorio de trabajo. Se recortan espacios de
cabeceras y valores al leer el CSV, sin reescribir ni reparar el ZIP.

## Universo de consultas

Diez estaciones: Ferrol, Betanzos-Infesta, A Coruña, Santiago de Compostela-Daniel
Castelao, Pontevedra, Vigo-Urzáiz, Vigo-Guixar, Ourense, Lugo y Monforte de Lemos.
Se mantienen los identificadores GTFS; Vigo-Guixar y Vigo-Urzáiz nunca se fusionan.

90 pares dirigidos distintos × 31 horas de disponibilidad (05:00–20:00, cada
media hora) = **2.790 consultas por fecha**, 8.370 en total. Cada consulta recibe
el mismo peso. No hay matriz de demanda, pasajeros, demanda inducida o cuotas modales.

Los trenes se construyen con sus paradas completas; los cambios de tren y los
orígenes/destinos se limitan a esas diez estaciones. Las estaciones intermedias
no incluidas no forman parte del balance de consultas. No hay enlaces a pie,
autobuses, tarifas, billetes, distancias de acceso o garantía de plazas.

## Enrutamiento

Se aplican `calendar.txt` y las altas/bajas de `calendar_dates.txt`, los horarios
ordenados de `stop_times.txt`, y las restricciones de subida/bajada. Se excluyen
las restricciones de reserva telefónica/acuerdo previo (tipos 2/3), de forma
conservadora. Solo se incluyen rutas de tipo ferroviario 2.

El algoritmo busca la **primera llegada** a partir de la hora de disponibilidad.
Incluye la espera inicial, admite hasta tres trenes (dos transbordos) y exige
10 minutos entre llegada y salida en la misma estación. No cuenta como transbordo
continuar en un mismo tren: se generan todas las etapas directas posibles entre
sus estaciones seleccionadas.

Admite las horas GTFS superiores a 24:00 y llegadas anteriores a 30:00 del mismo
día de servicio. No carga las nuevas salidas del siguiente día de servicio.
Una consulta sin resultado no prueba que no exista un viaje fuera de ese ámbito.

## Escenarios

### Expedición adicional C01

Se replica el patrón de paradas y tiempos del MD 12683, Ferrol–A Coruña,
conservando tiempos de marcha y parada en las trece estaciones. Se añade un
nuevo servicio hipotético, identificado como **C01**, sin sustituir el original.
Las trece estaciones y sus horas aparecen en el panel.

Se prueban nueve salidas de 15:00 a 17:00, cada 15 minutos. El criterio selecciona
la que maximiza el **menor saldo de minutos ganados entre las tres fechas**, en
consultas con itinerario en ambos escenarios. Los nuevos itinerarios se cuentan
por separado y no reciben un valor temporal ficticio. Desempate: suma de saldos
y, después, salida más temprana. La seleccionada es **15:45**, llegada **17:02**.

Este es el mejor candidato de ese conjunto y criterio, no una optimización
continua ni de toda la red. Las tres fechas se utilizan para seleccionar, por
lo que ninguna se presenta como validación independiente.

| Fecha | Llegan antes | Llegan después | Misma llegada | Nuevo itinerario | Sin itinerario en ambos |
|---|---:|---:|---:|---:|---:|
| 11/11/2026 | 39 | 0 | 2.578 | 6 | 167 |
| 12/11/2026 | 45 | 0 | 2.645 | 0 | 100 |
| 14/11/2026 | 45 | 0 | 2.512 | 0 | 233 |

No se pierde ningún itinerario en este escenario. El cero empeoramientos es
condicional a mantener todos los servicios existentes sin alterar sus tiempos.
Cada fila suma 2.790, incluyendo los casos sin itinerario.

**Recursos adicionales:** una expedición en un sentido, 77 minutos entre salida
y llegada, incluidas paradas. No equivale al coste total ni al ciclo de un tren:
faltan posicionamiento, retorno del material, reserva, mantenimiento y personal.
No se calculan tren-kilómetro sin un trazado y medición verificados.

### Ajuste de horario descartado

Desplazar todo el tren 12683 de 14:15 a 14:45 conserva su duración, pero cambia
las conexiones. El 12/11 mejora 15 consultas y empeora 115 (de 2.790).
Por ejemplo, disponible en Ferrol desde las 14:00 hacia Vigo-Guixar, la llegada
pasa de 18:18 a 21:33: **195 minutos después**. Se pierde el enlace de las 16:00
en A Coruña, porque el tren desplazado llegaría a las 16:02.

Se conserva como comparación explicativa; no se recomienda como ajuste general.
Los resultados de la exploración anterior quedan archivados en `research/`.

## Sensibilidad y calidad

El balance del refuerzo se repite con márgenes mínimos de 5, 10, 15 y 20 minutos.
La tabla del HTML muestra cada fecha y margen. Un margen no es una garantía:
no hay distribución de retrasos ni comprobación de andenes o accesibilidad.

`qa.json` recoge comprobaciones ejecutadas, advertencias y comprobaciones no
realizadas. Se verifican integridad ZIP, claves, coordenadas, calendarios,
secuencias temporales, itinerarios contra sus etapas activas, márgenes de cambio,
balance de tiempos y conservación de los servicios actuales. Pruebas unitarias
cubren medianoche, restricciones, cambio de estación y cálculo de transbordos.

## Cartografía y diseño

El diagrama representa **enlaces de servicios**, derivados de las secuencias de
paradas GTFS entre las estaciones seleccionadas. Los nodos se colocan
esquemáticamente para leer las conexiones; no hay escala ni nuevos trazados
ferroviarios. Las coordenadas originales del GTFS están en WGS84 (EPSG:4326),
conservadas como referencia; no se usan grados para medir distancias.

Turquesa: itinerario del escenario. Discontinuo: expedición propuesta. Amarillo:
estaciones del itinerario. Azul: tiempo en tren. Gris: espera inicial. Amarillo
en las barras: espera de transbordo. Las barras comparten escala desde la hora
de disponibilidad; el espacio restante hasta la llegada más tardía no es viaje.

La animación es esquemática: usa horas de salida/llegada y muestra el avance
ilustrativo entre nodos, no posiciones observadas ni velocidades reales.

La identidad COMPÁS Atlántico es conceptual. Logotipo y componentes SVG/HTML
originales; el tren ilustrado no corresponde a material homologado. Las imágenes
conceptuales de la conversación orientaron el desarrollo con Codex; la
implementación final y el cálculo son reproducibles en los archivos del proyecto.

## Pendiente para una propuesta operativa

Surcos, cruces en vía única, capacidad de estaciones, material disponible,
ciclos y personal, coste, demanda, ocupación, tarifas y disponibilidad real de
billetes. La expedición no se ha solicitado ni acordado con ningún operador.
