/* =========================================================
   AR Retailers & Wholesalers — storefront app
   Catalog + search + cart + accounts + checkout (client-side).
   NOTE: accounts/orders live in this browser's localStorage.
   Production needs a real backend + payment gateway (PayFast /
   Yoco / Shopify). Prices marked null = enquire via WhatsApp.
   ========================================================= */

const WA = "27662098554";
const STORE_ADDR = "Cnr Dawid & Claude Rd, Athlone Industria 1, Cape Town 7764";

/* ---------------- categories ---------------- */
const CATS = {
  clothing: { name: "Clothing", ico: "👕", page: "clothing.html",
    subs: { tops: "Tops", pants: "Pants", hoodies: "Hoodies", jackets: "Jackets" } },
  shoes: { name: "Shoes", ico: "👟", page: "shoes.html",
    subs: { takkies: "Takkies", sandals: "Sandals", flipflops: "Flip Flops" } },
  home: { name: "Home Appliances", ico: "🏠", page: "home-appliances.html",
    subs: { electronic: "Electronic Appliances", cleaning: "Cleaning Supplies",
            nonelectric: "Non-Electrical Appliances", tupperware: "Tupperware" } },
  food: { name: "Food", ico: "🍬", page: "food.html",
    subs: { sweets: "Sweets & Chocolates", products: "Food Products" } },
  outdoor: { name: "Outdoor", ico: "⛺", page: "outdoor.html",
    subs: { appliances: "Appliances", tents: "Tents", lights: "Lights", furniture: "Chairs & Tables" } },
  office: { name: "Office Supplies", ico: "✏️", page: "office-supplies.html",
    subs: { books: "Books", pens: "Pens & Pencils", stationery: "Other Stationery" } },
  other: { name: "Other", ico: "🎁", page: "other.html",
    subs: { beauty: "Hair & Beauty", textiles: "Home Textiles", gifts: "Gifts & Fan Merch",
            pets: "Pet Supplies", seasonal: "Seasonal & Specials" } },
};

/* ---------------- product catalog ----------------
   price:null => "Enquire" (WhatsApp). deal:true => badge. */
