/* =====================================================
   MINIWEB · Monjamón y Más
   - 6 categorías top-level (Loncheados / Jamones y Paletas /
     Embutidos / Quesos / Vinos / Otros)
   - Sub-niveles solo en Loncheados (jamon/paleta/embutido)
   - Filtro Calidad transversal (Esencial/Gourmet/Premium)
   - Mini-header con contador de carrito
   ===================================================== */

const A = window.MW_ASSETS;

// ---------- Diccionarios ----------
const CALIDAD = {
  esencial: { label: 'Esencial', icon: A['esencial'] },
  gourmet:  { label: 'Gourmet',  icon: A['gourmet'] },
  premium:  { label: 'Premium',  icon: A['premium'] },
};
const ALIM = {
  pienso:  { label: 'Piensos y Cereales', icon: A['alim-pienso'] },
  bellota: { label: 'Bellota',            icon: A['alim-bellota'] },
};
const SABOR = {
  suave:          { label: 'Suave',     velas: 1 },
  aromatico:      { label: 'Aromático', velas: 2 },
  intenso:        { label: 'Intenso',   velas: 3 },
  'intenso-plus': { label: 'Intenso+',  velas: 4 },
};
const MESES = {
  6:  { label: '+6 meses',  icon: A['meses-30'] },
  30: { label: '+30 meses', icon: A['meses-30'] },
  40: { label: '+40 meses', icon: A['meses-42'] },
  50: { label: '+50 meses', icon: A['meses-50'] },
  24: { label: '+24 meses', icon: A['meses-30'], noFilter: true },
};
const CORTE = {
  maquina:  { label: 'A máquina',  icon: A['corte-maquina'] },
  cuchillo: { label: 'A cuchillo', icon: A['corte-cuchillo'] },
};
const FLAG = {
  top:     { label: 'TOP VENTAS',  icon: A['top'] },
  vendido: { label: 'MÁS VENDIDO', icon: A['mas-vendido'] },
  novedad: { label: 'NUEVO',       icon: A['novedad'] },
  oferta:  { label: 'OFERTA',      icon: A['oferta'] },
  regalo:  { label: 'PARA REGALAR',icon: A['regalo'] },
};

// Tipo de leche (quesos)
const LECHE = {
  'oveja':       { label: 'Leche Oveja' },
  'vaca':        { label: 'Leche Vaca' },
  'cabra':       { label: 'Leche Cabra' },
  'vaca-oveja':  { label: 'Vaca + Oveja' },
};

// Formato (quesos)
const FORMATO = {
  'cuna':         { label: 'Formato Cuña' },
  'cuadraditos':  { label: 'Cuadraditos' },
};

// Tipo de vino
const VINO_TIPO = {
  'tinto':  { label: 'Tinto' },
  'blanco': { label: 'Blanco' },
};

// Categorías top-level y sus copys
const CATEGORIES = {
  'loncheados':       { label: 'Loncheados',         eyebrow: 'Loncheados al instante',    title: 'Cae en la tentación' },
  'jamones-paletas':  { label: 'Jamones y Paletas',  eyebrow: 'Piezas enteras',             title: 'La pieza divina' },
  'embutidos':        { label: 'Embutidos',          eyebrow: 'Embutidos artesanos',        title: 'Sabor de bodega' },
  'quesos':           { label: 'Quesos',             eyebrow: 'Quesos seleccionados',       title: 'El placer del queso' },
  'vinos':            { label: 'Vinos',              eyebrow: 'Vinos de acompañamiento',    title: 'Vino para mojar' },
  'otros':            { label: 'Otros',              eyebrow: 'Complementos del Convento',  title: 'Algo más para ti' },
};

