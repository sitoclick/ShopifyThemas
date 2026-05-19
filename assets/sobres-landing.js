/* =====================================================
   LONCHEADOS · Monjamón y Más
   - Productos agrupados por familia (variantes de corte)
   - Velas para sabor (1=Suave, 2=Aromático, 3=Intenso, 4=Intenso+)
   - Filtros simplificados (Calidad, Alimentación, Sabor, Meses incl. +6)
   - Contador inline (- N +) en cada producto/variante
   ===================================================== */

// ---------- Diccionarios ----------
const CALIDAD = {
  esencial: { label: 'Esencial', icon: window.SOBRES_ASSETS['esencial'] },
  gourmet:  { label: 'Gourmet',  icon: window.SOBRES_ASSETS['gourmet'] },
  premium:  { label: 'Premium',  icon: window.SOBRES_ASSETS['premium'] },
};
const ALIM = {
  pienso:  { label: 'Piensos y Cereales', icon: window.SOBRES_ASSETS['alim-pienso'] },
  bellota: { label: 'Bellota',            icon: window.SOBRES_ASSETS['alim-bellota'] },
};
const SABOR = {
  suave:          { label: 'Suave',     velas: 1 },
  aromatico:      { label: 'Aromático', velas: 2 },
  intenso:        { label: 'Intenso',   velas: 3 },
  'intenso-plus': { label: 'Intenso+',  velas: 4 },
};
const MESES = {
  6:  { label: '+6 meses',  icon: window.SOBRES_ASSETS['meses-30'] },
  30: { label: '+30 meses', icon: window.SOBRES_ASSETS['meses-30'] },
  40: { label: '+40 meses', icon: window.SOBRES_ASSETS['meses-42'] },
  50: { label: '+50 meses', icon: window.SOBRES_ASSETS['meses-50'] },
  24: { label: '+24 meses', icon: window.SOBRES_ASSETS['meses-30'], noFilter: true },
};
const CORTE = {
  maquina:  { label: 'A máquina',  icon: window.SOBRES_ASSETS['corte-maquina'] },
  cuchillo: { label: 'A cuchillo', icon: window.SOBRES_ASSETS['corte-cuchillo'] },
};
const FLAG = {
  top:     { label: 'TOP VENTAS',  icon: window.SOBRES_ASSETS['top'] },
  vendido: { label: 'MÁS VENDIDO', icon: window.SOBRES_ASSETS['mas-vendido'] },
  novedad: { label: 'NUEVO',       icon: window.SOBRES_ASSETS['novedad'] },
  oferta:  { label: 'OFERTA',      icon: window.SOBRES_ASSETS['oferta'] },
  regalo:  { label: 'PARA REGALAR',icon: window.SOBRES_ASSETS['regalo'] },
};

