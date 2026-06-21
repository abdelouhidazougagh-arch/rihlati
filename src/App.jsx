import { useState, useEffect, useRef } from "react";
import "./App.css";

// ─── DATA ────────────────────────────────────────────────────────────────────
const AIRPORTS = [
  { code: "MAD", city: "Madrid", country: "España", flag: "🇪🇸" },
  { code: "BCN", city: "Barcelona", country: "España", flag: "🇪🇸" },
  { code: "AGP", city: "Málaga", country: "España", flag: "🇪🇸" },
  { code: "VLC", city: "Valencia", country: "España", flag: "🇪🇸" },
  { code: "SVQ", city: "Sevilla", country: "España", flag: "🇪🇸" },
  { code: "BIO", city: "Bilbao", country: "España", flag: "🇪🇸" },
  { code: "PMI", city: "Palma de Mallorca", country: "España", flag: "🇪🇸" },
  { code: "LPA", city: "Las Palmas", country: "España", flag: "🇪🇸" },
  { code: "TFN", city: "Tenerife Norte", country: "España", flag: "🇪🇸" },
  { code: "CMN", city: "Casablanca", country: "Marruecos", flag: "🇲🇦" },
  { code: "RAK", city: "Marrakech", country: "Marruecos", flag: "🇲🇦" },
  { code: "RBA", city: "Rabat", country: "Marruecos", flag: "🇲🇦" },
  { code: "FEZ", city: "Fez", country: "Marruecos", flag: "🇲🇦" },
  { code: "TNG", city: "Tánger", country: "Marruecos", flag: "🇲🇦" },
  { code: "OUD", city: "Oujda", country: "Marruecos", flag: "🇲🇦" },
  { code: "AGA", city: "Agadir", country: "Marruecos", flag: "🇲🇦" },
  { code: "NDR", city: "Nador", country: "Marruecos", flag: "🇲🇦" },
  { code: "ALG", city: "Argel", country: "Argelia", flag: "🇩🇿" },
  { code: "ORN", city: "Orán", country: "Argelia", flag: "🇩🇿" },
  { code: "CAI", city: "El Cairo", country: "Egipto", flag: "🇪🇬" },
  { code: "TUN", city: "Túnez", country: "Túnez", flag: "🇹🇳" },
  { code: "LHR", city: "Londres Heathrow", country: "Reino Unido", flag: "🇬🇧" },
  { code: "CDG", city: "París Charles de Gaulle", country: "Francia", flag: "🇫🇷" },
  { code: "FCO", city: "Roma Fiumicino", country: "Italia", flag: "🇮🇹" },
  { code: "AMS", city: "Ámsterdam", country: "Países Bajos", flag: "🇳🇱" },
  { code: "FRA", city: "Frankfurt", country: "Alemania", flag: "🇩🇪" },
  { code: "IST", city: "Estambul", country: "Turquía", flag: "🇹🇷" },
  { code: "DXB", city: "Dubái", country: "EAU", flag: "🇦🇪" },
  { code: "DOH", city: "Doha", country: "Catar", flag: "🇶🇦" },
  { code: "JFK", city: "Nueva York JFK", country: "EE.UU.", flag: "🇺🇸" },
  { code: "LAX", city: "Los Ángeles", country: "EE.UU.", flag: "🇺🇸" },
  { code: "GRU", city: "São Paulo", country: "Brasil", flag: "🇧🇷" },
  { code: "BOG", city: "Bogotá", country: "Colombia", flag: "🇨🇴" },
  { code: "NBO", city: "Nairobi", country: "Kenia", flag: "🇰🇪" },
  { code: "BKK", city: "Bangkok", country: "Tailandia", flag: "🇹🇭" },
  { code: "SIN", city: "Singapur", country: "Singapur", flag: "🇸🇬" },
  { code: "NRT", city: "Tokio Narita", country: "Japón", flag: "🇯🇵" },
  { code: "SYD", city: "Sídney", country: "Australia", flag: "🇦🇺" },
];