const PRODUCTS = [
  // clothing
  { id: "tops-tiedye", n: "Tie-Dye Tops", cat: "clothing", sub: "tops", e: "👕", u: "each", price: 149.99, deal: true, img: 1 },
  { id: "dress-floral", n: "Floral Dresses", cat: "clothing", sub: "tops", e: "👗", u: "each", price: 99.99, deal: true, img: 1 },
  { id: "tops-ladies", n: "Ladies Fashion Tops", cat: "clothing", sub: "tops", e: "👚", u: "each", price: null },
  { id: "socks-char", n: "Novelty Character Socks", cat: "clothing", sub: "tops", e: "🧦", u: "3-pair pack", price: null, img: 1 },
  { id: "denim-skirt", n: "Distressed Denim Skirt", cat: "clothing", sub: "pants", e: "👖", u: "each", price: 120, deal: true, img: 1 },
  { id: "denim-jeans", n: "Denim Jeans", cat: "clothing", sub: "pants", e: "👖", u: "each", price: null },
  { id: "trackpants", n: "Trackpants", cat: "clothing", sub: "pants", e: "🩳", u: "each", price: null },
  { id: "tracksuit", n: "Assorted Branded Tracksuits", cat: "clothing", sub: "hoodies", e: "🧥", u: "per set", price: 179.99, deal: true, img: 1 },
  { id: "hoodie-fleece", n: "Fleece Hoodies", cat: "clothing", sub: "hoodies", e: "🧥", u: "each", price: null },
  { id: "jacket-winter", n: "Winter Jackets", cat: "clothing", sub: "jackets", e: "🧥", u: "each", price: null },
  { id: "jacket-puffer", n: "Puffer Jackets", cat: "clothing", sub: "jackets", e: "🧥", u: "each", price: null },
  // shoes
  { id: "takkies-casual", n: "Casual Takkies", cat: "shoes", sub: "takkies", e: "👟", u: "per pair", price: null },
  { id: "takkies-sport", n: "Sports Takkies", cat: "shoes", sub: "takkies", e: "👟", u: "per pair", price: null },
  { id: "takkies-kids", n: "Kids Takkies", cat: "shoes", sub: "takkies", e: "👟", u: "per pair", price: null },
  { id: "sandals-summer", n: "Sandals — Any 2 Pairs", cat: "shoes", sub: "sandals", e: "👡", u: "2 pairs", price: 25, deal: true, img: 1 },
  { id: "sandals-marvella", n: "Ladies Summer Fashion Sandals", cat: "shoes", sub: "sandals", e: "👡", u: "per pair", price: null, img: 1 },
  { id: "slipins-polo", n: "Polo Slip-Ins", cat: "shoes", sub: "flipflops", e: "🩴", u: "per pair", price: 69.99, deal: true, img: 1 },
  { id: "slipins-tassel", n: "Tassel Slip-Ins", cat: "shoes", sub: "flipflops", e: "🩴", u: "per pair", price: 59.99, deal: true, img: 1 },
  { id: "flipflops-kids", n: "Kiddies Character Flip Flops", cat: "shoes", sub: "flipflops", e: "🩴", u: "per pair", price: 29.99, deal: true, img: 1 },
  { id: "flipflops", n: "Slip-Inns & Flip Flops", cat: "shoes", sub: "flipflops", e: "🩴", u: "per pair", price: null, img: 1 },
  { id: "slippers-fluffy", n: "Ladies Fashion Slippers", cat: "shoes", sub: "flipflops", e: "🥿", u: "per pair", price: null, img: 1 },
  // home appliances
  { id: "phone-fan", n: "Mini Phone Fan (USB)", cat: "home", sub: "electronic", e: "🌀", u: "each", price: 14.99, deal: true },
  { id: "usb-light", n: "USB LED Light", cat: "home", sub: "electronic", e: "💡", u: "each", price: 14.99, deal: true },
  { id: "ring-light", n: "26cm Ring Light + Tripod", cat: "home", sub: "electronic", e: "📸", u: "each", price: 199, deal: true, img: 1 },
  { id: "small-appliances", n: "Kettles & Small Appliances", cat: "home", sub: "electronic", e: "🫖", u: "each", price: null },
  { id: "refuse-bags", n: "Heavy-Duty Refuse Bags (20-pack)", cat: "home", sub: "cleaning", e: "🗑️", u: "20-pack", price: 20, deal: true, img: 1 },
  { id: "fogger", n: "Sanitising Foggers (70% Alcohol)", cat: "home", sub: "cleaning", e: "🧴", u: "each", price: 19.99, deal: true, img: 1 },
  { id: "cleaning-ess", n: "Cleaning Essentials", cat: "home", sub: "cleaning", e: "🧴", u: "each", price: null },
  { id: "dishcloths", n: "Dishcloths & Facecloths", cat: "home", sub: "cleaning", e: "🧽", u: "per pack", price: null },
  { id: "glass-set", n: "Drinking Glasses (6pc Set)", cat: "home", sub: "nonelectric", e: "🥛", u: "6-pc set", price: null, img: 1 },
  { id: "tumblers", n: "350ml Plastic Cups (10pc)", cat: "home", sub: "nonelectric", e: "🥤", u: "10-pack", price: null, img: 1 },
  { id: "crockery", n: "Crockery & Dinner Sets", cat: "home", sub: "nonelectric", e: "🍽️", u: "per set", price: null },
  { id: "utensils", n: "Kitchen Utensils", cat: "home", sub: "nonelectric", e: "🥄", u: "each", price: null },
  { id: "otima-5pc", n: "Otima 5-Piece Storage Set", cat: "home", sub: "tupperware", e: "🥡", u: "5-pc set", price: 29.99, deal: true },
  { id: "containers", n: "Storage Containers", cat: "home", sub: "tupperware", e: "📦", u: "each", price: null },
  { id: "lunchboxes", n: "Lunch Boxes", cat: "home", sub: "tupperware", e: "🍱", u: "each", price: null },
  // food
  { id: "sweets", n: "Assorted Sweets", cat: "food", sub: "sweets", e: "🍬", u: "per pack", price: null },
  { id: "chocolates", n: "Chocolates", cat: "food", sub: "sweets", e: "🍫", u: "per pack", price: null },
  { id: "party-packs", n: "Party Packs", cat: "food", sub: "sweets", e: "🎉", u: "per pack", price: null },
  { id: "pantry", n: "Pantry Staples", cat: "food", sub: "products", e: "🛒", u: "each", price: null },
  { id: "eid-treats", n: "Eid & Seasonal Treats", cat: "food", sub: "products", e: "🌙", u: "per pack", price: null },
  // outdoor
  { id: "camp-cooker", n: "Camping Cookers", cat: "outdoor", sub: "appliances", e: "🔥", u: "each", price: null },
  { id: "cooler-box", n: "Cooler Boxes", cat: "outdoor", sub: "appliances", e: "🧊", u: "each", price: null },
  { id: "tent", n: "Camping Tents", cat: "outdoor", sub: "tents", e: "⛺", u: "each", price: null },
  { id: "gazebo", n: "Gazebos", cat: "outdoor", sub: "tents", e: "⛱️", u: "each", price: null },
  { id: "camp-light", n: "USB Camping Light", cat: "outdoor", sub: "lights", e: "🔦", u: "each", price: 14.99, deal: true },
  { id: "solar-light", n: "Solar Lights", cat: "outdoor", sub: "lights", e: "🔆", u: "each", price: null },
  { id: "camp-chair", n: "Camping Chairs", cat: "outdoor", sub: "furniture", e: "🪑", u: "each", price: null },
  { id: "fold-table", n: "Folding Tables", cat: "outdoor", sub: "furniture", e: "🪑", u: "each", price: null },
  // office
  { id: "ex-books", n: "Exercise Books", cat: "office", sub: "books", e: "📚", u: "each", price: null },
  { id: "notebooks", n: "Notebooks", cat: "office", sub: "books", e: "📓", u: "each", price: null },
  { id: "pens-multi", n: "3-in-1 Pens", cat: "office", sub: "pens", e: "🖊️", u: "each", price: null, img: 1 },
  { id: "pencils", n: "Pencils & Crayons", cat: "office", sub: "pens", e: "✏️", u: "per pack", price: null },
  { id: "stickers", n: "Stickers", cat: "office", sub: "stationery", e: "✨", u: "per sheet", price: null },
  { id: "glue", n: "Glue Sticks & Glue", cat: "office", sub: "stationery", e: "🖇️", u: "each", price: null },
  { id: "tipex", n: "Tipp-Ex / Correction Fluid", cat: "office", sub: "stationery", e: "🖍️", u: "each", price: null },
  { id: "tape", n: "Tape & Adhesives", cat: "office", sub: "stationery", e: "📎", u: "each", price: null },
  { id: "school-packs", n: "School Stationery Packs", cat: "office", sub: "stationery", e: "🎒", u: "per pack", price: null },
  // other
  { id: "bonnets", n: "Satin Bonnets — Assorted Branded Prints", cat: "other", sub: "beauty", e: "🎀", u: "each / bulk", price: 25, deal: true, img: 1 },
  { id: "faceshield", n: "Face Shields", cat: "other", sub: "beauty", e: "🥽", u: "each", price: 4.99, deal: true, img: 1 },
  { id: "jewellery", n: "Costume Jewellery", cat: "other", sub: "beauty", e: "💍", u: "each", price: null },
  { id: "blanket", n: "Fluffy Blankets & Throws", cat: "other", sub: "textiles", e: "🛏️", u: "each", price: null },
  { id: "carpet", n: "Carpets — All Carpets", cat: "other", sub: "textiles", e: "🧶", u: "each", price: 199, deal: true },
  { id: "rugs", n: "Shaggy Rugs 1.3m × 2.0m", cat: "other", sub: "textiles", e: "🧶", u: "each", price: 299, deal: true, img: 1 },
  { id: "beach-towels", n: "Beach Towels — Tropical Prints", cat: "other", sub: "textiles", e: "🏖️", u: "each", price: null, img: 1 },
  { id: "manu-set", n: "Man United Buff, Mug & Mask Gift Set", cat: "other", sub: "gifts", e: "⚽", u: "per set", price: null, img: 1 },
  { id: "handbags", n: "Branded-Print Handbag Sets", cat: "other", sub: "gifts", e: "👜", u: "per set", price: null, img: 1 },
  { id: "club-mugs", n: "Football Club Mugs", cat: "other", sub: "gifts", e: "☕", u: "each", price: null },
  { id: "pet-bed", n: "Cushioned Pet Beds", cat: "other", sub: "pets", e: "🐶", u: "each", price: null, img: 1 },
  { id: "weekend-deals", n: "Weekend Deal Items", cat: "other", sub: "seasonal", e: "🏷️", u: "from", price: 99, deal: true },
  { id: "eid-specials", n: "Eid Specials", cat: "other", sub: "seasonal", e: "🌙", u: "each", price: null },
];