// ---------- Catálogo ----------
const PRODUCTS = [
  {
    id: 'sacro-puntas',
    name: 'Sacro Puntas de Monjamón',
    sub: 'Taquitos · Calidad 100% Ibérica',
    icon: window.SOBRES_ASSETS['jamon-bellota'],
    cat: 'jamon', flag: 'novedad',
    weight: '80 g/ud',
    calidad: 'gourmet', alimentacion: 'bellota', sabor: 'intenso', meses: 30, cut: 'cuchillo',
    price: 7.50,
    shopifyHandle: 'sacro-puntas-monjamon',
    shopifyId: 6549905342545,
    pros: ['Taquitos cargados de sabor', 'Nuevo formato 100% Ibérico', 'Placer divino'],
    desc: 'Las Sacro Puntas de Monjamón son taquitos de jamón ibérico cargados de sabor. Cada bocado es un placer divino que elevará cualquier aperitivo. Nuevo formato, calidad 100% Ibérica.',
  },
  {
    id: 'gr-36',
    name: 'Jamón Gran Reserva',
    sub: '+36 meses · Esencial · Fuera de norma',
    icon: window.SOBRES_ASSETS['gran-reserva'],
    cat: 'jamon',
    weight: '80 g/ud',
    calidad: 'esencial', alimentacion: 'pienso', sabor: 'suave', meses: 30,
    variants: [
      { key: 'maquina',  price: 8.00, shopifyHandle: 'sobres-gran-reserva-fetas',    shopifyId: 8721620894041 },
      { key: 'cuchillo', price: 8.50, shopifyHandle: 'sobres-gran-reserva-cuchillo', shopifyId: 15116882248025 },
    ],
    pros: ['Fuera de la norma ibérica', 'Criado en libertad', 'Piensos y pastos naturales'],
    desc: 'Al ser un jamón fuera de la norma del ibérico, a hábito descubierto, ¡aquí la calidad la marcamos nosotros! El jamón que recomendamos a todos los fieles: fuera de norma con nuestros estándares de calidad, mejor precio imposible. WIN-WIN de manual que mejora el cebo de campo del mercado. Criado en libertad y alimentado de los mejores piensos y pastos.',
  },
  {
    id: 'bel-36-arom',
    name: 'Jamón Bellota 100% +36m',
    sub: 'Aromático · solo a máquina',
    icon: window.SOBRES_ASSETS['jamon-bellota'],
    cat: 'jamon', flag: 'vendido',
    weight: '80 g/ud',
    calidad: 'gourmet', alimentacion: 'bellota', sabor: 'aromatico', meses: 30, cut: 'maquina',
    price: 8.50,
    shopifyHandle: 'sobre-80gr-jamon-de-bellota-100-iberico-36-meses-a-maquina',
    shopifyId: 16215045669209,
    pros: ['100% Ibérico Bellota', 'Aroma a dehesa', 'Equilibrado'],
    desc: 'Jamón de Bellota 100% Ibérico curado +36 meses. Sabor aromático y equilibrado, perfecto para iniciarse en el sabor del bellota. Loncheado fino a máquina.',
  },
  {
    id: 'bel-42-int',
    name: 'Jamón Bellota 100% +42m',
    sub: '★ Producto del Año 2025 · Superior Taste ★★★',
    icon: window.SOBRES_ASSETS['jamon-bellota'],
    cat: 'jamon', flag: 'top',
    weight: '80 g/ud',
    calidad: 'gourmet', alimentacion: 'bellota', sabor: 'intenso', meses: 40,
    variants: [
      { key: 'maquina',  price: 10.00, shopifyHandle: 'sobres-jamon-monjamon-bellota-100-fetas',    shopifyId: 15113115533657 },
      { key: 'cuchillo', price: 12.00, shopifyHandle: 'sobres-jamon-monjamon-bellota-100-cuchillo', shopifyId: 14926720401753 },
    ],
    pros: ['Cerdos viejos en libertad', 'Curación tradicional +42m', 'Superior Taste Awards ★★★'],
    desc: '¡ELEGIDO PRODUCTO DEL AÑO 2025! El elegido entre los elegidos, el único y verdadero Monjamón. Si quieres alcanzar la plenitud, nuestro Monjamón liberará en ti todas las buenas sensaciones que te llevarán directo al paraíso. Cerdos viejos en libertad alimentados a base de bellotas. Salado y curación tradicional +42 meses. Producto galardonado Superior Taste Awards ★★★.',
  },
  {
    id: 'sagrada-paleta',
    name: 'Sagrada Paleta',
    sub: '★ Producto del Año 2025 · Edición limitada',
    icon: window.SOBRES_ASSETS['paleta'],
    cat: 'paleta', flag: 'top',
    weight: '80 g/ud',
    calidad: 'gourmet', alimentacion: 'bellota', sabor: 'intenso-plus', meses: 30,
    variants: [
      { key: 'maquina',  price: 9.90,  meses: 24, soldout: true, shopifyHandle: 'sobre-sagrada-paleta-fetas',   shopifyId: 15112668479833 },
      { key: 'cuchillo', price: 12.50, meses: 30, shopifyHandle: 'sobres-sagrada-paleta-cuchillo', shopifyId: 15112723431769 },
    ],
    pros: ['Producto muy limitado', 'Sabor más fuerte que el jamón', 'Superior Taste Awards ★★★'],
    desc: '¡ELEGIDO PRODUCTO DEL AÑO 2025! Nuestra Sagrada Paleta es un producto muy limitado que cada año se agota. Conserva un sabor exclusivo digno de aquellos que quieran transformar sus aperitivos y descubrir un placer sin igual. Cerdos viejos en libertad alimentados a base de bellotas. Salado y curación tradicional +30 meses. Sabor más fuerte que el jamón. Producto galardonado Superior Taste Awards ★★★.',
  },
  {
    id: 'pasion-50',
    name: 'Monjamón Pasión +50m',
    sub: 'Premium · Sin precinto · Oleico ~60%',
    icon: window.SOBRES_ASSETS['pasion'],
    cat: 'jamon', flag: 'top',
    weight: '80 g/ud',
    calidad: 'premium', alimentacion: 'bellota', sabor: 'intenso-plus', meses: 50, cut: 'cuchillo',
    price: 15.00,
    shopifyHandle: 'sobres-monjamon-pasion-cuchillo',
    shopifyId: 15116854755673,
    pros: ['Sin precinto: calidad superior', 'Cerdos +2 años en libertad', 'Oleico cerca del 60%'],
    desc: 'Jamón fuera de la norma del ibérico, a hábito descubierto. No lleva precinto: su calidad es más alta que la que otorga cualquiera de ellos. Cerdos de más de dos años, viejos y en libertad, alimentados de manera natural y tradicional. Salado y curación tradicional (+50 meses). Ácidos Oleicos cercanos al 60%.',
  },
  // ----- Embutidos -----
  {
    id: 'choricielo',
    name: 'Choricielo',
    sub: 'Chorizo de Bellota 100% Ibérico',
    icon: window.SOBRES_ASSETS['choricielo'],
    cat: 'embutido', flag: 'novedad',
    weight: '50 g/ud',
    calidad: 'gourmet', alimentacion: 'bellota', sabor: 'intenso-plus', meses: 6, cut: 'maquina',
    price: 6.90,
    shopifyHandle: 'sobre-choricielo',
    shopifyId: 15112615166297,
    pros: ['Pimentón ahumado', '100% Ibérico Bellota', 'Sabor intenso+'],
    desc: 'Chorizo de Bellota 100% Ibérico con pimentón ahumado natural. Curación 6 meses en bodega.',
  },
  {
    id: 'san-chichon',
    name: 'San Chichón',
    sub: 'Salchichón de Bellota 100% Ibérico',
    icon: window.SOBRES_ASSETS['salchichon'],
    cat: 'embutido', flag: 'novedad',
    weight: '50 g/ud',
    calidad: 'gourmet', alimentacion: 'bellota', sabor: 'aromatico', meses: 6, cut: 'maquina',
    price: 6.50,
    shopifyHandle: 'sobre-san-chichon',
    shopifyId: 15112627945817,
    pros: ['Pimienta natural', '100% Ibérico Bellota', 'Sabor aromático'],
    desc: 'Salchichón de Bellota 100% Ibérico con pimienta natural en grano. Curación 6 meses.',
  },
  {
    id: 'lomonasterio',
    name: 'Lomonasterio',
    sub: 'Lomo de Bellota 100% Ibérico',
    icon: window.SOBRES_ASSETS['lomonasterio'],
    cat: 'embutido',
    weight: '50 g/ud',
    calidad: 'gourmet', alimentacion: 'bellota', sabor: 'intenso', meses: 6, cut: 'maquina',
    price: 8.50,
    shopifyHandle: 'sobre-lomonasterio',
    shopifyId: 15112623227225,
    pros: ['Embuchado tradicional', '100% Ibérico Bellota', 'Sabor intenso'],
    desc: 'Lomo embuchado de Bellota 100% Ibérico, especiado al estilo tradicional.',
  },
  {
    id: 'divina-coppa',
    name: 'Divina Coppa',
    sub: 'Coppa de Bellota 100% Ibérica',
    icon: window.SOBRES_ASSETS['lomonasterio'],
    cat: 'embutido',
    weight: '50 g/ud',
    calidad: 'gourmet', alimentacion: 'bellota', sabor: 'suave', meses: 6, cut: 'maquina',
    price: 9.20,
    shopifyHandle: 'sobre-divina-coppa-de-bellota-100-iberica',
    shopifyId: 15112646525273,
    pros: ['Cabezada de lomo', '100% Ibérico Bellota', 'Sabor suave'],
    desc: 'Coppa elaborada con la cabezada del cerdo 100% Ibérico de Bellota. Sabor suave y equilibrado.',
  },
];