// ---------- Catálogo ----------
// Schema: { id, name, category, sub?, ... }
//   category: una de las 6 top-level
//   sub: solo presente si category === 'loncheados' (jamon|paleta|embutido)
const PRODUCTS = [
  // ----- PACK FOROCOCHERO (PRODUCTO REAL Shopify + 2 variants visuales) -----
  // Producto real `pack-jamon-forocoches` con 1 variant Shopify (58133069496665, 66,15€).
  // En la mini-web mostramos 2 variants: "1 PACK" (qty 1) y "2 PACKS" (qty 2),
  // ambas apuntan al mismo shopifyId. `qtyMultiplier` se aplica al añadir al cart
  // (expandCartEntry); Shopify aplica los descuentos automáticos según qty (1 → 56€, 2 → 95€).
  // noVolumeDiscount evita que el pack entre en el escalado de volumen de loncheados.
  {
    id: 'pack-forocochero',
    name: 'EL PACK FOROCOCHERO 2026',
    sub: '5×Jamón Bellota 100% +42m + 4 sobres embutidos',
    icon: 'https://cdn.shopify.com/s/files/1/0251/6300/6033/files/pack_forocoches.png?v=1779791862',
    category: 'loncheados', subcat: 'jamon', flag: 'top',
    weight: 'Pack 9 sobres',
    calidad: 'gourmet', alimentacion: 'bellota', sabor: 'intenso', meses: 40,
    shopifyHandle: 'pack-jamon-forocoches',
    noVolumeDiscount: true,
    // Producto con 2 ejes de variación (Corte × Cantidad). Las 4 variants son la matriz cartesiana.
    // - Máquina → producto Shopify pack-jamon-forocoches (variant 58133069496665, base 66,15€)
    //   Discount Automático "Pack Forocoches": qty=1 → 56€  ·  qty=2 → 95€
    // - Cuchillo → producto Shopify pack-jamon-forocoches-cuchillo (variant 58138300285273, base 129,15€)
    //   Discount Automático "Pack Forocoches Cuchillo": qty=1 → 61€  ·  qty=2 → 105€
    dualAxis: {
      primary:   { key: 'cut',  label: 'Corte', options: [
        { val: 'maq',  label: 'A MÁQUINA',  icon: A['corte-maquina'] },
        { val: 'cuch', label: 'A CUCHILLO', icon: A['corte-cuchillo'], badge: '+5€' },
      ] },
      secondary: { key: 'pack', label: 'Cantidad', options: [
        { val: '1pack',  label: '1 PACK',  sublabel: '9 sobres' },
        { val: '2packs', label: '2 PACKS', sublabel: '18 sobres', badge: '+Ahorro', badgeStyle: 'ahorro' },
      ] },
    },
    variants: [
      { key: 'maq-1pack',   cut: 'maq',  pack: '1pack',  label: 'A máquina · 1 PACK',   sublabel: '9 sobres',  price: 56.00,  compare: 81.10,  shopifyId: 58133069496665, shopifyHandle: 'pack-jamon-forocoches',          qtyMultiplier: 1 },
      { key: 'maq-2packs',  cut: 'maq',  pack: '2packs', label: 'A máquina · 2 PACKS',  sublabel: '18 sobres', price: 95.00,  compare: 162.20, shopifyId: 58133069496665, shopifyHandle: 'pack-jamon-forocoches',          qtyMultiplier: 2 },
      { key: 'cuch-1pack',  cut: 'cuch', pack: '1pack',  label: 'A cuchillo · 1 PACK',  sublabel: '9 sobres',  price: 61.00,  compare: 81.10,  shopifyId: 58138300285273, shopifyHandle: 'pack-jamon-forocoches-cuchillo', qtyMultiplier: 1 },
      { key: 'cuch-2packs', cut: 'cuch', pack: '2packs', label: 'A cuchillo · 2 PACKS', sublabel: '18 sobres', price: 105.00, compare: 162.20, shopifyId: 58138300285273, shopifyHandle: 'pack-jamon-forocoches-cuchillo', qtyMultiplier: 2 },
    ],
    // Upsell modal: solo se dispara si en cart hay una variant 'maq-*' (no si ya están en cuch-*).
    // Mapea variantKey máquina → variantKey cuchillo + delta de precio para el badge.
    cuchilloUpgrade: {
      image: 'https://cdn.shopify.com/s/files/1/0251/6300/6033/files/15.jpg?v=1767688553',
      swap: {
        'maq-1pack':  { target: 'cuch-1pack',  delta: 5  },
        'maq-2packs': { target: 'cuch-2packs', delta: 10 },
      },
    },
    pros: [
      '5 sobres Jamón Bellota 100% +42m (80g/ud · ~400g total)',
      '1 Lomonasterio + 1 Divina Coppa + 1 Choricielo + 1 San Chichón (50g/ud · 200g total)',
      'Producto del Año 2025 · Superior Taste ★★★',
      'Ahorras 25,10€ vs suelto (1 PACK) — 67,20€ (2 PACKS)',
    ],
    desc: 'Pack edición Aniversario para los shures. 5 sobres de Jamón de Bellota 100% Ibérico +42 meses (80g/ud, ~400g total) + 1 sobre Lomonasterio (50g) + 1 sobre Divina Coppa (50g) + 1 sobre Choricielo (50g) + 1 sobre San Chichón (50g). Producto del Año 2025 y Superior Taste Award ★★★. Elige A máquina o A cuchillo (+5€ por pack) y 1 ó 2 packs. 1 PACK te ahorra 25,10€ vs sueltos · 2 PACKS te ahorra 67,20€ adicionales.',
  },

  // ----- LONCHEADOS -----
  {
    id: 'sacro-puntas',
    name: 'Sacro Puntas de Monjamón',
    sub: 'Taquitos · Calidad 100% Ibérica',
    icon: A['p-lon-sacro-puntas'] || A['clean-jamon-bellota'] || A['jamon-bellota'],
    category: 'loncheados', subcat: 'jamon', flag: 'novedad',
    weight: '80 g/ud',
    calidad: 'gourmet', alimentacion: 'bellota', sabor: 'intenso', meses: 30, cut: 'cuchillo',
    price: 7.50,
    shopifyHandle: 'sacro-puntas-monjamon',
    shopifyId: 39289949323345,
    pros: ['Taquitos cargados de sabor', 'Nuevo formato 100% Ibérico', 'Placer divino'],
    desc: 'Las Sacro Puntas de Monjamón son taquitos de jamón ibérico cargados de sabor. Cada bocado es un placer divino que elevará cualquier aperitivo. Nuevo formato, calidad 100% Ibérica.',
  },
  {
    id: 'gr-36',
    name: 'Jamón Gran Reserva',
    sub: '+36 meses · Esencial · Fuera de norma',
    icon: A['p-lon-gr-36'] || A['clean-gran-reserva'] || A['gran-reserva'],
    category: 'loncheados', subcat: 'jamon',
    weight: '80 g/ud',
    calidad: 'esencial', alimentacion: 'pienso', sabor: 'suave', meses: 30,
    variants: [
      { key: 'maquina',  price: 8.00, shopifyHandle: 'sobres-gran-reserva-fetas',    shopifyId: 48268069437785 },
      { key: 'cuchillo', price: 8.50, shopifyHandle: 'sobres-gran-reserva-cuchillo', shopifyId: 54098047107417 },
    ],
    pros: ['Fuera de la norma ibérica', 'Criado en libertad', 'Piensos y pastos naturales'],
    desc: 'Al ser un jamón fuera de la norma del ibérico, a hábito descubierto, ¡aquí la calidad la marcamos nosotros! El jamón que recomendamos a todos los fieles: fuera de norma con nuestros estándares de calidad, mejor precio imposible. WIN-WIN de manual que mejora el cebo de campo del mercado. Criado en libertad y alimentado de los mejores piensos y pastos.',
  },
  {
    id: 'bel-36-arom',
    name: 'Jamón Bellota 100% Ibérico +36m',
    sub: 'Aromático · solo a máquina',
    icon: A['p-lon-bel-36-arom'] || A['clean-jamon-bellota'] || A['jamon-bellota'],
    category: 'loncheados', subcat: 'jamon', flag: 'vendido',
    weight: '80 g/ud',
    calidad: 'gourmet', alimentacion: 'bellota', sabor: 'aromatico', meses: 30, cut: 'maquina',
    price: 8.50,
    shopifyHandle: 'sobre-80gr-jamon-de-bellota-100-iberico-36-meses-a-maquina',
    shopifyId: 57688126325081,
    pros: ['100% Ibérico Bellota', 'Aroma a dehesa', 'Equilibrado'],
    desc: 'Jamón de Bellota 100% Ibérico curado +36 meses. Sabor aromático y equilibrado, perfecto para iniciarse en el sabor del bellota. Loncheado fino a máquina.',
  },
  {
    id: 'bel-42-int',
    name: 'Jamón Bellota 100% Ibérico +42m',
    sub: '★ Producto del Año 2025 · Superior Taste ★★★',
    icon: A['p-lon-bel-42-int'] || A['clean-jamon-bellota'] || A['jamon-bellota'],
    category: 'loncheados', subcat: 'jamon', flag: 'top',
    weight: '80 g/ud',
    calidad: 'gourmet', alimentacion: 'bellota', sabor: 'intenso', meses: 40,
    variants: [
      { key: 'maquina',  price: 10.00,  shopifyHandle: 'sobres-jamon-monjamon-bellota-100-fetas',    shopifyId: 54094344814937 },
      { key: 'cuchillo', price: 12.00, shopifyHandle: 'sobres-jamon-monjamon-bellota-100-cuchillo', shopifyId: 53857329971545 },
    ],
    pros: ['Cerdos viejos en libertad', 'Curación tradicional +42m', 'Superior Taste Awards ★★★'],
    desc: '¡ELEGIDO PRODUCTO DEL AÑO 2025! El elegido entre los elegidos, el único y verdadero Monjamón. Si quieres alcanzar la plenitud, nuestro Monjamón liberará en ti todas las buenas sensaciones que te llevarán directo al paraíso. Cerdos viejos en libertad alimentados a base de bellotas. Salado y curación tradicional +42 meses. Producto galardonado Superior Taste Awards ★★★.',
  },
  {
    id: 'sagrada-paleta',
    name: 'Sagrada Paleta',
    sub: '★ Producto del Año 2025 · Edición limitada',
    icon: A['p-lon-sagrada-paleta'] || A['clean-paleta'] || A['paleta'],
    category: 'loncheados', subcat: 'paleta', flag: 'top',
    weight: '80 g/ud',
    calidad: 'gourmet', alimentacion: 'bellota', sabor: 'intenso-plus', meses: 30,
    variants: [
      { key: 'maquina',  price: 12.00, meses: 24, shopifyHandle: 'sobre-sagrada-paleta-fetas',   shopifyId: 54093797622105 },
      { key: 'cuchillo', price: 12.50, meses: 30, shopifyHandle: 'sobres-sagrada-paleta-cuchillo', shopifyId: 54093829865817 },
    ],
    pros: ['Producto muy limitado', 'Sabor más fuerte que el jamón', 'Superior Taste Awards ★★★'],
    desc: '¡ELEGIDO PRODUCTO DEL AÑO 2025! Nuestra Sagrada Paleta es un producto muy limitado que cada año se agota. Conserva un sabor exclusivo digno de aquellos que quieran transformar sus aperitivos y descubrir un placer sin igual. Cerdos viejos en libertad alimentados a base de bellotas. Salado y curación tradicional +30 meses. Sabor más fuerte que el jamón. Producto galardonado Superior Taste Awards ★★★.',
  },
  {
    id: 'pasion-50',
    name: 'Monjamón Pasión +50m',
    sub: 'Premium · Sin precinto · Oleico ~60%',
    icon: A['p-lon-pasion-50'] || A['clean-pasion'] || A['pasion'],
    category: 'loncheados', subcat: 'jamon', flag: 'top',
    weight: '80 g/ud',
    calidad: 'premium', alimentacion: 'bellota', sabor: 'intenso-plus', meses: 50, cut: 'cuchillo',
    price: 15.00,
    shopifyHandle: 'sobres-monjamon-pasion-cuchillo',
    shopifyId: 54098007294297,
    pros: ['Sin precinto: calidad superior', 'Cerdos +2 años en libertad', 'Oleico cerca del 60%'],
    desc: 'Jamón fuera de la norma del ibérico, a hábito descubierto. No lleva precinto: su calidad es más alta que la que otorga cualquiera de ellos. Cerdos de más de dos años, viejos y en libertad, alimentados de manera natural y tradicional. Salado y curación tradicional (+50 meses). Ácidos Oleicos cercanos al 60%.',
  },
  {
    id: 'choricielo',
    name: 'Choricielo',
    sub: 'Chorizo de Bellota 100% Ibérico',
    icon: A['p-lon-choricielo'] || A['clean-choricielo'] || A['choricielo'],
    category: 'loncheados', subcat: 'embutido', flag: 'novedad',
    weight: '50 g/ud',
    calidad: 'gourmet', alimentacion: 'bellota', sabor: 'intenso-plus', meses: 6, cut: 'maquina',
    price: 5.00,
    shopifyHandle: 'sobre-choricielo',
    shopifyId: 54093772194137,
    pros: ['Pimentón ahumado', '100% Ibérico Bellota', 'Sabor intenso+'],
    desc: 'Chorizo de Bellota 100% Ibérico con pimentón ahumado natural. Curación 6 meses en bodega.',
  },
  {
    id: 'san-chichon',
    name: 'San Chichón',
    sub: 'Salchichón de Bellota 100% Ibérico',
    icon: A['p-lon-san-chichon'] || A['clean-salchichon'] || A['salchichon'],
    category: 'loncheados', subcat: 'embutido', flag: 'novedad',
    weight: '50 g/ud',
    calidad: 'gourmet', alimentacion: 'bellota', sabor: 'aromatico', meses: 6, cut: 'maquina',
    price: 5.00,
    shopifyHandle: 'sobre-san-chichon',
    shopifyId: 54093779272025,
    pros: ['Pimienta natural', '100% Ibérico Bellota', 'Sabor aromático'],
    desc: 'Salchichón de Bellota 100% Ibérico con pimienta natural en grano. Curación 6 meses.',
  },
  {
    id: 'lomonasterio',
    name: 'Lomonasterio',
    sub: 'Lomo de Bellota 100% Ibérico',
    icon: A['p-lon-lomonasterio'] || A['clean-lomonasterio'] || A['lomonasterio'],
    category: 'loncheados', subcat: 'embutido',
    weight: '50 g/ud',
    calidad: 'gourmet', alimentacion: 'bellota', sabor: 'intenso', meses: 6, cut: 'maquina',
    price: 8.00,
    shopifyHandle: 'sobre-lomonasterio',
    shopifyId: 54093776978265,
    pros: ['Embuchado tradicional', '100% Ibérico Bellota', 'Sabor intenso'],
    desc: 'Lomo embuchado de Bellota 100% Ibérico, especiado al estilo tradicional.',
  },
  {
    id: 'divina-coppa',
    name: 'Divina Coppa',
    sub: 'Coppa de Bellota 100% Ibérica',
    icon: A['p-lon-divina-coppa'] || A['clean-coppa'] || A['coppa'],
    category: 'loncheados', subcat: 'embutido',
    weight: '50 g/ud',
    calidad: 'gourmet', alimentacion: 'bellota', sabor: 'suave', meses: 6, cut: 'maquina',
    price: 5.50,
    shopifyHandle: 'sobre-divina-coppa-de-bellota-100-iberica',
    shopifyId: 54093787890009,
    pros: ['Cabezada de lomo', '100% Ibérico Bellota', 'Sabor suave'],
    desc: 'Coppa elaborada con la cabezada del cerdo 100% Ibérico de Bellota. Sabor suave y equilibrado.',
  },

  // ----- JAMONES Y PALETAS (piezas enteras) -----
  {
    id: 'jp-pasion-50',
    name: 'Monjamón Pasión +50m',
    sub: 'Premium · Cerdos viejos · Oleico ~60%',
    icon: A['clean-pasion'] || A['pasion'],
    category: 'jamones-paletas', type: 'Jamón', flag: 'top',
    weight: '8-8,5 kg',
    calidad: 'premium', alimentacion: 'bellota', sabor: 'intenso-plus', meses: 50,
    variants: [
      { key: 'entero',   label: 'Entero',   sublabel: '8-8,5 kg',         price: 475.00, shopifyId: 56735632785753 },
      { key: 'cuchillo', label: 'A cuchillo', sublabel: '28 sobres + puntas', price: 400.00, shopifyId: 54094875427161 },
    ],
    shopifyHandle: 'jamon-pasion',
    pros: ['Dos montaneras completas', 'Cerdos +2 años en libertad', 'Superior calidad sin precinto', 'Ácidos oleicos ~60%'],
    desc: 'Nuestro jamón más exclusivo y de mayor curación. Cerdos viejos con dos montaneras, alimentados exclusivamente con bellotas de encina milenaria. Salado y curación tradicional +50 meses. Sabor profundo, persistente y lleno de matices. Sin precinto: la calidad habla por sí sola.',
  },
  {
    id: 'jp-monjamon-42',
    name: 'Jamón Bellota 100% Ibérico +42m',
    sub: 'GOURMET · Producto del Año 2025 · Superior Taste ★★★',
    icon: A['clean-jamon-bellota'] || A['jamon-bellota'],
    category: 'jamones-paletas', type: 'Jamón', flag: 'top',
    weight: '6,5-7 kg',
    calidad: 'gourmet', alimentacion: 'bellota', sabor: 'intenso', meses: 40,
    variants: [
      { key: 'entero',   label: 'Entero',   sublabel: '6,5-7 kg',         price: 360.00, shopifyId: 48998257819993 },
      { key: 'cuchillo', label: 'A cuchillo', sublabel: '28 sobres + puntas', price: 326.00, shopifyId: 48998257885529 },
    ],
    shopifyHandle: 'monjamon',
    pros: ['Producto del Año 2025', 'Superior Taste Awards ★★★', '+42 meses de curación', 'Cerdos viejos en libertad'],
    desc: 'El elegido entre los elegidos. Jamón de bellota con más de 42 meses de curación, equilibrado y refinado. Cerdos viejos criados en libertad alimentados con bellotas. Veteado jugoso y textura sedosa. Galardonado Superior Taste Awards ★★★.',
  },
  {
    id: 'jp-gran-reserva',
    name: 'Jamón Gran Reserva +36m',
    sub: 'Esencial · Fuera de norma · Criado en libertad',
    icon: A['clean-gran-reserva'] || A['gran-reserva'],
    category: 'jamones-paletas', type: 'Jamón',
    weight: '8-9 kg',
    calidad: 'esencial', alimentacion: 'pienso', sabor: 'suave', meses: 30,
    variants: [
      { key: 'entero',   label: 'Entero',   sublabel: '8-9 kg',           price: 250.00, shopifyId: 56747224105305 },
      { key: 'cuchillo', label: 'A cuchillo', sublabel: '32 sobres + puntas', price: 230.00, shopifyId: 54381130580313 },
    ],
    shopifyHandle: 'monjamon-gran-reserva',
    pros: ['Fuera de la norma ibérica', 'Criado en libertad', 'Piensos y pastos naturales', 'Mejor precio imposible'],
    desc: 'Al ser un jamón fuera de la norma del ibérico, la calidad la marcamos nosotros. El jamón que recomendamos a todos los fieles: criado en libertad y alimentado de los mejores piensos y pastos. Win-Win de manual que mejora el cebo de campo del mercado.',
  },
  {
    id: 'jp-sagrada-paleta',
    name: 'Sagrada Paleta de Bellota 100%',
    sub: 'GOURMET · Producto del Año 2025 · Edición limitada',
    icon: A['clean-paleta'] || A['paleta'],
    category: 'jamones-paletas', type: 'Paleta', flag: 'top',
    weight: '5.5-6 kg',
    calidad: 'gourmet', alimentacion: 'bellota', sabor: 'intenso-plus', meses: 24,
    variants: [
      { key: 'entero',   label: 'Entera',   sublabel: '5,5-6 kg',         price: 224.00, shopifyId: 56731912175961 },
      { key: 'cuchillo', label: 'A cuchillo', sublabel: '16 sobres + puntas', price: 175.00, shopifyId: 49379436462425 },
    ],
    shopifyHandle: 'sagrada-paleta',
    pros: ['Producto muy limitado', 'Sabor más intenso que el jamón', 'Curación 24-30 meses', 'Producto del Año 2025'],
    desc: 'Al tratarse de otro músculo, es una pieza normalmente más dura y aromática que el jamón, con un sabor más intenso debido a su menor tamaño. Curación 24-30 meses que realza sus notas especiadas y su textura más melosa. Perfecta para quienes buscan una experiencia más potente y directa.',
  },

  // ----- EMBUTIDOS (piezas enteras o medias piezas) -----
  {
    id: 'emb-lomonasterio',
    name: 'Lomonasterio',
    sub: 'Lomo de Bellota 100% Ibérico',
    icon: A['clean-lomonasterio'] || A['lomonasterio'],
    category: 'embutidos', type: 'Lomo',
    weight: '450-500 g',
    calidad: 'gourmet', alimentacion: 'bellota', sabor: 'intenso', meses: 6,
    price: 45.00,
    shopifyHandle: 'lomonasterio',
    shopifyId: 48550028869977,
    pros: ['Embuchado tradicional', '100% Ibérico Bellota', 'Pieza ~500g'],
    desc: 'Lomo embuchado de Bellota 100% Ibérico, especiado al estilo tradicional. Media pieza de 450-500g.',
  },
  {
    id: 'emb-san-chichon',
    name: 'San Chichón',
    sub: 'Salchichón de Bellota 100% Ibérico',
    icon: A['clean-salchichon'] || A['salchichon'],
    category: 'embutidos', type: 'Salchichón',
    weight: '450-500 g',
    calidad: 'gourmet', alimentacion: 'bellota', sabor: 'aromatico', meses: 6,
    price: 22.00,
    shopifyHandle: 'san-chichon',
    shopifyId: 48550032048473,
    pros: ['Pimienta natural', '100% Ibérico Bellota', 'Curación 6 meses'],
    desc: 'Salchichón de Bellota 100% Ibérico con pimienta natural en grano. Curación tradicional en bodega 6 meses. Media pieza 450-500g.',
  },
  {
    id: 'emb-choricielo',
    name: 'Choricielo',
    sub: 'Chorizo 100% Ibérico de Bellota',
    icon: A['clean-choricielo'] || A['choricielo'],
    category: 'embutidos', type: 'Chorizo',
    weight: '450-500 g',
    calidad: 'gourmet', alimentacion: 'bellota', sabor: 'intenso-plus', meses: 6,
    price: 22.00,
    shopifyHandle: 'choricielo',
    shopifyId: 48550025232729,
    pros: ['Pimentón ahumado', '100% Ibérico Bellota', 'Curación 6 meses'],
    desc: 'Chorizo de Bellota 100% Ibérico con pimentón ahumado natural. Curación 6 meses en bodega. Media pieza 450-500g.',
  },
  {
    id: 'emb-divina-coppa',
    name: 'Divina Coppa (pieza)',
    sub: 'Coppa de Bellota 100% Ibérica',
    icon: A['p-emb-divina-coppa'] || A['clean-coppa'] || A['coppa'],
    category: 'embutidos', type: 'Coppa',
    weight: '500-550 g',
    calidad: 'gourmet', alimentacion: 'bellota', sabor: 'suave', meses: 6,
    price: 35.00,
    shopifyHandle: 'divina-coppa',
    shopifyId: 54090108436825,
    pros: ['Cabezada de lomo', '100% Ibérico Bellota', 'Sabor suave'],
    desc: 'Coppa elaborada con la cabezada del cerdo 100% Ibérico de Bellota. Sabor suave y equilibrado. Pieza entera 500-550g.',
  },
  {
    id: 'emb-longaniza',
    name: 'Longaniza Ibérica',
    sub: 'Chorizo de Bellota Ibérica · Tipo longaniza',
    icon: A['p-emb-longaniza'] || A['clean-choricielo'] || A['choricielo'],
    category: 'embutidos', type: 'Longaniza', flag: 'oferta',
    weight: '~250 g',
    calidad: 'esencial', alimentacion: 'bellota', sabor: 'intenso',
    variants: [
      { key: 'normal',  label: 'Normal',  price: 7.95, compare: 12.00, shopifyId: 39488731250769 },
      { key: 'picante', label: 'Picante', price: 7.95, compare: 12.00, shopifyId: 40167773110353 },
    ],
    shopifyHandle: 'longaniza-iberica',
    pros: ['Oferta especial', '2 tipos: Dulce o Picante', 'Ibérica de bellota'],
    desc: 'Longaniza ibérica al estilo chorizo, en formato alargado. Elige entre versión Dulce o Picante. Producto en oferta.',
  },
  {
    id: 'emb-mini-vela-fuet',
    name: 'Vela Ibérica estilo Fuet',
    sub: 'Mini formato · Bellota +6 meses',
    icon: A['p-emb-mini-vela-fuet'] || A['clean-salchichon'] || A['salchichon'],
    category: 'embutidos', type: 'Fuet',
    weight: '~80 g',
    calidad: 'gourmet', alimentacion: 'bellota', sabor: 'aromatico', meses: 6,
    variants: [
      { key: 'salchichon',     label: 'Salchichón',      price: 7.00, shopifyId: 47136359645529 },
      { key: 'chorizo-normal', label: 'Chorizo Normal',  price: 7.00, shopifyId: 47136359678297 },
      { key: 'chorizo-picante',label: 'Chorizo Picante', price: 7.00, shopifyId: 47136359711065 },
    ],
    shopifyHandle: 'mini-vela-fuet',
    pros: ['Bellota 100% Ibérico', '+6 meses de curación', '3 sabores: Salchichón, Chorizo Normal o Picante'],
    desc: 'Mini vela ibérica estilo fuet, hecha de bellota 100% ibérica con 6 meses de curación. Tres variantes disponibles: Salchichón, Chorizo Normal y Chorizo Picante.',
  },

  // ----- QUESOS (todos La Antigua salvo indicación) -----
  {
    id: 'q-dop-zamorano',
    name: 'Queso D.O.P Zamorano',
    sub: 'La Antigua · Añejo con Denominación de Origen',
    icon: A['p-q-dop-zamorano'] || A['queso-cuna'],
    category: 'quesos', type: 'D.O.P',
    weight: '~250 g',
    marca: 'La Antigua', formato: 'cuna', leche: 'oveja',
    calidad: 'premium', sabor: 'intenso-plus',
    price: 9.50,
    shopifyHandle: 'queso-dop-zamorano',
    shopifyId: 47219826491737,
    pros: ['Denominación de Origen', 'Oveja añeja', 'La Antigua · Castilla y León'],
    desc: 'Queso de oveja añejo con Denominación de Origen Protegida Zamorano. Marca La Antigua. Sabor intenso y prolongado en boca.',
  },
  {
    id: 'q-tartufo',
    name: 'Queso de Oveja al Tartufo',
    sub: 'La Antigua · Curado con trufa',
    icon: A['p-q-tartufo'] || A['queso-cuna'],
    category: 'quesos', type: 'Trufado',
    weight: '~250 g',
    marca: 'La Antigua', formato: 'cuna', leche: 'oveja',
    calidad: 'gourmet', sabor: 'intenso-plus',
    price: 10.00,
    shopifyHandle: 'queso-de-oveja-curado-al-tartufo',
    shopifyId: 47219809517913,
    pros: ['Trufa real', 'Oveja curado', 'Maridaje con tinto'],
    desc: 'Queso de oveja curado con trufa negra. Marca La Antigua. Maridaje perfecto con vino tinto.',
  },
  {
    id: 'q-picanton',
    name: 'Queso PICANTÓN',
    sub: 'La Antigua · Cuadraditos con pimentón',
    icon: A['p-q-picanton'] || A['queso-cuadraditos'],
    category: 'quesos', type: 'Picantón',
    weight: '250 g',
    marca: 'La Antigua', formato: 'cuadraditos', leche: 'oveja',
    calidad: 'gourmet', sabor: 'intenso',
    price: 8.50,
    shopifyHandle: 'queso-curado-de-oveja-con-escamas-de-pimenton-cuadraditos-250gramos',
    shopifyId: 54456248762713,
    pros: ['Listo para picar', 'Escamas de pimentón', 'Curado de oveja'],
    desc: 'Queso curado de oveja en cuadraditos, recubierto de escamas de pimentón ahumado. Marca La Antigua. Formato listo para aperitivo.',
  },
  {
    id: 'q-sin-lactosa',
    name: 'Queso Tierno Sin Lactosa',
    sub: 'La Antigua · Tierno con pimienta rosa',
    icon: A['p-q-sin-lactosa'] || A['queso-cuna'],
    category: 'quesos', type: 'Sin Lactosa', flag: 'novedad',
    weight: '~250 g',
    marca: 'La Antigua', formato: 'cuna', leche: 'oveja',
    calidad: 'esencial', sabor: 'suave',
    price: 8.00,
    shopifyHandle: 'queso-tierno-sin-lactosa-pimienta-rosa',
    shopifyId: 54455924982105,
    pros: ['Sin lactosa', 'Pimienta rosa', 'Tierno y suave'],
    desc: 'Queso tierno de oveja sin lactosa, aromatizado con pimienta rosa. Marca La Antigua. Apto para intolerantes.',
  },
  {
    id: 'q-pimenton',
    name: 'Queso Curado con Pimentón',
    sub: 'La Antigua · Curado con escamas de pimentón',
    icon: A['p-q-pimenton'] || A['queso-cuna'],
    category: 'quesos', type: 'Pimentón',
    weight: '~250 g',
    marca: 'La Antigua', formato: 'cuna', leche: 'oveja',
    calidad: 'gourmet', sabor: 'intenso',
    price: 8.50,
    shopifyHandle: 'queso-curado-oveja-escamas-pimenton',
    shopifyId: 48198075351385,
    pros: ['Escamas de pimentón', 'Curado de oveja', 'Picante suave'],
    desc: 'Queso curado de oveja recubierto en escamas de pimentón. Marca La Antigua. Sabor intenso con un punto picante.',
  },
  {
    id: 'q-cuna-180',
    name: 'Cuña 180g',
    sub: 'La Antigua · Vaca + Oveja Zamorano',
    icon: A['p-q-cuna-180'] || A['queso-cuna'],
    category: 'quesos', type: 'Cuña 180g',
    weight: '180 g',
    marca: 'La Antigua', formato: 'cuna', leche: 'vaca-oveja',
    calidad: 'gourmet', sabor: 'aromatico',
    price: 8.08,
    shopifyHandle: 'cuna-sorpresa-queso-de-oveja-zamorano-la-antigua-cuna-180gramos',
    shopifyId: 53648312467801,
    pros: ['Mezcla vaca + oveja', 'Formato cuña 180g', 'La Antigua Zamorano'],
    desc: 'Cuña de 180g elaborada con leche de vaca y oveja. Marca La Antigua, queso Zamorano. Formato ideal para tabla pequeña.',
  },

  // ----- VINOS -----
  {
    id: 'v-frizzante',
    name: 'Verdejo Frizzante 5.5° (Lata)',
    sub: 'Vino verdejo frizzante · Formato lata',
    icon: A['p-v-frizzante'] || A['vino-lata'],
    category: 'vinos', type: 'Blanco', tipo: 'blanco', zona: 'Salamanca',
    weight: '250 ml',
    calidad: 'esencial', sabor: 'aromatico',
    price: 3.50,
    shopifyHandle: 'frizzante',
    shopifyId: 54150874464601,
    pros: ['Formato lata práctico', 'Bajo en alcohol 5.5°', 'Aromático y fresco'],
    desc: 'Verdejo frizzante en lata de 250ml. Aromático, ligero, perfecto para acompañar tablas de ibéricos.',
  },
  {
    id: 'v-circe',
    name: 'Circe Verdejo',
    sub: 'D.O. Rueda · Verdejo joven',
    icon: A['p-v-circe'] || A['vino-blanco'],
    category: 'vinos', type: 'Blanco', tipo: 'blanco', zona: 'D.O. Rueda',
    weight: '750 ml',
    calidad: 'gourmet', sabor: 'aromatico',
    price: 11.99,
    compare: null,
    shopifyHandle: 'circe-verdejo',
    shopifyId: 47172699226457,
    pros: ['D.O. Rueda', 'Verdejo aromático', 'Fresco y equilibrado'],
    desc: 'Circe Verdejo D.O. Rueda. Vino blanco joven, aromático y fresco. Ideal con quesos y embutidos suaves.',
  },
  {
    id: 'v-fuentespina',
    name: 'Fuentespina Crianza',
    sub: 'D.O. Ribera del Duero · Tinto crianza',
    icon: A['p-v-fuentespina'] || A['vino-tinto'],
    category: 'vinos', type: 'Tinto', tipo: 'tinto', zona: 'D.O. Ribera del Duero',
    weight: '750 ml',
    calidad: 'gourmet', sabor: 'intenso',
    price: 9.99,
    shopifyHandle: 'fuentespina-crianza',
    shopifyId: 47219796607321,
    pros: ['Ribera del Duero', '12 meses en barrica', 'Maridaje con ibéricos'],
    desc: 'Fuentespina Crianza, Ribera del Duero. Tinto con 12 meses en barrica de roble. Estructurado y elegante.',
  },
  {
    id: 'v-aureo',
    name: 'Avelino Vegas Áureo',
    sub: 'D.O. Ribera del Duero · RECOMENDADO',
    icon: A['p-v-aureo'] || A['vino-tinto'],
    category: 'vinos', type: 'Tinto', tipo: 'tinto', zona: 'D.O. Ribera del Duero', flag: 'top',
    weight: '750 ml',
    calidad: 'premium', sabor: 'intenso-plus',
    price: 23.00,
    compare: null,
    shopifyHandle: 'aureo',
    shopifyId: 47172664066393,
    pros: ['Recomendado de la casa', 'Fermentado en barrica', 'Notas tostadas y vainilla'],
    desc: 'Áureo de Avelino Vegas. Tinto Ribera del Duero fermentado en barrica con notas tostadas y vainilla. Recomendado por la casa.',
  },
  {
    id: 'v-muriel',
    name: 'Viña Muriel Crianza',
    sub: 'D.O.Ca. Rioja · Tinto crianza',
    icon: A['p-v-muriel'] || A['vino-tinto'],
    category: 'vinos', type: 'Tinto', tipo: 'tinto', zona: 'D.O.Ca. Rioja',
    weight: '750 ml',
    calidad: 'gourmet', sabor: 'aromatico',
    price: 8.45,
    shopifyHandle: 'vina-muriel-crianza',
    shopifyId: 49339160887641,
    pros: ['D.O.Ca. Rioja', 'Tinto crianza', 'Maridaje con jamón'],
    desc: 'Viña Muriel Crianza D.O.Ca. Rioja. Tinto equilibrado con 12 meses en barrica. Maridaje clásico con jamón ibérico.',
  },

  // ----- OTROS (salsas, aceites, cervezas) -----
  {
    id: 'o-chipotle',
    name: 'Salsa Chile Chipotle',
    sub: 'Seco y pipas · Picante nivel 2',
    icon: A['p-o-chipotle'] || A['salsa'],
    category: 'otros', type: 'Salsa',
    weight: '~250 g',
    calidad: 'gourmet', sabor: 'intenso',
    price: 10.95,
    shopifyHandle: 'salsa-2-picor-chile-chipotle-seco-y-pipas',
    shopifyId: 54151859143001,
    pros: ['Picante nivel 2', 'Con chipotle seco y pipas', 'Artesanal'],
    desc: 'Salsa de chile chipotle seco con pipas. Picante nivel 2/5 — un toque moderado para acompañar tablas de ibéricos.',
  },
  {
    id: 'o-morita',
    name: 'Salsa Chile Morita',
    sub: 'Picante nivel 5 · Para valientes',
    icon: A['p-o-morita'] || A['salsa'],
    category: 'otros', type: 'Salsa',
    weight: '~250 g',
    calidad: 'gourmet', sabor: 'intenso-plus',
    price: 10.95,
    shopifyHandle: 'salsa-chile-morita',
    shopifyId: 54151889092953,
    pros: ['Picante nivel 5 (máximo)', 'Chile morita ahumado', 'Para auténticos picantes'],
    desc: 'Salsa de chile morita ahumado. Picante nivel 5/5 — para quienes buscan intensidad de verdad.',
  },
  {
    id: 'o-bravoleum',
    name: 'Bravoleum Picual AOVE',
    sub: 'Aceite de Oliva Virgen Extra · Cosecha 24-25',
    icon: A['p-o-bravoleum'] || A['aove'],
    category: 'otros', type: 'Aceite',
    weight: '100/250/500 ml',
    calidad: 'premium', sabor: 'intenso',
    variants: [
      { key: '100ml', label: '100 ml', price: 5.00,  shopifyId: 55620172808537 },
      { key: '250ml', label: '250 ml', price: 10.00,  shopifyId: 55620172841305 },
      { key: '500ml', label: '500 ml', price: 17.00, shopifyId: 55620172874073 },
    ],
    shopifyHandle: 'bravoleum-picual',
    pros: ['AOVE Picual', 'Cosecha 2024-2025', '3 formatos disponibles'],
    desc: 'Aceite de Oliva Virgen Extra variedad Picual. Cosecha 2024-2025. Disponible en 100ml, 250ml y 500ml.',
  },
  {
    id: 'o-bestiator',
    name: 'Bestiator Charra con Miel',
    sub: 'Cerveza artesana con miel · Salamanca',
    icon: A['p-o-bestiator'] || A['cerveza'],
    category: 'otros', type: 'Cerveza',
    weight: '33 cl',
    calidad: 'gourmet', sabor: 'aromatico',
    price: 4.50,
    shopifyHandle: 'bestiator-cerveza-charra-con-miel',
    shopifyId: 49239514120537,
    pros: ['Artesana de Salamanca', 'Notas dulces de miel', 'Cuerpo medio'],
    desc: 'Cerveza Bestiator de la marca Charra (Salamanca), elaborada con miel. Cuerpo medio con notas dulces.',
  },
  {
    id: 'o-barbier',
    name: 'Barbier Pilsner Charra',
    sub: 'Pilsner artesana · Salamanca',
    icon: A['p-o-barbier'] || A['cerveza'],
    category: 'otros', type: 'Cerveza',
    weight: '33 cl',
    calidad: 'gourmet', sabor: 'suave',
    price: 4.00,
    shopifyHandle: 'barbier-pilsner-charra',
    shopifyId: 49239597678937,
    pros: ['Estilo Pilsner', 'Artesana de Salamanca', 'Refrescante'],
    desc: 'Barbier, pilsner artesana de la cervecera Charra de Salamanca. Refrescante y de cuerpo ligero.',
  },
  {
    id: 'o-verraco',
    name: 'Verraco Cerveza de Trigo',
    sub: 'Trigo Charro · Salamanca',
    icon: A['p-o-verraco'] || A['cerveza'],
    category: 'otros', type: 'Cerveza',
    weight: '33 cl',
    calidad: 'gourmet', sabor: 'aromatico',
    price: 4.00,
    shopifyHandle: 'verraco-cerveza-de-trigo-charro',
    shopifyId: 49235260965209,
    pros: ['Trigo Charro', 'Cuerpo cremoso', 'Salamanca'],
    desc: 'Verraco, cerveza de trigo de la marca Charra (Salamanca). Cuerpo cremoso con notas de cereal.',
  },
];

