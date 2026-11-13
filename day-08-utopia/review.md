# Revisión ferroviaria integral · COMPÁS Atlántico

13/11/2026 · Edición de revisión, no proyecto definitivo.

## Diagnóstico

La V4 dibujaba seis ejes nuevos como soluciones seleccionadas. Su generación
combinaba un camino mínimo en una malla de relieve con simplificación de hasta
2 km y una spline cúbica. Esta operación puede producir grandes arcos o rectas
con curvatura visualmente regular, sin resolver accesos, empalmes ni transiciones
ferroviarias. El perfil vertical posterior no corrige esas carencias.

**Decisión:** retirar las seis alineaciones y sus tiempos del escenario activo,
conservar V4 como ensayo y reconstruir el programa de inversión por corredores.
No sustituir los arcos por curvas dibujadas a mano ni convertir vías actuales en
alta velocidad mediante un cambio de color. La nueva edición representa con
precisión cartográfica solamente la infraestructura que consta en las fuentes.

Esto no completa el diseño de las nuevas líneas: hace explícito dónde falta.
No se dispone todavía de geometrías oficiales contrastadas para sustituirlas.

## Las seis propuestas anteriores

| Eje V4 | Problema | Decisión de planificación |
|---|---|---|
| A Coruña–Ferrol | Curva sin resolución de accesos; 23 min dependían de una marcha idealizada y grandes obras | Estudiar corredor rápido terrestre y servicio local separado. <30 min permanece como objetivo del autor, sin solución acreditada. |
| A Coruña–Lugo | La suavización no define variantes ni empalmes con el corredor existente | Comparar mejora y variantes por Betanzos–Curtis–Guitiriz frente a nuevas alternativas; preservar servicios regionales. |
| Santiago–Lugo | Gran arco sin una justificación territorial suficiente | Comparar corredor nuevo con viajes sobre red mejorada. Sin alineación adoptada ni tiempo de 34 min. |
| Ourense–Pontevedra | Solución casi recta; tres alternativas fallaban la rasante y se admitió cobertura de hasta 600 m | Contrastar Cerdedo y acceso al Eixo Atlántico con mejora del corredor del Miño. No reproducir Cerdedo mediante una recta propia. |
| Vigo–Braga | No resuelve frontera, accesos ni futura estación AV de Braga | Referenciar planeamiento portugués y español, comprobar estaciones y ancho antes de dibujar la nueva línea. |
| Braga–Porto | Extremos fijados en estaciones actuales sin validar acceso ni encaje del nuevo proyecto | Estudiar como parte del corredor internacional, conservando el regional por Viana y Nine. |

Todos comparten carencias de urbanismo, afecciones ambientales, radios/transiciones,
geotecnia y diseño de nudos. Las longitudes bajo/sobre el terreno eran indicadores,
no inventario de estructuras. No se trasladan a la nueva edición como obras previstas.

## Red que estudiaría con un presupuesto amplio

La prioridad siguiente es una propuesta de estudio, no un ranking económico
calculado: faltan matrices de demanda, presupuestos y simulación de capacidad.

1. **Eje interior Lugo–Sarria–Monforte–Ourense.** Debe tener servicio propio y
   continuidad hacia la Meseta. El GTFS ya contiene Intercity de 105 minutos en
   ambos sentidos. Se propone una oferta horaria con esos mismos perfiles; después
   se compararían variantes y mejora de la línea, sin forzar el viaje por Santiago.
2. **Eje A Coruña–Ferrol.** Separar la función metropolitana, con paradas, del
   directo entre ciudades. Fijar accesos a estaciones y puntos de enlace antes de
   buscar el corredor rápido. La restricción del autor excluye nuevos pasos marítimos.
3. **A Coruña–Lugo.** Evaluar conjuntamente variantes y servicios regionales,
   evitando que una mejora rápida deje sin oferta las estaciones intermedias.
4. **Santiago–Lugo.** Contrastar la utilidad de una nueva conexión con el tiempo
   puerta a puerta, demanda captada y conexiones que abre. La existencia de una
   línea nueva no se justifica únicamente por unir dos capitales en el mapa.
5. **Ourense–Vigo/Pontevedra.** Comparar alternativas a escala de corredor:
   Cerdedo, acceso al Eixo Atlántico y mejoras en el Miño. Mantener el servicio
   territorial del Miño aunque se construya otra conexión rápida.
6. **Vigo–Porto.** Encajar el proyecto internacional, los accesos urbanos y su
   interoperabilidad. Mantener funciones distintas para regional y larga distancia.
7. **Eixo Atlántico.** Aprovechar lo construido; comprobar mezcla de trenes,
   adelantamientos y capacidad antes de multiplicar servicios locales y rápidos.