// ---------- Estado ----------
const state = {
  cat: 'all',
  q: '',
  filters: {
    calidad: new Set(),
    alimentacion: new Set(),
    sabor: new Set(),
    meses: new Set(),
  },
  cart: new Map(),
  sheetId: null,
  sheetVariant: null,
  sheetQty: 1,
  showFilters: false,
};

// ---------- Refs ----------
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const refs = {
  chips: $('#chips'),
  list: $('#list'),
  resultCount: $('#resultCount'),
  emptyState: $('#emptyState'),
  emptyReset: $('#emptyReset'),
  searchInput: $('#searchInput'),
  searchClear: $('#searchClear'),
  cartCTA: $('#cartCTA'),
  cartCount: $('#cartCount'),
  cartLabel: $('#cartLabel'),
  sheet: $('#sheet'),
  sheetBody: $('#sheetBody'),
  sheetQty: $('#sheetQty'),
  sheetAdd: $('#sheetAdd'),
  sheetTotal: $('#sheetTotal'),
  filterToggle: $('#filterToggle'),
  filterPanel: $('#filterPanel'),
  filterCount: $('#filterCount'),
  filterClear: $('#filterClear'),
  filterApply: $('#filterApply'),
};

const fmt = n => n.toFixed(2).replace('.', ',') + ' €';

