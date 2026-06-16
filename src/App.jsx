import { useState, useEffect } from "react";

// ─── CATEGORIES ───────────────────────────────────────────────────────────────
const CATEGORIES = ["Soap", "Scrub", "Face Care", "Body Cream", "Oil", "Body Wash", "Lip Care"];
const CATEGORY_ICONS = {
  "Soap": "🧼", "Scrub": "✨", "Face Care": "💦",
  "Body Cream": "🥥", "Oil": "🌟", "Body Wash": "🚿", "Lip Care": "💋"
};

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────
const SEED_PRODUCTS = [
  { id: 1,  name: "Black Soap",             price: 7000,  image: "🖤", category: "Soap",       tag: "Clarifying",    description: "Deeply cleanses the skin. Helps reduce excess oil and breakouts, removes dirt and impurities, and promotes a clearer, smoother complexion." },
  { id: 2,  name: "Molato Soap",            price: 5000,  image: "🤎", category: "Soap",       tag: "Brightening",   description: "Helps brighten dull skin and promotes a more even skin tone. Cleanses while leaving the skin soft, refreshed, and radiant." },
  { id: 3,  name: "Face Soap",              price: 3000,  image: "🧼", category: "Soap",       tag: "Daily Cleanse", description: "Cleanses the skin thoroughly, removes excess oil and impurities, and leaves the skin feeling fresh and smooth for healthy-looking skin." },
  { id: 4,  name: "Turmeric Scrub",         price: 6000,  image: "✨", category: "Scrub",      tag: "Glow",          description: "Exfoliates dead skin cells and helps brighten the skin. Improves skin texture and glow, promoting a more even and radiant complexion." },
  { id: 5,  name: "Coffee Scrub",           price: 6000,  image: "☕", category: "Scrub",      tag: "Smoothing",     description: "Gently exfoliates the skin and helps improve skin smoothness. Leaves the skin feeling soft and refreshed with a healthy-looking glow." },
  { id: 6,  name: "Facial Toner",           price: 5000,  image: "💦", category: "Face Care",  tag: "Toning",        description: "Removes residual dirt after cleansing. Helps balance the skin's pH, minimizes the appearance of pores, and prepares the skin for moisturizers." },
  { id: 7,  name: "Facial Cleanser",        price: 5000,  image: "🧴", category: "Face Care",  tag: "Acne-Friendly", description: "Gently cleans the face without stripping moisture. Removes dirt, oil, and makeup residue. Very effective for acne-prone skin." },
  { id: 8,  name: "Acne Face Cream",        price: 7000,  image: "🌿", category: "Face Care",  tag: "Acne Care",     description: "Helps reduce pimples and breakouts, soothes irritated skin, fades post-acne marks, and supports a clearer-looking complexion." },
  { id: 9,  name: "Brightening Face Cream", price: 7000,  image: "🌟", category: "Face Care",  tag: "Brightening",   description: "Enhances natural skin radiance, helps even out skin tone, reduces the appearance of dullness, and leaves the skin glowing." },
  { id: 10, name: "Lightening Face Cream",  price: 7000,  image: "✨", category: "Face Care",  tag: "Lightening",    description: "Helps reduce the appearance of dark spots, promotes a brighter complexion, achieves a more even skin tone, and keeps skin moisturized." },
  { id: 11, name: "Body Butter",            price: 10000, image: "🥥", category: "Body Cream", tag: "Deep Moisture", description: "Deeply moisturizes dry skin and softens rough areas. Helps maintain smooth, supple skin with long-lasting hydration." },
  { id: 12, name: "Lightening Body Cream",  price: 10000, image: "🌙", category: "Body Cream", tag: "Lightening",    description: "Helps brighten the skin and promote a more even skin tone. Reduces the appearance of dark patches and keeps skin soft and moisturized." },
  { id: 13, name: "Glow Oil",               price: 5000,  image: "🌟", category: "Oil",        tag: "Radiance",      description: "Nourishes and moisturizes the skin, enhancing its natural glow. Improves skin softness and leaves the skin radiant, healthy-looking, and shiny." },
  { id: 14, name: "Body Wash",              price: 10000, image: "🚿", category: "Body Wash",  tag: "Refreshing",    description: "Gently cleanses the skin and removes dirt and impurities. Refreshes and hydrates the skin, leaving the body feeling clean and revitalized." },
  { id: 15, name: "Lip Balm",               price: 3000,  image: "💋", category: "Lip Care",   tag: "Nourishing",    description: "Moisturizes dry lips and helps prevent chapping and cracking. Leaves lips soft and smooth with nourishment and protection." },
];

const STATUS_FLOW = ["Pending", "Confirmed", "Processing", "Shipped", "Delivered"];
const STATUS_COLOR = {
  Pending:    { bg: "rgba(251,191,36,0.15)",  text: "#FCD34D", dot: "#F59E0B" },
  Confirmed:  { bg: "rgba(96,165,250,0.15)",  text: "#93C5FD", dot: "#60A5FA" },
  Processing: { bg: "rgba(167,139,250,0.15)", text: "#C4B5FD", dot: "#A78BFA" },
  Shipped:    { bg: "rgba(52,211,153,0.15)",  text: "#6EE7B7", dot: "#34D399" },
  Delivered:  { bg: "rgba(52,211,153,0.2)",   text: "#34D399", dot: "#10B981" },
};

const formatNGN = (n) => `₦${Number(n).toLocaleString("en-NG")}`;
const uid = () => Math.random().toString(36).slice(2, 9).toUpperCase();

