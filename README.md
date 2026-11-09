# 30DayMapChallenge2026 · galería

Autor: Miguel Ángel Vázquez Varela.

## Día 03 · Polygons

- [Abrir atlas interactivo](https://mavazvar95.github.io/30DayMapChallenge2026-gallery/): geometrías y datos incluidos, sin servicios externos.
- [Demostración del HTML · MP4 de 50 segundos](https://mavazvar95.github.io/30DayMapChallenge2026-gallery/atlas-demo.mp4).
- [Captura 1 · comparación](day-03-polygons/01-comparacion.png).
- [Captura 2 · selección y zoom](day-03-polygons/02-seleccion-y-zoom.png).

Ventanas exploratorias de Barcelona; no describen barrios completos ni acceso público. Fuentes: Ajuntament de Barcelona (CartoBCN, 31/10/2026) y Dirección General del Catastro (21/08/2026). La condición específica municipal sigue documentada como pendiente en el proyecto de trabajo; alojar los archivos no constituye una validación de licencias.

## Día 01 · Points

- [Barcelona, árbol a árbol · imagen para LinkedIn](day-01-points/barcelona-arboles-linkedin-night.jpg), 3200 × 3600 px, menos de 5 MB.
- [Lámina en papel · JPG para LinkedIn](day-01-points/barcelona-arboles-linkedin-paper.jpg).
- [Lámina nocturna · PDF vectorial de 32,8 MB](day-01-points/barcelona-arboles-detalle-night.pdf), para consultar y ampliar.

Fuentes: Ajuntament de Barcelona, ICGC y OpenStreetMap; atribuciones completas en la lámina. Variante pública sin el inventario municipal restringido de L’Hospitalet.

## Día 04 · Clusters — Los núcleos de la recarga

- [Explorar el atlas nacional](https://mavazvar95.github.io/30DayMapChallenge2026-gallery/day-04-clusters/).
- [Lámina para LinkedIn](day-04-clusters/04-clusters-linkedin.jpg), 3200 × 4000 px.
- [Demostración real del HTML · MP4](day-04-clusters/04-clusters-demo.mp4), 30 segundos.
- [PDF vectorial](day-04-clusters/04-clusters.pdf) y [texto del post](day-04-clusters/post-linkedin.md).
- [Agrupaciones CSV](day-04-clusters/groups.csv), [paradas del ejemplo](day-04-clusters/journey-stops.csv)
  y [datos del atlas](day-04-clusters/analysis.json).
- [Método y límites](day-04-clusters/methodology.md).
- Antecedentes: [modelo vial de tres corredores](day-04-clusters/journeys/)
  e [inventario descriptivo](day-04-clusters/inventory.html).

De 1.091 instalaciones ≥150 kW de la captura, 553 forman 48 agrupaciones por
proximidad y 538 quedan fuera. Las cuatro paradas de una cadena A Coruña–Almería
con 250 km útiles están fuera de esas agrupaciones. **Concentración local y
continuidad de un viaje miden cosas distintas.** El interactivo permite explorar
los grupos y cambiar el escenario vial sin redefinir la clasificación geográfica.

Es una cadena teórica dentro de los candidatos del modelo, no la única posible.
No se certifican acceso, operatividad, ocupación ni tiempos de carga. Una cadena
no encontrada no prueba ausencia de recarga. No se acredita cobertura nacional
ni se explica la adopción del vehículo eléctrico.

Fuentes: MITECO (consulta 04/11/2026); OSRM / © OpenStreetMap contributors (ODbL,
datos derivados de enrutamiento); HERMES / Ministerio de Transportes (contexto
oficial tipificado); GISCO 2024 / © EuroGeographics (uso no comercial). No se
asigna una licencia única a todas las fuentes. HERMES no confirma licencia
específica en sus metadatos; se conserva esa incertidumbre en la documentación.

## Procedencia

Análisis y cartografía realizados con Python/GIS. Solo se incluyen los productos de publicación: no hay datasets originales, entornos virtuales ni historial del repositorio de trabajo TEST.

## Hosting

Publicado en https://mavazvar95.github.io/30DayMapChallenge2026-gallery/ mediante GitHub Pages, desde main y /(root). Esta galería es una publicación estática de los archivos, no una cesión de derechos sobre las fuentes ni una licencia única para todos los contenidos.