// ---------- Carrito ----------
function cartKey(id, vKey) { return vKey ? `${id}:${vKey}` : id; }
function getCartQty(id, vKey) { return state.cart.get(cartKey(id, vKey))?.qty || 0; }

// ---------- Velas ----------
function velasHTML(n) {
  let h = '<span class="velas">';
  for (let i = 0; i < 4; i++) {
    h += `<img src="${window.SOBRES_ASSETS['vela']}" alt="" class="vela ${i < n ? 'on' : 'off'}" />`;
  }
  return h + '</span>';
}

// ---------- Filtros ----------
function activeFiltersCount() {
  return Object.values(state.filters).reduce((s, x) => s + x.size, 0);
}
function passesFilters(p) {
  for (const dim of ['calidad', 'alimentacion', 'sabor', 'meses']) {
    const sel = state.filters[dim];
    if (sel.size === 0) continue;
    if (!sel.has(String(p[dim]))) return false;
  }
  return true;
}

// ---------- Control de compra (botón + o contador - N +) ----------
function buyControlHTML(id, vKey, price) {
  const qty = getCartQty(id, vKey);
  const dataV = vKey ? `data-v="${vKey}"` : '';
  if (qty === 0) {
    return `<button class="qtyc qtyc--add" data-buy="add" data-id="${id}" ${dataV} aria-label="Añadir">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
    </button>`;
  }
  return `<span class="qtyc qtyc--count">
    <button class="qtyc__minus" data-buy="sub" data-id="${id}" ${dataV} aria-label="Quitar">−</button>
    <span class="qtyc__num">${qty}</span>
    <button class="qtyc__plus" data-buy="add" data-id="${id}" ${dataV} aria-label="Añadir">+</button>
  </span>`;
}

// ---------- Render ----------
function rowHTML(p) {
  const flag = p.flag && FLAG[p.flag]
    ? `<span class="row__flag"><img src="${FLAG[p.flag].icon}" alt=""><span>${FLAG[p.flag].label}</span></span>`
    : '';
  const calidadTag = `<span class="tag tag--calidad tag--calidad--${p.calidad}"><img src="${CALIDAD[p.calidad].icon}" alt=""> ${CALIDAD[p.calidad].label}</span>`;
  const alimTag    = `<span class="tag"><img src="${ALIM[p.alimentacion].icon}" alt=""> ${ALIM[p.alimentacion].label}</span>`;
  const mesesTag   = `<span class="tag"><img src="${MESES[p.meses].icon}" alt=""> ${MESES[p.meses].label}</span>`;
  const saborTag   = `<span class="tag tag--sabor">${velasHTML(SABOR[p.sabor].velas)} <span>${SABOR[p.sabor].label}</span></span>`;

  let buyBlock;
  if (p.variants) {
    buyBlock = `
      <div class="row__variants">
        ${p.variants.map(v => `
          <div class="vbtn ${v.soldout ? 'is-soldout' : ''}" data-vbtn="${p.id}:${v.key}">
            <span class="vbtn__head">
              <img src="${CORTE[v.key].icon}" alt="">
              <span class="vbtn__label">${CORTE[v.key].label}</span>
              ${v.soldout ? '<span class="vbtn__sold">Agotado</span>' : ''}
            </span>
            <span class="vbtn__foot">
              <strong>${fmt(v.price)}</strong>
              ${v.soldout ? '<span class="vbtn__disabled">—</span>' : `<span class="vbtn__action" data-buy-wrap="${p.id}:${v.key}">${buyControlHTML(p.id, v.key, v.price)}</span>`}
            </span>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    const corteIcon = p.cut ? `<img src="${CORTE[p.cut].icon}" alt=""> ${CORTE[p.cut].label}` : '';
    buyBlock = `
      <div class="row__single">
        <span class="row__corte">${corteIcon}</span>
        <span class="row__price">${fmt(p.price)}</span>
        <span class="vbtn__action" data-buy-wrap="${p.id}:">${buyControlHTML(p.id, null, p.price)}</span>
      </div>
    `;
  }

  return `
    <article class="row" data-id="${p.id}" tabindex="0">
      <div class="row__top">
        <div class="row__icon"><img src="${p.icon}" alt="${p.name}" /></div>
        <div class="row__info">
          ${flag}
          <h3 class="row__name">${p.name}</h3>
          <p class="row__sub">${p.sub}</p>
          <p class="row__meta"><span class="meta__weight">${p.weight}</span><span class="meta__sep">·</span><span class="meta__promesa">☘ Natural · ♻ Sostenible · ★ Cashback</span></p>
        </div>
      </div>
      <div class="row__tags">
        ${calidadTag}
        ${alimTag}
        ${mesesTag}
        ${saborTag}
      </div>
      ${buyBlock}
    </article>
  `;
}

