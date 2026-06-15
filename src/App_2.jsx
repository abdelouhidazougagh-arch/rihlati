import { useState, useRef, useEffect } from "react";

const MARKER = "739213";

const airports = [
  { code: "MAD", city: "Madrid", name: "Barajas", country: "España" },
  { code: "BCN", city: "Barcelona", name: "El Prat", country: "España" },
  { code: "VLC", city: "Valencia", name: "Valencia", country: "España" },
  { code: "AGP", city: "Málaga", name: "Costa del Sol", country: "España" },
  { code: "SVQ", city: "Sevilla", name: "San Pablo", country: "España" },
  { code: "BIO", city: "Bilbao", name: "Bilbao", country: "España" },
  { code: "PMI", city: "Palma de Mallorca", name: "Son Sant Joan", country: "España" },
  { code: "TFS", city: "Tenerife", name: "Sur", country: "España" },
  { code: "LPA", city: "Las Palmas", name: "Gran Canaria", country: "España" },
  { code: "CMN", city: "Casablanca", name: "Mohammed V", country: "Marruecos" },
  { code: "RAK", city: "Marrakech", name: "Menara", country: "Marruecos" },
  { code: "FEZ", city: "Fez", name: "Saïs", country: "Marruecos" },
  { code: "TNG", city: "Tánger", name: "Ibn Battuta", country: "Marruecos" },
  { code: "OUD", city: "Oujda", name: "Angads", country: "Marruecos" },
  { code: "AGA", city: "Agadir", name: "Al Massira", country: "Marruecos" },
  { code: "NDR", city: "Al Hoceima", name: "Cherif Al Idrissi", country: "Marruecos" },
  { code: "RBA", city: "Rabat", name: "Salé", country: "Marruecos" },
  { code: "ALG", city: "Argel", name: "Houari Boumediene", country: "Argelia" },
  { code: "ORN", city: "Orán", name: "Ahmed Ben Bella", country: "Argelia" },
  { code: "TUN", city: "Túnez", name: "Carthage", country: "Túnez" },
  { code: "SFA", city: "Sfax", name: "Thyna", country: "Túnez" },
  { code: "CAI", city: "El Cairo", name: "Internacional", country: "Egipto" },
  { code: "HRG", city: "Hurghada", name: "Internacional", country: "Egipto" },
  { code: "SSH", city: "Sharm el-Sheikh", name: "Internacional", country: "Egipto" },
  { code: "LHR", city: "Londres", name: "Heathrow", country: "Reino Unido" },
  { code: "LGW", city: "Londres", name: "Gatwick", country: "Reino Unido" },
  { code: "CDG", city: "París", name: "Charles de Gaulle", country: "Francia" },
  { code: "ORY", city: "París", name: "Orly", country: "Francia" },
  { code: "AMS", city: "Ámsterdam", name: "Schiphol", country: "Países Bajos" },
  { code: "FCO", city: "Roma", name: "Fiumicino", country: "Italia" },
  { code: "MXP", city: "Milán", name: "Malpensa", country: "Italia" },
  { code: "BRU", city: "Bruselas", name: "Internacional", country: "Bélgica" },
  { code: "FRA", city: "Fráncfort", name: "Internacional", country: "Alemania" },
  { code: "MUC", city: "Múnich", name: "Internacional", country: "Alemania" },
  { code: "BER", city: "Berlín", name: "Brandenburg", country: "Alemania" },
  { code: "ZRH", city: "Zúrich", name: "Internacional", country: "Suiza" },
  { code: "GVA", city: "Ginebra", name: "Internacional", country: "Suiza" },
  { code: "LIS", city: "Lisboa", name: "Humberto Delgado", country: "Portugal" },
  { code: "OPO", city: "Oporto", name: "Francisco Sá Carneiro", country: "Portugal" },
  { code: "ATH", city: "Atenas", name: "Eleftherios Venizelos", country: "Grecia" },
  { code: "IST", city: "Estambul", name: "Internacional", country: "Turquía" },
  { code: "SAW", city: "Estambul", name: "Sabiha Gökçen", country: "Turquía" },
  { code: "DXB", city: "Dubái", name: "Internacional", country: "EAU" },
  { code: "AUH", city: "Abu Dabi", name: "Internacional", country: "EAU" },
  { code: "DOH", city: "Doha", name: "Hamad", country: "Catar" },
  { code: "RUH", city: "Riad", name: "Rey Khalid", country: "Arabia Saudí" },
  { code: "JED", city: "Yeda", name: "Rey Abdulaziz", country: "Arabia Saudí" },
  { code: "KWI", city: "Kuwait", name: "Internacional", country: "Kuwait" },
  { code: "BAH", city: "Baréin", name: "Internacional", country: "Baréin" },
  { code: "AMM", city: "Amán", name: "Queen Alia", country: "Jordania" },
  { code: "BEY", city: "Beirut", name: "Rafic Hariri", country: "Líbano" },
  { code: "DAM", city: "Damasco", name: "Internacional", country: "Siria" },
  { code: "BGW", city: "Bagdad", name: "Internacional", country: "Irak" },
  { code: "NBO", city: "Nairobi", name: "Jomo Kenyatta", country: "Kenia" },
  { code: "ADD", city: "Adís Abeba", name: "Bole", country: "Etiopía" },
  { code: "LOS", city: "Lagos", name: "Murtala Muhammed", country: "Nigeria" },
  { code: "ACC", city: "Acra", name: "Kotoka", country: "Ghana" },
  { code: "DKR", city: "Dakar", name: "Blaise Diagne", country: "Senegal" },
  { code: "JFK", city: "Nueva York", name: "John F. Kennedy", country: "EE.UU." },
  { code: "LAX", city: "Los Ángeles", name: "Internacional", country: "EE.UU." },
  { code: "MIA", city: "Miami", name: "Internacional", country: "EE.UU." },
  { code: "YYZ", city: "Toronto", name: "Pearson", country: "Canadá" },
  { code: "GRU", city: "São Paulo", name: "Guarulhos", country: "Brasil" },
  { code: "EZE", city: "Buenos Aires", name: "Ezeiza", country: "Argentina" },
  { code: "BOG", city: "Bogotá", name: "El Dorado", country: "Colombia" },
  { code: "DEL", city: "Nueva Delhi", name: "Indira Gandhi", country: "India" },
  { code: "BOM", city: "Bombay", name: "Chhatrapati Shivaji", country: "India" },
  { code: "PEK", city: "Pekín", name: "Capital", country: "China" },
  { code: "PVG", city: "Shanghái", name: "Pudong", country: "China" },
  { code: "HKG", city: "Hong Kong", name: "Internacional", country: "Hong Kong" },
  { code: "NRT", city: "Tokio", name: "Narita", country: "Japón" },
  { code: "SIN", city: "Singapur", name: "Changi", country: "Singapur" },
  { code: "SYD", city: "Sídney", name: "Kingsford Smith", country: "Australia" },
];

