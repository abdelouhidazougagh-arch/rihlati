import { useState, useRef, useEffect } from "react";

const MARKER = "739213";

const airports = [
  { code: "MAD", city: "Madrid", name: "Barajas", country: "España", flag: "🇪🇸" },
  { code: "BCN", city: "Barcelona", name: "El Prat", country: "España", flag: "🇪🇸" },
  { code: "VLC", city: "Valencia", name: "Valencia", country: "España", flag: "🇪🇸" },
  { code: "AGP", city: "Málaga", name: "Costa del Sol", country: "España", flag: "🇪🇸" },
  { code: "SVQ", city: "Sevilla", name: "San Pablo", country: "España", flag: "🇪🇸" },
  { code: "BIO", city: "Bilbao", name: "Bilbao", country: "España", flag: "🇪🇸" },
  { code: "PMI", city: "Palma de Mallorca", name: "Son Sant Joan", country: "España", flag: "🇪🇸" },
  { code: "TFS", city: "Tenerife Sur", name: "Reina Sofía", country: "España", flag: "🇪🇸" },
  { code: "LPA", city: "Las Palmas", name: "Gran Canaria", country: "España", flag: "🇪🇸" },
  { code: "ALC", city: "Alicante", name: "Internacional", country: "España", flag: "🇪🇸" },
  { code: "CMN", city: "Casablanca", name: "Mohammed V", country: "Marruecos", flag: "🇲🇦" },
  { code: "RAK", city: "Marrakech", name: "Menara", country: "Marruecos", flag: "🇲🇦" },
  { code: "FEZ", city: "Fez", name: "Saïs", country: "Marruecos", flag: "🇲🇦" },
  { code: "TNG", city: "Tánger", name: "Ibn Battuta", country: "Marruecos", flag: "🇲🇦" },
  { code: "OUD", city: "Oujda", name: "Angads", country: "Marruecos", flag: "🇲🇦" },
  { code: "AGA", city: "Agadir", name: "Al Massira", country: "Marruecos", flag: "🇲🇦" },
  { code: "NDR", city: "Al Hoceima", name: "Cherif Al Idrissi", country: "Marruecos", flag: "🇲🇦" },
  { code: "RBA", city: "Rabat", name: "Salé", country: "Marruecos", flag: "🇲🇦" },
  { code: "NNA", city: "Kenitra", name: "Kenitra", country: "Marruecos", flag: "🇲🇦" },
  { code: "ALG", city: "Argel", name: "Houari Boumediene", country: "Argelia", flag: "🇩🇿" },
  { code: "ORN", city: "Orán", name: "Ahmed Ben Bella", country: "Argelia", flag: "🇩🇿" },
  { code: "CZL", city: "Constantina", name: "Mohamed Boudiaf", country: "Argelia", flag: "🇩🇿" },
  { code: "TUN", city: "Túnez", name: "Carthage", country: "Túnez", flag: "🇹🇳" },
  { code: "SFA", city: "Sfax", name: "Thyna", country: "Túnez", flag: "🇹🇳" },
  { code: "MIR", city: "Monastir", name: "Habib Bourguiba", country: "Túnez", flag: "🇹🇳" },
  { code: "CAI", city: "El Cairo", name: "Internacional", country: "Egipto", flag: "🇪🇬" },
  { code: "HRG", city: "Hurghada", name: "Internacional", country: "Egipto", flag: "🇪🇬" },
  { code: "SSH", city: "Sharm el-Sheikh", name: "Internacional", country: "Egipto", flag: "🇪🇬" },
  { code: "LHR", city: "Londres", name: "Heathrow", country: "Reino Unido", flag: "🇬🇧" },
  { code: "LGW", city: "Londres", name: "Gatwick", country: "Reino Unido", flag: "🇬🇧" },
  { code: "STN", city: "Londres", name: "Stansted", country: "Reino Unido", flag: "🇬🇧" },
  { code: "MAN", city: "Mánchester", name: "Internacional", country: "Reino Unido", flag: "🇬🇧" },
  { code: "CDG", city: "París", name: "Charles de Gaulle", country: "Francia", flag: "🇫🇷" },
  { code: "ORY", city: "París", name: "Orly", country: "Francia", flag: "🇫🇷" },
  { code: "NCE", city: "Niza", name: "Côte d'Azur", country: "Francia", flag: "🇫🇷" },
  { code: "MRS", city: "Marsella", name: "Provence", country: "Francia", flag: "🇫🇷" },
  { code: "AMS", city: "Ámsterdam", name: "Schiphol", country: "Países Bajos", flag: "🇳🇱" },
  { code: "FCO", city: "Roma", name: "Fiumicino", country: "Italia", flag: "🇮🇹" },
  { code: "MXP", city: "Milán", name: "Malpensa", country: "Italia", flag: "🇮🇹" },
  { code: "VCE", city: "Venecia", name: "Marco Polo", country: "Italia", flag: "🇮🇹" },
  { code: "BRU", city: "Bruselas", name: "Internacional", country: "Bélgica", flag: "🇧🇪" },
  { code: "FRA", city: "Fráncfort", name: "Internacional", country: "Alemania", flag: "🇩🇪" },
  { code: "MUC", city: "Múnich", name: "Internacional", country: "Alemania", flag: "🇩🇪" },
  { code: "BER", city: "Berlín", name: "Brandenburg", country: "Alemania", flag: "🇩🇪" },
  { code: "DUS", city: "Düsseldorf", name: "Internacional", country: "Alemania", flag: "🇩🇪" },
  { code: "ZRH", city: "Zúrich", name: "Internacional", country: "Suiza", flag: "🇨🇭" },
  { code: "GVA", city: "Ginebra", name: "Internacional", country: "Suiza", flag: "🇨🇭" },
  { code: "LIS", city: "Lisboa", name: "Humberto Delgado", country: "Portugal", flag: "🇵🇹" },
  { code: "OPO", city: "Oporto", name: "Francisco Sá Carneiro", country: "Portugal", flag: "🇵🇹" },
  { code: "ATH", city: "Atenas", name: "Eleftherios Venizelos", country: "Grecia", flag: "🇬🇷" },
  { code: "SKG", city: "Salónica", name: "Macedonia", country: "Grecia", flag: "🇬🇷" },
  { code: "IST", city: "Estambul", name: "Internacional", country: "Turquía", flag: "🇹🇷" },
  { code: "SAW", city: "Estambul", name: "Sabiha Gökçen", country: "Turquía", flag: "🇹🇷" },
  { code: "DXB", city: "Dubái", name: "Internacional", country: "EAU", flag: "🇦🇪" },
  { code: "AUH", city: "Abu Dabi", name: "Internacional", country: "EAU", flag: "🇦🇪" },
  { code: "SHJ", city: "Sharjah", name: "Internacional", country: "EAU", flag: "🇦🇪" },
  { code: "DOH", city: "Doha", name: "Hamad", country: "Catar", flag: "🇶🇦" },
  { code: "RUH", city: "Riad", name: "Rey Khalid", country: "Arabia Saudí", flag: "🇸🇦" },
  { code: "JED", city: "Yeda", name: "Rey Abdulaziz", country: "Arabia Saudí", flag: "🇸🇦" },
  { code: "KWI", city: "Kuwait", name: "Internacional", country: "Kuwait", flag: "🇰🇼" },
  { code: "BAH", city: "Baréin", name: "Internacional", country: "Baréin", flag: "🇧🇭" },
  { code: "AMM", city: "Amán", name: "Queen Alia", country: "Jordania", flag: "🇯🇴" },
  { code: "BEY", city: "Beirut", name: "Rafic Hariri", country: "Líbano", flag: "🇱🇧" },
  { code: "NBO", city: "Nairobi", name: "Jomo Kenyatta", country: "Kenia", flag: "🇰🇪" },
  { code: "ADD", city: "Adís Abeba", name: "Bole", country: "Etiopía", flag: "🇪🇹" },
  { code: "LOS", city: "Lagos", name: "Murtala Muhammed", country: "Nigeria", flag: "🇳🇬" },
  { code: "DKR", city: "Dakar", name: "Blaise Diagne", country: "Senegal", flag: "🇸🇳" },
  { code: "ABJ", city: "Abiyán", name: "Félix-Houphouët-Boigny", country: "Costa de Marfil", flag: "🇨🇮" },
  { code: "JFK", city: "Nueva York", name: "John F. Kennedy", country: "EE.UU.", flag: "🇺🇸" },
  { code: "LAX", city: "Los Ángeles", name: "Internacional", country: "EE.UU.", flag: "🇺🇸" },
  { code: "MIA", city: "Miami", name: "Internacional", country: "EE.UU.", flag: "🇺🇸" },
  { code: "ORD", city: "Chicago", name: "O'Hare", country: "EE.UU.", flag: "🇺🇸" },
  { code: "YYZ", city: "Toronto", name: "Pearson", country: "Canadá", flag: "🇨🇦" },
  { code: "YUL", city: "Montreal", name: "Pierre Elliott Trudeau", country: "Canadá", flag: "🇨🇦" },
  { code: "GRU", city: "São Paulo", name: "Guarulhos", country: "Brasil", flag: "🇧🇷" },
  { code: "GIG", city: "Río de Janeiro", name: "Galeão", country: "Brasil", flag: "🇧🇷" },
  { code: "EZE", city: "Buenos Aires", name: "Ezeiza", country: "Argentina", flag: "🇦🇷" },
  { code: "BOG", city: "Bogotá", name: "El Dorado", country: "Colombia", flag: "🇨🇴" },
  { code: "LIM", city: "Lima", name: "Jorge Chávez", country: "Perú", flag: "🇵🇪" },
  { code: "SCL", city: "Santiago", name: "Arturo Merino Benítez", country: "Chile", flag: "🇨🇱" },
  { code: "MEX", city: "Ciudad de México", name: "Benito Juárez", country: "México", flag: "🇲🇽" },
  { code: "CUN", city: "Cancún", name: "Internacional", country: "México", flag: "🇲🇽" },
  { code: "DEL", city: "Nueva Delhi", name: "Indira Gandhi", country: "India", flag: "🇮🇳" },
  { code: "BOM", city: "Bombay", name: "Chhatrapati Shivaji", country: "India", flag: "🇮🇳" },
  { code: "BLR", city: "Bangalore", name: "Kempegowda", country: "India", flag: "🇮🇳" },
  { code: "PEK", city: "Pekín", name: "Capital", country: "China", flag: "🇨🇳" },
  { code: "PVG", city: "Shanghái", name: "Pudong", country: "China", flag: "🇨🇳" },
  { code: "HKG", city: "Hong Kong", name: "Internacional", country: "Hong Kong", flag: "🇭🇰" },
  { code: "NRT", city: "Tokio", name: "Narita", country: "Japón", flag: "🇯🇵" },
  { code: "HND", city: "Tokio", name: "Haneda", country: "Japón", flag: "🇯🇵" },
  { code: "ICN", city: "Seúl", name: "Incheon", country: "Corea del Sur", flag: "🇰🇷" },
  { code: "SIN", city: "Singapur", name: "Changi", country: "Singapur", flag: "🇸🇬" },
  { code: "BKK", city: "Bangkok", name: "Suvarnabhumi", country: "Tailandia", flag: "🇹🇭" },
  { code: "KUL", city: "Kuala Lumpur", name: "Internacional", country: "Malasia", flag: "🇲🇾" },
  { code: "CGK", city: "Yakarta", name: "Soekarno-Hatta", country: "Indonesia", flag: "🇮🇩" },
  { code: "SYD", city: "Sídney", name: "Kingsford Smith", country: "Australia", flag: "🇦🇺" },
  { code: "MEL", city: "Melbourne", name: "Tullamarine", country: "Australia", flag: "🇦🇺" },
  { code: "CPT", city: "Ciudad del Cabo", name: "Internacional", country: "Sudáfrica", flag: "🇿🇦" },
  { code: "JNB", city: "Johannesburgo", name: "O.R. Tambo", country: "Sudáfrica", flag: "🇿🇦" },
  { code: "WAW", city: "Varsovia", name: "Chopin", country: "Polonia", flag: "🇵🇱" },
  { code: "VIE", city: "Viena", name: "Internacional", country: "Austria", flag: "🇦🇹" },
  { code: "PRG", city: "Praga", name: "Václav Havel", country: "Rep. Checa", flag: "🇨🇿" },
  { code: "BUD", city: "Budapest", name: "Ferenc Liszt", country: "Hungría", flag: "🇭🇺" },
  { code: "ARN", city: "Estocolmo", name: "Arlanda", country: "Suecia", flag: "🇸🇪" },
  { code: "CPH", city: "Copenhague", name: "Internacional", country: "Dinamarca", flag: "🇩🇰" },
  { code: "OSL", city: "Oslo", name: "Gardermoen", country: "Noruega", flag: "🇳🇴" },
  { code: "HEL", city: "Helsinki", name: "Vantaa", country: "Finlandia", flag: "🇫🇮" },
  { code: "DUB", city: "Dublín", name: "Internacional", country: "Irlanda", flag: "🇮🇪" },
  { code: "OTP", city: "Bucarest", name: "Henri Coandă", country: "Rumanía", flag: "🇷🇴" },
  { code: "SOF", city: "Sofía", name: "Internacional", country: "Bulgaria", flag: "🇧🇬" },
  { code: "SVO", city: "Moscú", name: "Sheremetyevo", country: "Rusia", flag: "🇷🇺" },
  { code: "TLV", city: "Tel Aviv", name: "Ben Gurion", country: "Israel", flag: "🇮🇱" },
  { code: "MCT", city: "Mascate", name: "Internacional", country: "Omán", flag: "🇴🇲" },
  { code: "GYD", city: "Bakú", name: "Heydar Aliyev", country: "Azerbaiyán", flag: "🇦🇿" },
  { code: "TAS", city: "Taskent", name: "Internacional", country: "Uzbekistán", flag: "🇺🇿" },
  { code: "KHI", city: "Karachi", name: "Jinnah", country: "Pakistán", flag: "🇵🇰" },
  { code: "LHE", city: "Lahore", name: "Allama Iqbal", country: "Pakistán", flag: "🇵🇰" },
  { code: "ISB", city: "Islamabad", name: "Internacional", country: "Pakistán", flag: "🇵🇰" },
  { code: "DAC", city: "Dhaka", name: "Hazrat Shahjalal", country: "Bangladés", flag: "🇧🇩" },
  { code: "CMB", city: "Colombo", name: "Bandaranaike", country: "Sri Lanka", flag: "🇱🇰" },
  { code: "KTM", city: "Katmandú", name: "Tribhuvan", country: "Nepal", flag: "🇳🇵" },
];