function render() {
  const q = state.q.trim().toLowerCase();
  let list = PRODUCTS;
  if (state.cat !== 'all') list = list.filter(p => p.cat === state.cat);
  list = list.filter(passesFilters);
  if (q) list = list.filter(p => (p.name + ' ' + p.sub + ' ' + p.pros.join(' ')).toLowerCase().includes(q));
  refs.list.innerHTML = list.map(rowHTML).join('');
  refs.resultCount.textContent = `${list.length} producto${list.length === 1 ? '' : 's'}`;
  refs.emptyState.hidden = list.length > 0;
}

// Actualiza solo el control de compra de un producto/variante sin re-renderizar toda la lista
function refreshBuyControl(id, vKey) {
  const key = vKey ? `${id}:${vKey}` : `${id}:`;
  $$(`[data-buy-wrap="${key}"]`).forEach(el => {
    const p = PRODUCTS.find(x => x.id === id);
    const price = vKey ? p.variants.find(v => v.key === vKey).price : p.price;
    el.innerHTML = buyControlHTML(id, vKey, price);
  });
}

// ---------- Cart ----------
function totalCart() {
  let qty = 0, eur = 0;
  for (const item of state.cart.values()) { qty += item.qty; eur += item.qty * item.price; }
  return { qty, eur };
}
function refreshCart() {
  const { qty, eur } = totalCart();
  refs.cartCount.textContent = qty;
  refs.cartLabel.textContent = `${qty} sobre${qty === 1 ? '' : 's'} · ${fmt(eur)}`;
  refs.cartCTA.hidden = qty === 0;
}
function modifyCart(id, vKey, delta) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  let price, label, sId, sHandle;
  if (p.variants) {
    const v = p.variants.find(x => x.key === vKey);
    if (!v || v.soldout) return;
    price = v.price; sId = v.shopifyId; sHandle = v.shopifyHandle;
    label = `${p.name} (${CORTE[vKey].label})`;
  } else {
    price = p.price; sId = p.shopifyId; sHandle = p.shopifyHandle;
    label = p.name;
  }
  const key = cartKey(id, vKey);
  const existing = state.cart.get(key);
  const newQty = (existing?.qty || 0) + delta;
  if (newQty <= 0) state.cart.delete(key);
  else state.cart.set(key, { qty: newQty, price, name: label, shopifyId: sId, shopifyHandle: sHandle });
  refreshCart();
  refreshBuyControl(id, vKey);
}

// ---------- Shopify ----------
// Cache de variant IDs (por handle) — los IDs que tenemos pueden ser product_id, no variant_id;
// resolvemos al primer uso via /products/<handle>.js (sólo funciona en mismo dominio que la tienda).
const variantCache = new Map();
async function resolveVariantId(handle, fallbackId) {
  if (variantCache.has(handle)) return variantCache.get(handle);
  try {
    const res = await fetch(`/products/${handle}.js`);
    if (res.ok) {
      const data = await res.json();
      const vId = data.variants?.[0]?.id;
      if (vId) {
        variantCache.set(handle, vId);
        return vId;
      }
    }
  } catch (e) {
    // CORS o fuera de dominio: usa el fallback
  }
  variantCache.set(handle, fallbackId);
  return fallbackId;
}

// Detecta si estamos en una tienda Shopify real (no en preview local)
function isShopifyHost() {
  const h = window.location.hostname;
  return h.includes('shopify') || h.includes('monjamonymas');
}