// ---------- Estado ----------
const state = {
  category: 'loncheados',          // top-level activa
  sub: 'all',                       // sub-categoría (solo loncheados)
  q: '',
  filters: {
    calidad: new Set(),
    alimentacion: new Set(),
    sabor: new Set(),
    meses: new Set(),
  },
  cart: new Map(),
  // Selección activa por productId para productos dualAxis (e.g., pack-forocochero)
  // → { cut: 'maq'|'cuch', pack: '1pack'|'2packs' }
  dualSel: new Map(),
  sheetId: null,
  sheetVariant: null,
  sheetQty: 1,
  showFilters: false,
};

// ---------- Refs ----------
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const refs = {
  chipsTop: $('#chipsTop'),
  chipsSub: $('#chipsSub'),
  list: $('#list'),
  resultCount: $('#resultCount'),
  emptyState: $('#emptyState'),
  emptyReset: $('#emptyReset'),
  soonState: $('#soonState'),
  searchInput: $('#searchInput'),
  searchClear: $('#searchClear'),
  // Botón carrito en el mini-header (sustituye al FAB)
  mwCartBtn: $('#mwCartBtn'),
  mwCartCount: $('#mwCartCount'),
  mwCartPrices: $('#mwCartPrices'),
  mwCartOld: $('#mwCartOld'),
  mwCartNew: $('#mwCartNew'),
  cartDrawer: $('#cartDrawer'),
  cartDrawerList: $('#cartDrawerList'),
  cartDrawerTotal: $('#cartDrawerTotal'),
  cartCheckout: $('#cartCheckout'),
  // Modal de confirmación al salir a la web completa
  exitModal: $('#exitModal'),
  exitConfirm: $('#exitConfirm'),
  // Modal upsell de Pack Forocochero a corte CUCHILLO (al pulsar IR AL CARRITO)
  upsellModal: $('#upsellModal'),
  upsellImage: $('#upsellImage'),
  upsellDelta: $('#upsellDelta'),
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
  sectionEyebrow: $('#sectionEyebrow'),
  sectionTitle: $('#sectionTitle'),
};