const GRADS = [
  ["#ffe8e7", "#fff5f5"], ["#e7f0ff", "#f5f9ff"], ["#e9f9ee", "#f6fdf8"],
  ["#fff3e0", "#fffaf2"], ["#f3e8ff", "#faf5ff"], ["#e0f7fa", "#f2fdfe"],
  ["#fce4ec", "#fdf2f6"], ["#f1f8e9", "#f9fdf4"],
];
function grad(p) {
  let h = 0; for (const c of p.id) h = (h * 31 + c.charCodeAt(0)) % 997;
  return GRADS[h % GRADS.length];
}

/* ---------------- helpers ---------------- */
const $ = (s, el) => (el || document).querySelector(s);
const $$ = (s, el) => [...(el || document).querySelectorAll(s)];
const fmt = (v) => "R" + (Number.isInteger(v) ? v.toLocaleString("en-ZA") : v.toFixed(2));
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const prod = (id) => PRODUCTS.find((p) => p.id === id);
const waLink = (msg) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

function toast(msg) {
  let t = $(".toast");
  if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add("show");
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 2600);
}

/* ---------------- storage: users / session / cart ---------------- */
const DB = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { localStorage.setItem(k, JSON.stringify(v)); },
};
const users = () => DB.get("ar_users", {});
const session = () => DB.get("ar_session", null);
const me = () => (session() ? users()[session()] : null);

