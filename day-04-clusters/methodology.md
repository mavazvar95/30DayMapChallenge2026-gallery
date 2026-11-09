# Los núcleos de la recarga · método y límites

## Pregunta y conclusión

**¿Dónde se agrupan las instalaciones ≥150 kW y qué papel pueden tener las que
quedan fuera en un viaje por carretera?**

De los 1.091 IDs de instalación de alta potencia de la captura, 553 (50,7 %) forman
48 agrupaciones geográficas y 538 (49,3 %) quedan fuera de ellas. En la cadena
A Coruña–Almería seleccionada a 250 km útiles, sus cuatro paradas intermedias
están fuera de las agrupaciones. Es una observación sobre esta solución, no una
prueba de que esas instalaciones sean indispensables o las únicas alternativas.

**La concentración local y la continuidad por carretera miden cosas distintas.**
Para evaluar viajes largos hay que estudiar las etapas entre oportunidades de
recarga; el número de instalaciones reunidas en un núcleo no resuelve esa pregunta.

## Inventario y unidad de observación

Se utiliza la captura del Geoportal MITECO consultada el **04/11/2026**. La fuente
no declara una fecha de actualización única: la fecha de consulta no se presenta
como fecha de vigencia. El análisis original aceptó 12.081 IDs de instalación;
1.091 tienen algún conector con potencia nominal ≥150 kW. No se suman potencias
ni se cuentan conectores como instalaciones. IDs diferentes con coordenadas
coincidentes siguen siendo registros distintos; no se certifica que sean
emplazamientos físicos diferentes.

El GeoPackage `output/clusters.gpkg`, capa `instalaciones_B`, es la referencia.
Los IDs, coordenadas, potencia y etiquetas se copian sin alteración. Su SHA-256:
`1a02bc86774848d3cc53d002c719313378e468863031a866cc8445a33e318ba8`.
No se han actualizado los datos de origen al rediseñar esta entrega.

Distribución de la muestra: Península 1.042, Canarias 28, Baleares 21, Ceuta 0,
Melilla 0. Los ceros describen esta captura y este umbral; **no prueban ausencia
real de instalaciones**.

## Agrupaciones geográficas

Se conserva el DBSCAN del análisis original de la cohorte ≥150 kW: distancia
haversine, radio terrestre 6.371.008,8 m, vecindad de 5 km y `min_samples=5`,
**incluida la propia observación**. Un núcleo de densidad tiene al menos cinco
registros en su vecindad. Los núcleos conectados y sus puntos de borde forman
las agrupaciones. No son componentes de una red vial ni áreas de servicio.

La vecindad no es el diámetro de cada grupo: el encadenamiento puede extenderlo
más allá de 5 km. `min_samples` tampoco garantiza cinco miembros finales por
etiqueta: los puntos de borde compartidos se asignan al primer grupo alcanzado.
En esta captura hay un grupo de tres IDs en el entorno de Rivas-Vaciamadrid;
se conserva, sin añadir registros ni fusionarlo para corregir su apariencia.
La prueba independiente verifica densidad, conectividad de núcleos y vecindad
de los bordes para todas las etiquetas.

Quedar fuera significa no pertenecer a un grupo con esta regla. No significa
estar solo, ser rural, no tener vecinos o carecer de valor para un viaje.
Los resultados dependen de los parámetros y del inventario. La sensibilidad
anterior se conserva en el análisis descriptivo; no se afirma estabilidad
universal de estas 48 agrupaciones.

Los nombres son el municipio más frecuente de cada grupo, solo como referencia.
«Madrid · 109» se refiere a los miembros de esa agrupación, **no a un total
municipal**. Puede incluir varios municipios.

## Cartografía

- Puntos en sus coordenadas originales; cian para agrupados y ámbar para los demás.
- Círculos con área proporcional al número de instalaciones. Se anclan en un
  miembro real próximo a la media de posiciones; **no representan superficies**.
- Sin envolventes inventadas, radios de cobertura ni conexiones entre centroides.
- Principal en ETRS89 / UTM 30N (EPSG:25830), con Baleares en su posición relativa.
  Canarias en recuadro independiente, WGS84 / UTM 28N (EPSG:32628), escala propia.
- Límites GISCO 2024. Carreteras HERMES tipificadas según atributos oficiales,
  con diferente grosor para alta capacidad y convencionales. Su cobertura
  secundaria es incompleta. Se simplifican a 300 m para dibujo y se recortan
  con un margen costero de 4 km, exclusivamente para contexto; ese margen no
  interviene en el análisis de instalaciones o accesibilidad.
- El itinerario blanco es una geometría vial real OSRM/OpenStreetMap. El perfil
  inferior es un **esquema de distancias de etapa**, sin significado geográfico.

## Ejemplos de viaje