function AirportInput({ label, value, onChange, placeholder, icon }) {
  const [q, setQ] = useState(value ? `${value.city} (${value.code})` : "");
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (value) setQ(`${value.city} (${value.code})`);
  }, [value]);

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handle = (e) => {
    const v = e.target.value;
    setQ(v);
    if (!v.trim()) { setList([]); setOpen(false); return; }
    const r = airports.filter(a =>
      a.city.toLowerCase().includes(v.toLowerCase()) ||
      a.code.toLowerCase().includes(v.toLowerCase()) ||
      a.country.toLowerCase().includes(v.toLowerCase()) ||
      a.name.toLowerCase().includes(v.toLowerCase())
    ).slice(0, 8);
    setList(r);
    setOpen(r.length > 0);
  };

  const pick = (a) => { onChange(a); setQ(`${a.city} (${a.code})`); setOpen(false); };

  return (
    <div ref={ref} style={{ flex: 1, minWidth: 180, position: "relative" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "center", border: `2px solid ${open ? "#0369a1" : "#e2e8f0"}`, borderRadius: 12, padding: "12px 14px", background: "white", gap: 10, transition: "border-color 0.2s" }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <input value={q} onChange={handle} onFocus={() => q.length > 0 && open && setOpen(true)}
          placeholder={placeholder}
          style={{ border: "none", outline: "none", flex: 1, fontSize: 15, color: "#0f172a", background: "transparent", fontFamily: "inherit" }} />
        {value && <span style={{ fontSize: 11, fontWeight: 800, color: "#0369a1", background: "#eff6ff", padding: "2px 7px", borderRadius: 5 }}>{value.code}</span>}
      </div>
      {open && list.length > 0 && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "white", borderRadius: 14, boxShadow: "0 24px 60px rgba(0,0,0,0.18)", zIndex: 9999, overflow: "hidden", border: "1px solid #e2e8f0" }}>
          {list.map(a => (
            <div key={a.code} onClick={() => pick(a)}
              style={{ padding: "11px 16px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f8fafc", transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#f0f9ff"}
              onMouseLeave={e => e.currentTarget.style.background = "white"}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>{a.flag}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>{a.city}</div>
                  <div style={{ fontSize: 11, color: "#94a3b8" }}>{a.name} · {a.country}</div>
                </div>
              </div>
              <div style={{ background: "#eff6ff", color: "#1d4ed8", padding: "4px 10px", borderRadius: 7, fontSize: 12, fontWeight: 800 }}>{a.code}</div>
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
  const [err, setErr] = useState("");
  const [searched, setSearched] = useState(false);
  const [searchUrl, setSearchUrl] = useState("");
  const widgetRef = useRef(null);

  const today = new Date().toISOString().split("T")[0];

  const T = {
    es: { from: "Origen", to: "Destino", dep: "Fecha de ida", ret: "Fecha de vuelta", pax: "Pasajeros", search: "Buscar vuelos", oneWay: "Solo ida", round: "Ida y vuelta", ph: "Ciudad o aeropuerto", deals: "Ofertas destacadas", tagline: "Vuela más lejos, paga menos", sub: "Compara millones de vuelos al mejor precio", see: "Ver oferta", from2: "desde", flights: "Vuelos", hotels: "Hoteles", cars: "Coches", ferries: "Ferries", errOrig: "Selecciona el aeropuerto de origen", errDest: "Selecciona el aeropuerto de destino", errDep: "Selecciona la fecha de ida", errRet: "Selecciona la fecha de vuelta" },
    en: { from: "From", to: "To", dep: "Departure date", ret: "Return date", pax: "Passengers", search: "Search flights", oneWay: "One way", round: "Round trip", ph: "City or airport", deals: "Featured deals", tagline: "Fly further, pay less", sub: "Compare millions of flights at the best price", see: "See deal", from2: "from", flights: "Flights", hotels: "Hotels", cars: "Cars", ferries: "Ferries", errOrig: "Select origin airport", errDest: "Select destination airport", errDep: "Select departure date", errRet: "Select return date" },
    ar: { from: "من", to: "إلى", dep: "تاريخ الذهاب", ret: "تاريخ العودة", pax: "الركاب", search: "ابحث عن رحلات", oneWay: "ذهاب فقط", round: "ذهاب وعودة", ph: "مدينة أو مطار", deals: "أبرز العروض", tagline: "سافر أبعد بأقل تكلفة", sub: "قارن ملايين الرحلات بأفضل سعر", see: "عرض", from2: "من", flights: "رحلات", hotels: "فنادق", cars: "سيارات", ferries: "عبّارات", errOrig: "اختر مطار المغادرة", errDest: "اختر مطار الوصول", errDep: "اختر تاريخ المغادرة", errRet: "اختر تاريخ العودة" },
  };
  const t = T[lang];
  const isRTL = lang === "ar";

  const search = () => {
    if (!origin) { setErr(t.errOrig); return; }
    if (!dest) { setErr(t.errDest); return; }
    if (!dep) { setErr(t.errDep); return; }
    if (trip === "round" && !ret) { setErr(t.errRet); return; }
    setErr("");

    const depF = dep.replace(/-/g, "/");
    const retF = ret ? ret.replace(/-/g, "/") : null;

    let url;
    if (trip === "round" && retF) {
      url = `https://www.kiwi.com/es/search/${origin.code}/${dest.code}/${depF}/${retF}?adults=${pax}&affilid=picky_${MARKER}`;
    } else {
      url = `https://www.kiwi.com/es/search/${origin.code}/${dest.code}/${depF}?adults=${pax}&affilid=picky_${MARKER}`;
    }

    setSearchUrl(url);
    setSearched(true);
    setTimeout(() => {
      widgetRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const swap = () => { const tmp = origin; setOrigin(dest); setDest(tmp); };

  const deals = [
    { from: "MAD", fromCity: "Madrid", to: "CMN", toCity: "Casablanca", price: 49, airline: "Royal Air Maroc", duration: "2h 15m", color: "#1e3a5f" },
    { from: "MAD", fromCity: "Madrid", to: "RAK", toCity: "Marrakech", price: 59, airline: "Ryanair", duration: "2h 30m", color: "#7c3aed" },
    { from: "BCN", fromCity: "Barcelona", to: "CMN", toCity: "Casablanca", price: 55, airline: "Vueling", duration: "2h 20m", color: "#0f766e" },
    { from: "MAD", fromCity: "Madrid", to: "DXB", toCity: "Dubái", price: 179, airline: "Emirates", duration: "6h 45m", color: "#b45309" },
    { from: "MAD", fromCity: "Madrid", to: "LHR", toCity: "Londres", price: 69, airline: "Iberia", duration: "2h 05m", color: "#be185d" },
    { from: "BCN", fromCity: "Barcelona", to: "CDG", toCity: "París", price: 39, airline: "Vueling", duration: "1h 50m", color: "#1d4ed8" },
    { from: "MAD", fromCity: "Madrid", to: "IST", toCity: "Estambul", price: 89, airline: "Turkish Airlines", duration: "4h 10m", color: "#dc2626" },
    { from: "MAD", fromCity: "Madrid", to: "TNG", toCity: "Tánger", price: 45, airline: "Air Arabia Maroc", duration: "1h 30m", color: "#059669" },
    { from: "BCN", fromCity: "Barcelona", to: "AMS", toCity: "Ámsterdam", price: 49, airline: "Transavia", duration: "2h 10m", color: "#d97706" },
  ];

  const tabs = ["flights", "hotels", "cars", "ferries"];

  return (
    <div dir={isRTL ? "rtl" : "ltr"} style={{ minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", background: "#f1f5f9" }}>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg, #0c1445 0%, #1a2980 50%, #0369a1 100%)", paddingBottom: 100, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -50, right: -50, width: 300, height: 300, background: "rgba(255,255,255,0.03)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -80, left: -30, width: 250, height: 250, background: "rgba(249,115,22,0.08)", borderRadius: "50%" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
          {/* NAV */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ background: "linear-gradient(135deg, #f97316, #dc2626)", borderRadius: 12, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, boxShadow: "0 4px 15px rgba(249,115,22,0.4)" }}>✈️</div>
              <div>
                <div style={{ fontSize: 26, fontWeight: 900, color: "white", letterSpacing: -1 }}>Sky<span style={{ color: "#f97316" }}>Deals</span></div>
                <div style={{ fontSize: 10, color: "#64748b", letterSpacing: 3, textTransform: "uppercase" }}>skydeals.es</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {["es", "en", "ar"].map(l => (
                <button key={l} onClick={() => setLang(l)}
                  style={{ padding: "7px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, background: lang === l ? "#f97316" : "rgba(255,255,255,0.1)", color: "white", transition: "all 0.2s", letterSpacing: 0.5 }}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* HERO */}
          <div style={{ textAlign: "center", padding: "30px 0 36px", color: "white" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#f97316", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>✈ Comparador de vuelos</div>
            <h1 style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 900, margin: "0 0 12px", letterSpacing: -1.5, lineHeight: 1.1 }}>{t.tagline}</h1>
            <p style={{ color: "#94a3b8", fontSize: 17, margin: 0 }}>{t.sub}</p>
          </div>

          {/* TABS */}
          <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
            {tabs.map(tb => (
              <button key={tb} onClick={() => setTab(tb)}
                style={{ padding: "10px 24px", borderRadius: 30, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 7, background: tab === tb ? "white" : "rgba(255,255,255,0.1)", color: tab === tb ? "#0c1445" : "white", transition: "all 0.2s", boxShadow: tab === tb ? "0 4px 15px rgba(0,0,0,0.2)" : "none" }}>
                {tb === "flights" ? "✈️" : tb === "hotels" ? "🏨" : tb === "cars" ? "🚗" : "🚢"} {t[tb]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>

        {/* SEARCH BOX */}
        <div style={{ background: "white", borderRadius: 24, boxShadow: "0 24px 80px rgba(0,0,0,0.14)", padding: "32px", marginTop: -60, position: "relative", zIndex: 10 }}>

          {/* TRIP TYPE */}
          <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
            {["oneWay", "round"].map(type => (
              <button key={type} onClick={() => setTrip(type)}
                style={{ padding: "9px 22px", borderRadius: 22, border: `2px solid ${trip === type ? "#0369a1" : "#e2e8f0"}`, background: trip === type ? "#eff6ff" : "white", color: trip === type ? "#0369a1" : "#64748b", fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all 0.2s" }}>
                {t[type]}
              </button>
            ))}
          </div>

          {/* SEARCH FIELDS */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>

            <AirportInput label={t.from} value={origin} onChange={setOrigin} placeholder={t.ph} icon="🛫" />

            <button onClick={swap}
              style={{ background: "#f1f5f9", border: "2px solid #e2e8f0", borderRadius: "50%", width: 42, height: 42, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginBottom: 2, transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#0369a1"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "inherit"; }}>
              ⇄
            </button>

            <AirportInput label={t.to} value={dest} onChange={setDest} placeholder={t.ph} icon="🛬" />

            {/* DATE DEP */}
            <div style={{ minWidth: 155 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{t.dep}</div>
              <div style={{ position: "relative" }}>
                <input type="date" value={dep} min={today} onChange={e => setDep(e.target.value)}
                  style={{ width: "100%", border: "2px solid #e2e8f0", borderRadius: 12, padding: "13px 14px", fontSize: 14, color: dep ? "#0f172a" : "#94a3b8", outline: "none", fontFamily: "inherit", boxSizing: "border-box", cursor: "pointer", background: "white" }} />
              </div>
            </div>

            {/* DATE RET */}
            {trip === "round" && (
              <div style={{ minWidth: 155 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{t.ret}</div>
                <input type="date" value={ret} min={dep || today} onChange={e => setRet(e.target.value)}
                  style={{ width: "100%", border: "2px solid #e2e8f0", borderRadius: 12, padding: "13px 14px", fontSize: 14, color: ret ? "#0f172a" : "#94a3b8", outline: "none", fontFamily: "inherit", boxSizing: "border-box", cursor: "pointer", background: "white" }} />
              </div>
            )}

            {/* PASSENGERS */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{t.pax}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, border: "2px solid #e2e8f0", borderRadius: 12, padding: "11px 16px", background: "white" }}>
                <button onClick={() => setPax(Math.max(1, pax - 1))} style={{ background: pax === 1 ? "#f8fafc" : "#eff6ff", border: "none", borderRadius: "50%", width: 30, height: 30, cursor: pax === 1 ? "default" : "pointer", fontSize: 18, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", color: pax === 1 ? "#cbd5e1" : "#0369a1" }}>−</button>
                <span style={{ fontWeight: 800, fontSize: 16, minWidth: 24, textAlign: "center", color: "#0f172a" }}>{pax}</span>
                <button onClick={() => setPax(Math.min(9, pax + 1))} style={{ background: "#eff6ff", border: "none", borderRadius: "50%", width: 30, height: 30, cursor: "pointer", fontSize: 18, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", color: "#0369a1" }}>+</button>
              </div>
            </div>

            {/* SEARCH BTN */}
            <button onClick={search}
              style={{ background: "linear-gradient(135deg, #f97316, #dc2626)", color: "white", border: "none", borderRadius: 14, padding: "15px 36px", fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 6px 24px rgba(249,115,22,0.45)", whiteSpace: "nowrap", transition: "all 0.2s", letterSpacing: 0.3 }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(249,115,22,0.55)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(249,115,22,0.45)"; }}>
              🔍 {t.search}
            </button>
          </div>

          {/* ERROR */}
          {err && (
            <div style={{ marginTop: 16, background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "12px 18px", color: "#dc2626", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
              ⚠️ {err}
            </div>
          )}
        </div>

        {/* KIWI IFRAME RESULTS */}
        {searched && (
          <div ref={widgetRef} style={{ marginTop: 32, background: "white", borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}>
            <div style={{ padding: "20px 28px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 18, color: "#0f172a" }}>
                  {origin?.city} → {dest?.city}
                </div>
                <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>
                  {dep} {trip === "round" && ret ? `· Vuelta: ${ret}` : ""} · {pax} {pax === 1 ? "pasajero" : "pasajeros"}
                </div>
              </div>
              <a href={searchUrl} target="_blank" rel="noopener noreferrer"
                style={{ background: "#0369a1", color: "white", padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                Ver en Kiwi.com →
              </a>
            </div>
            <iframe
              src={searchUrl}
              style={{ width: "100%", height: 600, border: "none" }}
              title="Resultados de vuelos"
            />
          </div>
        )}

        {/* DEALS */}
        {!searched && (
          <div style={{ marginTop: 60, marginBottom: 50 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, flexWrap: "wrap", gap: 10 }}>
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 900, color: "#0f172a", margin: "0 0 6px", letterSpacing: -0.5 }}>{t.deals} 🔥</h2>
                <p style={{ color: "#64748b", margin: 0, fontSize: 14 }}>Precios desde España · Actualizados hoy · Ida y vuelta</p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 18 }}>
              {deals.map((d, i) => (
                <div key={i}
                  onClick={() => { window.open(`https://www.kiwi.com/es/search/${d.from}/${d.to}?adults=1&affilid=picky_${MARKER}`, "_blank"); }}
                  style={{ background: "white", borderRadius: 18, overflow: "hidden", boxShadow: "0 2px 20px rgba(0,0,0,0.07)", cursor: "pointer", transition: "all 0.25s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.14)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 20px rgba(0,0,0,0.07)"; }}>

                  <div style={{ background: d.color, padding: "22px 20px", color: "white", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: -20, right: -20, fontSize: 80, opacity: 0.08 }}>✈</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: -0.5 }}>{d.from}</div>
                        <div style={{ fontSize: 12, opacity: 0.85, marginTop: 2 }}>{d.fromCity}</div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 22, marginBottom: 4 }}>✈</div>
                        <div style={{ fontSize: 11, opacity: 0.75, background: "rgba(255,255,255,0.15)", padding: "2px 8px", borderRadius: 10 }}>{d.duration}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: -0.5 }}>{d.to}</div>
                        <div style={{ fontSize: 12, opacity: 0.85, marginTop: 2 }}>{d.toCity}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 3 }}>{d.airline}</div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>{t.from2}</div>
                      <div style={{ fontSize: 30, fontWeight: 900, color: "#0f172a", lineHeight: 1 }}>€{d.price}</div>
                    </div>
                    <div style={{ background: `${d.color}15`, color: d.color, borderRadius: 12, padding: "11px 18px", fontSize: 13, fontWeight: 800, border: `2px solid ${d.color}30` }}>
                      {t.see} →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div style={{ borderTop: "1px solid #e2e8f0", padding: "32px 0", textAlign: "center", color: "#94a3b8", fontSize: 13, marginTop: searched ? 40 : 0 }}>
          <div style={{ fontWeight: 900, fontSize: 20, marginBottom: 8 }}>
            Sky<span style={{ color: "#f97316" }}>Deals</span><span style={{ color: "#64748b" }}>.es</span>
          </div>
          <p style={{ margin: "0 0 6px" }}>Comparador de vuelos · Los mejores precios garantizados</p>
          <p style={{ margin: 0, fontSize: 11 }}>© {new Date().getFullYear()} SkyDeals.es · Todos los derechos reservados</p>
        </div>
      </div>
    </div>
  );
}