function cartKey() { return session() ? "ar_cart_" + session() : "ar_cart_guest"; }
const cart = () => DB.get(cartKey(), {});
function setCart(c) { DB.set(cartKey(), c); renderCartBadge(); }
const cartCount = () => Object.values(cart()).reduce((a, b) => a + b, 0);

/* SA ID: 13 digits, valid date prefix, Luhn checksum */
function validSAID(id) {
  if (!/^\d{13}$/.test(id)) return false;
  const mm = +id.slice(2, 4), dd = +id.slice(4, 6);
  if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return false;
  let sum = 0;
  for (let i = 0; i < 13; i++) {
    let d = +id[12 - i];
    if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9; }
    sum += d;
  }
  return sum % 10 === 0;
}

function signup(f) {
  const u = users();
  if (u[f.phone]) return { err: "An account with this phone number already exists. Try signing in." };
  if (!/^0\d{9}$/.test(f.phone)) return { err: "Enter a valid 10-digit SA cell number (e.g. 0661234567)." };
  if (!validSAID(f.said)) return { err: "That doesn't look like a valid 13-digit SA ID number." };
  if ((f.pw || "").length < 4) return { err: "Password must be at least 4 characters." };
  u[f.phone] = { name: f.name.trim(), phone: f.phone, said: f.said, addr: f.addr.trim(),
                 pw: btoa(f.pw), created: new Date().toISOString() };
  DB.set("ar_users", u);
  loginAs(f.phone);
  return { ok: true };
}
function login(phone, pw) {
  const u = users()[phone];
  if (!u || u.pw !== btoa(pw)) return { err: "Phone number or password incorrect." };
  loginAs(phone);
  return { ok: true };
}
function loginAs(phone) {
  // merge guest cart into user cart on login
  const guest = DB.get("ar_cart_guest", {});
  DB.set("ar_session", phone);
  if (Object.keys(guest).length) {
    const c = cart();
    for (const [id, q] of Object.entries(guest)) c[id] = (c[id] || 0) + q;
    setCart(c);
    localStorage.removeItem("ar_cart_guest");
  }
  renderHeaderState();
}
function logout() { localStorage.removeItem("ar_session"); location.href = "index.html"; }

/* ---------------- cart ops (auth-gated per spec) ---------------- */
let pendingAdd = null;
function addToCart(id) {
  if (!me()) { pendingAdd = id; openAuth("Create your AR account to start shopping"); return; }
  const c = cart(); c[id] = (c[id] || 0) + 1; setCart(c);
  toast(`Added to cart — ${prod(id).n}`);
}
function setQty(id, q) {
  const c = cart();
  if (q <= 0) delete c[id]; else c[id] = q;
  setCart(c);
  if (document.body.dataset.page === "cart") renderCart();
}
function cartTotal() {
  return Object.entries(cart()).reduce((t, [id, q]) => t + (prod(id).price || 0) * q, 0);
}