const fmt = n => n.toFixed(2).replace('.', ',') + ' €';

// Promo global del -10% TERMINADA (2026-06-08). Los precios del catálogo ahora son los REALES de Shopify.
// El tachado (compare) SOLO se muestra si el producto trae `compare` explícito = oferta propia vigente
// (p.ej. Longaniza 7,95€ desde 12,00€). Ya NO se calcula un tachado ficticio price/0.9.
// Cuando vuelva una promo global, la Fase 1 del plan de editabilidad (leer price+compareAtPrice live
// de Shopify) reflejará el tachado automáticamente sin tocar precios a mano.
const MW_AUTO_DISCOUNT = 0;
function autoCompare(price, explicit) {
  if (explicit === null || explicit === undefined) return null;  // sin compare explícito → sin tachado
  return explicit;                                               // oferta propia vigente → tachado real
}

// ---------- Carrito ----------
function cartKey(id, vKey) { return vKey ? `${id}:${vKey}` : id; }
function getCartQty(id, vKey) { return state.cart.get(cartKey(id, vKey))?.qty || 0; }

// ---------- Velas ----------
function velasHTML(n) {
  let h = '<span class="velas">';
  for (let i = 0; i < 4; i++) {
    h += `<img src="${A['vela']}" alt="" class="vela ${i < n ? 'on' : 'off'}" />`;
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
    if (p[dim] == null) return false;
    if (!sel.has(String(p[dim]))) return false;
  }
  return true;
}

