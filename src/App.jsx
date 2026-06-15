import { useState, useEffect, useRef } from "react";

const airports = [
  { code: "MAD", name: "Madrid Barajas", city: "Madrid", country: "España" },
  { code: "BCN", name: "Barcelona El Prat", city: "Barcelona", country: "España" },
  { code: "CMN", name: "Mohammed V", city: "Casablanca", country: "Marruecos" },
  { code: "RAK", name: "Menara", city: "Marrakech", country: "Marruecos" },
  { code: "FEZ", name: "Saïs", city: "Fez", country: "Marruecos" },
  { code: "TNG", name: "Ibn Battuta", city: "Tánger", country: "Marruecos" },
  { code: "OUD", name: "Angads", city: "Oujda", country: "Marruecos" },
  { code: "AGA", name: "Al Massira", city: "Agadir", country: "Marruecos" },
  { code: "NDR", name: "Aroport Al Hoceima", city: "Al Hoceima", country: "Marruecos" },
  { code: "LHR", name: "Heathrow", city: "Londres", country: "Reino Unido" },
  { code: "CDG", name: "Charles de Gaulle", city: "París", country: "Francia" },
  { code: "AMS", name: "Schiphol", city: "Ámsterdam", country: "Países Bajos" },
  { code: "FCO", name: "Fiumicino", city: "Roma", country: "Italia" },
  { code: "DXB", name: "Dubai Int'l", city: "Dubái", country: "EAU" },
  { code: "IST", name: "Istanbul", city: "Estambul", country: "Turquía" },
  { code: "CAI", name: "Cairo Int'l", city: "El Cairo", country: "Egipto" },
  { code: "ALG", name: "Houari Boumediene", city: "Argel", country: "Argelia" },
  { code: "TUN", name: "Tunis Carthage", city: "Túnez", country: "Túnez" },
  { code: "JFK", name: "John F. Kennedy", city: "Nueva York", country: "EE.UU." },
  { code: "MXP", name: "Malpensa", city: "Milán", country: "Italia" },
  { code: "BRU", name: "Brussels Airport", city: "Bruselas", country: "Bélgica" },
  { code: "VLC", name: "Valencia", city: "Valencia", country: "España" },
  { code: "SVQ", name: "Sevilla", city: "Sevilla", country: "España" },
  { code: "AGP", name: "Málaga Costa del Sol", city: "Málaga", country: "España" },
  { code: "BIO", name: "Bilbao", city: "Bilbao", country: "España" },
];

const deals = [
  { from: "MAD", to: "CMN", price: 49, airline: "Royal Air Maroc", duration: "2h 15m" },
  { from: "MAD", to: "RAK", price: 65, airline: "Ryanair", duration: "2h 30m" },
  { from: "BCN", to: "CMN", price: 55, airline: "Vueling", duration: "2h 20m" },
  { from: "MAD", to: "DXB", price: 189, airline: "Emirates", duration: "6h 45m" },
  { from: "MAD", to: "LHR", price: 79, airline: "Iberia", duration: "2h 05m" },
  { from: "BCN", to: "CDG", price: 39, airline: "Vueling", duration: "1h 50m" },
];

