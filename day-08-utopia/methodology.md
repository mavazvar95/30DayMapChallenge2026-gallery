# COMPÁS Atlántico · edición revisada V9

Trazados revisados desde el 15/11/2026; medios publicados el 19/11/2026. El escenario publicado de referencia es V8; esta revisión rediseña cinco de los siete corredores. Los horarios de fuentes permanecen fechados el 12/11/2026. Todas las líneas nuevas son propuestas propias, no obras aprobadas.

## Qué cambia

Ourense–Pontevedra deja de forzar los últimos 9 km de acceso ferroviario desde el norte de Pontevedra: se estudia un acceso de 3 km. El núcleo nuevo se ajusta con B-splines cúbicas, tangentes procedentes de la vía cartografiada y un radio horizontal mínimo comprobado de 1.500 m. El mismo método se aplica a Vigo–Braga, Braga–Porto, Santiago–Lugo y Lugo–Ourense. Coruña–Ferrol y Coruña–Lugo conservan sus alternativas anteriores; por tanto, sus radios reducidos siguen siendo una limitación explícita.

La búsqueda controla radio, continuidad, máscara terrestre y coste de longitud/relieve conjuntamente. Se ensayan dos pesos (0,3 y 1,5) por corredor. Un candidato Vigo–Braga no converge y se rechaza. El perfil vertical y las marchas se recalculan solo en las alternativas aceptadas. Los controles muestrean cada 25 m para la geometría final y cada 100 m para la estimación de marcha. No hay clotoides ni proyecto de enlaces y estaciones.

| Relación | V8 | V9 | Estimación V9 |
|---|---:|---:|---:|
| Ourense–Pontevedra | 98,95 km | 72,38 km | 39 min |
| Vigo–Braga | 91,19 km | 87,42 km | 36 min |
| Braga–Porto | 49,53 km | 46,80 km | 25 min |
| Santiago–Lugo | 101,77 km | 96,21 km | 41 min |
| Lugo–Ourense | 91,08 km | 86,05 km | 38 min |

Los 39 min Ourense–Pontevedra son una hipótesis cinemática, no un horario comercial. La rasante necesita un margen supuesto de hasta 600 m bajo el terreno y produce 22,58 km clasificados como sectores bajo terreno y 16,18 km sobre terreno en el núcleo nuevo. Esos sectores no son túneles y viaductos proyectados. Para Lugo–Ourense también se requiere el margen vertical de 600 m. Esto es una advertencia de coste/viabilidad especialmente fuerte: el ahorro de tiempo por sí solo no recomienda construir.

Vigo–Porto suma 69 min, incluidos 8 min de parada supuesta en una estación futura de Braga aún sin definir. Ourense–Vigo suma 54 min con 1 min en Pontevedra y 14 min del tramo existente. Coruña–Ferrol sigue en 35 min y no alcanza el objetivo inferior a 30 min.

## Fuentes y limitaciones

La línea de costa, red existente, puntos de estación, horarios y relieve conservan las fuentes congeladas documentadas en los manifiestos: Renfe GTFS, IGN, OpenStreetMap/Geofabrik, Natural Earth y Mapzen/Skadi. Cálculo en ETRS89 / UTM 29N (EPSG:25829). Los puntos de Braga son referencia urbana, no definición oficial de la futura estación.

El núcleo nuevo usa un máximo de ensayo de 250 km/h y sensibilidad a 200 km/h, con velocidad limitada por cada curva, pendiente máxima de 25‰, aceleración/frenado simplificados, parada hipotética en los dos extremos, 20 % y 3 minutos de margen. Accesos reutilizados: media supuesta de 80 km/h. Ninguna de esas cifras es una velocidad autorizada. El modelo no comprueba potencia ni material concreto. La categoría visual «Rápido propuesto» evita confundir estos trenes con alta velocidad existente.

La coordinación de salidas usa dos barridos sobre 20 líneas direccionales; 896 consultas de ajuste y otras 896 de validación, sin demanda ponderada ni capacidad. A las 08:00 mejoran 38 de 42 relaciones dirigidas gallegas comparables y ninguna empeora; es un escenario hipotético a una hora determinada, no ahorro típico de viajeros.

Faltan geotecnia, coste, demanda, impacto territorial y ambiental, capacidad, aparatos de vía, ancho y electrificación interoperables y definición de estaciones. El HTML, la lámina y el vídeo comparten geometrías, tiempos y servicios de esta revisión; no acreditan viabilidad constructiva. [Método anterior](prior-methodology.md).

## Reproducción y QA

Ejecutar con el entorno GIS del proyecto: `python design.py`, `python model.py`, `python build.py`, `python coordinate.py`, `python validate.py`. Para comprobación visual, servir la raíz del repositorio por HTTP en el puerto 8094 y ejecutar `node check.cjs`, `node check_interactions.cjs`, `node media.cjs`, `node record.cjs`, `python export_video.py`. Archivos de control: `design-report.json`, `validation.json`, `browser-qa.json`, `interaction-qa.json` y `visual-review.json`.