const deals = [
  { from: "MAD", fromCity: "Madrid", to: "CMN", toCity: "Casablanca", price: 49, airline: "Royal Air Maroc", duration: "2h 15m" },
  { from: "MAD", fromCity: "Madrid", to: "RAK", toCity: "Marrakech", price: 65, airline: "Ryanair", duration: "2h 30m" },
  { from: "BCN", fromCity: "Barcelona", to: "CMN", toCity: "Casablanca", price: 55, airline: "Vueling", duration: "2h 20m" },
  { from: "MAD", fromCity: "Madrid", to: "DXB", toCity: "Dubái", price: 189, airline: "Emirates", duration: "6h 45m" },
  { from: "MAD", fromCity: "Madrid", to: "LHR", toCity: "Londres", price: 79, airline: "Iberia", duration: "2h 05m" },
  { from: "BCN", fromCity: "Barcelona", to: "CDG", toCity: "París", price: 39, airline: "Vueling", duration: "1h 50m" },
];

const colors = ["#1e3a5f", "#7c3aed", "#b45309", "#0f766e", "#be185d", "#1d4ed8"];

function AirportInput({ label, value, onChange, placeholder }) {
  const [query, setQuery] = useState(value ? `${value.city} (${value.code})` : "");
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setShow(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleInput = (e) => {
    const q = e.target.value;
    setQuery(q);
    if (!q.trim()) { setList([]); setShow(false); return; }
    const r = airports.filter(a =>
      a.city.toLowerCase().includes(q.toLowerCase()) ||
      a.code.toLowerCase().includes(q.toLowerCase()) ||
      a.country.toLowerCase().includes(q.toLowerCase()) ||
      a.name.toLowerCase().includes(q.toLowerCase())
    ).slice(0, 7);
    setList(r);
    setShow(r.length > 0);
  };

  const pick = (a) => {
    onChange(a);
    setQuery(`${a.city} (${a.code})`);
    setShow(false);
  };

  return (
    <div ref={ref} style={{ flex: 1, minWidth: 160, position: "relative" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "center", border: "2px solid #e2e8f0", borderRadius: 12, padding: "12px 14px", background: "white", gap: 8 }}>
        <span>✈️</span>
        <input value={query} onChange={handleInput} onFocus={() => query && setShow(list.length > 0)}
          placeholder={placeholder}
          style={{ border: "none", outline: "none", flex: 1, fontSize: 14, color: "#1e293b", background: "transparent", fontFamily: "inherit" }} />
      </div>
      {show && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "white", borderRadius: 12, boxShadow: "0 20px 50px rgba(0,0,0,0.15)", zIndex: 9999, overflow: "hidden", marginTop: 4, border: "1px solid #e2e8f0" }}>
          {list.map(a => (
            <div key={a.code} onClick={() => pick(a)}
              style={{ padding: "11px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f8fafc" }}
              onMouseEnter={e => e.currentTarget.style.background = "#f0f9ff"}
              onMouseLeave={e => e.currentTarget.style.background = "white"}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#0f172a" }}>{a.city}</div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>{a.name} · {a.country}</div>
              </div>
              <div style={{ background: "#eff6ff", color: "#1d4ed8", padding: "3px 8px", borderRadius: 6, fontSize: 12, fontWeight: 800 }}>{a.code}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("es");
  const [trip, setTrip] = useState("round");
  const [origin, setOrigin] = useState(null);
  const [dest, setDest] = useState(null);
  const [dep, setDep] = useState("");
  const [ret, setRet] = useState("");
  const [pax, setPax] = useState(1);
  const [tab, setTab] = useState("flights");
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const search = () => {
    if (!origin) { setError("Por favor selecciona el aeropuerto de origen"); return; }
    if (!dest) { setError("Por favor selecciona el aeropuerto de destino"); return; }
    if (!dep) { setError("Por favor selecciona la fecha de ida"); return; }
    if (trip === "round" && !ret) { setError("Por favor selecciona la fecha de vuelta"); return; }
    setError("");
    
    const depFormatted = dep.replace(/-/g, "/");
    const retFormatted = ret ? ret.replace(/-/g, "/") : null;
    
    let url;
    if (trip === "round" && retFormatted) {
      url = `https://www.kiwi.com/es/search/${origin.code}/${dest.code}/${depFormatted}/${retFormatted}?adults=${pax}&affilid=picky_${MARKER}`;
    } else {
      url = `https://www.kiwi.com/es/search/${origin.code}/${dest.code}/${depFormatted}?adults=${pax}&affilid=picky_${MARKER}`;
    }
    window.open(url, "_blank");
  };

  const swap = () => { const t = origin; setOrigin(dest); setDest(t); };

  const openDeal = (d) => {
    const url = `https://www.kiwi.com/es/search/${d.from}/${d.to}?adults=1&affilid=picky_${MARKER}`;
    window.open(url, "_blank");
  };

  const tabs = [
    { id: "flights", icon: "✈️", label: lang === "ar" ? "رحلات" : lang === "en" ? "Flights" : "Vuelos" },
    { id: "hotels", icon: "🏨", label: lang === "ar" ? "فنادق" : lang === "en" ? "Hotels" : "Hoteles" },
    { id: "cars", icon: "🚗", label: lang === "ar" ? "سيارات" : lang === "en" ? "Cars" : "Coches" },
    { id: "ferries", icon: "🚢", label: lang === "ar" ? "عبّارات" : lang === "en" ? "Ferries" : "Ferries" },
  ];

  const T = {
    tagline: lang === "ar" ? "سافر أبعد بأقل تكلفة" : lang === "en" ? "Fly further for less" : "Vuela más lejos por menos",
    sub: lang === "ar" ? "قارن ملايين الرحلات وابحث عن أفضل سعر" : lang === "en" ? "Compare millions of flights and find the best price" : "Compara millones de vuelos y encuentra el mejor precio",
    from: lang === "ar" ? "من" : lang === "en" ? "From" : "Origen",
    to: lang === "ar" ? "إلى" : lang === "en" ? "To" : "Destino",
    dep: lang === "ar" ? "تاريخ الذهاب" : lang === "en" ? "Departure" : "Fecha ida",
    ret: lang === "ar" ? "تاريخ العودة" : lang === "en" ? "Return" : "Fecha vuelta",
    pax: lang === "ar" ? "الركاب" : lang === "en" ? "Passengers" : "Pasajeros",
    search: lang === "ar" ? "ابحث عن رحلات" : lang === "en" ? "Search flights" : "Buscar vuelos",
    oneWay: lang === "ar" ? "ذهاب فقط" : lang === "en" ? "One way" : "Solo ida",
    round: lang === "ar" ? "ذهاب وعودة" : lang === "en" ? "Round trip" : "Ida y vuelta",
    deals: lang === "ar" ? "عروض الأسبوع" : lang === "en" ? "Deals of the week" : "Ofertas de la semana",
    see: lang === "ar" ? "عرض" : lang === "en" ? "See deal" : "Ver oferta",
    ph: lang === "ar" ? "مدينة أو مطار" : lang === "en" ? "City or airport" : "Ciudad o aeropuerto",
  };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f8fafc" }} dir={lang === "ar" ? "rtl" : "ltr"}>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0369a1 100%)", paddingBottom: 90 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 20px 0" }}>

          {/* TOP BAR */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", borderRadius: 10, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>✈️</div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 900, color: "white", letterSpacing: -0.5 }}>Sky<span style={{ color: "#f97316" }}>Deals</span></div>
                <div style={{ fontSize: 10, color: "#94a3b8", letterSpacing: 2, textTransform: "uppercase" }}>skydeals.es</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {["es", "en", "ar"].map(l => (
                <button key={l} onClick={() => setLang(l)} style={{ padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, background: lang === l ? "#f97316" : "rgba(255,255,255,0.12)", color: "white", transition: "all 0.2s" }}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* HERO */}
          <div style={{ textAlign: "center", padding: "40px 0 30px", color: "white" }}>
            <h1 style={{ fontSize: "clamp(26px, 5vw, 46px)", fontWeight: 900, margin: "0 0 10px", letterSpacing: -1 }}>{T.tagline}</h1>
            <p style={{ color: "#94a3b8", fontSize: 16, margin: 0 }}>{T.sub}</p>
          </div>

          {/* TABS */}
          <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "10px 22px", borderRadius: 30, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, background: tab === t.id ? "white" : "rgba(255,255,255,0.1)", color: tab === t.id ? "#0f172a" : "white", transition: "all 0.2s" }}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>

        {/* SEARCH BOX */}
        <div style={{ background: "white", borderRadius: 20, boxShadow: "0 20px 60px rgba(0,0,0,0.12)", padding: "28px", marginTop: -50, position: "relative", zIndex: 10 }}>

          {/* TRIP TYPE */}
          <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
            {["oneWay", "round"].map(type => (
              <button key={type} onClick={() => setTrip(type)} style={{ padding: "8px 20px", borderRadius: 20, border: `2px solid ${trip === type ? "#0369a1" : "#e2e8f0"}`, background: trip === type ? "#eff6ff" : "white", color: trip === type ? "#0369a1" : "#64748b", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                {T[type]}
              </button>
            ))}
          </div>

          {/* FIELDS */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
            <AirportInput label={T.from} value={origin} onChange={setOrigin} placeholder={T.ph} />

            <button onClick={swap} style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", width: 38, height: 38, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginBottom: 2 }}>⇄</button>

            <AirportInput label={T.to} value={dest} onChange={setDest} placeholder={T.ph} />

            <div style={{ minWidth: 150 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{T.dep}</div>
              <input type="date" value={dep} min={today} onChange={e => setDep(e.target.value)} style={{ width: "100%", border: "2px solid #e2e8f0", borderRadius: 12, padding: "12px 12px", fontSize: 14, color: "#1e293b", outline: "none", fontFamily: "inherit", boxSizing: "border-box", cursor: "pointer" }} />
            </div>

            {trip === "round" && (
              <div style={{ minWidth: 150 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{T.ret}</div>
                <input type="date" value={ret} min={dep || today} onChange={e => setRet(e.target.value)} style={{ width: "100%", border: "2px solid #e2e8f0", borderRadius: 12, padding: "12px 12px", fontSize: 14, color: "#1e293b", outline: "none", fontFamily: "inherit", boxSizing: "border-box", cursor: "pointer" }} />
              </div>
            )}

            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{T.pax}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, border: "2px solid #e2e8f0", borderRadius: 12, padding: "10px 14px" }}>
                <button onClick={() => setPax(Math.max(1, pax - 1))} style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", width: 28, height: 28, cursor: "pointer", fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                <span style={{ fontWeight: 700, fontSize: 15, minWidth: 20, textAlign: "center" }}>{pax}</span>
                <button onClick={() => setPax(Math.min(9, pax + 1))} style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", width: 28, height: 28, cursor: "pointer", fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
              </div>
            </div>

            <button onClick={search} style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", color: "white", border: "none", borderRadius: 14, padding: "14px 30px", fontSize: 15, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 20px rgba(249,115,22,0.4)", whiteSpace: "nowrap", transition: "all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              🔍 {T.search}
            </button>
          </div>

          {error && (
            <div style={{ marginTop: 14, background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 16px", color: "#dc2626", fontSize: 13, fontWeight: 500 }}>
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* DEALS */}
        <div style={{ marginTop: 60, marginBottom: 50 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>{T.deals} 🔥</h2>
          <p style={{ color: "#64748b", margin: "0 0 28px" }}>Precios desde España · Actualizados hoy</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {deals.map((d, i) => (
              <div key={i} onClick={() => openDeal(d)}
                style={{ background: "white", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 20px rgba(0,0,0,0.06)", cursor: "pointer", transition: "all 0.25s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.13)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 20px rgba(0,0,0,0.06)"; }}>
                <div style={{ background: colors[i % colors.length], padding: "20px", color: "white" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 26, fontWeight: 900 }}>{d.from}</div>
                      <div style={{ fontSize: 12, opacity: 0.8 }}>{d.fromCity}</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 20 }}>✈</div>
                      <div style={{ fontSize: 11, opacity: 0.7 }}>{d.duration}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 26, fontWeight: 900 }}>{d.to}</div>
                      <div style={{ fontSize: 12, opacity: 0.8 }}>{d.toCity}</div>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 2 }}>{d.airline}</div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>desde</div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: "#0f172a", lineHeight: 1.1 }}>€{d.price}</div>
                  </div>
                  <div style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", color: "white", borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 700 }}>
                    {T.see} →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ borderTop: "1px solid #e2e8f0", padding: "28px 0", textAlign: "center", color: "#94a3b8", fontSize: 13 }}>
          <div style={{ fontWeight: 800, fontSize: 16, color: "#475569", marginBottom: 6 }}>
            Sky<span style={{ color: "#f97316" }}>Deals</span>.es
          </div>
          <p style={{ margin: 0 }}>Comparador de vuelos · Los mejores precios · {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}