const translations = {
  es: {
    tagline: "Vuela más lejos por menos",
    subtitle: "Compara millones de vuelos y encuentra el mejor precio",
    from: "Origen",
    to: "Destino",
    departure: "Ida",
    returnDate: "Vuelta",
    passengers: "Pasajeros",
    oneWay: "Solo ida",
    roundTrip: "Ida y vuelta",
    search: "Buscar vuelos",
    deals: "Ofertas de la semana",
    adult: "Adulto",
    adults: "Adultos",
    searchPlaceholder: "Ciudad o aeropuerto",
    from2: "desde",
    book: "Ver oferta",
    hotels: "Hoteles",
    cars: "Coches",
    ferries: "Ferries",
    flights: "Vuelos",
  },
  en: {
    tagline: "Fly further for less",
    subtitle: "Compare millions of flights and find the best price",
    from: "From",
    to: "To",
    departure: "Departure",
    returnDate: "Return",
    passengers: "Passengers",
    oneWay: "One way",
    roundTrip: "Round trip",
    search: "Search flights",
    deals: "Deals of the week",
    adult: "Adult",
    adults: "Adults",
    searchPlaceholder: "City or airport",
    from2: "from",
    book: "See deal",
    hotels: "Hotels",
    cars: "Cars",
    ferries: "Ferries",
    flights: "Flights",
  },
  ar: {
    tagline: "سافر أبعد بأقل تكلفة",
    subtitle: "قارن ملايين الرحلات وابحث عن أفضل سعر",
    from: "من",
    to: "إلى",
    departure: "المغادرة",
    returnDate: "العودة",
    passengers: "الركاب",
    oneWay: "ذهاب فقط",
    roundTrip: "ذهاب وعودة",
    search: "ابحث عن رحلات",
    deals: "عروض الأسبوع",
    adult: "بالغ",
    adults: "بالغون",
    searchPlaceholder: "مدينة أو مطار",
    from2: "من",
    book: "عرض الصفقة",
    hotels: "فنادق",
    cars: "سيارات",
    ferries: "عبّارات",
    flights: "رحلات",
  },
};

