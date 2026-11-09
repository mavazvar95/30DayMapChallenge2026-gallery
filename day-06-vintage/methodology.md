# Método y evidencia

## Alcance y mensaje

La edición vigente amplía el trabajo a **25 episodios documentados en 17 lugares (1588–1999)**, del entorno de la Torre a San Cristóbal. El mapa temporal distingue obra/apertura, pérdida/traslado y transformación. La reproducción avanza entre años documentados; el deslizador también permite años intermedios. Cada lugar muestra el último episodio de esta selección hasta el año elegido, no un certificado de su estado físico en esa fecha.

Los cuatro casos originales se conservan en un archivo fotográfico secundario. No se infiere una tasa de pérdida patrimonial ni se evalúa si toda renovación fue positiva o negativa. La continuidad de actividad del mercado y el hotel se distingue de la continuidad arquitectónica; la plaza de toros aporta una comparación entre forma desaparecida y calle actual.

El frente de tierra se localiza mediante un punto de referencia del corredor actual de Juana de Vega, sin dibujar una muralla supuesta. El vuelo de 1956–1957 es posterior al derribo, algo que se advierte tanto en la ficha como en la sección de comparaciones.

## Fuentes espaciales ejecutadas

**Ampliación cronológica:** trece extractos OSM API 0.6 congelados y verificables por SHA-256 comprimido y descomprimido, con URL y fecha en `chronicle-acquisition.json`. Trabajo en EPSG:25829; puntos y polígonos de distribución en WGS84 conforme a RFC 7946. No se asignan edades a los edificios del fondo. Los contornos actuales localizan los lugares; no se convierten en plantas históricas. Los episodios de La Terraza de madera usan un punto, no el contorno del edificio de hormigón.

La costa actual se poligoniza conservando su orientación de origen: OSM sitúa tierra a la izquierda. Se contrastaron visualmente tres posiciones de mar con una consulta PNOA 2023 del mismo BBOX; los edificios sobre pantalanes no se usan para clasificar agua como tierra. La comprobación es de coherencia del contexto actual, no certificación topográfica ni restitución de una costa pasada. Se registran exclusiones de geometrías inválidas y referencias incompletas. Solo se desplazan las etiquetas para evitar choques; las coordenadas de puntos y contornos permanecen fijas.

**Archivo de comparación original:**

1. Descarga de XML de la API oficial OSM con sus nodos y vías; dos recortes, deduplicados por ID de vía. Se extraen edificios de vías cerradas, calles, parques y costa actuales. Las relaciones complejas no se interpretan como edificios completos: el contexto no es un inventario catastral exhaustivo. Se registran geometrías inválidas o referencias ausentes antes de excluirlas; no se reparan silenciosamente.
2. Transformación EPSG:4326 → EPSG:25829 con PyProj. Recorte de las geometrías al BBOX proyectado de las imágenes. Los GeoJSON de distribución se exportan en WGS84 / EPSG:4326 para cumplir RFC 7946; el análisis y el dibujo siguen en EPSG:25829. La costa se usa para dividir el rectángulo de contexto; las regiones con edificios se clasifican como tierra. Es contexto actual derivado, no una reconstrucción de costa histórica.
3. Descarga WMS GetMap de `AMS_1956-1957` y `PNOA2023`, mismo CRS, BBOX, ancho y alto. Se verifican dimensiones y hashes. GetFeatureInfo en el hotel confirma esos dos vuelos y sus resoluciones de 1 y 0,15 m. El render a 2400 × 1971 tiene un paso aproximado de 0,79 m. No aumenta la información histórica disponible.
4. El centro de referencia de hotel y mercado procede de las geometrías actuales OSM; no se traslada su planta a 1956. El centro de la plaza de toros y el borde visible de cubierta se interpretan en píxeles del vuelo antiguo y se convierten a coordenadas del BBOX. Se conservan los vértices originales para revisar la interpretación. No se ajusta un círculo perfecto ni se calculan áreas. Precisión posicional sin certificar.
5. JPG de trabajo y detalles: se conserva la cuadrícula de cada imagen; los recortes entre años usan idénticos índices. No se deforman edificios para que coincidan. La perspectiva y el desplazamiento de cubierta limitan la interpretación a nivel de suelo.