async function checkoutShopify() {
  const entries = [...state.cart.values()];
  // Si no estamos en Shopify, no resolvemos via /products/.js (CORS) — usamos directamente el shopifyId
  let items;
  if (isShopifyHost()) {
    items = await Promise.all(
      entries.map(async (item) => ({
        id: await resolveVariantId(item.shopifyHandle, item.shopifyId),
        quantity: item.qty,
      }))
    );
  } else {
    items = entries.map(item => ({ id: item.shopifyId, quantity: item.qty, _handle: item.shopifyHandle }));
  }
  const validItems = items.filter(it => it.id != null);
  if (validItems.length === 0) {
    alert('No hay productos válidos en la cesta.');
    return;
  }
  // Preview local → muestra demo JSON
  if (!isShopifyHost()) {
    alert('🛒 Modo demo (fuera de Shopify).\n\nEn producción haría:\nPOST https://www.monjamonymas.com/cart/add.js\n\nCon items:\n' + JSON.stringify(validItems, null, 2));
    return;
  }
  // Producción: POST real
  try {
    const res = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ items: validItems }),
    });
    if (res.ok) {
      window.location.href = '/cart';
    } else {
      const err = await res.json().catch(() => ({}));
      alert('Error al añadir al carrito:\n' + (err.description || err.message || res.statusText));
    }
  } catch (e) {
    alert('Error de red: ' + e.message);
  }
}

// ---------- Sheet ----------
function openSheet(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  state.sheetId = id;
  state.sheetQty = 1;
  state.sheetVariant = p.variants ? (p.variants.find(v => !v.soldout) || p.variants[0]).key : null;

  const flag = p.flag && FLAG[p.flag]
    ? `<span class="row__flag" style="position:static; margin-bottom:10px;"><img src="${FLAG[p.flag].icon}" alt=""><span>${FLAG[p.flag].label}</span></span>`
    : '';
  const pros = p.pros.map(t => `<li>${t}</li>`).join('');

  const vSection = p.variants
    ? `<div class="sheet__variants">
        <p class="sheet__vtitle">Elige tu corte</p>
        <div class="vrow" data-sheet-vtoggle>
          ${p.variants.map(v => `
            <button class="vbtn vbtn--sheet ${v.key === state.sheetVariant ? 'is-active' : ''} ${v.soldout ? 'is-soldout' : ''}" data-v="${v.key}" ${v.soldout ? 'disabled' : ''}>
              <span class="vbtn__head">
                <img src="${CORTE[v.key].icon}" alt="">
                <span class="vbtn__label">${CORTE[v.key].label}</span>
                ${v.soldout ? '<span class="vbtn__sold">Agotado</span>' : ''}
              </span>
              <span class="vbtn__foot"><strong>${fmt(v.price)}</strong></span>
            </button>
          `).join('')}
        </div>
      </div>`
    : `<div class="sheet__variants">
        <p class="sheet__vtitle">Corte</p>
        <div class="vsingle vsingle--big">
          ${p.cut ? `<img src="${CORTE[p.cut].icon}" alt=""><span>${CORTE[p.cut].label}</span>` : ''}
        </div>
      </div>`;

  refs.sheetBody.innerHTML = `
    <div class="sheet__gallery" data-gallery>
      <img src="${p.icon}" alt="${p.name}" data-gimg />
    </div>
    ${flag}
    <h2 class="sheet__name">${p.name}</h2>
    <p class="sheet__line">${p.sub}</p>
    <p class="sheet__meta sheet__meta--top"><span>${p.weight}</span><span class="meta__sep">·</span><span>☘ Natural · ♻ Sostenible · ★ Cashback</span></p>
    <ul class="sheet__pros">${pros}</ul>
    <div class="sheet__desc-wrap" data-desc-wrap>
      <p class="sheet__desc">${p.desc}</p>
      <button class="sheet__more" data-desc-toggle type="button">
        <span class="more__label">Ver más</span>
        <span class="more__icon">▾</span>
      </button>
    </div>
    ${vSection}
    <div class="sheet__specs">
      <div class="spec"><img src="${CALIDAD[p.calidad].icon}" alt=""><div><small>Calidad</small><strong>${CALIDAD[p.calidad].label}</strong></div></div>
      <div class="spec"><img src="${ALIM[p.alimentacion].icon}" alt=""><div><small>Alimentación</small><strong>${ALIM[p.alimentacion].label}</strong></div></div>
      <div class="spec"><img src="${MESES[p.meses].icon}" alt=""><div><small>Curación</small><strong>${MESES[p.meses].label}</strong></div></div>
      <div class="spec spec--noicon"><div><small>Sabor</small><strong>${velasHTML(SABOR[p.sabor].velas)} ${SABOR[p.sabor].label}</strong></div></div>
    </div>
  `;
  refs.sheet.hidden = false;
  document.body.style.overflow = 'hidden';
  updateSheetTotal();
  // Carga galería de fotos reales en background (variants → handle de variante activa o primera)
  const galleryHandle = p.shopifyHandle
    || p.variants?.find(v => v.key === state.sheetVariant)?.shopifyHandle
    || p.variants?.[0]?.shopifyHandle;
  loadGallery(galleryHandle);
}