/* ---------------- header / footer ---------------- */
function headerHTML() {
  const active = document.body.dataset.cat || "";
  return `
  <div class="topbar">
    <span>📍 <b>${STORE_ADDR}</b></span>
    <span>🕗 Mon–Fri 08:30–17:00 · Sat 08:30–15:00</span>
    <span>💬 WhatsApp <a href="${waLink("Hi AR Retailers!")}" target="_blank" rel="noopener">066 209 8554</a></span>
  </div>
  <header class="site-header">
    <div class="header-inner">
      <a class="logo" href="index.html">
        <span class="logo-mark">AR</span>
        <span class="logo-word">Retailers &amp; Wholesalers<small>Athlone Industria · Cape Town</small></span>
      </a>
      <div class="search-wrap">
        <input id="search" type="search" placeholder="Search products, deals &amp; departments…" autocomplete="off">
        <span class="search-ico">🔍</span>
        <div class="search-results" id="search-results"></div>
      </div>
      <div class="header-actions">
        <a class="hdr-btn" href="account.html" id="account-btn">👤 <span class="lbl">Account</span></a>
        <a class="hdr-btn primary" href="cart.html">🛒 <span class="lbl">Cart</span><span class="cart-badge hidden" id="cart-badge">0</span></a>
      </div>
    </div>
    <nav class="cat-nav"><div class="cat-nav-inner">
      ${Object.entries(CATS).map(([k, c]) =>
        `<a href="${c.page}" class="${k === active ? "active" : ""}">${c.name}</a>`).join("")}
    </div></nav>
  </header>`;
}
function footerHTML() {
  return `
  <footer class="site-footer">
    <div class="footer-inner">
      <div><h4>Departments</h4>
        ${Object.values(CATS).map((c) => `<a href="${c.page}">${c.name}</a>`).join("")}
      </div>
      <div><h4>Visit us</h4>
        <p>${STORE_ADDR}</p>
        <p>Mon–Fri 08:30–17:00<br>Sat 08:30–15:00</p>
      </div>
      <div><h4>Get in touch</h4>
        <a href="${waLink("Hi AR Retailers!")}" target="_blank" rel="noopener">WhatsApp: 066 209 8554</a>
        <a href="https://www.instagram.com/arretailers/" target="_blank" rel="noopener">Instagram @arretailers</a>
        <a href="https://www.tiktok.com/@riyaadar" target="_blank" rel="noopener">TikTok @riyaadar</a>
      </div>
      <div><h4>Shopping</h4>
        <a href="cart.html">Your cart</a>
        <a href="account.html">Your account</a>
        <a href="checkout.html">Checkout</a>
      </div>
    </div>
    <div class="footer-legal">
      AR Wholesalers (Pty) Ltd · Reg K2020171535 · Wholesale &amp; retail — everyone welcome.<br>
      Personal information (incl. ID numbers) is collected for account &amp; order processing only, per POPIA.
    </div>
  </footer>
  ${authModalHTML()}`;
}

function renderCartBadge() {
  const b = $("#cart-badge"); if (!b) return;
  const n = cartCount();
  b.textContent = n; b.classList.toggle("hidden", n === 0);
}
function renderHeaderState() {
  const u = me(), btn = $("#account-btn");
  if (btn && u) btn.innerHTML = `👤 <span class="lbl">${esc(u.name.split(" ")[0])}</span>`;
  renderCartBadge();
}

/* ---------------- search ---------------- */
function initSearch() {
  const inp = $("#search"), box = $("#search-results");
  if (!inp) return;
  inp.addEventListener("input", () => {
    const q = inp.value.trim().toLowerCase();
    if (q.length < 2) { box.classList.remove("open"); return; }
    const hits = PRODUCTS.filter((p) => p.n.toLowerCase().includes(q) ||
      CATS[p.cat].name.toLowerCase().includes(q) ||
      CATS[p.cat].subs[p.sub].toLowerCase().includes(q)).slice(0, 8);
    box.innerHTML = hits.length
      ? hits.map((p) => `<a href="${CATS[p.cat].page}#${p.sub}">
          <span>${p.e} ${esc(p.n)}<div class="sr-cat">${CATS[p.cat].name} › ${CATS[p.cat].subs[p.sub]}</div></span>
          <span class="sr-price">${p.price ? fmt(p.price) : "Enquire"}</span></a>`).join("")
      : `<a>No matches — <b>&nbsp;WhatsApp us, we probably stock it!</b></a>`;
    box.classList.add("open");
  });
  document.addEventListener("click", (e) => { if (!e.target.closest(".search-wrap")) box.classList.remove("open"); });
}

/* ---------------- product card ---------------- */
function thumbHTML(p, extra) {
  const [g1, g2] = grad(p);
  return p.img
    ? `<div class="thumb has-img ${extra || ""}"><img src="img/${p.id}.jpg" alt="${esc(p.n)}" loading="lazy"></div>`
    : `<div class="thumb ${extra || ""}" style="--g1:${g1};--g2:${g2}">${p.e}</div>`;
}
function cardHTML(p) {
  const priceCell = p.price
    ? `<span class="price">${p.u === "from" ? "from " : ""}${fmt(p.price)}</span>`
    : `<span class="poa">Enquire for price</span>`;
  const btn = p.price
    ? `<button class="add-btn" onclick="addToCart('${p.id}')">Add to Cart</button>`
    : `<a class="add-btn enquire" target="_blank" rel="noopener" href="${waLink(`Hi AR! Price check please: ${p.n}`)}">WhatsApp</a>`;
  return `<article class="card" id="p-${p.id}">
    ${p.deal ? '<span class="badge">DEAL</span>' : ""}
    ${thumbHTML(p)}
    <h3>${esc(p.n)}</h3><p class="unit">${p.u === "from" ? "assorted items" : esc(p.u)}</p>
    <div class="price-row">${priceCell}${btn}</div>
  </article>`;
}