## Cronología y fuentes textuales

Las fuentes, fechas, tipo de episodio y límites por lugar se conservan en `chronicle/catalog.json`, incorporado al HTML sin peticiones remotas. La ampliación utiliza historia municipal de San Antón, San Carlos, Rosalía, Méndez Núñez, Obelisco, San Agustín, Riazor, Domus y Aquarium; BOE para el pabellón trasladado a Sada (1919–1920); Adif para el edificio de San Cristóbal (concluido en 1935); y Soraluce Blond / CSIC para la reconstrucción de la Torre fechada en 1791. Adif fue legible mediante búsqueda web; su descarga directa recibió 403. No se copiaron fotos ni reconstrucciones de esas fuentes. La fuente CSIC se refiere a la reforma, no a la construcción romana. Las distintas fases del teatro (1841, incendio de 1867 y reconstrucción de 1868) permanecen separadas.

Se distingue el inicio de San Antón (1588) de su estado terminado; la inauguración de Méndez Núñez (1868) del proceso de relleno; el inicio de derribo de 1869 de su terminación; y el edificio ferroviario de 1935 de la llegada del ferrocarril. Los cuerpos laterales del mercado conservan la década 1960–1969 como intervalo, sin fabricar un año exacto. La Terraza se trasladó: no se afirma su destrucción. Se muestran 25 episodios, no 25 edificios distintos.

Referencias de los cuatro casos originales:

- **Frente de tierra, inicio del derribo en 1869:** María Rosario Soto Arias, «Garás: Aproximación ao topónimo coruñés», *Cornide* n.º 4, p. 288, [PDF municipal](https://www.coruna.gal/descarga/1453840520283/Revista-Instituto-Cornide-n-4.pdf). Contraste con Carlos Fernández, [«El derribo de las murallas»](https://www.lavozdegalicia.es/noticia/coruna/coruna/2007/11/11/derribo-murallas/0003_6309121.htm), 2007. Fuentes secundarias; no sustituyen un plano arqueológico del trazado.
- **Mercado da Guarda:** [Concello da Coruña](https://www.coruna.gal/mercados/es/mercados/detalle/mercado-municipal-de-eusebio-da-guarda/entidad/1144274727110?argIdioma=es), apertura de 1910, sustitución central a finales de 1958 y cuerpos laterales en los sesenta. Esta distinción institucional evita convertir la fecha 1958, usada como derribo del mercado en algunas síntesis, en un único episodio de todo el edificio. Contraste con Teijeiro Mosquera y Fuentes Valcárcel, [ICOMOS 2025](https://doi.org/10.4995/icomos2025.2025.21013).
- **Plaza de toros:** Doda Vázquez, [«La calle redonda que evidencia las huellas de la antigua plaza de toros»](https://www.elidealgallego.com/articulo/a-coruna/coruna-insolita-calle-redonda-evidencia-huellas-antigua-plaza-toros-5260784), 21/04/2025. Fuente secundaria para apertura de 1885, demolición de 1967 y relación con la curva de Magistrado Manuel Artime. La existencia y transformación del recinto se comprueban en las ortofotos.
- **Hotel Atlantic:** [CIAG, proyecto de investigación USC](https://ciagalicia.com/proxectos/hotel-atlantic-de-a-coruna/), edificio de 1923 derribado en 1967; contraste en [La Voz de Galicia](https://www.lavozdegalicia.es/noticia/coruna/2007/07/10/demolicion-hotel-atlantico/0003_5971628.htm). La web CIAG fue legible mediante búsqueda web; la descarga HTTP local recibió 403. Sus modelos e imágenes no se han reutilizado.

## Dirección de arte y referencias observadas

Se inspeccionó la miniatura oficial del plano de Ferrater y García Sala (1845), [IGN 030353](https://www.ign.es/web/catalogo-cartoteca/resources/html/030353.html): jerarquía de título y leyenda, tintas temáticas y una gran superficie dedicada al territorio. La edición actual combina un título medieval en UnifrakturMaguntia con pergamino texturado y una composición sobria de marco fino, anotaciones discretas y tramas de grabado. La textura SVG es ornamental, con un grano reproducible y sin contenido geográfico. La comparación usa detalles fotográficos rectangulares. El mapa ocupa más espacio; las fotografías, geometrías, CRS y hechos históricos se conservan. No se calca el documento ni se reutilizan retratos o ilustraciones.

El JPG de 1910 enlazado en IGN devolvió 404 en el servidor actual y 503 en el antiguo; la descarga CNIG del plano de 1845 devolvió 503 y Wikimedia 403. Por ello ninguno se usa como cartografía histórica georreferenciada. La miniatura no permite acreditar un trazado preciso de muralla. Se inspeccionaron las dos ortofotos descargadas y las exportaciones reales de esta edición.

La flecha señala norte de cuadrícula. Las tramas gráficas no representan profundidad ni árboles inventariados. Las ortofotos conservan color y geometría originales. UnifrakturMaguntia, Libre Caslon Display, Libre Caslon Text y Manrope se distribuyen con sus licencias OFL.

## QA y límites pendientes

- Ampliación ejecutada: hashes de 13 extractos, geometrías de 17 lugares, CRS y contención, intervalos, orientación de costa y tres controles sobre mar; 25 controles de navegador sobre fechas límite, diferencias entre antes y después del derribo, ausencia de planta inventada para La Terraza, encuadre del centro, escala, separación de etiquetas, teclado y móvil. Los 18 controles del archivo fotográfico siguen separados.
- Ejecutado: controles de validez, referencias, CRS, contención de casos, tamaños, hashes; pruebas del HTML en Chromium de escritorio y móvil, cortinilla, linterna, controles de teclado, escala y ausencia de peticiones externas.
- Inspección visual: lámina, jerarquía, leyendas, comparación y vista móvil. Su registro se conserva con la edición.
- Sin verificar: precisión topográfica independiente, trazado exacto de fortificaciones, fechas de cada cuerpo histórico, levantamiento de fachadas y plantas del hotel/mercado. No se representan como resultados disponibles.
- No calculado: superficies perdidas, alturas históricas, movilidad inducida, tiempos de acceso o efectos causales de los derribos.
- Pendiente para una restitución morfológica completa: trazados contrastados de murallas, contornos de rellenos fechados, fases construidas de ensanches y otros episodios de la ciudad. Los servicios municipales de planos 1934/1963/1967 se identificaron, pero no se han incorporado sin resolver su uso y adecuación. La Carta Histórica de NOSO / Deputación (2022) es una referencia especializada encontrada durante la investigación; no se han copiado su cartografía ni sus reconstrucciones.
- Las pruebas superadas no equivalen a aprobación del autor. La primera edición se entrega para revisión.

## Medios de esta edición

El vídeo se compone de capturas reales de Chromium después de accionar los controles y completar dos cuadros del render. Cada imagen se asocia a su pie en el momento de captura; se conservan índice y duración editorial. Los intervalos no representan tiempos históricos ni resultados de simulación. El MP4 se inspecciona mediante fotogramas extraídos del archivo codificado. El PDF es una exportación ráster de la lámina a 3200 × 4000; el SVG conserva los elementos vectoriales.

El HTML autónomo se comprueba por HTTP bloqueando todas las peticiones secundarias, con imágenes y tipografías incluidas. La política del Chromium gestionado impide probar `file://`; no se afirma haber superado esa comprobación.