// ---------- Control de compra ----------
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
// Devuelve la etiqueta de TIPO del producto a mostrar en la card.
//  - En loncheados con subfilter='all', usa p.subcat (Jamón/Paleta/Embutido).
//  - En otras categorías, usa p.type (siempre).
//  - Si el subfiltro/filtro ya está limitando a un tipo, devuelve null (redundante).
function productTypeLabel(p) {
  if (p.category === 'loncheados') {
    if (state.sub !== 'all') return null;
    if (!p.subcat) return null;
    const m = { jamon: 'Jamón', paleta: 'Paleta', embutido: 'Embutido' };
    return m[p.subcat] || null;
  }
  return p.type || null;
}

// ---------- DualAxis (2 ejes de variación, e.g., pack-forocochero: corte × cantidad) ----------
// La selección activa por producto vive en state.dualSel; inicializa a la primera opción de cada eje.
function getDualSel(p) {
  if (!p.dualAxis) return null;
  const existing = state.dualSel.get(p.id);
  if (existing) return existing;
  const def = {
    [p.dualAxis.primary.key]:   p.dualAxis.primary.options[0].val,
    [p.dualAxis.secondary.key]: p.dualAxis.secondary.options[0].val,
  };
  state.dualSel.set(p.id, def);
  return def;
}
function setDualSel(p, axisKey, val) {
  const cur = { ...getDualSel(p) };
  cur[axisKey] = val;
  state.dualSel.set(p.id, cur);
  return cur;
}
function dualAxisVariant(p, sel) {
  if (!p.dualAxis || !sel) return null;
  const pk = p.dualAxis.primary.key, sk = p.dualAxis.secondary.key;
  return p.variants.find(v => v[pk] === sel[pk] && v[sk] === sel[sk]);
}
function dualAxisChipsHTML(axis, sel, klass = 'dachip') {
  return axis.options.map(o => {
    const badgeClass = o.badgeStyle ? `dachip__badge dachip__badge--${o.badgeStyle}` : 'dachip__badge';
    return `
      <button type="button" class="${klass} ${sel[axis.key] === o.val ? 'is-active' : ''}" data-val="${o.val}">
        <span class="dachip__head">
          ${o.icon ? `<img class="dachip__icon" src="${o.icon}" alt="">` : ''}
          <span class="dachip__label">${o.label}</span>
        </span>
        ${o.sublabel ? `<span class="dachip__sub">${o.sublabel}</span>` : ''}
        ${o.badge ? `<span class="${badgeClass}">${o.badge}</span>` : ''}
      </button>
    `;
  }).join('');
}
function dualAxisFootInnerHTML(p, v) {
  if (!v) return '';
  const compareVal = autoCompare(v.price, v.compare);
  const cmp = compareVal ? `<span class="row__price-compare">${fmt(compareVal)}</span>` : '';
  return `
    <span class="row__price">${fmt(v.price)}${cmp}</span>
    <span class="vbtn__action" data-buy-wrap="${p.id}:${v.key}">${buyControlHTML(p.id, v.key, v.price)}</span>
  `;
}
function dualAxisRowHTML(p) {
  const sel = getDualSel(p);
  const v = dualAxisVariant(p, sel);
  const groupHTML = (axis) => `
    <div class="dualaxis__group">
      <p class="dualaxis__label">${axis.label}</p>
      <div class="dualaxis__chips" data-axis="${axis.key}">${dualAxisChipsHTML(axis, sel)}</div>
    </div>`;
  return `
    <div class="row__dualaxis" data-dualaxis-product="${p.id}">
      ${groupHTML(p.dualAxis.primary)}
      ${groupHTML(p.dualAxis.secondary)}
      <div class="dualaxis__foot" data-dualaxis-foot="${p.id}">
        ${dualAxisFootInnerHTML(p, v)}
      </div>
    </div>`;
}
function dualAxisSheetHTML(p) {
  const sel = getDualSel(p);
  const groupHTML = (axis) => `
    <div class="sheet__dualaxis-group">
      <p class="sheet__vtitle">${axis.label}</p>
      <div class="vrow" data-sheet-dualaxis="${axis.key}">${dualAxisChipsHTML(axis, sel, 'dachip dachip--sheet')}</div>
    </div>`;
  return `<div class="sheet__variants sheet__dualaxis">
    ${groupHTML(p.dualAxis.primary)}
    ${groupHTML(p.dualAxis.secondary)}
  </div>`;
}

// Helper: variant label visible (CORTE estándar para jamones loncheados, o v.label custom)
// En jamones-paletas usamos v.label directo (Entero / A cuchillo) para no perder
// la distinción con loncheados. El icono de CORTE se aprovecha si la key coincide.
function variantHead(p, v) {
  const corteEntry = CORTE[v.key];
  if (p.category === 'jamones-paletas') {
    return { icon: corteEntry?.icon || null, label: v.label || v.key };
  }
  if (corteEntry) return { icon: corteEntry.icon, label: corteEntry.label };
  return { icon: null, label: v.label || v.key };
}