const DEALS = [
  { from: "MAD", to: "CMN", fromCity: "Madrid", toCity: "Casablanca", price: 39, airline: "Royal Air Maroc", duration: "2h 15m", flag: "🇲🇦" },
  { from: "BCN", to: "RAK", fromCity: "Barcelona", toCity: "Marrakech", price: 49, airline: "Vueling", duration: "2h 30m", flag: "🇲🇦" },
  { from: "MAD", to: "ALG", fromCity: "Madrid", toCity: "Argel", price: 55, airline: "Air Algérie", duration: "2h 45m", flag: "🇩🇿" },
  { from: "AGP", to: "CMN", fromCity: "Málaga", toCity: "Casablanca", price: 35, airline: "Iberia Express", duration: "1h 50m", flag: "🇲🇦" },
  { from: "MAD", to: "DXB", fromCity: "Madrid", toCity: "Dubái", price: 289, airline: "Emirates", duration: "6h 45m", flag: "🇦🇪" },
  { from: "BCN", to: "CDG", fromCity: "Barcelona", toCity: "París", price: 29, airline: "Vueling", duration: "1h 50m", flag: "🇫🇷" },
  { from: "MAD", to: "IST", fromCity: "Madrid", toCity: "Estambul", price: 89, airline: "Turkish Airlines", duration: "4h 10m", flag: "🇹🇷" },
  { from: "MAD", to: "TNG", fromCity: "Madrid", toCity: "Tánger", price: 45, airline: "Ryanair", duration: "1h 40m", flag: "🇲🇦" },
  { from: "BCN", to: "LHR", fromCity: "Barcelona", toCity: "Londres", price: 59, airline: "British Airways", duration: "2h 15m", flag: "🇬🇧" },
];

const MARKER = "539339";
const KIWI_AFFILIATE = "https://kiwi.tpk.lv/BcDdobFR";

// ─── Build Kiwi search URL ────────────────────────────────────────────────────
function buildKiwiUrl(origin, dest, depDate, retDate, passengers, tripType) {
  if (!origin || !dest) return KIWI_AFFILIATE;

  const formatDate = (d) => {
    if (!d) return "";
    const [y, m, day] = d.split("-");
    return `${day}/${m}/${y}`;
  };

  const dep = formatDate(depDate) || formatDate(new Date().toISOString().split("T")[0]);
  const ret = formatDate(retDate);

  let kiwiUrl = `https://www.kiwi.com/es/search/results/${origin.city.toLowerCase().replace(/ /g, "-")}/${dest.city.toLowerCase().replace(/ /g, "-")}/${dep}`;

  if (tripType === "ida-vuelta" && ret) {
    kiwiUrl += `/${ret}`;
  }

  kiwiUrl += `?adults=${passengers}&currency=EUR`;

  // Use Travelpayouts short link as base, append destination
  return `${KIWI_AFFILIATE}?custom_url=${encodeURIComponent(kiwiUrl)}`;
}

