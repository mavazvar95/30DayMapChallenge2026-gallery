# COMPÁS Atlántico · red territorial y servicios de proximidad

Edición revisada el 12/11/2026. Tema oficial: **08 · Utopia**. Una propuesta
exploratoria de servicio ferroviario, no un plan aprobado ni un horario comercial.

## Pregunta y criterio de diseño

¿Cómo articular movilidad cotidiana, conexiones regionales y enlaces de larga
distancia sobre la geografía real de Galicia, manteniendo la continuidad de la
costa cantábrica hacia Asturias?

La red propuesta distingue funciones, no solo colores. C2 conecta A Coruña y
Ferrol **por Betanzos y las vías existentes**, con paradas intermedias. C3 sirve
Vigo–Pontevedra; C4, Santiago–Vilagarcía; C5, Vigo–Guillarei por O Porriño. C1
conserva el corredor métrico Ferrol–Ortigueira. M1 sirve el Eixo Atlántico; M2 el
interior por Lugo; M3 la conexión Avant A Coruña–Ourense; M4 el Miño; M5 Monforte–
Valdeorras y M6 las paradas locales A Coruña–Santiago. R1 mantiene Ferrol–Oviedo.

Estas funciones son hipótesis de planificación. No se ha calculado demanda,
actividad laboral, población captada ni conveniencia económica de las frecuencias.
«Cercanías» indica el servicio propuesto, no una categoría comercial existente.

## Tres escenarios

1. **Publicado:** horarios del 12/11/2026, estaciones seleccionadas. Incluye
   productos MD/LD/AV, regionales métricos y C1. No representa circulación real.
2. **Cadenciado:** conserva toda la oferta anterior y añade patrones de 60 o
   120 minutos. No elimina una conexión publicada para mejorar el promedio.
3. **Proximidad cada 30 minutos:** conserva el patrón anterior e intercala
   expediciones C2–C5 a los 30 minutos. No acelera los trenes ni desplaza las
   salidas existentes del escenario 02.

Los escenarios 02 y 03 cuestan más oferta que la referencia. No se presentan
como una mejora gratuita. La comparación a recursos constantes se limita al
ajuste de fases del escenario 02: los mismos trenes, frecuencias y duraciones
antes y después de buscar mejores enlaces.

## Tiempos y optimización

Los patrones conservan diferencias de llegada y salida de trenes publicados,
identificados en `data.json → lines → template`. Se retienen las paradas del
ámbito que realiza cada tren de referencia. El tiempo entre ellas incluye las
paradas intermedias no mostradas; no se inventan tiempos de marcha más rápidos.
El patrón puede ser asimétrico entre sentidos, como lo es su referencia.

Se buscan fases de salida cada 10 minutos, en dos barridos de descenso por
coordenadas. Objetivo: minimizar el tiempo total, espera inicial incluida, de
48 consultas (12 pares dirigidos, horas 07:00, 10:00, 14:00 y 17:00), todas con
peso uno. Una consulta sin solución recibe una penalización hasta las 30:00.
Esto **no demuestra un óptimo global**, no usa demanda observada y no incorpora
capacidad de vía, andenes, conflictos, disponibilidad de material o costes.

`validation.json` evalúa por separado 168 consultas: siete ciudades, seis
destinos y cuatro horas no usadas en el ajuste (08:15, 11:45, 15:15, 18:45).
Se muestran también empeoramientos y consultas sin solución; no solo mejoras.
No son viajes de personas observadas ni ahorro de horas de viajeros.

El encaminamiento minimiza llegada, después transbordos y, para empates de estado,
tiempo a bordo. Admite hasta tres trenes, con al menos diez minutos para cambiar
en la misma estación. No conecta las dos estaciones de Vigo a pie ni presupone
transbordos entre estaciones distintas. No hay trenes continuos entre anchos
incompatibles. Se aceptan horas GTFS superiores a 24:00; límite de llegada 30:00.
No se cargan nuevas salidas del siguiente día de servicio.

## Geografía y costa

- Estaciones: coordenadas WGS84 del GTFS de Renfe.
- Vías: IGN IGR-RT, capa «Ancho de vía», elementos en servicio dentro de
  `[-9.5, 41.7, -5.4, 43.9]`. Consulta paginada por OBJECTID, total contrastado
  con `returnCountOnly`: 9.375 elementos, sin truncamiento ni IDs duplicados.
- CRS de análisis y representación: **ETRS89 / UTM zona 29N, EPSG:25829**.
  La transformación usa `always_xy=True`; la escala es isótropa en ambos ejes.
- Tierra y límites provinciales: Natural Earth 1:10m, recortados y simplificados
  a 150 m para esta escala. No es cartografía costera de proyecto constructivo.
- Las vías tienen mayor peso y contraste que los límites administrativos.

Las posiciones animadas se interpolan sobre caminos de la red cartográfica,
separando el ancho métrico del resto. Se densifican los segmentos originales a
un máximo de 100 m; los puntos siguen exactamente sus segmentos, no crean vías.
Se unen vértices por redondeo a 1 m y se buscan accesos próximos a cada estación.
Los caminos minimizan longitud cartográfica entre paradas seleccionadas; **no
son surcos certificados ni trazados operativos validados para cada material**.
No se interpreta la velocidad de los símbolos como velocidad real instantánea.
Las horas de las paradas, malla y cálculo de viajes proceden del mismo horario.