function rowHTML(p) {
  const flag = p.flag && FLAG[p.flag]
    ? `<span class="row__flag"><img src="${FLAG[p.flag].icon}" alt=""><span>${FLAG[p.flag].label}</span></span>`
    : '';
  const typeLabel = productTypeLabel(p);
  const typeTag = typeLabel ? `<span class="row__type">${typeLabel}</span>` : '';
  const calidadTag = `<span class="tag tag--calidad tag--calidad--${p.calidad}"><img src="${CALIDAD[p.calidad].icon}" alt=""> ${CALIDAD[p.calidad].label}</span>`;
  const alimTag    = p.alimentacion && ALIM[p.alimentacion] ? `<span class="tag"><img src="${ALIM[p.alimentacion].icon}" alt=""> ${ALIM[p.alimentacion].label}</span>` : '';
  const mesesTag   = p.meses != null && MESES[p.meses] ? `<span class="tag"><img src="${MESES[p.meses].icon}" alt=""> ${MESES[p.meses].label}</span>` : '';
  const saborTag   = p.sabor && SABOR[p.sabor] ? `<span class="tag tag--sabor">${velasHTML(SABOR[p.sabor].velas)} <span>${SABOR[p.sabor].label}</span></span>` : '';
  const lecheTag   = p.leche && LECHE[p.leche] ? `<span class="tag">${LECHE[p.leche].label}</span>` : '';
  const formatoTag = p.formato && FORMATO[p.formato] ? `<span class="tag">${FORMATO[p.formato].label}</span>` : '';
  const zonaTag    = p.zona ? `<span class="tag">${p.zona}</span>` : '';

  let buyBlock;
  if (p.dualAxis) {
    buyBlock = dualAxisRowHTML(p);
  } else if (p.variants) {
    buyBlock = `
      <div class="row__variants">
        ${p.variants.map(v => {
          const vh = variantHead(p, v);
          // Bundles virtuales ya traen su compare explícito; el resto se auto-calcula
          const compareVal = p.isVirtualBundle ? v.compare : autoCompare(v.price, v.compare);
          const cmp = compareVal ? `<span class="vbtn__compare">${fmt(compareVal)}</span>` : '';
          const sub = v.sublabel ? `<span class="vbtn__sublabel">${v.sublabel}</span>` : '';
          return `
            <div class="vbtn ${v.soldout ? 'is-soldout' : ''}" data-vbtn="${p.id}:${v.key}">
              <span class="vbtn__head">
                ${vh.icon ? `<img src="${vh.icon}" alt="">` : ''}
                <span class="vbtn__label">${vh.label}</span>
                ${v.soldout ? '<span class="vbtn__sold">Agotado</span>' : ''}
              </span>
              ${sub}
              <span class="vbtn__foot">
                <strong>${fmt(v.price)}</strong>${cmp}
                ${v.soldout ? '<span class="vbtn__disabled">—</span>' : `<span class="vbtn__action" data-buy-wrap="${p.id}:${v.key}">${buyControlHTML(p.id, v.key, v.price)}</span>`}
              </span>
            </div>
          `;
        }).join('')}
      </div>
    `;
  } else {
    const corteIcon = p.cut && CORTE[p.cut] ? `<img src="${CORTE[p.cut].icon}" alt=""> ${CORTE[p.cut].label}` : '';
    const compareVal = autoCompare(p.price, p.compare ?? p.comparePrice);
    const comparePrice = compareVal ? `<span class="row__price-compare">${fmt(compareVal)}</span>` : '';
    buyBlock = `
      <div class="row__single">
        <span class="row__corte">${corteIcon}</span>
        <span class="row__price">${fmt(p.price)}${comparePrice}</span>
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
          ${typeTag}
          <h3 class="row__name">${p.name}</h3>
          <p class="row__sub">${p.sub}</p>
          <p class="row__meta"><span class="meta__weight">${p.weight}</span><span class="meta__sep">·</span><span class="meta__promesa">☘ Natural · ♻ Sostenible · ★ Cashback</span></p>
        </div>
      </div>
      <div class="row__tags">
        ${calidadTag}
        ${alimTag}
        ${lecheTag}
        ${zonaTag}
        ${mesesTag}
        ${formatoTag}
        ${saborTag}
      </div>
      ${buyBlock}
    </article>
  `;
}

// Productos "gated" por URL — solo visibles si el visitante viene con un param específico.
// Permite hacer campañas dirigidas (ej: pack-forocochero solo para clicks desde Forocoches).
// El flag se persiste en sessionStorage para que sobreviva navegación interna.
function isForocochesVisitor() {
  try {
    // Si ya activado en esta sesión, lo está
    if (sessionStorage.getItem('mw_fc_visitor') === '1') return true;
    const p = new URLSearchParams(window.location.search);
    const hit = (p.get('utm_source') || '').toLowerCase().includes('forocoches')
             || p.get('fc') === '1'
             || p.get('fc') === 'true';
    if (hit) {
      sessionStorage.setItem('mw_fc_visitor', '1');
      return true;
    }
    return false;
  } catch { return false; }
}

function isProductVisible(p) {
  // pack-forocochero: solo si la URL trae el flag forocochero
  if (p.id === 'pack-forocochero') return isForocochesVisitor();
  return true;
}

function categoryHasProducts(catKey) {
  return PRODUCTS.some(p => p.category === catKey && isProductVisible(p));
}

function updateSectionHeader() {
  const cat = CATEGORIES[state.category];
  if (!cat) return;
  refs.sectionEyebrow.textContent = cat.eyebrow;
  refs.sectionTitle.textContent = cat.title;
}

function render() {
  // Mostrar/ocultar chips sub-level (solo en loncheados)
  refs.chipsSub.hidden = state.category !== 'loncheados';

  updateSectionHeader();

  const hasProducts = categoryHasProducts(state.category);

  // Categoría sin productos → estado "soon"
  if (!hasProducts) {
    refs.list.innerHTML = '';
    refs.resultCount.textContent = '';
    refs.emptyState.hidden = true;
    refs.soonState.hidden = false;
    return;
  }

  refs.soonState.hidden = true;

  const q = state.q.trim().toLowerCase();
  let list = PRODUCTS.filter(p => p.category === state.category && isProductVisible(p));

  // Sub-filtro solo si loncheados
  if (state.category === 'loncheados' && state.sub !== 'all') {
    list = list.filter(p => p.subcat === state.sub);
  }

  list = list.filter(passesFilters);

  if (q) list = list.filter(p => (p.name + ' ' + p.sub + ' ' + (p.pros || []).join(' ')).toLowerCase().includes(q));

  refs.list.innerHTML = list.map(rowHTML).join('');
  refs.resultCount.textContent = `${list.length} producto${list.length === 1 ? '' : 's'}`;
  refs.emptyState.hidden = list.length > 0;
  // Refrescar el discount bar — depende de la categoría activa
  refreshDiscountHints(totalCart());
}

function refreshBuyControl(id, vKey) {
  const key = vKey ? `${id}:${vKey}` : `${id}:`;
  $$(`[data-buy-wrap="${key}"]`).forEach(el => {
    const p = PRODUCTS.find(x => x.id === id);
    const price = vKey ? p.variants.find(v => v.key === vKey).price : p.price;
    el.innerHTML = buyControlHTML(id, vKey, price);
  });
}

// ---------- Cart ----------
// Clasificar un cart entry en su "discount group"
function discountGroupOf(item) {
  // Bundle virtual o producto con descuento standalone: NO entra en escalado de volumen
  if (item.bundleItems && item.packMultiplier) return 'bundle';
  if (item.noVolumeDiscount) return 'bundle';
  const p = PRODUCTS.find(x => x.id === item.productId);
  if (!p) return 'otros';
  if (p.noVolumeDiscount) return 'bundle';
  if (p.category === 'loncheados') return 'loncheados';
  if (p.type === 'Cerveza') return 'cervezas';
  return 'otros';
}

// Reglas de descuento por volumen
function tierLoncheados(qty) {
  if (qty >= 10) return 15;
  if (qty >= 5)  return 10;
  if (qty >= 2)  return 5;
  return 0;
}
function tierCervezas(qty) {
  if (qty >= 6) return 15;
  if (qty >= 3) return 10;
  return 0;
}
function tierOtros(qty) {
  return qty >= 2 ? 5 : 0;
}

// Devuelve estructura completa de totales y descuentos
function totalCart() {
  const groups = {
    loncheados: { qty: 0, items: [] },
    cervezas:   { qty: 0, items: [] },
    otros:      { qty: 0, items: [] },
    bundle:     { qty: 0, items: [] },
  };
  let qtyTotal = 0;
  for (const item of state.cart.values()) {
    const g = discountGroupOf(item);
    groups[g].qty += item.qty;
    groups[g].items.push(item);
    qtyTotal += item.qty;
  }
  const pcts = {
    loncheados: tierLoncheados(groups.loncheados.qty),
    cervezas:   tierCervezas(groups.cervezas.qty),
    otros:      tierOtros(groups.otros.qty),
    bundle:     0,
  };
  let subtotal = 0;
  let total = 0;
  for (const g of Object.keys(groups)) {
    const pct = pcts[g];
    for (const it of groups[g].items) {
      const line = it.price * it.qty;
      subtotal += line;
      total    += line * (1 - pct / 100);
    }
  }
  // Redondeo a 2 decimales (céntimos)
  subtotal = Math.round(subtotal * 100) / 100;
  total    = Math.round(total * 100) / 100;
  const discount = Math.round((subtotal - total) * 100) / 100;
  return { qty: qtyTotal, subtotal, total, discount, eur: total, groups, pcts };
}

function refreshCart() {
  const cart = totalCart();
  // Badge mini-header
  refs.mwCartCount.textContent = cart.qty;
  refs.mwCartCount.hidden = cart.qty === 0;
  // Precio en mini-header (oculto si carrito vacío)
  if (cart.qty === 0) {
    refs.mwCartPrices.hidden = true;
  } else {
    refs.mwCartPrices.hidden = false;
    refs.mwCartNew.textContent = fmt(cart.total);
    if (cart.discount > 0) {
      refs.mwCartOld.textContent = fmt(cart.subtotal);
      refs.mwCartOld.hidden = false;
    } else {
      refs.mwCartOld.hidden = true;
      refs.mwCartOld.textContent = '';
    }
  }
  // Drawer: total visible siempre, re-render si está abierto
  refs.cartDrawerTotal.textContent = fmt(cart.total);
  if (!refs.cartDrawer.hidden) renderCartDrawer();
  if (cart.qty === 0 && !refs.cartDrawer.hidden) closeCartDrawer();
  // Hints en cards
  refreshDiscountHints(cart);
}

// Devuelve mensaje de upsell para una categoría dado el qty actual + pct actual
function nextTierHint(group, currentQty, currentPct) {
  if (group === 'loncheados') {
    if (currentQty < 2)  return { needed: 2 - currentQty,  pct: 5  };
    if (currentQty < 5)  return { needed: 5 - currentQty,  pct: 10 };
    if (currentQty < 10) return { needed: 10 - currentQty, pct: 15 };
    return null;
  }
  if (group === 'cervezas') {
    if (currentQty < 3) return { needed: 3 - currentQty, pct: 10 };
    if (currentQty < 6) return { needed: 6 - currentQty, pct: 15 };
    return null;
  }
  if (group === 'otros') {
    if (currentQty < 2) return { needed: 2 - currentQty, pct: 5 };
    return null;
  }
  return null;
}

// Mapea producto → categoría de descuento (para el hint en cada card)
function productGroup(p) {
  if (p.isVirtualBundle) return null; // packs no muestran hint
  if (p.category === 'loncheados') return 'loncheados';
  if (p.type === 'Cerveza') return 'cervezas';
  return 'otros';
}

// Mapea la categoría top-level activa al group de descuento aplicable
function activeCategoryToGroup() {
  if (state.category === 'loncheados') return 'loncheados';
  // Vinos no entra en "cervezas" pero las cervezas viven en "otros" por category.
  // Para mostrar el hint correcto, miro si en Vinos o Otros tienen cervezas mezcladas
  // Pero simplificación: el "Resto" aplica a cualquier categoría no-loncheados
  return 'otros';
}

// Etiqueta legible para cada grupo (usada en el discount bar)
const GROUP_LABEL = {
  loncheados: 'loncheados',
  cervezas:   'cervezas',
  otros:      'productos del catálogo',
};

// Actualiza el discount-bar (1 sola barra arriba del listado)
function refreshDiscountHints(cart) {
  const bar = document.getElementById('discountBar');
  if (!bar) return;
  // El grupo más relevante a mostrar depende de la categoría activa
  // - Loncheados → group loncheados
  // - Otras → group otros (escalado 5% con ≥2 productos del catálogo no-loncheados)
  // - Si están viendo Vinos/Otros y tienen cervezas, mostramos también el de cervezas si hay
  const group = activeCategoryToGroup();
  const groupQty = cart.groups[group]?.qty || 0;
  const currentPct = cart.pcts[group] || 0;
  const next = nextTierHint(group, groupQty, currentPct);

  // En cervezas y otros, el escalado tiene mensaje diferente
  let msg = '';
  let ok = false;
  if (next) {
    const label = GROUP_LABEL[group] || 'productos';
    msg = `<span class="discount-bar__text"><strong>Hazte un pack y ahorra</strong> · Añade <strong>${next.needed}</strong> ${label} más y te llevas <strong>${next.pct}%</strong> de descuento</span>`;
  } else if (currentPct > 0) {
    msg = `<span class="discount-bar__icon">✅</span><span class="discount-bar__text">¡Ya tienes <strong>${currentPct}%</strong> de descuento aplicado en esta categoría!</span>`;
    ok = true;
  } else {
    // Sin items relevantes — mostramos el claim genérico
    if (group === 'loncheados') {
      msg = `<span class="discount-bar__text"><strong>Compra sin paja</strong> · Junta loncheados y ahorra hasta <strong>15%</strong> (2→5% · 5→10% · 10→15%)</span>`;
    } else {
      msg = `<span class="discount-bar__text"><strong>Hazte un pack y ahorra</strong> · Junta 2+ productos del catálogo = <strong>5%</strong> de descuento</span>`;
    }
  }
  bar.innerHTML = msg;
  bar.hidden = false;
  bar.classList.toggle('discount-bar--ok', ok);
}

// ---------- Cart drawer ----------
function cartItemHTML(item, key) {
  return `
    <article class="ci" data-cikey="${key}">
      <div class="ci__info">
        <h4 class="ci__name">${item.name}</h4>
        <p class="ci__price"><strong>${fmt(item.price * item.qty)}</strong><span>·</span><span>${fmt(item.price)} c/u</span></p>
      </div>
      <div class="ci__qty">
        <button data-ci-mod="sub" data-cikey="${key}" aria-label="Quitar">−</button>
        <span class="ci__qty-num">${item.qty}</span>
        <button data-ci-mod="add" data-cikey="${key}" aria-label="Sumar">+</button>
      </div>
    </article>
  `;
}
function renderCartDrawer() {
  const html = [];
  for (const [key, item] of state.cart.entries()) {
    html.push(cartItemHTML(item, key));
  }
  // Desglose de descuentos
  const cart = totalCart();
  const breakdownParts = [];
  const labels = { loncheados: 'Loncheados', cervezas: 'Cervezas', otros: 'Resto' };
  for (const g of ['loncheados','cervezas','otros']) {
    const pct = cart.pcts[g];
    if (pct > 0) {
      breakdownParts.push(`<div class="ci-disc"><span>${labels[g]} ×${cart.groups[g].qty}</span><span class="ci-disc__pct">−${pct}%</span></div>`);
    }
  }
  // Hint del siguiente tier
  const hints = [];
  for (const g of ['loncheados','cervezas','otros']) {
    const next = nextTierHint(g, cart.groups[g].qty, cart.pcts[g]);
    if (next && cart.groups[g].qty > 0) {
      hints.push(`<div class="ci-hint">Añade <strong>${next.needed}</strong> de ${labels[g]} más y ahorras <strong>${next.pct}%</strong></div>`);
    }
  }
  if (breakdownParts.length || hints.length || cart.discount > 0) {
    html.push(`<div class="cart-drawer__breakdown">
      <div class="ci-sub"><span>Subtotal</span><span class="ci-sub__val">${fmt(cart.subtotal)}</span></div>
      ${breakdownParts.join('')}
      ${cart.discount > 0 ? `<div class="ci-disc-total"><span>Ahorras</span><span class="ci-disc-total__val">−${fmt(cart.discount)}</span></div>` : ''}
      ${hints.join('')}
    </div>`);
  }
  refs.cartDrawerList.innerHTML = html.join('');
}
function openCartDrawer() {
  renderCartDrawer();
  refs.cartDrawer.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeCartDrawer() {
  refs.cartDrawer.hidden = true;
  document.body.style.overflow = '';
}

// ---------- Exit modal (confirmación al salir a la web completa) ----------
function openExitModal(targetUrl) {
  if (targetUrl) refs.exitConfirm.href = targetUrl;
  refs.exitModal.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeExitModal() {
  refs.exitModal.hidden = true;
  document.body.style.overflow = '';
}

// ---------- Upsell modal (Pack Forocochero → corte Cuchillo) ----------
function openUpsellModal() {
  const p = PRODUCTS.find(x => x.id === 'pack-forocochero');
  if (!p || !p.cuchilloUpgrade) return;
  refs.upsellImage.src = p.cuchilloUpgrade.image;
  refs.upsellDelta.textContent = '+' + fmt(totalUpgradeDelta());
  refs.upsellModal.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeUpsellModal() {
  refs.upsellModal.hidden = true;
  document.body.style.overflow = '';
}
// Modifica el carrito por key (id:vKey) — usado dentro del drawer
function modifyCartByKey(key, delta) {
  const [id, vRaw] = key.split(':');
  const vKey = vRaw && vRaw.length ? vRaw : null;
  modifyCart(id, vKey, delta);
}
function modifyCart(id, vKey, delta) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  let price, label, sId, sHandle;
  let bundleItems = null;
  let packMultiplier = null;
  let qtyMultiplier = 1;
  if (p.variants) {
    const v = p.variants.find(x => x.key === vKey);
    if (!v || v.soldout) return;
    price = v.price; sId = v.shopifyId; sHandle = v.shopifyHandle || p.shopifyHandle;
    const vLabel = (CORTE[vKey] && CORTE[vKey].label) || v.label || vKey;
    label = `${p.name} (${vLabel})`;
    // Bundle virtual: capturar items + multiplicador
    if (p.isVirtualBundle && p.bundleItems && v.packMultiplier) {
      bundleItems = p.bundleItems;
      packMultiplier = v.packMultiplier;
    }
    // Variant con qtyMultiplier (e.g. Pack Forocochero "2 PACKS" → multiplica qty al añadir a Shopify)
    if (v.qtyMultiplier && v.qtyMultiplier > 1) qtyMultiplier = v.qtyMultiplier;
  } else {
    price = p.price; sId = p.shopifyId; sHandle = p.shopifyHandle;
    label = p.name;
  }
  const key = cartKey(id, vKey);
  const existing = state.cart.get(key);
  const newQty = (existing?.qty || 0) + delta;
  if (newQty <= 0) {
    state.cart.delete(key);
  } else {
    state.cart.set(key, {
      qty: newQty, price, name: label,
      shopifyId: sId, shopifyHandle: sHandle,
      bundleItems, packMultiplier, qtyMultiplier,
      productId: id, variantKey: vKey,
    });
  }
  refreshCart();
  refreshBuyControl(id, vKey);
}

// ---------- Cuchillo upgrade helpers ----------
// Modal upsell: se dispara si en el cart hay alguna variant 'maq-*' del Pack Forocochero
// (la decisión queda implícita en el variantKey; si el user ya eligió 'cuch-*' en la card no se ofrece).
function cartForococheroNeedsUpgrade() {
  const p = PRODUCTS.find(x => x.id === 'pack-forocochero');
  if (!p?.cuchilloUpgrade?.swap) return false;
  for (const it of state.cart.values()) {
    if (it.productId !== 'pack-forocochero') continue;
    if (p.cuchilloUpgrade.swap[it.variantKey]) return true;
  }
  return false;
}

// Suma total de delta (+5€ por 1pack, +10€ por 2packs) considerando qty de cada entrada maq-*
function totalUpgradeDelta() {
  const p = PRODUCTS.find(x => x.id === 'pack-forocochero');
  if (!p?.cuchilloUpgrade?.swap) return 0;
  let sum = 0;
  for (const it of state.cart.values()) {
    if (it.productId !== 'pack-forocochero') continue;
    const swap = p.cuchilloUpgrade.swap[it.variantKey];
    if (swap) sum += swap.delta * it.qty;
  }
  return sum;
}

// Swap in-place de cada entry maq-* por su target cuch-*. Re-keys el Map del cart.
function applyCuchilloUpgrade() {
  const p = PRODUCTS.find(x => x.id === 'pack-forocochero');
  if (!p?.cuchilloUpgrade?.swap) return;
  const swaps = [];
  for (const [key, it] of state.cart.entries()) {
    if (it.productId !== 'pack-forocochero') continue;
    const swap = p.cuchilloUpgrade.swap[it.variantKey];
    if (!swap) continue;
    const target = p.variants.find(v => v.key === swap.target);
    if (!target) continue;
    swaps.push({ oldKey: key, entry: it, target });
  }
  for (const { oldKey, entry, target } of swaps) {
    state.cart.delete(oldKey);
    state.cart.set(cartKey(entry.productId, target.key), {
      ...entry,
      price: target.price,
      shopifyId: target.shopifyId,
      shopifyHandle: target.shopifyHandle,
      qtyMultiplier: target.qtyMultiplier || 1,
      name: `${p.name} (${target.label})`,
      variantKey: target.key,
    });
  }
  refreshCart();
}

// ---------- Shopify cart ----------
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
  } catch (e) {}
  variantCache.set(handle, fallbackId);
  return fallbackId;
}

function isShopifyHost() {
  const h = window.location.hostname;
  return h.includes('shopify') || h.includes('monjamonymas');
}

// Expande un entry del cart a items individuales para Shopify cart/add.
// - Items normales → { id, qty } (1 línea)
// - Bundles virtuales → N líneas (una por cada bundleItem × packMultiplier × qty)
function expandCartEntry(entry) {
  // bundle virtual?
  if (entry.bundleItems && entry.packMultiplier) {
    return entry.bundleItems.map(bi => ({
      shopifyId: bi.shopifyId,
      shopifyHandle: bi.shopifyHandle,
      quantity: bi.qty * entry.packMultiplier * entry.qty,
    }));
  }
  // qtyMultiplier (e.g. variant "2 PACKS" envía qty×2 del mismo shopifyId al cart)
  const mult = entry.qtyMultiplier && entry.qtyMultiplier > 1 ? entry.qtyMultiplier : 1;
  return [{ shopifyId: entry.shopifyId, shopifyHandle: entry.shopifyHandle, quantity: entry.qty * mult }];
}

async function checkoutShopify() {
  const entries = [...state.cart.values()];
  // Expandir cada entry (los bundles virtuales se convierten en sus items individuales)
  const expanded = entries.flatMap(expandCartEntry);
  // Mergear duplicados por shopifyId (clave real de variante). Fallback a handle solo si no hay id.
  // NUNCA usar shopifyHandle como clave principal: variantes del mismo producto (Vela, Bravoleum, Longaniza)
  // comparten handle y el merge colapsaría todas en la primera variante elegida.
  const merged = new Map();
  for (const it of expanded) {
    const key = it.shopifyId != null ? `id-${it.shopifyId}` : it.shopifyHandle;
    const existing = merged.get(key);
    if (existing) {
      existing.quantity += it.quantity;
    } else {
      merged.set(key, { ...it });
    }
  }
  const list = [...merged.values()];
  let items;
  if (isShopifyHost()) {
    items = await Promise.all(
      list.map(async (item) => ({
        // CRÍTICO: usar shopifyId directo si lo tenemos (es el variant_id real).
        // Solo caer a resolveVariantId si por algún motivo no lo tenemos.
        // resolveVariantId hace fetch del handle y devuelve variants[0] (la 1ª) — eso ROMPÍA productos multi-variant
        id: item.shopifyId ?? await resolveVariantId(item.shopifyHandle, null),
        quantity: item.quantity,
      }))
    );
  } else {
    items = list.map(item => ({ id: item.shopifyId, quantity: item.quantity, _handle: item.shopifyHandle }));
  }
  const validItems = items.filter(it => it.id != null);
  if (validItems.length === 0) {
    alert('No hay productos válidos en la cesta.');
    return;
  }
  if (!isShopifyHost()) {
    alert('🛒 Modo demo (fuera de Shopify).\n\n' + JSON.stringify(validItems, null, 2));
    return;
  }
  try {
    const res = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ items: validItems }),
    });
    if (res.ok) {
      // Los descuentos están configurados como Discount Automáticos en Shopify Admin,
      // así que basta con redirigir a /cart — Shopify aplica el % correspondiente
      // (loncheados / cervezas / resto) detectando los items del carrito.
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
  // No pre-seleccionar variante — fuerza al user a elegir explícitamente.
  // Excepción: productos dualAxis (siempre tienen una combinación válida) y los de 1 sola variante.
  state.sheetVariant = null;
  if (p.dualAxis) {
    const dv = dualAxisVariant(p, getDualSel(p));
    if (dv) state.sheetVariant = dv.key;
  } else if (p.variants && p.variants.length === 1 && !p.variants[0].soldout) {
    state.sheetVariant = p.variants[0].key;
  }

  const flag = p.flag && FLAG[p.flag]
    ? `<span class="row__flag" style="position:static; margin-bottom:10px;"><img src="${FLAG[p.flag].icon}" alt=""><span>${FLAG[p.flag].label}</span></span>`
    : '';
  const pros = (p.pros || []).map(t => `<li>${t}</li>`).join('');

  const vSection = p.dualAxis
    ? dualAxisSheetHTML(p)
    : p.variants
      ? `<div class="sheet__variants">
          <p class="sheet__vtitle">${CORTE[p.variants[0].key] ? 'Elige tu corte' : 'Elige variante'}</p>
          <div class="vrow" data-sheet-vtoggle>
            ${p.variants.map(v => {
              const vh = variantHead(p, v);
              const compareVal = p.isVirtualBundle ? v.compare : autoCompare(v.price, v.compare);
              const cmp = compareVal ? `<span class="vbtn__compare">${fmt(compareVal)}</span>` : '';
              const sub = v.sublabel ? `<span class="vbtn__sublabel">${v.sublabel}</span>` : '';
              return `
                <button class="vbtn vbtn--sheet ${v.key === state.sheetVariant ? 'is-active' : ''} ${v.soldout ? 'is-soldout' : ''}" data-v="${v.key}" ${v.soldout ? 'disabled' : ''}>
                  <span class="vbtn__head">
                    ${vh.icon ? `<img src="${vh.icon}" alt="">` : ''}
                    <span class="vbtn__label">${vh.label}</span>
                    ${v.soldout ? '<span class="vbtn__sold">Agotado</span>' : ''}
                  </span>
                  ${sub}
                  <span class="vbtn__foot"><strong>${fmt(v.price)}</strong>${cmp}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>`
      : p.cut && CORTE[p.cut]
        ? `<div class="sheet__variants">
            <p class="sheet__vtitle">Corte</p>
            <div class="vsingle vsingle--big">
              <img src="${CORTE[p.cut].icon}" alt=""><span>${CORTE[p.cut].label}</span>
            </div>
          </div>`
        : '';

  const specs = [];
  if (p.calidad)      specs.push(`<div class="spec"><img src="${CALIDAD[p.calidad].icon}" alt=""><div><small>Calidad</small><strong>${CALIDAD[p.calidad].label}</strong></div></div>`);
  if (p.alimentacion && ALIM[p.alimentacion]) specs.push(`<div class="spec"><img src="${ALIM[p.alimentacion].icon}" alt=""><div><small>Alimentación</small><strong>${ALIM[p.alimentacion].label}</strong></div></div>`);
  if (p.leche && LECHE[p.leche])     specs.push(`<div class="spec spec--noicon"><div><small>Leche</small><strong>${LECHE[p.leche].label}</strong></div></div>`);
  if (p.zona)         specs.push(`<div class="spec spec--noicon"><div><small>Zona</small><strong>${p.zona}</strong></div></div>`);
  if (p.formato && FORMATO[p.formato]) specs.push(`<div class="spec spec--noicon"><div><small>Formato</small><strong>${FORMATO[p.formato].label}</strong></div></div>`);
  if (p.meses != null && MESES[p.meses]) specs.push(`<div class="spec"><img src="${MESES[p.meses].icon}" alt=""><div><small>Curación</small><strong>${MESES[p.meses].label}</strong></div></div>`);
  if (p.sabor && SABOR[p.sabor]) specs.push(`<div class="spec spec--noicon"><div><small>Sabor</small><strong>${velasHTML(SABOR[p.sabor].velas)} ${SABOR[p.sabor].label}</strong></div></div>`);

  refs.sheetBody.innerHTML = `
    <div class="sheet__gallery" data-gallery>
      <img src="${p.icon}" alt="${p.name}" data-gimg />
    </div>
    ${flag}
    <h2 class="sheet__name">${p.name}</h2>
    <p class="sheet__line">${p.sub}</p>
    <p class="sheet__meta sheet__meta--top"><span>${p.weight}</span><span class="meta__sep">·</span><span>☘ Natural · ♻ Sostenible · ★ Cashback</span></p>
    ${pros ? `<ul class="sheet__pros">${pros}</ul>` : ''}
    <div class="sheet__desc-wrap" data-desc-wrap>
      <p class="sheet__desc">${p.desc || ''}</p>
      <button class="sheet__more" data-desc-toggle type="button">
        <span class="more__label">Ver más</span>
        <span class="more__icon">▾</span>
      </button>
    </div>
    ${vSection}
    ${specs.length ? `<div class="sheet__specs">${specs.join('')}</div>` : ''}
  `;
  refs.sheet.hidden = false;
  document.body.style.overflow = 'hidden';
  updateSheetTotal();
  const galleryHandle = p.shopifyHandle
    || p.variants?.find(v => v.key === state.sheetVariant)?.shopifyHandle
    || p.variants?.[0]?.shopifyHandle;
  loadGallery(galleryHandle);
}

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
  } catch (e) {}
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
  const addLabelEl = refs.sheetAdd.querySelector('span:first-child');
  if (p.variants) {
    if (!state.sheetVariant) {
      // No hay variante elegida → button disabled + texto "Elige opción"
      refs.sheetAdd.disabled = true;
      if (addLabelEl) addLabelEl.textContent = 'Elige una opción';
      refs.sheetTotal.textContent = '';
      return;
    }
    const v = p.variants.find(x => x.key === state.sheetVariant);
    price = v?.price ?? 0;
    refs.sheetAdd.disabled = !!v?.soldout;
    if (addLabelEl) addLabelEl.textContent = v?.soldout ? 'Agotado' : 'Añadir';
  } else {
    price = p.price;
    refs.sheetAdd.disabled = false;
    if (addLabelEl) addLabelEl.textContent = 'Añadir';
  }
  refs.sheetTotal.textContent = fmt(price * state.sheetQty);
}

// ---------- Panel filtros ----------
// Calidad: siempre visible.
// Alimentación + Meses: loncheados y jamones-paletas.
// Sabor: loncheados, embutidos y jamones-paletas.
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
  const cat = state.category;
  let html = group('calidad', CALIDAD, 'Calidad', { compact: true });
  if (cat === 'loncheados' || cat === 'jamones-paletas') {
    html += group('alimentacion', ALIM, 'Alimentación');
  }
  if (cat === 'loncheados' || cat === 'embutidos' || cat === 'jamones-paletas') {
    html += group('sabor', SABOR, 'Sabor', { compact: true });
  }
  if (cat === 'loncheados' || cat === 'jamones-paletas') {
    html += group('meses', MESES, 'Meses de curación');
  }
  return html;
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
  refs.chipsTop.addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    $$('.chip', refs.chipsTop).forEach(c => c.classList.remove('is-active'));
    btn.classList.add('is-active');
    state.category = btn.dataset.cat;
    state.sub = 'all';
    // Reset sub-chips
    $$('.chip', refs.chipsSub).forEach(c => c.classList.toggle('is-active', c.dataset.sub === 'all'));
    // Re-render filter panel si está abierto (porque cambia el set de filtros)
    if (state.showFilters) renderFilterPanel();
    render();
  });

  refs.chipsSub.addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    $$('.chip', refs.chipsSub).forEach(c => c.classList.remove('is-active'));
    btn.classList.add('is-active');
    state.sub = btn.dataset.sub;
    render();
  });

  refs.searchInput.addEventListener('input', (e) => {
    state.q = e.target.value;
    render();
  });

  refs.list.addEventListener('click', (e) => {
    // DualAxis chips en card — actualizan la selección activa y re-renderizan el foot (precio + botón)
    const daChip = e.target.closest('.row__dualaxis [data-axis] .dachip');
    if (daChip) {
      e.stopPropagation();
      const axisGroup = daChip.closest('[data-axis]');
      const root      = daChip.closest('.row__dualaxis');
      const axisKey   = axisGroup.dataset.axis;
      const val       = daChip.dataset.val;
      const productId = root.dataset.dualaxisProduct;
      const p         = PRODUCTS.find(x => x.id === productId);
      if (!p) return;
      setDualSel(p, axisKey, val);
      axisGroup.querySelectorAll('.dachip').forEach(c => c.classList.toggle('is-active', c === daChip));
      const v   = dualAxisVariant(p, getDualSel(p));
      const foot = root.querySelector(`[data-dualaxis-foot="${productId}"]`);
      if (foot) foot.innerHTML = dualAxisFootInnerHTML(p, v);
      return;
    }
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
    state.q = ''; state.sub = 'all';
    Object.values(state.filters).forEach(s => s.clear());
    refs.searchInput.value = '';
    $$('.chip', refs.chipsSub).forEach(c => c.classList.toggle('is-active', c.dataset.sub === 'all'));
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
      const _p = PRODUCTS.find(x => x.id === state.sheetId);
      const _h = _p?.variants?.find(v => v.key === state.sheetVariant)?.shopifyHandle || _p?.shopifyHandle;
      if (_h) loadGallery(_h);
    }
    // DualAxis chips en sheet — selecciona valor del eje, recalcula sheetVariant y recarga galería
    const daChipS = e.target.closest('[data-sheet-dualaxis] .dachip');
    if (daChipS && !daChipS.disabled) {
      const axisGroup = daChipS.closest('[data-sheet-dualaxis]');
      const axisKey   = axisGroup.dataset.sheetDualaxis;
      const val       = daChipS.dataset.val;
      const _p = PRODUCTS.find(x => x.id === state.sheetId);
      if (_p && _p.dualAxis) {
        setDualSel(_p, axisKey, val);
        axisGroup.querySelectorAll('.dachip').forEach(c => c.classList.toggle('is-active', c === daChipS));
        const dv = dualAxisVariant(_p, getDualSel(_p));
        if (dv) {
          state.sheetVariant = dv.key;
          updateSheetTotal();
          const _h = dv.shopifyHandle || _p.shopifyHandle;
          if (_h) loadGallery(_h);
        }
        // Sincroniza el DOM de la card del catálogo (si está visible) para evitar inconsistencia visual
        const cardRoot = refs.list.querySelector(`[data-dualaxis-product="${_p.id}"]`);
        if (cardRoot && dv) {
          const cardAxis = cardRoot.querySelector(`[data-axis="${axisKey}"]`);
          if (cardAxis) cardAxis.querySelectorAll('.dachip').forEach(c => c.classList.toggle('is-active', c.dataset.val === val));
          const foot = cardRoot.querySelector(`[data-dualaxis-foot="${_p.id}"]`);
          if (foot) foot.innerHTML = dualAxisFootInnerHTML(_p, dv);
        }
      }
    }
    const gNav = e.target.closest('[data-gnav]');
    if (gNav) {
      e.stopPropagation();
      navGallery(parseInt(gNav.dataset.gnav, 10));
    }
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
      else if (!refs.upsellModal.hidden) closeUpsellModal();
      else if (!refs.exitModal.hidden) closeExitModal();
      else if (!refs.cartDrawer.hidden) closeCartDrawer();
      else if (state.showFilters) toggleFilterPanel(false);
    }
  });

  // Botón carrito en el mini-header → abre el drawer
  refs.mwCartBtn.addEventListener('click', openCartDrawer);

  // Interceptor de links con data-confirm-exit → abre modal de confirmación
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-confirm-exit]');
    if (!link) return;
    e.preventDefault();
    openExitModal(link.getAttribute('href') || '/');
  });

  // Cerrar exit modal (backdrop o botón NO) + el SI hace navegación natural via href
  refs.exitModal.addEventListener('click', (e) => {
    if (e.target.closest('[data-close]')) closeExitModal();
  });

  // Drawer: cerrar (backdrop / X) y manipular qty / checkout
  refs.cartDrawer.addEventListener('click', (e) => {
    if (e.target.closest('[data-close]')) { closeCartDrawer(); return; }
    const qBtn = e.target.closest('[data-ci-mod]');
    if (qBtn) {
      e.stopPropagation();
      const key = qBtn.dataset.cikey;
      const delta = qBtn.dataset.ciMod === 'add' ? 1 : -1;
      modifyCartByKey(key, delta);
      pop(qBtn);
    }
  });
  // Click en IR AL CARRITO: si hay Pack Forocochero aún sin upgradear, mostrar modal upsell.
  // Si el usuario acepta → swap + checkout. Si rechaza → checkout normal.
  refs.cartCheckout.addEventListener('click', () => {
    if (cartForococheroNeedsUpgrade()) {
      openUpsellModal();
    } else {
      checkoutShopify();
    }
  });

  // Modal upsell: backdrop / × cierran sin acción; aceptar swap-ea, rechazar sigue al cart
  refs.upsellModal.addEventListener('click', (e) => {
    if (e.target.closest('[data-upsell-accept]')) {
      applyCuchilloUpgrade();
      closeUpsellModal();
      checkoutShopify();
      return;
    }
    if (e.target.closest('[data-upsell-decline]')) {
      closeUpsellModal();
      checkoutShopify();
      return;
    }
    if (e.target.closest('[data-close]')) {
      closeUpsellModal();
    }
  });
}
function pop(el) {
  el.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(0.85)' }, { transform: 'scale(1)' }],
    { duration: 220, easing: 'ease-out' }
  );
}

// Claim banner del toolbar — texto distinto si el visitante viene de Forocoches
function setClaimBannerText() {
  const el = document.getElementById('claimBannerText');
  if (!el) return;
  el.textContent = isForocochesVisitor()
    ? 'PEDIDOS +60€ | Obsequio Sorpresa + Invitación a Forocoches'
    : 'PEDIDOS +60€ | Obsequio Sorpresa';
}

render(); refreshCart(); wire(); setClaimBannerText();