function AirportSearch({ label, value, onChange, placeholder, lang }) {
  const [query, setQuery] = useState(value ? `${value.city} (${value.code})` : "");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleChange = (e) => {
    const q = e.target.value;
    setQuery(q);
    if (q.length < 1) { setResults([]); setOpen(false); return; }
    const filtered = airports.filter(a =>
      a.city.toLowerCase().includes(q.toLowerCase()) ||
      a.code.toLowerCase().includes(q.toLowerCase()) ||
      a.country.toLowerCase().includes(q.toLowerCase()) ||
      a.name.toLowerCase().includes(q.toLowerCase())
    ).slice(0, 6);
    setResults(filtered);
    setOpen(true);
  };

  const select = (airport) => {
    onChange(airport);
    setQuery(`${airport.city} (${airport.code})`);
    setOpen(false);
    setResults([]);
  };

  return (
    <div ref={ref} style={{ position: "relative", flex: 1 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>
        {label}
      </label>
      <div style={{ display: "flex", alignItems: "center", background: "white", border: "2px solid #e2e8f0", borderRadius: 12, padding: "12px 16px", gap: 10, transition: "border-color 0.2s" }}
        onFocus={() => {}} >
        <span style={{ fontSize: 18 }}>✈️</span>
        <input
          value={query}
          onChange={handleChange}
          onFocus={() => query.length > 0 && setOpen(true)}
          placeholder={placeholder}
          style={{ border: "none", outline: "none", flex: 1, fontSize: 15, color: "#1e293b", background: "transparent", fontFamily: "inherit" }}
        />
      </div>
      {open && results.length > 0 && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "white", borderRadius: 12, boxShadow: "0 20px 60px rgba(0,0,0,0.15)", zIndex: 1000, overflow: "hidden", marginTop: 4 }}>
          {results.map(a => (
            <div key={a.code} onClick={() => select(a)}
              style={{ padding: "12px 16px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9" }}
              onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
              onMouseLeave={e => e.currentTarget.style.background = "white"}>
              <div>
                <div style={{ fontWeight: 600, color: "#1e293b", fontSize: 14 }}>{a.city}</div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>{a.name} · {a.country}</div>
              </div>
              <span style={{ background: "#f1f5f9", color: "#475569", padding: "3px 8px", borderRadius: 6, fontSize: 12, fontWeight: 700 }}>{a.code}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("es");
  const [tripType, setTripType] = useState("roundTrip");
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [depDate, setDepDate] = useState("");
  const [retDate, setRetDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [activeTab, setActiveTab] = useState("flights");
  const t = translations[lang];
  const isRTL = lang === "ar";

  const swap = () => {
    const tmp = origin;
    setOrigin(destination);
    setDestination(tmp);
  };

  const handleSearch = () => {
    if (!origin || !destination || !depDate) return;
    const marker = "739213";
    const url = `https://www.kiwi.com/es/search/${origin.code}/${destination.code}/${depDate}${tripType === "roundTrip" && retDate ? `/${retDate}` : ""}?adults=${passengers}&affilid=picky_${marker}`;
    window.open(url, "_blank");
  };

  const tabs = [
    { id: "flights", icon: "✈️", label: t.flights },
    { id: "hotels", icon: "🏨", label: t.hotels },
    { id: "cars", icon: "🚗", label: t.cars },
    { id: "ferries", icon: "🚢", label: t.ferries },
  ];

  return (
    <div dir={isRTL ? "rtl" : "ltr"} style={{ minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f8fafc" }}>

      {/* HEADER */}
      <header style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0369a1 100%)", color: "white", paddingBottom: 80 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 20px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>

            {/* LOGO */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ background: "linear-gradient(135deg, #f97316, #fb923c)", borderRadius: 10, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>✈️</div>
              <div>
                <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>Sky</span>
                <span style={{ fontSize: 22, fontWeight: 800, color: "#f97316" }}>Deals</span>
                <span style={{ fontSize: 10, display: "block", color: "#94a3b8", letterSpacing: 2, textTransform: "uppercase", marginTop: -4 }}>skydeals.es</span>
              </div>
            </div>

            {/* LANG SWITCHER */}
            <div style={{ display: "flex", gap: 6 }}>
              {["es", "en", "ar"].map(l => (
                <button key={l} onClick={() => setLang(l)}
                  style={{ padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, background: lang === l ? "#f97316" : "rgba(255,255,255,0.1)", color: "white", transition: "all 0.2s" }}>
                  {l === "es" ? "ES" : l === "en" ? "EN" : "AR"}
                </button>
              ))}
            </div>
          </div>

          {/* HERO TEXT */}
          <div style={{ textAlign: "center", padding: "40px 20px 30px" }}>
            <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, margin: "0 0 12px", letterSpacing: -1, lineHeight: 1.1 }}>
              {t.tagline}
            </h1>
            <p style={{ color: "#94a3b8", fontSize: 16, margin: 0 }}>{t.subtitle}</p>
          </div>

          {/* TABS */}
          <div style={{ display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap" }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{ padding: "10px 20px", borderRadius: 30, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, background: activeTab === tab.id ? "white" : "rgba(255,255,255,0.1)", color: activeTab === tab.id ? "#0f172a" : "white", transition: "all 0.2s" }}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* SEARCH BOX */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ background: "white", borderRadius: 20, boxShadow: "0 20px 60px rgba(0,0,0,0.12)", padding: "28px", marginTop: -50, position: "relative", zIndex: 10 }}>

          {/* TRIP TYPE */}
          <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
            {["oneWay", "roundTrip"].map(type => (
              <button key={type} onClick={() => setTripType(type)}
                style={{ padding: "8px 20px", borderRadius: 20, border: `2px solid ${tripType === type ? "#0369a1" : "#e2e8f0"}`, background: tripType === type ? "#eff6ff" : "white", color: tripType === type ? "#0369a1" : "#64748b", fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.2s" }}>
                {t[type]}
              </button>
            ))}
          </div>

          {/* SEARCH FIELDS */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>

            <AirportSearch label={t.from} value={origin} onChange={setOrigin} placeholder={t.searchPlaceholder} lang={lang} />

            {/* SWAP */}
            <button onClick={swap}
              style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", width: 38, height: 38, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginBottom: 2, transition: "all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#e2e8f0"}
              onMouseLeave={e => e.currentTarget.style.background = "#f1f5f9"}>
              ⇄
            </button>

            <AirportSearch label={t.to} value={destination} onChange={setDestination} placeholder={t.searchPlaceholder} lang={lang} />

            {/* DATES */}
            <div style={{ minWidth: 140 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{t.departure}</label>
              <input type="date" value={depDate} onChange={e => setDepDate(e.target.value)} min={new Date().toISOString().split("T")[0]}
                style={{ width: "100%", border: "2px solid #e2e8f0", borderRadius: 12, padding: "12px 14px", fontSize: 14, color: "#1e293b", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
            </div>

            {tripType === "roundTrip" && (
              <div style={{ minWidth: 140 }}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{t.returnDate}</label>
                <input type="date" value={retDate} onChange={e => setRetDate(e.target.value)} min={depDate || new Date().toISOString().split("T")[0]}
                  style={{ width: "100%", border: "2px solid #e2e8f0", borderRadius: 12, padding: "12px 14px", fontSize: 14, color: "#1e293b", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
              </div>
            )}

            {/* PASSENGERS */}
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{t.passengers}</label>
              <div style={{ display: "flex", alignItems: "center", gap: 10, border: "2px solid #e2e8f0", borderRadius: 12, padding: "10px 14px" }}>
                <button onClick={() => setPassengers(Math.max(1, passengers - 1))}
                  style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", width: 28, height: 28, cursor: "pointer", fontSize: 16, fontWeight: 700 }}>−</button>
                <span style={{ fontWeight: 700, fontSize: 15, minWidth: 20, textAlign: "center" }}>{passengers}</span>
                <button onClick={() => setPassengers(Math.min(9, passengers + 1))}
                  style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", width: 28, height: 28, cursor: "pointer", fontSize: 16, fontWeight: 700 }}>+</button>
              </div>
            </div>

            {/* SEARCH BUTTON */}
            <button onClick={handleSearch}
              style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", color: "white", border: "none", borderRadius: 14, padding: "14px 32px", fontSize: 15, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap", boxShadow: "0 4px 20px rgba(249,115,22,0.4)", transition: "all 0.2s", letterSpacing: 0.3 }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              🔍 {t.search}
            </button>
          </div>
        </div>

        {/* DEALS SECTION */}
        <div style={{ marginTop: 60, marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", marginBottom: 6 }}>{t.deals} 🔥</h2>
          <p style={{ color: "#64748b", marginBottom: 28 }}>Precios desde España · Actualizados hoy</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {deals.map((deal, i) => {
              const orig = airports.find(a => a.code === deal.from);
              const dest = airports.find(a => a.code === deal.to);
              return (
                <div key={i}
                  style={{ background: "white", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 20px rgba(0,0,0,0.06)", transition: "all 0.2s", cursor: "pointer" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 20px rgba(0,0,0,0.06)"; }}>

                  <div style={{ background: `linear-gradient(135deg, hsl(${i * 40 + 200}, 70%, 20%), hsl(${i * 40 + 220}, 70%, 35%))`, padding: "20px", color: "white" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 22, fontWeight: 900 }}>{deal.from}</div>
                        <div style={{ fontSize: 11, opacity: 0.8 }}>{orig?.city}</div>
                      </div>
                      <div style={{ textAlign: "center", opacity: 0.7 }}>
                        <div style={{ fontSize: 18 }}>✈</div>
                        <div style={{ fontSize: 10 }}>{deal.duration}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 22, fontWeight: 900 }}>{deal.to}</div>
                        <div style={{ fontSize: 11, opacity: 0.8 }}>{dest?.city}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 2 }}>{deal.airline}</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>{t.from2}</div>
                      <div style={{ fontSize: 26, fontWeight: 900, color: "#0f172a" }}>€{deal.price}</div>
                    </div>
                    <button
                      onClick={() => {
                        const url = `https://www.kiwi.com/es/search/${deal.from}/${deal.to}?affilid=picky_739213`;
                        window.open(url, "_blank");
                      }}
                      style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", color: "white", border: "none", borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                      {t.book} →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FOOTER */}
        <footer style={{ borderTop: "1px solid #e2e8f0", padding: "30px 0", textAlign: "center", color: "#94a3b8", fontSize: 13 }}>
          <div style={{ marginBottom: 8 }}>
            <span style={{ fontWeight: 700, color: "#475569" }}>Sky</span>
            <span style={{ fontWeight: 700, color: "#f97316" }}>Deals</span>
            <span>.es</span>
          </div>
          <p style={{ margin: 0 }}>Comparador de vuelos · Los mejores precios garantizados</p>
        </footer>
      </div>
    </div>
  );
}