// ---------- Galería de fotos reales ----------
const galleryCache = new Map();
let galleryState = { images: [], index: 0 };
async function loadGallery(handle) {
  if (!handle) return;
  try {
    let images = galleryCache.get(handle);
    if (!images) {
      const res = await fetch(`/products/${handle}.js`);
      if (!res.ok) return;
      const data = await res.json();
      images = (data.images || []).map(src => src.startsWith('//') ? 'https:' + src : src);
      galleryCache.set(handle, images);
    }
    if (!images.length) return;
    galleryState = { images, index: 0 };
    renderGallery();
  } catch (e) {
    // sin internet o CORS: dejar SVG fallback
  }
}
function renderGallery() {
  const wrap = document.querySelector('[data-gallery]');
  if (!wrap || !galleryState.images.length) return;
  const imgs = galleryState.images;
  const i = galleryState.index;
  wrap.innerHTML = `
    <img src="${imgs[i]}" alt="" data-gimg />
    ${imgs.length > 1 ? `
      <button class="gallery__nav gallery__nav--prev" data-gnav="-1" aria-label="Anterior">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button class="gallery__nav gallery__nav--next" data-gnav="1" aria-label="Siguiente">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </button>
      <div class="gallery__dots">
        ${imgs.map((_, idx) => `<span class="gallery__dot ${idx === i ? 'is-active' : ''}"></span>`).join('')}
      </div>
    ` : ''}
  `;
}
function navGallery(delta) {
  if (!galleryState.images.length) return;
  const n = galleryState.images.length;
  galleryState.index = (galleryState.index + delta + n) % n;
  renderGallery();
}
function closeSheet() {
  refs.sheet.hidden = true;
  document.body.style.overflow = '';
  state.sheetId = null;
}
function updateSheetTotal() {
  const p = PRODUCTS.find(x => x.id === state.sheetId);
  if (!p) return;
  $('.qty__val', refs.sheetQty).textContent = state.sheetQty;
  let price;
  if (p.variants) {
    const v = p.variants.find(x => x.key === state.sheetVariant);
    price = v?.price ?? 0;
    refs.sheetAdd.disabled = v?.soldout;
  } else {
    price = p.price;
    refs.sheetAdd.disabled = false;
  }
  refs.sheetTotal.textContent = fmt(price * state.sheetQty);
}

// ---------- Panel filtros ----------
function filterPanelHTML() {
  const group = (dim, dict, title, opts = {}) => `
    <div class="fgroup ${opts.compact ? 'fgroup--compact' : ''}">
      <p class="fgroup__title">${title}</p>
      <div class="fgroup__chips">
        ${Object.entries(dict).filter(([_, v]) => !v.noFilter).map(([k, v]) => `
          <button class="fchip ${state.filters[dim].has(String(k)) ? 'is-active' : ''}" data-dim="${dim}" data-val="${k}">
            ${v.icon ? `<img src="${v.icon}" alt="">` : ''}
            <span>${v.label}</span>
          </button>
        `).join('')}
      </div>
    </div>`;
  return group('calidad', CALIDAD, 'Calidad', { compact: true })
       + group('alimentacion', ALIM, 'Alimentación')
       + group('sabor', SABOR, 'Sabor', { compact: true })
       + group('meses', MESES, 'Meses de curación');
}
function renderFilterPanel() {
  refs.filterPanel.innerHTML = filterPanelHTML();
  refs.filterCount.textContent = activeFiltersCount();
  refs.filterCount.hidden = activeFiltersCount() === 0;
}
function toggleFilterPanel(force) {
  state.showFilters = force ?? !state.showFilters;
  refs.filterPanel.hidden = !state.showFilters;
  refs.filterToggle.classList.toggle('is-open', state.showFilters);
  if (state.showFilters) renderFilterPanel();
}