/* ---------------- page renderers ---------------- */
function renderHome() {
  const deals = PRODUCTS.filter((p) => p.deal);
  $("#app").innerHTML = `
  <section class="hero">
    <div class="eyebrow">Athlone Industria · Cape Town</div>
    <h1>Wholesale prices.<br>Everyone welcome.</h1>
    <p>Cape Town's home of unbeatable deals — clothing, footwear, homeware, stationery and more. Shop online, collect in-store or order on WhatsApp.</p>
    <div class="hero-ctas">
      <a class="btn btn-accent" href="#deals">Shop the deals</a>
      <a class="btn btn-ghost" href="#departments">Browse departments</a>
    </div>
  </section>
  <section class="section" id="departments">
    <div class="eyebrow">Departments</div><h2>Shop by department.</h2>
    <p class="sub">Seven departments, one address. Bulk buyers and walk-in shoppers both welcome.</p>
    <div class="dept-grid">
      ${Object.values(CATS).map((c) => `<a class="dept-tile" href="${c.page}">
        <span class="ico">${c.ico}</span><b>${c.name}</b>
        <span>${Object.keys(c.subs).length} ranges</span></a>`).join("")}
    </div>
  </section>
  <section class="section tight" id="deals">
    <div class="eyebrow">This week</div><h2>Deals worth the drive.</h2>
    <p class="sub">Real prices from the floor — while stocks last.</p>
    <div class="rail">${deals.map(cardHTML).join("")}</div>
  </section>
  <section class="info-strip"><div class="section">
    <div class="info-grid">
      <div><span class="ico">🏬</span><b>Visit the store</b><p>${STORE_ADDR}. Mon–Fri 08:30–17:00, Sat 08:30–15:00.</p></div>
      <div><span class="ico">💬</span><b>Order on WhatsApp</b><p>Message 066 209 8554 with what you need — we'll confirm stock and price in minutes.</p></div>
      <div><span class="ico">📦</span><b>Bulk &amp; wholesale</b><p>Buying to resell? Ask for wholesale pack pricing on bonnets, storage sets, socks and more.</p></div>
      <div><span class="ico">🚚</span><b>Collect or arrange delivery</b><p>Collect in-store same day, or chat to us about delivery around Cape Town.</p></div>
    </div>
  </div></section>`;
}

