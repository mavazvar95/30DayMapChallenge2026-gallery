'use strict';
(async function () {
  const languages = ['es', 'gl', 'en'];
  const query = new URLSearchParams(location.search);
  let language = languages.includes(query.get('lang')) ? query.get('lang') : 'es';
  const dictionary = await (await fetch('translations.json?v=2')).json();
  const entries = Object.entries(dictionary).sort((a,b) => b[0].length-a[0].length);
  const remembered = new WeakMap();
  const attributes = new WeakMap();
  const fragments = {
    'en': [
      [/\bLlegada\b/g,'Arrival'],[/\btransbordos\b/g,'transfers'],[/\btransbordo\b/g,'transfer'],
      [/\bEspera\b/g,'Wait'],[/\bTren\b/g,'Train'],[/\bEnlaces\b/g,'Transfers'],
      [/\bAntes\b/g,'Before'],[/\bAhora\b/g,'Now'],[/\bLlegas\b/g,'You arrive'],[/\bsales\b/g,'leave'],
      [/\bmin para cambiar de tren\b/g,'min to change trains'],[/\bmin mínimos\b/g,'min minimum'],
      [/\bmin de holgura\b/g,'min buffer'],[/Con 10 min de retraso:/g,'With a 10 min delay:'],
      [/\bse conserva el margen mínimo\b/g,'the minimum buffer remains'],[/\bse pierde el margen mínimo\b/g,'the minimum buffer is lost'],
      [/\bSin cálculo ferroviario\b/g,'No rail calculation'],[/\bsin cálculo ferroviario\b/g,'no rail calculation'],
      [/\bestimación\b/g,'estimate'],[/\bEstación\b/g,'Station'],[/\bkm en este tramo\b/g,'km on this section'],
      [/\bmin con límite 200 km\/h\b/g,'min at a 200 km/h cap'],[/\bmin a 200 km\/h\b/g,'min at 200 km/h'],
      [/Radio mínimo comprobado del núcleo:/g,'Checked minimum radius of new core:'],
      [/\bComparando\b/g,'Comparing'],[/\bservicios representados\b/g,'services shown'],
      [/\bArrastra para desplazarte; usa \+\/− o la rueda para ampliar\. No se animan los tramos sin geometría enlazada\./g,'Drag to pan; use +/− or the wheel to zoom. Sections without linked geometry are not animated.'],
      [/\bacceso reutilizado\b/g,'reused approach'],[/\btramo nuevo propuesto\b/g,'proposed new section'],
      [/\belectrificación:\b/g,'electrification:'],[/\bcondicionado a obras\b/g,'subject to works'],
      [/\bservicio propuesto\b/g,'proposed service'],[/\bNo se presenta como proyecto oficial\b/g,'This is not an official project'],
      [/\bSe adopta un ajuste de salidas\b/g,'Departure phases are adjusted'],[/\bSe usaron\b/g,'The analysis used'],
      [/\bconsultas para ajustar\b/g,'queries for fitting'],[/\bcon otras horas para comprobar\b/g,'at other times for checking'],
      [/\bmejoran y\b/g,'improve and'],[/\bempeoran; cambio de la suma:\b/g,'worsen; total change:'],
      [/\bminutos menos\b/g,'minutes less'],[/\bNo demuestra un óptimo global\b/g,'This does not show a global optimum'],
      [/\b(\d+) min estimados en el escenario\b/g,'$1 min estimated in the scenario'],[/\bpor el Miño\b/g,'via the Miño'],[/\bsin transbordo\b/g,'without transfers'],[/\bMarcha estimada\b/g,'Estimated running time'],[/\bobras necesarias\b/g,'works needed']
    ],
    'gl': [
      [/\bLlegada\b/g,'Chegada'],[/\btransbordos\b/g,'transbordos'],[/\bEspera\b/g,'Espera'],
      [/\bRango:/g,'Sensibilidade:'],
      [/\bTren\b/g,'Tren'],[/\bEnlaces\b/g,'Enlaces'],[/\bAntes\b/g,'Antes'],
      [/\bLlegas\b/g,'Chegas'],[/\bsales\b/g,'saes'],[/\bmin para cambiar de tren\b/g,'min para cambiar de tren'],
      [/\bmin mínimos\b/g,'min mínimos'],[/\bmin de holgura\b/g,'min de marxe'],
      [/Con 10 min de retraso:/g,'Cun atraso de 10 min:'],[/\bse conserva el margen mínimo\b/g,'mantense a marxe mínima'],
      [/\bse pierde el margen mínimo\b/g,'pérdese a marxe mínima'],[/\bsin cálculo ferroviario\b/g,'sen cálculo ferroviario'],
      [/\bestimación\b/g,'estimación'],[/\bkm en este tramo\b/g,'km neste treito'],
      [/\bmin con límite 200 km\/h\b/g,'min cun límite de 200 km/h'],[/\bmin a 200 km\/h\b/g,'min a 200 km/h'],
      [/Radio mínimo comprobado del núcleo:/g,'Radio mínimo comprobado do núcleo:'],
      [/\bComparando\b/g,'Comparando'],[/\bservicios representados\b/g,'servizos representados'],
      [/\bArrastra para desplazarte; usa \+\/− o la rueda para ampliar\. No se animan los tramos sin geometría enlazada\./g,'Arrastra para desprazarte; usa +/− ou a roda para ampliar. Non se animan os treitos sen xeometría enlazada.'],
      [/\bacceso reutilizado\b/g,'acceso reutilizado'],[/\btramo nuevo propuesto\b/g,'treito novo proposto'],
      [/\belectrificación:\b/g,'electrificación:'],[/\bcondicionado a obras\b/g,'condicionado a obras'],
      [/\bservicio propuesto\b/g,'servizo proposto'],[/\bSe adopta un ajuste de salidas\b/g,'Adóptase un axuste de saídas'],
      [/\bSe usaron\b/g,'Usáronse'],[/\bconsultas para ajustar\b/g,'consultas para axustar'],
      [/\bcon otras horas para comprobar\b/g,'con outras horas para comprobar'],[/\bmejoran y\b/g,'melloran e'],
      [/\bempeoran; cambio de la suma:\b/g,'empeoran; cambio da suma:'],[/\bminutos menos\b/g,'minutos menos'],
      [/\b(\d+) min estimados en el escenario\b/g,'$1 min estimados no escenario'],[/\bpor el Miño\b/g,'polo Miño'],[/\bpor Lugo\b/g,'por Lugo'],[/\bsin transbordo\b/g,'sen transbordo'],[/\bNo demuestra un óptimo global\b/g,'Non demostra un óptimo global']
    ]
  };
  function translate(source) {
    if (language === 'es') return source;
    const trimmed = source.trim();
    let result = dictionary[trimmed]?.[language];
    if (result === undefined) {
      result = trimmed;
      for (const [span, translations] of entries) {
        if (span.length < 10 || !result.includes(span)) continue;
        result = result.replaceAll(span, translations[language]);
      }
      for (const [pattern, replacement] of fragments[language]) result = result.replace(pattern,replacement);
    }
    return source.slice(0,source.indexOf(trimmed)) + result + source.slice(source.indexOf(trimmed)+trimmed.length);
  }
  function translateText(node) {
    const current = node.nodeValue;
    if (!current.trim() || node.parentElement?.closest('script,style')) return;
    let state = remembered.get(node);
    if (!state || current !== state.rendered) state = {source: current, rendered: current};
    const next = translate(state.source);
    remembered.set(node,{source:state.source,rendered:next});
    if (next !== current) node.nodeValue = next;
  }
  function translateAttribute(element, attr) {
    if (!element.hasAttribute(attr)) return;
    const current = element.getAttribute(attr);
    const state = attributes.get(element) || {};
    let item = state[attr];
    if (!item || current !== item.rendered) item = {source:current,rendered:current};
    const next = translate(item.source);
    state[attr] = {source:item.source,rendered:next};
    attributes.set(element,state);
    if (next !== current) element.setAttribute(attr,next);
  }
  function visit(root) {
    if (root.nodeType === Node.TEXT_NODE) {translateText(root);return;}
    if (root.nodeType !== Node.ELEMENT_NODE) return;
    for (const attr of ['aria-label','title','alt']) translateAttribute(root,attr);
    const walker = document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) translateText(walker.currentNode);
    for (const element of root.querySelectorAll('[aria-label],[title],[alt]'))
      for (const attr of ['aria-label','title','alt']) translateAttribute(element,attr);
  }
  function setLanguage(next) {
    language = next;
    document.documentElement.lang = next;
    document.querySelector('#language').value = next;
    const url = new URL(location.href);
    if (next === 'es') url.searchParams.delete('lang'); else url.searchParams.set('lang',next);
    history.replaceState(null,'',url);
    visit(document.documentElement);
  }
  const observer = new MutationObserver(changes => {
    for (const change of changes) {
      if (change.type === 'characterData') visit(change.target);
      else if (change.type === 'attributes') translateAttribute(change.target,change.attributeName);
      else for (const child of change.addedNodes) visit(child);
    }
  });
  observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','alt']});
  document.querySelector('#language').addEventListener('change',event=>setLanguage(event.target.value));
  setLanguage(language);
  window.atlasI18n = {setLanguage,get language(){return language},translate};
})();