// ---------- Wiring ----------
function wire() {
  refs.chips.addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    $$('.chip', refs.chips).forEach(c => c.classList.remove('is-active'));
    btn.classList.add('is-active');
    state.cat = btn.dataset.cat;
    render();
  });

  refs.searchInput.addEventListener('input', (e) => {
    state.q = e.target.value;
    render();
  });

  refs.list.addEventListener('click', (e) => {
    const buyBtn = e.target.closest('[data-buy]');
    if (buyBtn) {
      e.stopPropagation();
      const delta = buyBtn.dataset.buy === 'add' ? 1 : -1;
      modifyCart(buyBtn.dataset.id, buyBtn.dataset.v || null, delta);
      pop(buyBtn);
      return;
    }
    const row = e.target.closest('.row');
    if (row && !e.target.closest('[data-buy-wrap]')) openSheet(row.dataset.id);
  });

  refs.emptyReset.addEventListener('click', () => {
    state.q = ''; state.cat = 'all';
    Object.values(state.filters).forEach(s => s.clear());
    refs.searchInput.value = ''; refs.searchClear.hidden = true;
    $$('.chip', refs.chips).forEach(c => c.classList.toggle('is-active', c.dataset.cat === 'all'));
    renderFilterPanel(); render();
  });

  refs.filterToggle.addEventListener('click', () => toggleFilterPanel());
  refs.filterPanel.addEventListener('click', (e) => {
    const chip = e.target.closest('.fchip');
    if (!chip) return;
    const { dim, val } = chip.dataset;
    const set = state.filters[dim];
    if (set.has(val)) set.delete(val); else set.add(val);
    chip.classList.toggle('is-active');
    refs.filterCount.textContent = activeFiltersCount();
    refs.filterCount.hidden = activeFiltersCount() === 0;
    render();
  });
  refs.filterClear.addEventListener('click', () => {
    Object.values(state.filters).forEach(s => s.clear());
    renderFilterPanel(); render();
  });
  refs.filterApply.addEventListener('click', () => toggleFilterPanel(false));

  refs.sheet.addEventListener('click', (e) => {
    if (e.target.closest('[data-close]')) closeSheet();
    const vBtn = e.target.closest('[data-sheet-vtoggle] .vbtn');
    if (vBtn && !vBtn.disabled) {
      state.sheetVariant = vBtn.dataset.v;
      $$('[data-sheet-vtoggle] .vbtn', refs.sheet).forEach(b => b.classList.toggle('is-active', b === vBtn));
      updateSheetTotal();
      // Recarga galería con el handle de la variante seleccionada
      const _p = PRODUCTS.find(x => x.id === state.sheetId);
      const _h = _p?.variants?.find(v => v.key === state.sheetVariant)?.shopifyHandle || _p?.shopifyHandle;
      if (_h) loadGallery(_h);
    }
    // Galería: prev/next
    const gNav = e.target.closest('[data-gnav]');
    if (gNav) {
      e.stopPropagation();
      navGallery(parseInt(gNav.dataset.gnav, 10));
    }
    // Descripción: ver más / ver menos
    const descToggle = e.target.closest('[data-desc-toggle]');
    if (descToggle) {
      const wrap = descToggle.closest('[data-desc-wrap]');
      const expanded = wrap.classList.toggle('is-expanded');
      const label = descToggle.querySelector('.more__label');
      if (label) label.textContent = expanded ? 'Ver menos' : 'Ver más';
    }
  });
  refs.sheetQty.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-q]');
    if (!btn) return;
    state.sheetQty = Math.max(1, Math.min(20, state.sheetQty + parseInt(btn.dataset.q, 10)));
    updateSheetTotal();
  });
  refs.sheetAdd.addEventListener('click', () => {
    if (!state.sheetId) return;
    modifyCart(state.sheetId, state.sheetVariant, state.sheetQty);
    closeSheet();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!refs.sheet.hidden) closeSheet();
      else if (state.showFilters) toggleFilterPanel(false);
    }
  });

  refs.cartCTA.addEventListener('click', checkoutShopify);
}
function pop(el) {
  el.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(0.85)' }, { transform: 'scale(1)' }],
    { duration: 220, easing: 'ease-out' }
  );
}

render(); refreshCart(); wire();