Se reutiliza el modelo vial archivado, consultado el 06/11/2026: A Coruña–Almería,
Barcelona–Cádiz y Bilbao–València. El nuevo atlas toma únicamente sus escenarios
≥150 kW con 100/150/250/350 km útiles, ya descontada la reserva. No son autonomías
WLTP ni modelos concretos de vehículo. Cambiar autonomía **no cambia DBSCAN**.

Los candidatos de alta potencia se conservan en una franja base de 5 km del
trazado de referencia. El estudio amplió alternativas hasta 25 km alrededor
de la etapa limitante en los casos que fallaban la prueba 150 km/150 kW.
Las matrices son dirigidas, con distancias viales, no distancias entre centroides.
Se minimiza número de paradas y después distancia, con avance por el corredor
y un máximo del 15 % de distancia adicional respecto a la referencia.
No se minimiza tiempo total de viaje con recarga ni se explora toda España.
El detalle de candidatos, capturas y restricciones se conserva en el modelo vial.

Se une cada parada con el inventario nacional **por ID exacto**, conservando su
etiqueta geográfica. Numerador: paradas intermedias fuera de agrupaciones.
Denominador: todas las paradas intermedias; origen y destino quedan excluidos.

A Coruña–Almería, 250 km útiles, ≥150 kW:

| Etapa | Distancia vial |
| --- | ---: |
| A Coruña → Bembibre (ID 31019) | 217,7 km |
| Bembibre → Arévalo (33011) | 247,1 km |
| Arévalo → Tembleque (38005) | 221,9 km |
| Tembleque → Jaén (31053) | 235,3 km |
| Jaén → Almería | 213,0 km |

Total 1.135,0 km, +0,4 % respecto a la referencia. Las cuatro paradas están fuera
de los grupos de proximidad. Bilbao–València, con el mismo escenario, tiene
una de sus dos paradas fuera: no se generaliza el 4/4 al resto de viajes.

Encontrar cadena solo acredita continuidad **teórica en estos candidatos**.
No encontrarla no demuestra que un viaje sea imposible o que falte infraestructura
en toda una zona. Acceso público, compatibilidad, operatividad, ocupación,
horarios, curvas de carga y tiempo de carga no están certificados.
No se estima demanda, suficiencia de capacidad ni se explica causalmente
la adopción del vehículo eléctrico.

## Fuentes, atribuciones y condiciones

- [MITECO · Geoportal de instalaciones](https://geoportalgasolineras.es/geoportal-instalaciones/Inicio).
  Se conserva atribución, fecha de consulta y documentación de transformaciones,
  según condiciones RISP recogidas en el proyecto; no se asigna CC BY genérica.
- [HERMES · Ministerio de Transportes](https://mapas.fomento.gob.es/arcgis/rest/services/Hermes/0__CARRETERAS/MapServer/0).
  Contexto oficial tipificado. `copyrightText` vacío; licencia específica de
  redistribución **sin confirmar**. No se deduce una licencia por analogía con IGN.
- [OSRM](https://project-osrm.org/) / [© OpenStreetMap contributors](https://www.openstreetmap.org/copyright)
  (ODbL), datos derivados de enrutamiento.
- [GISCO 2024 / © EuroGeographics](https://ec.europa.eu/eurostat/web/gisco/geodata/administrative-units/countries),
  límites para uso no comercial. El alojamiento no amplía sus derechos de uso.

La galería incluye productos y datos derivados necesarios para el interactivo;
los originales y las capturas completas permanecen en el proyecto privado.
No se atribuye una licencia única a todas las fuentes ni se da por resuelta
la incertidumbre de HERMES por el hecho de estar publicado.

## Reproducir y verificar

```sh
python days/day-04-clusters/render_atlas.py --rebuild
python -m pytest tests/test_ev_atlas.py tests/test_ev_journeys.py tests/test_ev_clusters.py tests/test_ev_explorer.py -q
node days/day-04-clusters/check_atlas.cjs
python days/day-04-clusters/prepare_atlas_publication.py
```

`groups.csv` contiene las 48 agrupaciones; `journey-stops.csv`, las cuatro
paradas intermedias del ejemplo a 250 km. La llegada y su última etapa están
en el JSON y en el interactivo, sin contarse como parada.

Sin `--rebuild`, el render usa `atlas/analysis.json`, ya reconciliado. Reconstruir
requiere el GeoPackage y los contextos archivados. No descarga fuentes ni
solicita nuevas rutas. El render usa las dependencias GIS de `pyproject.toml`;
las pruebas heredadas de clustering requieren las de `requirements.lock.txt`
del día. La preparación de medios añade CairoSVG, Pillow, Playwright/Chromium
y FFmpeg. El HTML es autónomo y funciona sin solicitudes externas.

`qa.json` distingue pruebas ejecutadas, inspección visual y cuestiones sin
verificar; `browser-qa.json` acredita controles reales. No equivalen a aprobación
del autor ni a verificación operativa de las instalaciones.