// ─── AUTOCOMPLETE INPUT ───────────────────────────────────────────────────────
function AirportInput({ placeholder, value, onChange, icon }) {
  const [query, setQuery] = useState(value || "");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleInput = (e) => {
    const q = e.target.value;
    setQuery(q);
    if (q.length >= 1) {
      const filtered = AIRPORTS.filter(
        (a) =>
          a.city.toLowerCase().includes(q.toLowerCase()) ||
          a.code.toLowerCase().includes(q.toLowerCase()) ||
          a.country.toLowerCase().includes(q.toLowerCase())
      ).slice(0, 7);
      setResults(filtered);
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const select = (airport) => {
    setQuery(`${airport.city} (${airport.code})`);
    onChange(airport);
    setOpen(false);
  };

  return (
    <div className="airport-input-wrap" ref={ref}>
      <span className="input-icon">{icon}</span>
      <input
        className="airport-input"
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleInput}
        onFocus={() => query.length >= 1 && setOpen(true)}
        autoComplete="off"
      />
      {open && results.length > 0 && (
        <div className="autocomplete-dropdown">
          {results.map((a) => (
            <div key={a.code} className="autocomplete-item" onClick={() => select(a)}>
              <span className="ac-flag">{a.flag}</span>
              <div className="ac-info">
                <span className="ac-city">{a.city}</span>
                <span className="ac-country">{a.country}</span>
              </div>
              <span className="ac-code">{a.code}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState("vuelos");
  const [tripType, setTripType] = useState("ida-vuelta");
  const [origin, setOrigin] = useState(null);
  const [dest, setDest] = useState(null);
  const [depDate, setDepDate] = useState("");
  const [retDate, setRetDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [heroVisible, setHeroVisible] = useState(false);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  const tabs = [
    { id: "vuelos", label: "Vuelos", icon: "✈️" },
    { id: "hoteles", label: "Hoteles", icon: "🏨" },
    { id: "coches", label: "Coches", icon: "🚗" },
    { id: "ferries", label: "Ferries", icon: "🚢" },
  ];

  const handleSearch = () => {
    setSearchError("");

    if (activeTab === "vuelos") {
      if (!origin || !dest) {
        setSearchError("Por favor, selecciona origen y destino.");
        return;
      }
      if (!depDate) {
        setSearchError("Por favor, selecciona la fecha de salida.");
        return;
      }
      const url = buildKiwiUrl(origin, dest, depDate, retDate, passengers, tripType);
      if (url) window.open(url, "_blank");
    }

    if (activeTab === "hoteles") {
      if (!dest) {
        setSearchError("Por favor, selecciona un destino.");
        return;
      }
      const hotelUrl = `https://www.booking.com/searchresults.es.html?ss=${dest.city}&checkin=${depDate}&checkout=${retDate}&group_adults=${passengers}`;
      window.open(hotelUrl, "_blank");
    }

    if (activeTab === "coches") {
      if (!origin) {
        setSearchError("Por favor, selecciona el lugar de recogida.");
        return;
      }
      window.open(KIWI_AFFILIATE, "_blank");
    }

    if (activeTab === "ferries") {
      window.open(KIWI_AFFILIATE, "_blank");
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab.id);
    setSearchError("");
  };

  return (
    <div className="app">
      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="nav-inner">
          <div className="logo">
            <span className="logo-icon">✈</span>
            <span className="logo-text">Sky<span className="logo-accent">Deals</span></span>
          </div>
          <div className="nav-links">
            <a href="#ofertas">Ofertas</a>
            <a href="#destinos">Destinos</a>
            <a href="#search-section">Buscar</a>
          </div>
          <div className="nav-badge">🔥 Precios mínimos garantizados</div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className={`hero ${heroVisible ? "hero-visible" : ""}`}>
        <div className="hero-bg">
          <div className="hero-gradient" />
          <div className="hero-grid" />
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            Actualizado en tiempo real
          </div>
          <h1 className="hero-title">
            Vuela más lejos,<br />
            <span className="hero-accent">paga menos</span>
          </h1>
          <p className="hero-subtitle">
            Compara millones de vuelos, hoteles, ferries y coches.<br />
            El mejor precio, siempre.
          </p>

          {/* ── SEARCH BOX ── */}
          <div className="search-box" id="search-section">
            {/* Tabs */}
            <div className="search-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`search-tab ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => handleTabChange(tab)}
                >
                  <span>{tab.icon}</span> {tab.label}
                </button>
              ))}
            </div>

            {/* Trip type */}
            {activeTab === "vuelos" && (
              <div className="trip-type-row">
                {["ida-vuelta", "solo-ida", "multidestino"].map((t) => (
                  <label key={t} className={`trip-radio ${tripType === t ? "selected" : ""}`}>
                    <input type="radio" name="trip" value={t} checked={tripType === t} onChange={() => setTripType(t)} />
                    {t === "ida-vuelta" ? "Ida y vuelta" : t === "solo-ida" ? "Solo ida" : "Multidestino"}
                  </label>
                ))}
              </div>
            )}

            {/* Fields */}
            <div className="search-fields">
              {(activeTab === "vuelos" || activeTab === "ferries") && (
                <>
                  <AirportInput
                    placeholder="Origen — Ciudad o aeropuerto"
                    icon="🛫"
                    value=""
                    onChange={setOrigin}
                  />
                  <button
                    className="swap-btn"
                    onClick={() => {
                      const tmp = origin;
                      setOrigin(dest);
                      setDest(tmp);
                    }}
                  >⇄</button>
                  <AirportInput
                    placeholder="Destino — Ciudad o aeropuerto"
                    icon="🛬"
                    value=""
                    onChange={setDest}
                  />
                </>
              )}

              {activeTab === "hoteles" && (
                <AirportInput
                  placeholder="¿A dónde vas? — Ciudad o hotel"
                  icon="🏨"
                  value=""
                  onChange={setDest}
                />
              )}

              {activeTab === "coches" && (
                <AirportInput
                  placeholder="Lugar de recogida — Ciudad o aeropuerto"
                  icon="📍"
                  value=""
                  onChange={setOrigin}
                />
              )}

              <div className="date-fields">
                <div className="date-field">
                  <span className="date-icon">📅</span>
                  <input
                    type="date"
                    className="date-input"
                    value={depDate}
                    onChange={(e) => setDepDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                {((activeTab === "vuelos" && tripType === "ida-vuelta") || activeTab === "hoteles") && (
                  <div className="date-field">
                    <span className="date-icon">📅</span>
                    <input
                      type="date"
                      className="date-input"
                      value={retDate}
                      onChange={(e) => setRetDate(e.target.value)}
                      min={depDate || new Date().toISOString().split("T")[0]}
                    />
                  </div>
                )}
              </div>

              <div className="passengers-field">
                <span className="pax-icon">👤</span>
                <button className="pax-btn" onClick={() => setPassengers(Math.max(1, passengers - 1))}>−</button>
                <span className="pax-count">{passengers} {passengers === 1 ? "pasajero" : "pasajeros"}</span>
                <button className="pax-btn" onClick={() => setPassengers(Math.min(9, passengers + 1))}>+</button>
              </div>
            </div>

            {searchError && <p className="search-error">⚠️ {searchError}</p>}

            <button className="search-btn" onClick={handleSearch}>
              <span className="search-btn-icon">🔍</span>
              Buscar las mejores ofertas
            </button>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            {[
              { n: "2M+", l: "Vuelos comparados" },
              { n: "500K+", l: "Hoteles disponibles" },
              { n: "190+", l: "Países cubiertos" },
              { n: "24/7", l: "Precios actualizados" },
            ].map((s) => (
              <div key={s.n} className="stat-item">
                <span className="stat-num">{s.n}</span>
                <span className="stat-label">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEALS ── */}
      <section id="ofertas" className="deals-section">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-eyebrow">🔥 En tiempo real</span>
            <h2 className="section-title">Ofertas destacadas</h2>
            <p className="section-sub">Precios desde España · Actualizados hoy · Ida y vuelta</p>
          </div>
          <div className="deals-grid">
            {DEALS.map((deal, i) => {
              const originObj = AIRPORTS.find((a) => a.code === deal.from);
              const destObj = AIRPORTS.find((a) => a.code === deal.to);
              const url = buildKiwiUrl(originObj, destObj, "", "", 1, "ida-vuelta");
              return (
                <a
                  key={i}
                  href={url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="deal-card"
                >
                  <div className="deal-header">
                    <span className="deal-flag">{deal.flag}</span>
                    <span className="deal-airline">{deal.airline}</span>
                  </div>
                  <div className="deal-route">
                    <span className="deal-city">{deal.fromCity}</span>
                    <span className="deal-arrow">✈</span>
                    <span className="deal-city">{deal.toCity}</span>
                  </div>
                  <div className="deal-meta">
                    <span className="deal-duration">⏱ {deal.duration}</span>
                    <span className="deal-type">Ida y vuelta</span>
                  </div>
                  <div className="deal-footer">
                    <span className="deal-from">desde</span>
                    <span className="deal-price">{deal.price}€</span>
                    <span className="deal-cta">Ver oferta →</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS ── */}
      <section id="destinos" className="destinations-section">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-eyebrow">🌍 Explora</span>
            <h2 className="section-title">Destinos populares</h2>
          </div>
          <div className="dest-grid">
            {[
              { name: "Marruecos", img: "🕌", desc: "Vuelos desde 35€", from: "MAD", to: "CMN" },
              { name: "Dubái", img: "🏙️", desc: "Vuelos desde 289€", from: "MAD", to: "DXB" },
              { name: "París", img: "🗼", desc: "Vuelos desde 29€", from: "BCN", to: "CDG" },
              { name: "Londres", img: "🎡", desc: "Vuelos desde 49€", from: "BCN", to: "LHR" },
              { name: "Estambul", img: "🕍", desc: "Vuelos desde 89€", from: "MAD", to: "IST" },
              { name: "Argelia", img: "🌅", desc: "Vuelos desde 55€", from: "MAD", to: "ALG" },
            ].map((d) => {
              const originObj = AIRPORTS.find((a) => a.code === d.from);
              const destObj = AIRPORTS.find((a) => a.code === d.to);
              const url = buildKiwiUrl(originObj, destObj, "", "", 1, "solo-ida");
              return (
                <a
                  key={d.name}
                  href={url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dest-card"
                >
                  <div className="dest-emoji">{d.img}</div>
                  <div className="dest-info">
                    <span className="dest-name">{d.name}</span>
                    <span className="dest-price">{d.desc}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="why-section">
        <div className="section-inner">
          <div className="section-header">
            <h2 className="section-title">¿Por qué SkyDeals?</h2>
          </div>
          <div className="why-grid">
            {[
              { icon: "🔍", title: "Comparación real", desc: "Analizamos millones de precios en segundos para encontrar el vuelo más barato." },
              { icon: "💳", title: "Sin comisiones ocultas", desc: "El precio que ves es el precio que pagas. Transparencia total." },
              { icon: "🔔", title: "Alertas de precio", desc: "Te avisamos cuando baje el precio de tu vuelo favorito." },
              { icon: "🌍", title: "190+ países", desc: "Vuelos a cualquier destino del mundo desde España." },
            ].map((w) => (
              <div key={w.title} className="why-card">
                <span className="why-icon">{w.icon}</span>
                <h3 className="why-title">{w.title}</h3>
                <p className="why-desc">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logo">
            <span className="logo-icon">✈</span>
            <span className="logo-text">Sky<span className="logo-accent">Deals</span></span>
          </div>
          <p className="footer-copy">© 2026 SkyDeals.es · Comparador de vuelos, hoteles y más · España</p>
          <p className="footer-disclaimer">
            SkyDeals es un comparador. Al hacer clic en "Ver oferta", serás redirigido al sitio del proveedor.
          </p>
        </div>
      </footer>
    </div>
  );
}