// ─── STORES ───────────────────────────────────────────────────────────────────
const PRODUCT_VERSION = "v3-amy";
const getProducts = () => {
  try {
    if (sessionStorage.getItem("abb_ver") !== PRODUCT_VERSION) {
      sessionStorage.setItem("abb_products", JSON.stringify(SEED_PRODUCTS));
      sessionStorage.setItem("abb_ver", PRODUCT_VERSION);
      return SEED_PRODUCTS;
    }
    const s = sessionStorage.getItem("abb_products");
    return s ? JSON.parse(s) : SEED_PRODUCTS;
  } catch { return SEED_PRODUCTS; }
};
const saveProducts = (p) => {
  sessionStorage.setItem("abb_products", JSON.stringify(p));
  sessionStorage.setItem("abb_ver", PRODUCT_VERSION);
  window.dispatchEvent(new Event("products-update"));
};
const getOrders = () => { try { return JSON.parse(sessionStorage.getItem("abb_orders") || "[]"); } catch { return []; } };
const saveOrders = (o) => { sessionStorage.setItem("abb_orders", JSON.stringify(o)); window.dispatchEvent(new Event("orders-update")); };

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
// Deep plum-black + liquid gold + blush rose — bold, editorial, luxe
const G = {
  void:     "#0A0608",   // near-black bg
  deep:     "#130C10",   // card bg
  surface:  "#1E1218",   // elevated surface
  border:   "#2E1A24",   // subtle border
  gold:     "#D4A853",   // primary accent — warm gold
  goldSoft: "#E8C87A",   // hover gold
  blush:    "#C97B8A",   // secondary accent — dusty rose
  blushSoft:"#E8A4B2",   // hover blush
  text:     "#F5EEF0",   // primary text
  muted:    "#9A7D86",   // muted text
  faint:    "#4A3040",   // very faint
  white:    "#FFFFFF",
  display:  "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
  body:     "'DM Sans', system-ui, sans-serif",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: ${G.body}; background: ${G.void}; color: ${G.text}; min-height: 100vh; }
  input, select, textarea, button { font-family: ${G.body}; }
  ::selection { background: ${G.gold}33; color: ${G.goldSoft}; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: ${G.deep}; }
  ::-webkit-scrollbar-thumb { background: ${G.faint}; border-radius: 10px; }
  ::-webkit-scrollbar-thumb:hover { background: ${G.gold}66; }

  .fade-in { animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }

  .glow-gold { box-shadow: 0 0 30px rgba(212,168,83,0.18); }
  .glow-rose  { box-shadow: 0 0 30px rgba(201,123,138,0.18); }

  .product-card {
    background: ${G.deep};
    border: 1px solid ${G.border};
    border-radius: 20px;
    overflow: hidden;
    transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, box-shadow 0.3s;
    cursor: default;
  }
  .product-card:hover {
    transform: translateY(-6px);
    border-color: ${G.gold}55;
    box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(212,168,83,0.12);
  }

  .btn-primary {
    background: linear-gradient(135deg, ${G.gold}, #B8892E);
    color: #1A0F00;
    border: none;
    border-radius: 10px;
    font-weight: 700;
    font-family: ${G.body};
    cursor: pointer;
    transition: all 0.25s;
    letter-spacing: 0.3px;
  }
  .btn-primary:hover { background: linear-gradient(135deg, ${G.goldSoft}, ${G.gold}); transform: translateY(-1px); box-shadow: 0 6px 24px rgba(212,168,83,0.35); }
  .btn-primary:active { transform: translateY(0); }

  .btn-ghost {
    background: transparent;
    color: ${G.muted};
    border: 1px solid ${G.border};
    border-radius: 10px;
    font-weight: 500;
    font-family: ${G.body};
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-ghost:hover { border-color: ${G.gold}55; color: ${G.gold}; background: ${G.gold}08; }

  .tag-pill {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600;
    background: ${G.gold}18; color: ${G.gold}; border: 1px solid ${G.gold}30;
    letter-spacing: 0.5px; text-transform: uppercase;
  }

  .cat-pill {
    padding: 7px 18px; border-radius: 30px; border: 1px solid ${G.border};
    font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s;
    background: transparent; color: ${G.muted};
  }
  .cat-pill:hover { border-color: ${G.gold}55; color: ${G.goldSoft}; }
  .cat-pill.active { background: ${G.gold}; color: #1A0F00; border-color: ${G.gold}; font-weight: 700; box-shadow: 0 4px 16px rgba(212,168,83,0.3); }

  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(6px); z-index: 300; display: flex; align-items: center; justify-content: center; padding: 16px; }
  .modal-box { background: ${G.surface}; border: 1px solid ${G.border}; border-radius: 20px; padding: 28px; width: 100%; max-width: 480px; max-height: 92vh; overflow-y: auto; }

  .field-input {
    width: 100%; padding: 11px 14px;
    border: 1px solid ${G.border}; border-radius: 10px;
    background: ${G.deep}; color: ${G.text}; font-size: 14px; outline: none;
    transition: border-color 0.2s;
  }
  .field-input:focus { border-color: ${G.gold}66; box-shadow: 0 0 0 3px ${G.gold}12; }
  .field-input::placeholder { color: ${G.faint}; }

  .shimmer {
    background: linear-gradient(90deg, ${G.deep} 25%, ${G.surface} 50%, ${G.deep} 75%);
    background-size: 200% 100%;
    animation: shimmer 1.6s infinite;
  }
  @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

  /* Orb decorations */
  .orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; z-index: 0; }

  @media (max-width: 640px) {
    .hide-mobile { display: none !important; }
  }
`;

// ─── SHARED ───────────────────────────────────────────────────────────────────
const Badge = ({ status }) => {
  const c = STATUS_COLOR[status] || STATUS_COLOR.Pending;
  return (
    <span style={{ background: c.bg, color: c.text, padding: "4px 11px", borderRadius: 20, fontSize: 12, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 5, border: `1px solid ${c.dot}33` }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot, display: "inline-block", boxShadow: `0 0 6px ${c.dot}` }} />{status}
    </span>
  );
};

const inputStyle = (err) => ({ className: `field-input${err ? " err" : ""}`, style: { borderColor: err ? "#E55" : undefined } });

// ─── BRAND LOGO ───────────────────────────────────────────────────────────────
const Logo = ({ size = "md" }) => {
  const big = size === "lg";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: big ? "center" : "flex-start", lineHeight: 1 }}>
      <span style={{ fontFamily: G.display, fontSize: big ? 52 : 20, fontWeight: 600, color: G.text, letterSpacing: big ? 3 : 1 }}>AMY BEAUTY</span>
      <span style={{ fontFamily: G.display, fontSize: big ? 28 : 12, fontStyle: "italic", color: G.gold, letterSpacing: big ? 8 : 4, marginTop: big ? -4 : -2 }}>BLISS</span>
    </div>
  );
};

// ─── STOREFRONT ───────────────────────────────────────────────────────────────
const Storefront = ({ onOrderPlaced }) => {
  const [products, setProducts] = useState(getProducts);
  const [orders, setOrders] = useState(getOrders);
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState("shop");
  const [activeCategory, setActiveCategory] = useState("All");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [errors, setErrors] = useState({});
  const [lastOrder, setLastOrder] = useState(null);
  const [trackId, setTrackId] = useState("");
  const [trackResult, setTrackResult] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    const sync = () => { setProducts(getProducts()); setOrders(getOrders()); };
    window.addEventListener("products-update", sync);
    window.addEventListener("orders-update", sync);
    return () => { window.removeEventListener("products-update", sync); window.removeEventListener("orders-update", sync); };
  }, []);

  const addToCart = (p) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      return ex ? prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { ...p, qty: 1 }];
    });
  };
  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const changeQty = (id, d) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i));
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Phone number required";
    if (!form.address.trim()) e.address = "Delivery address required";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const placeOrder = () => {
    if (!validate()) return;
    const placed = onOrderPlaced({ customer: form, items: cart, total });
    setLastOrder(placed); setCart([]); setStep("confirm");
  };

  const handleTrack = () => {
    const found = orders.find(o => o.id === trackId.trim().toUpperCase());
    setTrackResult(found || "notfound");
  };

  const categories = ["All", ...CATEGORIES.filter(c => products.some(p => p.category === c))];
  const visibleProducts = activeCategory === "All" ? products : products.filter(p => p.category === activeCategory);

  return (
    <div style={{ minHeight: "100vh", background: G.void, position: "relative", overflow: "hidden" }}>
      {/* Ambient orbs */}
      <div className="orb" style={{ width: 500, height: 500, background: `${G.gold}10`, top: -200, right: -100 }} />
      <div className="orb" style={{ width: 400, height: 400, background: `${G.blush}08`, bottom: 100, left: -150 }} />

      {/* NAV */}
      <nav style={{ background: `${G.deep}EE`, backdropFilter: "blur(20px)", borderBottom: `1px solid ${G.border}`, position: "sticky", top: 0, zIndex: 100, padding: "0 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <Logo />
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button onClick={() => setStep("track")} style={{ background: "none", border: "none", color: G.muted, fontSize: 13, cursor: "pointer", fontWeight: 500, transition: "color 0.2s", padding: "6px 12px", borderRadius: 8 }}
              onMouseEnter={e => e.target.style.color = G.gold} onMouseLeave={e => e.target.style.color = G.muted}>
              Track Order
            </button>
            <button onClick={() => setStep(step === "cart" ? "shop" : "cart")}
              style={{ background: cartCount > 0 ? `${G.gold}22` : G.surface, border: `1px solid ${cartCount > 0 ? G.gold + "55" : G.border}`, borderRadius: 12, padding: "8px 16px", fontWeight: 600, color: cartCount > 0 ? G.gold : G.muted, display: "flex", alignItems: "center", gap: 8, cursor: "pointer", transition: "all 0.2s", fontSize: 14 }}>
              <span>🛍️</span>
              <span>Cart</span>
              {cartCount > 0 && <span style={{ background: G.gold, color: "#1A0F00", borderRadius: "50%", width: 20, height: 20, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800 }}>{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* HERO */}
        {step === "shop" && (
          <div style={{ textAlign: "center", padding: "80px 24px 60px", position: "relative" }}>
            <div className="orb" style={{ width: 600, height: 300, background: `${G.gold}08`, top: 0, left: "50%", transform: "translateX(-50%)" }} />
            <p style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: G.gold, fontWeight: 600, marginBottom: 20, opacity: 0.9 }}>Luxury Skincare · Lagos</p>
            <Logo size="lg" />
            <p style={{ fontFamily: G.display, fontSize: "clamp(18px, 3vw, 26px)", color: G.muted, marginTop: 20, fontStyle: "italic", letterSpacing: 1 }}>
              Reveal your most radiant self.
            </p>
            <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 40, flexWrap: "wrap" }}>
              {[["15+", "Products"], ["100%", "Premium"], ["✦", "Handcrafted"]].map(([v, l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <p style={{ fontFamily: G.display, fontSize: 28, color: G.gold, fontWeight: 600 }}>{v}</p>
                  <p style={{ fontSize: 11, color: G.muted, letterSpacing: 2, textTransform: "uppercase", marginTop: 2 }}>{l}</p>
                </div>
              ))}
            </div>
            {/* Decorative line */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, maxWidth: 300, margin: "40px auto 0" }}>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${G.gold}44)` }} />
              <span style={{ color: G.gold, fontSize: 14 }}>✦</span>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${G.gold}44)` }} />
            </div>
          </div>
        )}

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 60px" }}>

          {/* SHOP */}
          {step === "shop" && (
            <div className="fade-in">
              {/* Category pills */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40, justifyContent: "center" }}>
                {categories.map(c => (
                  <button key={c} className={`cat-pill${activeCategory === c ? " active" : ""}`} onClick={() => setActiveCategory(c)}>
                    {c !== "All" && <span style={{ marginRight: 5 }}>{CATEGORY_ICONS[c]}</span>}{c}
                  </button>
                ))}
              </div>

              {activeCategory === "All" ? (
                CATEGORIES.filter(c => products.some(p => p.category === c)).map(cat => (
                  <div key={cat} style={{ marginBottom: 52 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
                      <span style={{ fontSize: 24 }}>{CATEGORY_ICONS[cat]}</span>
                      <h2 style={{ fontFamily: G.display, fontSize: 28, color: G.text, fontWeight: 500 }}>{cat}</h2>
                      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${G.border}, transparent)` }} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 20 }}>
                      {products.filter(p => p.category === cat).map(p => <ProductCard key={p.id} product={p} onAdd={addToCart} />)}
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <h2 style={{ fontFamily: G.display, fontSize: 28, color: G.text, fontWeight: 500, marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
                    <span>{CATEGORY_ICONS[activeCategory]}</span>{activeCategory}
                  </h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 20 }}>
                    {visibleProducts.map(p => <ProductCard key={p.id} product={p} onAdd={addToCart} />)}
                  </div>
                </>
              )}
            </div>
          )}

          {/* CART */}
          {step === "cart" && (
            <div className="fade-in" style={{ maxWidth: 660, margin: "0 auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
                <button onClick={() => setStep("shop")} style={{ background: G.surface, border: `1px solid ${G.border}`, color: G.muted, width: 36, height: 36, borderRadius: 10, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
                <h2 style={{ fontFamily: G.display, fontSize: 28, color: G.text, fontWeight: 500 }}>Your Cart</h2>
                {cartCount > 0 && <span style={{ background: `${G.gold}22`, color: G.gold, borderRadius: 20, padding: "3px 12px", fontSize: 13, fontWeight: 600 }}>{cartCount} item{cartCount !== 1 ? "s" : ""}</span>}
              </div>
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: "64px 32px", background: G.deep, borderRadius: 20, border: `1px solid ${G.border}` }}>
                  <p style={{ fontSize: 52, marginBottom: 16 }}>🛍️</p>
                  <p style={{ color: G.muted, marginBottom: 20 }}>Your cart is empty — discover something beautiful.</p>
                  <button className="btn-primary" onClick={() => setStep("shop")} style={{ padding: "12px 28px", fontSize: 14, borderRadius: 10 }}>Browse Products</button>
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                    {cart.map(item => (
                      <div key={item.id} style={{ background: G.deep, borderRadius: 16, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, border: `1px solid ${G.border}` }}>
                        <div style={{ width: 52, height: 52, borderRadius: 12, background: G.surface, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>{item.image}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontWeight: 600, color: G.text, fontSize: 14 }}>{item.name}</p>
                          <p style={{ fontSize: 12, color: G.muted, marginTop: 2 }}>{item.category} · {formatNGN(item.price)}</p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                          <button onClick={() => changeQty(item.id, -1)} style={{ width: 28, height: 28, border: `1px solid ${G.border}`, borderRadius: 7, background: G.surface, cursor: "pointer", color: G.muted, fontSize: 16 }}>−</button>
                          <span style={{ fontWeight: 700, minWidth: 20, textAlign: "center", color: G.text }}>{item.qty}</span>
                          <button onClick={() => changeQty(item.id, 1)} style={{ width: 28, height: 28, border: `1px solid ${G.gold}55`, borderRadius: 7, background: `${G.gold}15`, cursor: "pointer", color: G.gold, fontSize: 16 }}>+</button>
                        </div>
                        <span style={{ fontWeight: 700, fontSize: 14, color: G.gold, minWidth: 80, textAlign: "right" }}>{formatNGN(item.price * item.qty)}</span>
                        <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", color: G.faint, cursor: "pointer", fontSize: 16, padding: 4, transition: "color 0.2s" }}
                          onMouseEnter={e => e.target.style.color = "#E55"} onMouseLeave={e => e.target.style.color = G.faint}>✕</button>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: G.deep, borderRadius: 16, padding: "20px 22px", border: `1px solid ${G.border}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
                      <span style={{ color: G.muted, fontSize: 14 }}>Order Total</span>
                      <span style={{ fontFamily: G.display, fontSize: 24, color: G.gold, fontWeight: 600 }}>{formatNGN(total)}</span>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button className="btn-ghost" onClick={() => setStep("shop")} style={{ flex: 1, padding: "12px", fontSize: 14 }}>Continue Shopping</button>
                      <button className="btn-primary" onClick={() => setStep("checkout")} style={{ flex: 2, padding: "12px", fontSize: 14, borderRadius: 10 }}>Checkout →</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* CHECKOUT */}
          {step === "checkout" && (
            <div className="fade-in" style={{ maxWidth: 560, margin: "0 auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
                <button onClick={() => setStep("cart")} style={{ background: G.surface, border: `1px solid ${G.border}`, color: G.muted, width: 36, height: 36, borderRadius: 10, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
                <h2 style={{ fontFamily: G.display, fontSize: 28, color: G.text, fontWeight: 500 }}>Delivery Details</h2>
              </div>
              <div style={{ background: G.deep, borderRadius: 20, padding: "28px", border: `1px solid ${G.border}`, marginBottom: 20 }}>
                {[
                  { key: "name", label: "Full Name", type: "text", placeholder: "e.g. Amara Johnson" },
                  { key: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
                  { key: "phone", label: "Phone Number", type: "tel", placeholder: "08012345678" },
                  { key: "address", label: "Delivery Address", type: "textarea", placeholder: "Street, City, State" },
                ].map(f => (
                  <div key={f.key} style={{ marginBottom: 18 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: G.muted, display: "block", marginBottom: 7, letterSpacing: 0.5, textTransform: "uppercase" }}>{f.label}</label>
                    {f.type === "textarea"
                      ? <textarea rows={3} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} className="field-input" style={{ resize: "vertical", borderColor: errors[f.key] ? "#E55" : undefined }} />
                      : <input type={f.type} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} className="field-input" style={{ borderColor: errors[f.key] ? "#E55" : undefined }} />
                    }
                    {errors[f.key] && <p style={{ color: "#F87171", fontSize: 12, marginTop: 5 }}>{errors[f.key]}</p>}
                  </div>
                ))}
              </div>
              {/* Order summary */}
              <div style={{ background: G.surface, borderRadius: 16, padding: "18px 20px", border: `1px solid ${G.border}`, marginBottom: 20 }}>
                <p style={{ fontSize: 11, color: G.muted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Order Summary</p>
                {cart.map(i => (
                  <div key={i.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6, color: G.muted }}>
                    <span style={{ color: G.text }}>{i.image} {i.name} <span style={{ color: G.faint }}>× {i.qty}</span></span>
                    <span style={{ color: G.gold }}>{formatNGN(i.price * i.qty)}</span>
                  </div>
                ))}
                <div style={{ borderTop: `1px solid ${G.border}`, marginTop: 12, paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: 700, color: G.text }}>Total</span>
                  <span style={{ fontFamily: G.display, fontSize: 20, fontWeight: 600, color: G.gold }}>{formatNGN(total)}</span>
                </div>
              </div>
              <button className="btn-primary" onClick={placeOrder} style={{ width: "100%", padding: "15px", fontSize: 15, borderRadius: 12 }}>Place Order ✦</button>
            </div>
          )}

          {/* CONFIRM */}
          {step === "confirm" && lastOrder && (
            <div className="fade-in" style={{ maxWidth: 520, margin: "40px auto", textAlign: "center" }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: `${G.gold}18`, border: `2px solid ${G.gold}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 24px", boxShadow: `0 0 40px ${G.gold}22` }}>✦</div>
              <h2 style={{ fontFamily: G.display, fontSize: 34, color: G.text, fontWeight: 500, marginBottom: 10 }}>Order Placed!</h2>
              <p style={{ color: G.muted, marginBottom: 28, fontSize: 15 }}>Thank you, <span style={{ color: G.text }}>{lastOrder.customer.name}</span>. Your order is on its way to us.</p>
              <div style={{ background: G.deep, borderRadius: 18, padding: "22px", marginBottom: 28, border: `1px solid ${G.gold}33` }}>
                <p style={{ fontSize: 11, color: G.muted, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Order ID</p>
                <p style={{ fontFamily: "monospace", fontSize: 26, fontWeight: 700, color: G.gold, letterSpacing: 4, marginBottom: 10 }}>{lastOrder.id}</p>
                <p style={{ fontSize: 13, color: G.muted }}>Save this ID to track your order status anytime.</p>
              </div>
              <button className="btn-primary" onClick={() => { setStep("shop"); setLastOrder(null); }} style={{ padding: "13px 32px", fontSize: 14, borderRadius: 12 }}>Continue Shopping</button>
            </div>
          )}

          {/* TRACK */}
          {step === "track" && (
            <div className="fade-in" style={{ maxWidth: 500, margin: "40px auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
                <button onClick={() => setStep("shop")} style={{ background: G.surface, border: `1px solid ${G.border}`, color: G.muted, width: 36, height: 36, borderRadius: 10, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
                <h2 style={{ fontFamily: G.display, fontSize: 28, color: G.text, fontWeight: 500 }}>Track Your Order</h2>
              </div>
              <div style={{ background: G.deep, borderRadius: 18, padding: 24, border: `1px solid ${G.border}`, marginBottom: 20 }}>
                <label style={{ fontSize: 11, color: G.muted, letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 10 }}>Enter your Order ID</label>
                <div style={{ display: "flex", gap: 10 }}>
                  <input value={trackId} onChange={e => setTrackId(e.target.value)} placeholder="e.g. AB3X9K2" onKeyDown={e => e.key === "Enter" && handleTrack()}
                    className="field-input" style={{ flex: 1, fontFamily: "monospace", letterSpacing: 2, fontSize: 15 }} />
                  <button className="btn-primary" onClick={handleTrack} style={{ padding: "11px 20px", borderRadius: 10, fontSize: 14, whiteSpace: "nowrap" }}>Track</button>
                </div>
              </div>
              {trackResult === "notfound" && (
                <div style={{ background: `rgba(239,68,68,0.1)`, borderRadius: 12, padding: "14px 18px", border: "1px solid rgba(239,68,68,0.2)", color: "#FCA5A5", fontSize: 14 }}>
                  No order found with that ID. Please double-check.
                </div>
              )}
              {trackResult && trackResult !== "notfound" && (
                <div className="fade-in" style={{ background: G.deep, borderRadius: 18, padding: 22, border: `1px solid ${G.gold}33` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <span style={{ fontFamily: "monospace", fontWeight: 700, color: G.gold, fontSize: 18, letterSpacing: 2 }}>{trackResult.id}</span>
                    <Badge status={trackResult.status} />
                  </div>
                  <p style={{ fontSize: 13, color: G.muted }}>Customer: <span style={{ color: G.text }}>{trackResult.customer.name}</span></p>
                  <p style={{ fontSize: 13, color: G.muted, marginTop: 4 }}>Deliver to: <span style={{ color: G.text }}>{trackResult.customer.address}</span></p>
                  <p style={{ fontSize: 13, color: G.muted, marginTop: 4 }}>Total: <span style={{ color: G.gold, fontWeight: 700 }}>{formatNGN(trackResult.total)}</span></p>
                  {/* Progress bar */}
                  <div style={{ marginTop: 20, display: "flex", gap: 4 }}>
                    {STATUS_FLOW.map((s, i) => {
                      const cur = STATUS_FLOW.indexOf(trackResult.status);
                      const done = i <= cur;
                      return (
                        <div key={s} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                          <div style={{ width: "100%", height: 3, borderRadius: 2, background: done ? G.gold : G.border, transition: "background 0.3s", boxShadow: done ? `0 0 8px ${G.gold}55` : "none" }} />
                          <span style={{ fontSize: 9, color: done ? G.gold : G.faint, fontWeight: done ? 700 : 400, textAlign: "center", lineHeight: 1.2 }}>{s}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${G.border}`, padding: "40px 24px", textAlign: "center", background: G.deep }}>
        <Logo size="md" />
        <p style={{ color: G.muted, fontSize: 13, marginTop: 12, fontStyle: "italic" }}>Beauty is a feeling. Let us give you that. 🌟</p>
        <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 20 }}>
          {["Quality You Can Trust", "Crafted with Love", "For Every Skin"].map(t => (
            <span key={t} style={{ fontSize: 11, color: G.faint, letterSpacing: 1 }}>{t}</span>
          ))}
        </div>
        <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${G.gold}22, transparent)`, maxWidth: 300, margin: "24px auto 0" }} />
        <p style={{ fontSize: 11, color: G.faint, marginTop: 16 }}>© 2025 Amy Beauty Bliss. All rights reserved.</p>
      </footer>
    </div>
  );
};

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
const ProductCard = ({ product: p, onAdd }) => {
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    onAdd(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };
  return (
    <div className="product-card">
      <div style={{ height: 155, background: `linear-gradient(145deg, ${G.surface}, ${G.deep})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 58, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 60% 40%, ${G.gold}08, transparent 70%)` }} />
        <span style={{ position: "relative", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))", transition: "transform 0.3s" }}>{p.image}</span>
        <div style={{ position: "absolute", top: 10, right: 12 }}>
          <span className="tag-pill">{p.tag}</span>
        </div>
      </div>
      <div style={{ padding: "18px 18px 20px" }}>
        <p style={{ fontSize: 10, color: G.muted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>{CATEGORY_ICONS[p.category]} {p.category}</p>
        <h3 style={{ fontFamily: G.display, fontSize: 20, color: G.text, marginBottom: 8, lineHeight: 1.25, fontWeight: 500 }}>{p.name}</h3>
        <p style={{ fontSize: 12.5, color: G.muted, lineHeight: 1.65, marginBottom: 18, minHeight: 42 }}>{p.description}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontFamily: G.display, fontSize: 22, color: G.gold, fontWeight: 600 }}>{formatNGN(p.price)}</p>
          </div>
          <button className="btn-primary" onClick={handleAdd}
            style={{ padding: "9px 18px", fontSize: 13, borderRadius: 10, background: added ? `linear-gradient(135deg, #22C55E, #16A34A)` : undefined, transition: "all 0.3s" }}>
            {added ? "✓ Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── PRODUCT EDIT MODAL ───────────────────────────────────────────────────────
const ProductModal = ({ product, onSave, onClose, onDelete }) => {
  const isNew = !product.id;
  const [form, setForm] = useState({ name: product.name || "", description: product.description || "", price: product.price || "", image: product.image || "🧴", category: product.category || CATEGORIES[0], tag: product.tag || "" });
  const [errors, setErrors] = useState({});
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Product name required";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) e.price = "Valid price required";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const EMOJIS = ["🧴", "✨", "🌿", "🌸", "🫧", "🫙", "💧", "☀️", "🌙", "💄", "🖤", "🛁", "☁️", "🌺", "🍯", "🥥", "🌻", "💎", "🪷", "🍋", "🤎", "☕", "💦", "🚿", "💋", "🌟"];

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box fade-in">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <h3 style={{ fontFamily: G.display, fontSize: 22, color: G.text, fontWeight: 500 }}>{isNew ? "Add New Product" : "Edit Product"}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: G.muted, cursor: "pointer", fontSize: 22, lineHeight: 1 }}>✕</button>
        </div>

        {/* Emoji picker */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: G.muted, display: "block", marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>Icon</label>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <div style={{ width: 54, height: 54, borderRadius: 12, background: G.deep, border: `1px solid ${G.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>{form.image}</div>
            <input value={form.image} onChange={e => set("image", e.target.value)} maxLength={4} className="field-input" style={{ width: 70, textAlign: "center", fontSize: 20 }} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {EMOJIS.map(em => (
              <button key={em} onClick={() => set("image", em)}
                style={{ width: 34, height: 34, borderRadius: 8, border: `1px solid ${form.image === em ? G.gold : G.border}`, background: form.image === em ? `${G.gold}20` : "transparent", fontSize: 17, cursor: "pointer", transition: "all 0.15s" }}>
                {em}
              </button>
            ))}
          </div>
        </div>

        {[
          { key: "name", label: "Product Name", placeholder: "e.g. Glow Serum" },
        ].map(f => (
          <div key={f.key} style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: G.muted, display: "block", marginBottom: 7, letterSpacing: 1, textTransform: "uppercase" }}>{f.label}</label>
            <input value={form[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder} className="field-input" style={{ borderColor: errors[f.key] ? "#F87171" : undefined }} />
            {errors[f.key] && <p style={{ color: "#F87171", fontSize: 12, marginTop: 4 }}>{errors[f.key]}</p>}
          </div>
        ))}

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: G.muted, display: "block", marginBottom: 7, letterSpacing: 1, textTransform: "uppercase" }}>Description</label>
          <textarea rows={3} value={form.description} onChange={e => set("description", e.target.value)} placeholder="Brief product description…" className="field-input" style={{ resize: "vertical" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: G.muted, display: "block", marginBottom: 7, letterSpacing: 1, textTransform: "uppercase" }}>Price (₦)</label>
            <input type="number" value={form.price} onChange={e => set("price", e.target.value)} placeholder="8500" className="field-input" style={{ borderColor: errors.price ? "#F87171" : undefined }} />
            {errors.price && <p style={{ color: "#F87171", fontSize: 12, marginTop: 4 }}>{errors.price}</p>}
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: G.muted, display: "block", marginBottom: 7, letterSpacing: 1, textTransform: "uppercase" }}>Tag / Label</label>
            <input value={form.tag} onChange={e => set("tag", e.target.value)} placeholder="e.g. Bestseller" className="field-input" />
          </div>
        </div>

        <div style={{ marginBottom: 22 }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: G.muted, display: "block", marginBottom: 7, letterSpacing: 1, textTransform: "uppercase" }}>Category</label>
          <select value={form.category} onChange={e => set("category", e.target.value)} className="field-input" style={{ appearance: "none" }}>
            {CATEGORIES.map(c => <option key={c} value={c}>{CATEGORY_ICONS[c]} {c}</option>)}
          </select>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          {!isNew && <button onClick={onDelete} style={{ flex: 1, padding: "11px", borderRadius: 10, background: "rgba(239,68,68,0.15)", color: "#FCA5A5", border: "1px solid rgba(239,68,68,0.3)", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Delete</button>}
          <button className="btn-ghost" onClick={onClose} style={{ flex: 1, padding: "11px", fontSize: 13 }}>Cancel</button>
          <button className="btn-primary" onClick={() => validate() && onSave({ ...product, ...form, price: Number(form.price) })} style={{ flex: 2, padding: "11px", borderRadius: 10, fontSize: 14 }}>{isNew ? "Add Product" : "Save Changes"}</button>
        </div>
      </div>
    </div>
  );
};

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
const AdminDashboard = ({ orders: initOrders, onUpdateStatus }) => {
  const [adminTab, setAdminTab] = useState("orders");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);
  const [products, setProducts] = useState(getProducts);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productCategory, setProductCategory] = useState("All");
  const [liveOrders, setLiveOrders] = useState(initOrders);

  useEffect(() => {
    const syncP = () => setProducts(getProducts());
    const syncO = () => setLiveOrders(getOrders());
    window.addEventListener("products-update", syncP);
    window.addEventListener("orders-update", syncO);
    return () => { window.removeEventListener("products-update", syncP); window.removeEventListener("orders-update", syncO); };
  }, []);
  useEffect(() => setLiveOrders(initOrders), [initOrders]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const filtered = liveOrders.filter(o => {
    const mf = filter === "All" || o.status === filter;
    const ms = !search || o.id.includes(search.toUpperCase()) || o.customer.name.toLowerCase().includes(search.toLowerCase()) || o.customer.email.toLowerCase().includes(search.toLowerCase());
    return mf && ms;
  });
  const counts = ["All", ...STATUS_FLOW].reduce((acc, s) => { acc[s] = s === "All" ? liveOrders.length : liveOrders.filter(o => o.status === s).length; return acc; }, {});
  const totalRevenue = liveOrders.filter(o => o.status === "Delivered").reduce((s, o) => s + o.total, 0);

  const handleUpdate = (id, status) => {
    onUpdateStatus(id, status);
    setSelected(prev => prev?.id === id ? { ...prev, status, updatedAt: new Date().toISOString() } : prev);
    showToast(`Order ${id} → ${status}`);
  };

  const handleSaveProduct = (product) => {
    const updated = !product.id ? [{ ...product, id: Date.now() }, ...products] : products.map(p => p.id === product.id ? product : p);
    saveProducts(updated); setProducts(updated); setEditingProduct(null);
    showToast(!product.id ? `"${product.name}" added!` : `"${product.name}" updated!`);
  };

  const handleDeleteProduct = (id) => {
    const updated = products.filter(p => p.id !== id);
    saveProducts(updated); setProducts(updated); setEditingProduct(null); showToast("Product deleted.");
  };

  const productCategories = ["All", ...CATEGORIES.filter(c => products.some(p => p.category === c))];
  const visibleProducts = productCategory === "All" ? products : products.filter(p => p.category === productCategory);

  return (
    <div style={{ minHeight: "100vh", background: G.void, color: G.text, fontFamily: G.body }}>
      <style>{css}</style>

      {/* TOAST */}
      {toast && (
        <div style={{ position: "fixed", bottom: 28, right: 28, background: `linear-gradient(135deg, ${G.gold}, #B8892E)`, color: "#1A0F00", padding: "13px 22px", borderRadius: 12, fontWeight: 700, zIndex: 9999, boxShadow: `0 8px 30px rgba(212,168,83,0.4)`, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
          ✦ {toast}
        </div>
      )}

      {editingProduct !== null && <ProductModal product={editingProduct} onSave={handleSaveProduct} onClose={() => setEditingProduct(null)} onDelete={() => handleDeleteProduct(editingProduct.id)} />}

      {/* ADMIN NAV */}
      <div style={{ background: `${G.deep}F0`, backdropFilter: "blur(20px)", borderBottom: `1px solid ${G.border}`, padding: "0 28px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Logo />
            <span style={{ background: `${G.gold}22`, color: G.gold, fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 6, letterSpacing: 2, border: `1px solid ${G.gold}33` }}>ADMIN</span>
          </div>
          <div style={{ display: "flex", gap: 4, background: G.surface, borderRadius: 12, padding: 4, border: `1px solid ${G.border}` }}>
            {[["orders", "📦 Orders"], ["products", "🧴 Products"]].map(([t, label]) => (
              <button key={t} onClick={() => setAdminTab(t)}
                style={{ padding: "7px 18px", borderRadius: 9, border: "none", fontWeight: 600, fontSize: 13, cursor: "pointer", background: adminTab === t ? `linear-gradient(135deg, ${G.gold}, #B8892E)` : "transparent", color: adminTab === t ? "#1A0F00" : G.muted, transition: "all 0.2s" }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "28px 24px" }}>

        {/* ORDERS TAB */}
        {adminTab === "orders" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 26 }}>
              {[
                { label: "Total Orders", value: liveOrders.length, icon: "📦", col: G.gold },
                { label: "Pending", value: counts.Pending || 0, icon: "⏳", col: "#FCD34D" },
                { label: "In Transit", value: counts.Shipped || 0, icon: "🚚", col: "#34D399" },
                { label: "Delivered Revenue", value: formatNGN(totalRevenue), icon: "💰", col: G.gold },
              ].map(s => (
                <div key={s.label} style={{ background: G.deep, borderRadius: 16, padding: "18px 20px", border: `1px solid ${G.border}`, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: `${s.col}08` }} />
                  <p style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</p>
                  <p style={{ fontSize: s.value.toString().length > 8 ? 16 : 22, fontWeight: 700, color: s.col }}>{s.value}</p>
                  <p style={{ fontSize: 11, color: G.muted, marginTop: 3, letterSpacing: 0.5 }}>{s.label}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 370px" : "1fr", gap: 20 }}>
              <div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                  {["All", ...STATUS_FLOW].map(s => (
                    <button key={s} onClick={() => setFilter(s)}
                      style={{ padding: "5px 13px", borderRadius: 20, border: `1px solid ${filter === s ? G.gold + "55" : G.border}`, fontWeight: 600, fontSize: 12, cursor: "pointer", background: filter === s ? `${G.gold}20` : "transparent", color: filter === s ? G.gold : G.muted, transition: "all 0.15s" }}>
                      {s} ({counts[s] || 0})
                    </button>
                  ))}
                </div>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by ID, name, or email…"
                  className="field-input" style={{ marginBottom: 14 }} />
                {filtered.length === 0 ? (
                  <div style={{ background: G.deep, borderRadius: 16, padding: 40, textAlign: "center", color: G.muted, border: `1px solid ${G.border}` }}>
                    <p style={{ fontSize: 36, marginBottom: 10 }}>📭</p><p>No orders found.</p>
                  </div>
                ) : filtered.map(o => (
                  <div key={o.id} onClick={() => setSelected(o)}
                    style={{ background: selected?.id === o.id ? G.surface : G.deep, border: `1px solid ${selected?.id === o.id ? G.gold + "55" : G.border}`, borderRadius: 14, padding: "14px 16px", marginBottom: 8, cursor: "pointer", transition: "all 0.15s", boxShadow: selected?.id === o.id ? `0 0 20px ${G.gold}10` : "none" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontFamily: "monospace", fontWeight: 700, color: G.gold, fontSize: 14, letterSpacing: 1 }}>{o.id}</span>
                      <Badge status={o.status} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <p style={{ fontWeight: 600, color: G.text, fontSize: 13 }}>{o.customer.name}</p>
                        <p style={{ fontSize: 11, color: G.muted }}>{o.customer.email}</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ fontWeight: 700, color: G.gold, fontSize: 13 }}>{formatNGN(o.total)}</p>
                        <p style={{ fontSize: 11, color: G.muted }}>{o.items.reduce((s, i) => s + i.qty, 0)} item(s)</p>
                      </div>
                    </div>
                    <p style={{ fontSize: 10, color: G.faint, marginTop: 5 }}>{new Date(o.createdAt).toLocaleString("en-NG")}</p>
                  </div>
                ))}
              </div>

              {selected && (
                <div className="fade-in" style={{ background: G.deep, borderRadius: 18, padding: 22, border: `1px solid ${G.gold}33`, height: "fit-content", position: "sticky", top: 80 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                    <div>
                      <p style={{ fontSize: 10, color: G.muted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Order</p>
                      <p style={{ fontFamily: "monospace", fontSize: 22, fontWeight: 700, color: G.gold, letterSpacing: 2 }}>{selected.id}</p>
                    </div>
                    <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: G.muted, cursor: "pointer", fontSize: 20 }}>✕</button>
                  </div>
                  <Badge status={selected.status} />
                  <div style={{ margin: "16px 0", paddingBottom: 16, borderBottom: `1px solid ${G.border}` }}>
                    <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, color: G.muted, marginBottom: 10 }}>Customer</p>
                    <p style={{ color: G.text, fontWeight: 600 }}>{selected.customer.name}</p>
                    <p style={{ color: G.muted, fontSize: 12, marginTop: 3 }}>{selected.customer.email}</p>
                    <p style={{ color: G.muted, fontSize: 12 }}>{selected.customer.phone}</p>
                    <p style={{ color: G.muted, fontSize: 12, marginTop: 4 }}>{selected.customer.address}</p>
                  </div>
                  <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, color: G.muted, marginBottom: 10 }}>Items</p>
                  {selected.items.map(i => (
                    <div key={i.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5, color: G.muted }}>
                      <span style={{ color: G.text }}>{i.image} {i.name} <span style={{ color: G.faint }}>× {i.qty}</span></span>
                      <span style={{ color: G.gold }}>{formatNGN(i.price * i.qty)}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: `1px solid ${G.border}`, marginTop: 10, paddingTop: 10, display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
                    <span style={{ color: G.text }}>Total</span><span style={{ color: G.gold, fontFamily: G.display, fontSize: 18 }}>{formatNGN(selected.total)}</span>
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, color: G.muted, marginBottom: 10 }}>Update Status</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                      {STATUS_FLOW.map(s => {
                        const cur = STATUS_FLOW.indexOf(selected.status);
                        const idx = STATUS_FLOW.indexOf(s);
                        const isCurrent = s === selected.status;
                        return (
                          <button key={s} onClick={() => !isCurrent && handleUpdate(selected.id, s)}
                            style={{ padding: "9px 14px", borderRadius: 9, border: `1px solid ${isCurrent ? G.gold + "55" : G.border}`, background: isCurrent ? `${G.gold}20` : "transparent", color: isCurrent ? G.gold : G.muted, fontWeight: isCurrent ? 700 : 400, cursor: isCurrent ? "default" : "pointer", fontSize: 13, textAlign: "left", display: "flex", alignItems: "center", gap: 10, transition: "all 0.15s" }}>
                            <span style={{ width: 7, height: 7, borderRadius: "50%", background: isCurrent ? G.gold : idx < cur ? G.gold + "44" : G.faint, display: "inline-block", boxShadow: isCurrent ? `0 0 8px ${G.gold}` : "none" }} />
                            {s} {isCurrent && <span style={{ fontSize: 10, opacity: 0.6 }}>(current)</span>}
                          </button>
                        );
                      })}
                    </div>
                    {selected.updatedAt && <p style={{ fontSize: 10, color: G.faint, marginTop: 10 }}>Last updated: {new Date(selected.updatedAt).toLocaleString("en-NG")}</p>}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* PRODUCTS TAB */}
        {adminTab === "products" && (
          <div className="fade-in">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
              <div>
                <h2 style={{ fontFamily: G.display, fontSize: 26, color: G.text, fontWeight: 500 }}>Product Catalogue</h2>
                <p style={{ fontSize: 13, color: G.muted, marginTop: 3 }}>{products.length} products · {new Set(products.map(p => p.category)).size} categories</p>
              </div>
              <button className="btn-primary" onClick={() => setEditingProduct({})} style={{ padding: "11px 22px", fontSize: 14, borderRadius: 11, display: "flex", alignItems: "center", gap: 7 }}>
                ✦ Add New Product
              </button>
            </div>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 22 }}>
              {productCategories.map(c => (
                <button key={c} className={`cat-pill${productCategory === c ? " active" : ""}`} onClick={() => setProductCategory(c)}>
                  {c !== "All" && CATEGORY_ICONS[c] + " "}{c} ({c === "All" ? products.length : products.filter(p => p.category === c).length})
                </button>
              ))}
            </div>

            {productCategory === "All" ? (
              CATEGORIES.filter(c => products.some(p => p.category === c)).map(cat => (
                <div key={cat} style={{ marginBottom: 36 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <span style={{ fontSize: 20 }}>{CATEGORY_ICONS[cat]}</span>
                    <h3 style={{ fontFamily: G.display, fontSize: 20, color: G.text, fontWeight: 500 }}>{cat}</h3>
                    <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${G.border}, transparent)` }} />
                    <span style={{ fontSize: 11, color: G.faint }}>{products.filter(p => p.category === cat).length} items</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 14 }}>
                    {products.filter(p => p.category === cat).map(p => <AdminProductCard key={p.id} product={p} onEdit={() => setEditingProduct(p)} />)}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 14 }}>
                {visibleProducts.map(p => <AdminProductCard key={p.id} product={p} onEdit={() => setEditingProduct(p)} />)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── ADMIN PRODUCT CARD ───────────────────────────────────────────────────────
const AdminProductCard = ({ product: p, onEdit }) => (
  <div onClick={onEdit} style={{ background: G.deep, borderRadius: 14, overflow: "hidden", border: `1px solid ${G.border}`, cursor: "pointer", transition: "all 0.2s" }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = G.gold + "55"; e.currentTarget.style.transform = "translateY(-3px)"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = G.border; e.currentTarget.style.transform = "translateY(0)"; }}>
    <div style={{ height: 95, background: `linear-gradient(145deg, ${G.surface}, ${G.deep})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, position: "relative" }}>
      {p.image}
      <span style={{ position: "absolute", top: 8, right: 8, background: `${G.gold}22`, color: G.gold, borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 700, border: `1px solid ${G.gold}33` }}>Edit ✦</span>
    </div>
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
        <span style={{ fontSize: 10, color: G.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>{p.tag}</span>
        <span style={{ fontSize: 10, color: G.muted }}>{CATEGORY_ICONS[p.category]} {p.category}</span>
      </div>
      <p style={{ fontFamily: G.display, fontSize: 15, color: G.text, marginBottom: 5, lineHeight: 1.3, fontWeight: 500 }}>{p.name}</p>
      <p style={{ fontSize: 11, color: G.muted, lineHeight: 1.5, marginBottom: 8, minHeight: 30 }}>{p.description?.slice(0, 65)}{p.description?.length > 65 ? "…" : ""}</p>
      <p style={{ fontFamily: G.display, fontWeight: 600, fontSize: 16, color: G.gold }}>{formatNGN(p.price)}</p>
    </div>
  </div>
);

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [orders, setOrders] = useState(getOrders);
  const [view, setView] = useState("shop");

  useEffect(() => {
    const check = () => setView(window.location.hash === "#admin" ? "admin" : "shop");
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

  useEffect(() => {
    const sync = () => setOrders(getOrders());
    window.addEventListener("orders-update", sync);
    return () => window.removeEventListener("orders-update", sync);
  }, []);

  const handleOrderPlaced = (orderData) => {
    const newOrder = { ...orderData, id: uid(), createdAt: new Date().toISOString(), status: "Pending" };
    saveOrders([newOrder, ...orders]);
    return newOrder;
  };

  const handleUpdateStatus = (id, status) => {
    const updated = orders.map(o => o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o);
    saveOrders(updated); setOrders(updated);
  };

  return (
    <>
      <style>{css}</style>
      {view === "admin"
        ? <AdminDashboard orders={orders} onUpdateStatus={handleUpdateStatus} />
        : <Storefront onOrderPlaced={handleOrderPlaced} />}
    </>
  );
}