8. **Ferrol–Asturias.** Tratar la vía métrica con sus condiciones propias;
   fiabilidad, accesibilidad, renovación y variantes justificadas, sin ficticia AV.
9. **Accesos y nudos.** A Coruña, Santiago, Ourense, Monforte, Redondela/Vigo y
   frontera requieren una lectura de vías, andenes y movimientos. Dos líneas
   que se tocan en un mapa no garantizan un enlace operativo.

## Cómo definir nuevas alineaciones

- Partir de cartografía oficial del proyecto cuando exista; registrar estado,
  fecha y escala. No confundir un anuncio, una DIA histórica y un proyecto aprobado.
- Delimitar corredores alternativos con relieve, hidrografía, núcleos, patrimonio
  y espacios protegidos. Fijar extremos en puntos de conexión ferroviaria.
- Diseñar accesos y enlaces; asegurar continuidad de dirección y rasante.
- Trazar rectas, curvas de transición y circulares compatibles con velocidad,
  peralte, insuficiencia y material. No basta una spline de apariencia suave.
- Resolver rasante, estructuras y portales, y comparar coste/afecciones.
- Calcular marchas con material y potencia definidos; comprobar mallas,
  capacidad, transbordos, reserva de recuperación y gráficos de material.
- Adoptar un corredor solo después de comparar alternativas; conservar los rechazos.

## Cambios ejecutados en el HTML

- Nueve ejes seleccionables de inversión; cada ficha explica función, infraestructura
  visible y estudio pendiente. Resaltado dorado para corredores existentes;
  cabeceras sin unión inventada cuando falta alineación.
- Supresión de los seis trazados automáticos del escenario activo, de sus trenes
  y de las cifras 23/35/34/29/62 min como resultados de obra seleccionada.
- Propuesta explícita de servicio Lugo–Ourense por Sarria y Monforte, con perfil
  GTFS de 105 min y frecuencia de 60 min. Aumentar oferta requiere material y capacidad.
- Duración completa de las expediciones publicadas exteriores en la cifra principal;
  tramo regional identificado aparte. Se conserva la zona horaria común de Madrid.
- Corrección del selector de expediciones: comparar códigos `undefined` podía
  seleccionar el primer servicio publicado en lugar del tren pulsado.
- Trenes ocultos inicialmente para leer la infraestructura; activación voluntaria
  o al reproducir. Se mantienen colores por servicio, zoom y selección de líneas.
- Matriz y comparación de viajes recalculadas solo para la oferta revisada sobre
  vías existentes. No se atribuye el resultado a futuras obras sin trazado.

## Qué falta y cómo se presenta

La V5 es una **revisión de planificación**, no la solución final de infraestructura
que busca el autor. Las nuevas alineaciones realistas siguen pendientes. El vídeo,
la lámina y el texto de V4 quedan archivados: no se regeneran como si esta revisión
hubiese terminado la nueva red. Deben actualizarse una vez elegidos los corredores.

QA ejecutado: `qa.json` y `browser-qa.json`. La inspección visual se registra aparte;
no equivale a aprobación del autor. No se han actualizado los horarios al 13/11:
se conserva la referencia del 12/11/2026 para hacer comparaciones coherentes.

## Hallazgo adicional: continuidad Sarria–Monforte

La inspección visual encontró un recorrido enlazado de **343,687 km** para el
tramo Sarria–Monforte: daba un rodeo por A Coruña y Santiago. El problema existía
en las geometrías heredadas, independientemente de las seis propuestas nuevas.

Se descargó detalle oficial IGN sin simplificación junto al elemento OBJECTID
38627, de la línea 800. Sus extremos presentan desplazamientos inferiores a 1 m
respecto de las dos entidades contiguas, 659 y 4566. Se documenta una corrección
solo en los nodos derivados de ese tramo existente de 11 m; no se añade una vía.
Los datos originales descargados se conservan sin editar.

Se reconstruye el recorrido en ambos sentidos: **34,667 km**, dentro del corredor
Sarria–Monforte. El control exige 30–45 km y un ámbito que excluye el rodeo por
Santiago/A Coruña. Procedencia y offsets en `path-repairs.json`.

La búsqueda ampliada de asignaciones de estación detecta otras cinco claves
con alternativas más cortas. No se adoptan automáticamente: podrían usar otras
vías o itinerarios incompatibles. Quedan registradas como candidatas pendientes
de contraste, no como correcciones certificadas.

La DIA histórica de Cerdedo se ha leído de nuevo: describe un enlace desde la LAV
Ourense–Santiago en O Carballiño hasta el Eixo Atlántico al norte de Pontevedra,
en Barro. Esto refuerza que la anterior curva entre estaciones urbanas no debe
presentarse como su trazado. No se atribuye vigencia actual a esa resolución.