function renderCategory() {
  const key = document.body.dataset.cat, c = CATS[key];
  const chips = Object.entries(c.subs).map(([s, name]) => `<a class="chip" href="#${s}">${name}</a>`).join("");
  const sections = Object.entries(c.subs).map(([s, name]) => {
    const items = PRODUCTS.filter((p) => p.cat === key && p.sub === s);
    return `<section class="section subcat" id="${s}">
      <h2>${name}<span>${items.length} item${items.length === 1 ? "" : "s"}</span></h2>
      <div class="grid">${items.map(cardHTML).join("") ||
        `<p class="sub">New stock landing — WhatsApp us for what's on the floor today.</p>`}</div>
    </section>`;
  }).join("");
  $("#app").innerHTML = `
  <div class="page-head"><div class="page-head-inner">
    <div class="crumbs"><a href="index.html">Home</a> › ${c.name}</div>
    <h1>${c.ico} ${c.name}</h1>
    <p>Wholesale &amp; retail — add to cart where priced, or WhatsApp for today's floor price.</p>
    <div class="chip-row">${chips}</div>
  </div></div>${sections}`;
}

function renderCart() {
  const c = cart(), ids = Object.keys(c);
  const el = $("#app");
  if (!ids.length) {
    el.innerHTML = `<section class="section narrow"><h2>Your cart</h2>
      <div class="empty-note"><span class="ico">🛒</span>Your cart is empty.<br><br>
      <a class="btn btn-dark" href="index.html#deals">Browse the deals</a></div></section>`;
    return;
  }
  const lines = ids.map((id) => {
    const p = prod(id);
    return `<div class="cart-line">
      ${thumbHTML(p)}
      <div><div class="cl-name">${esc(p.n)}</div><div class="cl-unit">${esc(p.u)} · ${fmt(p.price)}</div>
        <button class="cl-remove" onclick="setQty('${id}',0)">Remove</button></div>
      <div class="qty">
        <button onclick="setQty('${id}',${c[id] - 1})">−</button><b>${c[id]}</b>
        <button onclick="setQty('${id}',${c[id] + 1})">+</button>
      </div>
      <div class="cl-price">${fmt(p.price * c[id])}</div>
    </div>`;
  }).join("");
  el.innerHTML = `<section class="section narrow"><h2>Your cart</h2>${lines}
    <div class="totals">
      <div class="row"><span>Items (${cartCount()})</span><span>${fmt(cartTotal())}</span></div>
      <div class="row"><span>Collection in-store</span><span>Free</span></div>
      <div class="row grand"><span>Total</span><span>${fmt(cartTotal())}</span></div>
      <a class="btn btn-accent wide-btn" href="checkout.html" style="margin-top:16px">Proceed to checkout</a>
    </div></section>`;
}

function renderCheckout() {
  const u = me();
  if (!u) { openAuth("Sign in to check out"); }
  const c = cart(), ids = Object.keys(c);
  if (!ids.length) { location.href = "cart.html"; return; }
  const lines = ids.map((id) => `<div class="row"><span>${prod(id).e} ${esc(prod(id).n)} × ${c[id]}</span><span>${fmt((prod(id).price || 0) * c[id])}</span></div>`).join("");
  $("#app").innerHTML = `<section class="section narrow"><h2>Checkout</h2>
    <div class="totals" style="margin-top:10px">${lines}
      <div class="row grand"><span>Total</span><span>${fmt(cartTotal())}</span></div></div>
    <form class="form-grid" style="margin-top:26px" onsubmit="placeOrder(event)">
      <label>Fulfilment
        <select id="co-fulfil">
          <option value="collect">Collect in-store (free) — Athlone Industria 1</option>
          <option value="delivery">Delivery (quoted on WhatsApp)</option>
        </select></label>
      <label>Delivery address / note
        <textarea id="co-note" rows="2" placeholder="${u ? esc(u.addr || "") : ""}"></textarea></label>
      <label>Payment
        <select id="co-pay">
          <option value="instore">Pay in-store on collection (cash/card)</option>
          <option value="eft">EFT — banking details sent on WhatsApp</option>
        </select></label>
      <p class="fine">Card payments online are coming soon. Placing an order reserves your items and sends the order to AR on WhatsApp for confirmation.</p>
      <button class="btn btn-accent wide-btn" type="submit">Place order</button>
    </form></section>`;
}

function placeOrder(ev) {
  ev.preventDefault();
  const u = me();
  if (!u) { openAuth("Sign in to place your order"); return; }
  const c = cart();
  const order = {
    no: "AR" + Date.now().toString().slice(-8),
    when: new Date().toISOString(),
    items: Object.entries(c).map(([id, q]) => ({ id, q })),
    total: cartTotal(),
    fulfil: $("#co-fulfil").value, pay: $("#co-pay").value, note: $("#co-note").value.trim(),
  };
  const orders = DB.get("ar_orders_" + u.phone, []);
  orders.unshift(order);
  DB.set("ar_orders_" + u.phone, orders);
  setCart({});
  const msg = `NEW ORDER ${order.no}\nCustomer: ${u.name} (${u.phone})\n` +
    order.items.map((i) => `• ${prod(i.id).n} × ${i.q} = ${fmt((prod(i.id).price || 0) * i.q)}`).join("\n") +
    `\nTotal: ${fmt(order.total)}\nFulfilment: ${order.fulfil}\nPayment: ${order.pay}` +
    (order.note ? `\nNote: ${order.note}` : "");
  $("#app").innerHTML = `<section class="section narrow" style="text-align:center">
    <div class="empty-note"><span class="ico">✅</span>
      <h2 style="margin-bottom:10px">Order ${order.no} placed!</h2>
      <p style="margin-bottom:26px">Send it through to the AR team on WhatsApp to confirm stock &amp; ${order.fulfil === "delivery" ? "delivery" : "collection"}.</p>
      <a class="btn btn-accent" target="_blank" rel="noopener" href="${waLink(msg)}">Send order on WhatsApp</a>
      &nbsp;<a class="btn btn-dark" href="account.html">View my orders</a>
    </div></section>`;
}

function renderAccount() {
  const u = me();
  if (!u) {
    $("#app").innerHTML = `<section class="section narrow">
      <div class="empty-note"><span class="ico">👤</span>You're not signed in.<br><br>
      <button class="btn btn-dark" onclick="openAuth('Sign in or create your AR account')">Sign in / Create account</button></div></section>`;
    return;
  }
  const orders = DB.get("ar_orders_" + u.phone, []);
  $("#app").innerHTML = `<section class="section narrow">
    <h2>Hi, ${esc(u.name.split(" ")[0])} 👋</h2>
    <p class="sub">Account created ${new Date(u.created).toLocaleDateString("en-ZA")}</p>
    <div class="totals">
      <div class="row"><span>Name</span><b>${esc(u.name)}</b></div>
      <div class="row"><span>Cell</span><b>${esc(u.phone)}</b></div>
      <div class="row"><span>ID number</span><b>•••••••••${esc(u.said.slice(-4))}</b></div>
      <div class="row"><span>Address</span><b>${esc(u.addr || "—")}</b></div>
    </div>
    <h2 style="margin-top:40px">Your orders</h2>
    ${orders.length ? orders.map((o) => `<div class="order-card">
        <div class="oc-head"><b>${o.no}</b><span>${new Date(o.when).toLocaleString("en-ZA")}</span>
          <b>${fmt(o.total)}</b><span class="status-pill">Placed</span></div>
        <div class="oc-items">${o.items.map((i) => `${prod(i.id).e} ${esc(prod(i.id).n)} × ${i.q}`).join(" · ")}</div>
      </div>`).join("")
      : `<p class="sub">No orders yet — <a href="index.html#deals" style="text-decoration:underline">grab a deal</a>.</p>`}
    <button class="btn btn-dark" style="margin-top:20px" onclick="logout()">Sign out</button>
  </section>`;
}

/* ---------------- auth modal ---------------- */
function authModalHTML() {
  return `<div class="modal-veil" id="auth-veil">
  <div class="modal">
    <button class="close-x" onclick="closeAuth()">✕</button>
    <h2 id="auth-title">Create your AR account</h2>
    <p class="m-sub">Browse freely — an account is only needed when you're ready to buy. Your details are used for orders only (POPIA).</p>
    <div class="modal-tabs">
      <button id="tab-signup" class="active" onclick="authTab('signup')">Create account</button>
      <button id="tab-login" onclick="authTab('login')">Sign in</button>
    </div>
    <form class="form-grid" id="form-signup" onsubmit="doSignup(event)">
      <label>Full name<input id="su-name" required placeholder="e.g. Ayesha Adams"></label>
      <label>Cell number<input id="su-phone" required inputmode="numeric" maxlength="10" placeholder="066 209 8554"></label>
      <label>SA ID number<input id="su-said" required inputmode="numeric" maxlength="13" placeholder="13-digit ID number"></label>
      <label>Delivery address <span style="font-weight:400;color:var(--sub)">(optional)</span><input id="su-addr" placeholder="Street, suburb, city"></label>
      <label>Password<input id="su-pw" type="password" required minlength="4" placeholder="Choose a password"></label>
      <div class="err" id="su-err"></div>
      <p class="fine">By creating an account you consent to AR Wholesalers processing these details to manage your profile and orders (POPIA, Act 4 of 2013). We never share your ID number.</p>
      <button class="btn btn-accent wide-btn" type="submit">Create account &amp; continue</button>
    </form>
    <form class="form-grid" id="form-login" style="display:none" onsubmit="doLogin(event)">
      <label>Cell number<input id="li-phone" required inputmode="numeric" maxlength="10"></label>
      <label>Password<input id="li-pw" type="password" required></label>
      <div class="err" id="li-err"></div>
      <button class="btn btn-accent wide-btn" type="submit">Sign in</button>
    </form>
  </div></div>`;
}
function openAuth(title) {
  $("#auth-title").textContent = title || "Create your AR account";
  $("#auth-veil").classList.add("open");
}
function closeAuth() { $("#auth-veil").classList.remove("open"); pendingAdd = null; }
function authTab(t) {
  $("#form-signup").style.display = t === "signup" ? "" : "none";
  $("#form-login").style.display = t === "login" ? "" : "none";
  $("#tab-signup").classList.toggle("active", t === "signup");
  $("#tab-login").classList.toggle("active", t === "login");
}
function afterAuth() {
  $("#auth-veil").classList.remove("open");
  renderHeaderState();
  const page = document.body.dataset.page;
  if (pendingAdd) { const id = pendingAdd; pendingAdd = null; addToCart(id); }
  if (page === "account") renderAccount();
  if (page === "checkout") renderCheckout();
  if (page === "cart") renderCart();
}
function doSignup(ev) {
  ev.preventDefault();
  const r = signup({ name: $("#su-name").value, phone: $("#su-phone").value.replace(/\s/g, ""),
    said: $("#su-said").value.replace(/\s/g, ""), addr: $("#su-addr").value, pw: $("#su-pw").value });
  const err = $("#su-err");
  if (r.err) { err.textContent = r.err; err.classList.add("show"); return; }
  err.classList.remove("show");
  toast("Welcome to AR, " + $("#su-name").value.split(" ")[0] + "! 🎉");
  afterAuth();
}
function doLogin(ev) {
  ev.preventDefault();
  const r = login($("#li-phone").value.replace(/\s/g, ""), $("#li-pw").value);
  const err = $("#li-err");
  if (r.err) { err.textContent = r.err; err.classList.add("show"); return; }
  err.classList.remove("show");
  toast("Welcome back! 👋");
  afterAuth();
}

/* ---------------- boot ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  document.body.insertAdjacentHTML("afterbegin", headerHTML());
  document.body.insertAdjacentHTML("beforeend", footerHTML());
  const page = document.body.dataset.page;
  if (page === "home") renderHome();
  else if (page === "category") renderCategory();
  else if (page === "cart") renderCart();
  else if (page === "checkout") renderCheckout();
  else if (page === "account") renderAccount();
  initSearch();
  renderHeaderState();
});