Se retiró la recta A Coruña–Ferrol sobre el mar y el objetivo no sustentado de
35 minutos. Ningún escenario depende de ese cruce ni de ese tiempo.

### Cerdedo y Ourense–Vigo

Ourense–Vigo por el Miño se incorpora con tiempos de servicios reales y función
territorial, distinta de la conexión por Santiago. La variante de Cerdedo está
documentada en el [BOE ferroviario de 2010](https://www.boe.es/boe/dias/2010/03/15/pdfs/BOE-A-2010-4359.pdf)
y en la información sobre el estudio complementario de 2025 publicada por
[G24](https://www.g24.gal/-/transportes-adxudica-estudo-informativo-para-a-variante-do-ave-por-cerdedo).

El trazo coral entre O Carballiño y Portela es **un esquema de relación territorial**
entre estaciones de coordenadas verificadas, no una digitalización del eje
proyectado. Se comprueba que queda sobre tierra en la cartografía de contexto.
No se incorpora al cálculo de tiempos ni se afirma que tenga aprobación vigente,
fecha de apertura o solución constructiva. A esta escala, el esquema sirve para
identificar una alternativa de infraestructura sin confundirla con la red actual.

## Indicadores

- Tiempo total desde disponibilidad = espera inicial + tiempo a bordo + enlaces.
- Alcance 60/90/120 minutos: número de las otras 47 estaciones del ámbito
  alcanzables; incluye espera inicial. No mide población ni superficie cubierta.
- Último regreso: última salida modelada que permite regresar antes de las
  01:00. No constituye garantía de viaje comercial.
- Robustez +5/+10: prueba aislada sobre el margen de cada enlace; no propaga
  retrasos por la red ni estima probabilidades de puntualidad.
- Horas-tren: suma de duración de expediciones **propuestas**, solo en el ámbito.
- Flota: suma, para líneas con flotas separadas, de `ceil((ida + vuelta + 30) /
  intervalo)`, suponiendo 15 minutos en cada cabecera. Es una cota de ciclo,
  no un gráfico de material. Excluye reservas, vacíos, mantenimiento y personal.
- No se publican tren-km operativos: la geometría de animación no acredita
  itinerarios explotables y no debe convertirse en kilometraje de producción.

## Fuentes, congelación y licencias

- Renfe MD/LD/AV: `https://ssl.renfe.com/gtransit/Fichero_AV_LD/google_transit.zip`,
  captura 10/11/2026, CC BY 4.0, SHA256 original verificado por `analyze.load_feed`.
- Renfe Cercanías: `https://ssl.renfe.com/ftransit/Fichero_CER_FOMENTO/fomento_transit.zip`,
  captura 11/11/2026, CC BY 4.0 según catálogo de datos abiertos Renfe.
- Renfe RAM: consulta pública `/ServiciosWebHorarios/Service.asmx/GetTrenesFecha`
  para 12/11/2026, contrastada con GTFS. **Prevalece GTFS**: hay discrepancias de
  algunos minutos de parada y no se suman ambas fuentes como trenes diferentes.
  Las respuestas RAM no se redistribuyen en la galería; la licencia específica
  del endpoint no se ha verificado. Los datos publicados del modelo son GTFS.
- IGN: `https://serviciosgis.ign.es/servicios/rest/services/RT/igr_rt_ferrocarril/MapServer/4`,
  captura 11/11/2026, condiciones de reutilización IGN, CC BY 4.0.
- Natural Earth: `ne_10m_admin_1_states_provinces`, captura 11/11/2026,
  dominio público. Coordenadas originales EPSG:4326.

`sources-manifest.json` conserva tamaños y hashes. Los feeds cambian diariamente:
una descarga actual no reproduce por sí sola la fotografía congelada. Conservar
los originales locales. El JSON publicado permite reproducir las consultas de
esta edición sin acceder a endpoints vivos.

## Reproducción y estado

Entorno utilizado: Python 3.12, pyproj, Shapely, SciPy; Chromium y Playwright para
verificación y exportación; FFmpeg para codificar la grabación del HTML.

```sh
python days/day-08-utopia/v2/build.py
python days/day-08-utopia/v2/evaluate.py
python -m unittest discover -s days/day-08-utopia/v2 -p test_model.py -v
python -m http.server 8088 --directory .
node days/day-08-utopia/v2/check.cjs
```

Ejecutado: integridad ZIP, calendario y zona horaria; monotonicidad de horarios;
recuento/IDs de IGN; caminos disponibles; control terrestre del esquema de
Cerdedo; pruebas de transbordos y conservación de tiempos; pruebas de navegador.
Inspección visual: composición, costa, jerarquía de vías y límites, tamaños de
pantalla y exportaciones. No comprobado: capacidad ni viabilidad operativa,
demanda, costes, proyecto constructivo, accesibilidad de todas las estaciones,
compatibilidad del material con todas las rutas. El estado es **propuesta
exploratoria revisable**, no aprobación profesional de explotación.

Detalle cartográfico de Betanzos: se descargaron adicionalmente 24 elementos
IGN sin simplificación en el entorno de la estación. Para la animación se
incluyen allí las geometrías oficiales de playa de vías, cuyo atributo de ancho
es «No aplicable», junto a las líneas ibéricas. No se aplica esta excepción a
Ferrol ni a la red métrica y no se dibuja ningún empalme sintético. Es un ajuste
del grafo cartográfico, no validación de aparatos de vía ni itinerarios reales.
