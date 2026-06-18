import { useState } from 'react'

// ===== LANGUAGES =====
const LANGS = {
  es: { label: 'ES', dir: 'ltr' },
  en: { label: 'EN', dir: 'ltr' },
  ar: { label: 'AR', dir: 'rtl' },
}

const DEFAULT_LANG = 'es'

// ===== AIRPORTS =====
const AIRPORTS = [
  { code: 'MAD', name: { ar: 'مدريد', es: 'Madrid', en: 'Madrid' } },
  { code: 'BCN', name: { ar: 'برشلونة', es: 'Barcelona', en: 'Barcelona' } },
  { code: 'CMN', name: { ar: 'الدار البيضاء', es: 'Casablanca', en: 'Casablanca' } },
  { code: 'RAK', name: { ar: 'مراكش', es: 'Marrakech', en: 'Marrakech' } },
  { code: 'TNG', name: { ar: 'طنجة', es: 'Tánger', en: 'Tangier' } },
  { code: 'ALG', name: { ar: 'الجزائر', es: 'Argel', en: 'Algiers' } },
  { code: 'TUN', name: { ar: 'تونس', es: 'Túnez', en: 'Tunis' } },
  { code: 'CAI', name: { ar: 'القاهرة', es: 'El Cairo', en: 'Cairo' } },
  { code: 'DXB', name: { ar: 'دبي', es: 'Dubái', en: 'Dubai' } },
  { code: 'CDG', name: { ar: 'باريس', es: 'París', en: 'Paris' } },
  { code: 'LHR', name: { ar: 'لندن', es: 'Londres', en: 'London' } },
  { code: 'AMS', name: { ar: 'أمستردام', es: 'Ámsterdam', en: 'Amsterdam' } },
]

// ===== MOCK FLIGHTS (durationMin in minutes) =====
const MOCK_FLIGHTS = [
  { id: 1, airline: 'Royal Air Maroc', from: 'MAD', to: 'CMN', dep: '08:30', arr: '10:15', durationMin: 105, price: 89, stops: 0 },
  { id: 2, airline: 'Ryanair', from: 'MAD', to: 'CMN', dep: '14:00', arr: '16:00', durationMin: 120, price: 65, stops: 0 },
  { id: 3, airline: 'Iberia', from: 'MAD', to: 'CMN', dep: '19:45', arr: '22:30', durationMin: 165, price: 112, stops: 1 },
  { id: 4, airline: 'Vueling', from: 'BCN', to: 'CMN', dep: '07:00', arr: '09:00', durationMin: 120, price: 78, stops: 0 },
  { id: 5, airline: 'Air Arabia', from: 'MAD', to: 'RAK', dep: '11:20', arr: '13:30', durationMin: 130, price: 55, stops: 0 },
]

// ===== TRANSLATIONS =====
const translations = {
  es: {
    brand: 'Rihlati',
    tagline: 'Vuelos al mejor precio',
    heroTitle: 'Viaja al mejor precio',
    heroSub: 'Vuelos desde España a Marruecos y el mundo',
    oneWay: 'Solo ida',
    roundTrip: 'Ida y vuelta',
    from: 'Origen',
    to: 'Destino',
    selectAirport: 'Selecciona aeropuerto',
    departureDate: 'Fecha de ida',
    returnDate: 'Fecha de vuelta',
    passengers: 'Pasajeros',
    searchBtn: '🔍 Buscar vuelos',
    searching: '⏳ Buscando...',
    featureSupport: 'Soporte multilingüe',
    featurePrices: 'Precios fiables',
    featureBooking: 'Reserva rápida',
    back: '← Volver',
    flightsAvailable: (n) => `${n} vuelos disponibles`,
    direct: 'Directo',
    stop: (n) => `${n} escala${n > 1 ? 's' : ''}`,
    select: 'Elegir',
    flightDetails: 'Detalles del vuelo',
    ticketPrice: 'Precio del billete',
    passengersCount: 'Número de pasajeros',
    total: 'Total',
    infoText: '📋 El equipo de Rihlati te contactará por WhatsApp para completar el pago y enviarte los billetes.',
    bookBtn: (total) => `📱 Reservar por WhatsApp — ${total} €`,
    confirmTitle: '¡Solicitud enviada!',
    confirmText: 'El equipo de Rihlati te contactará por WhatsApp en pocos minutos para completar la reserva y el pago.',
    whatsappBtn: '📱 Contactar por WhatsApp',
    newSearchBtn: '🔍 Nueva búsqueda',
    passengerWord: (n) => (n === 1 ? 'pasajero' : 'pasajeros'),
    h: 'h', m: 'min',
  },
  en: {
    brand: 'Rihlati',
    tagline: 'Affordable flight tickets',
    heroTitle: 'Travel for less',
    heroSub: 'Flights from Spain to Morocco and the world',
    oneWay: 'One way',
    roundTrip: 'Round trip',
    from: 'From',
    to: 'To',
    selectAirport: 'Select airport',
    departureDate: 'Departure date',
    returnDate: 'Return date',
    passengers: 'Passengers',
    searchBtn: '🔍 Search flights',
    searching: '⏳ Searching...',
    featureSupport: 'Multilingual support',
    featurePrices: 'Trusted prices',
    featureBooking: 'Fast booking',
    back: '← Back',
    flightsAvailable: (n) => `${n} flights available`,
    direct: 'Direct',
    stop: (n) => `${n} stop${n > 1 ? 's' : ''}`,
    select: 'Select',
    flightDetails: 'Flight details',
    ticketPrice: 'Ticket price',
    passengersCount: 'Number of passengers',
    total: 'Total',
    infoText: '📋 The Rihlati team will contact you on WhatsApp to complete payment and send your tickets.',
    bookBtn: (total) => `📱 Book via WhatsApp — ${total} €`,
    confirmTitle: 'Request sent!',
    confirmText: 'The Rihlati team will contact you on WhatsApp within minutes to complete the booking and payment.',
    whatsappBtn: '📱 Contact via WhatsApp',
    newSearchBtn: '🔍 New search',
    passengerWord: (n) => (n === 1 ? 'passenger' : 'passengers'),
    h: 'h', m: 'm',
  },
  ar: {
    brand: 'Rihlati',
    tagline: 'تذاكر طيران بأسعار مناسبة',
    heroTitle: 'سافر بسعر أفضل',
    heroSub: 'رحلات من إسبانيا إلى المغرب والعالم',
    oneWay: 'ذهاب فقط',
    roundTrip: 'ذهاب وعودة',
    from: 'من',
    to: 'إلى',
    selectAirport: 'اختر المطار',
    departureDate: 'تاريخ الذهاب',
    returnDate: 'تاريخ العودة',
    passengers: 'الركاب',
    searchBtn: '🔍 ابحث عن رحلات',
    searching: '⏳ جاري البحث...',
    featureSupport: 'دعم بعدة لغات',
    featurePrices: 'أسعار موثوقة',
    featureBooking: 'حجز سريع',
    back: '← رجوع',
    flightsAvailable: (n) => `${n} رحلة متاحة`,
    direct: 'مباشر',
    stop: (n) => `${n} توقف`,
    select: 'اختر',
    flightDetails: 'تفاصيل الرحلة',
    ticketPrice: 'سعر التذكرة',
    passengersCount: 'عدد الركاب',
    total: 'المجموع',
    infoText: '📋 سيتواصل معك فريق Rihlati عبر واتساب لإتمام الدفع وإرسال التذاكر.',
    bookBtn: (total) => `📱 احجز عبر واتساب — ${total} €`,
    confirmTitle: 'تم إرسال طلبك!',
    confirmText: 'سيتواصل معك فريق Rihlati عبر واتساب خلال دقائق لإتمام الحجز والدفع.',
    whatsappBtn: '📱 تواصل عبر واتساب',
    newSearchBtn: '🔍 بحث جديد',
    passengerWord: (n) => (n === 1 ? 'راكب' : 'ركاب'),
    h: 'س', m: 'د',
  },
}

const formatDuration = (min, t) => {
  const h = Math.floor(min / 60)
  const m = min % 60
  return `${h}${t.h} ${m}${t.m}`
}

export default function App() {
  const [lang, setLang] = useState(DEFAULT_LANG)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')
  const [passengers, setPassengers] = useState(1)
  const [tripType, setTripType] = useState('oneWay')
  const [returnDate, setReturnDate] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [page, setPage] = useState('home')

  const t = translations[lang]
  const dir = LANGS[lang].dir
  const today = new Date().toISOString().split('T')[0]

  const swap = () => {
    const tmp = from
    setFrom(to)
    setTo(tmp)
  }

  const search = () => {
    if (!from || !to || !date) return
    setLoading(true)
    setTimeout(() => {
      const filtered = MOCK_FLIGHTS.filter(f =>
        (f.from === from && f.to === to) ||
        (f.from === from) ||
        (f.to === to)
      )
      setResults(filtered.length > 0 ? filtered : MOCK_FLIGHTS.slice(0, 3))
      setLoading(false)
      setPage('results')
    }, 1500)
  }

  const selectFlight = (flight) => {
    setSelectedFlight(flight)
    setPage('booking')
  }

  const getAirportName = (code) => AIRPORTS.find(a => a.code === code)?.name[lang] || code

  // ===== LANGUAGE SWITCHER =====
  const LangSwitcher = () => (
    <div style={styles.langSwitcher}>
      {Object.keys(LANGS).map(code => (
        <button
          key={code}
          onClick={() => setLang(code)}
          style={lang === code ? styles.langBtnActive : styles.langBtn}
        >
          {LANGS[code].label}
        </button>
      ))}
    </div>
  )

  const Logo = () => (
    <div style={styles.logoWrap}>
      <span style={styles.logoIcon}>✈</span>
      <span style={styles.logo}>{t.brand}</span>
    </div>
  )

  // ===== PAGES =====

  if (page === 'confirm') {
    return (
      <div style={{ ...styles.page, direction: dir }}>
        <div style={styles.confirmBox}>
          <div style={styles.checkIcon}>✓</div>
          <h2 style={styles.confirmTitle}>{t.confirmTitle}</h2>
          <p style={styles.confirmText}>{t.confirmText}</p>
          <div style={{ ...styles.confirmDetails, textAlign: dir === 'rtl' ? 'right' : 'left' }}>
            <p>✈️ {getAirportName(selectedFlight?.from)} → {getAirportName(selectedFlight?.to)}</p>
            <p>🏢 {selectedFlight?.airline}</p>
            <p>💰 {selectedFlight?.price * passengers} € — {passengers} {t.passengerWord(passengers)}</p>
          </div>
          <button style={styles.whatsappBtn} onClick={() => window.open('https://wa.me/34600000000', '_blank')}>
            {t.whatsappBtn}
          </button>
          <button style={{ ...styles.secondBtn, marginTop: 12 }} onClick={() => { setPage('home'); setResults(null); setSelectedFlight(null) }}>
            {t.newSearchBtn}
          </button>
        </div>
      </div>
    )
  }

  if (page === 'booking' && selectedFlight) {
    const total = selectedFlight.price * passengers
    return (
      <div style={{ ...styles.page, direction: dir }}>
        <header style={styles.header}>
          <button style={styles.backBtn} onClick={() => setPage('results')}>{t.back}</button>
          <Logo />
          <LangSwitcher />
        </header>
        <div style={styles.bookingContainer}>
          <h2 style={styles.sectionTitle}>{t.flightDetails}</h2>
          <div style={styles.flightCard}>
            <div style={styles.flightRow}>
              <div style={styles.flightPoint}>
                <span style={styles.flightTime}>{selectedFlight.dep}</span>
                <span style={styles.flightCode}>{selectedFlight.from}</span>
                <span style={styles.flightCity}>{getAirportName(selectedFlight.from)}</span>
              </div>
              <div style={styles.flightMiddle}>
                <span style={styles.flightDuration}>{formatDuration(selectedFlight.durationMin, t)}</span>
                <div style={styles.flightLine}><span style={styles.planIcon}>✈</span></div>
                <span style={styles.stopsText}>{selectedFlight.stops === 0 ? t.direct : t.stop(selectedFlight.stops)}</span>
              </div>
              <div style={styles.flightPoint}>
                <span style={styles.flightTime}>{selectedFlight.arr}</span>
                <span style={styles.flightCode}>{selectedFlight.to}</span>
                <span style={styles.flightCity}>{getAirportName(selectedFlight.to)}</span>
              </div>
            </div>
            <div style={styles.airlineRow}>
              <span>🏢 {selectedFlight.airline}</span>
            </div>
          </div>

          <div style={styles.priceBox}>
            <div style={styles.priceRow}><span>{t.ticketPrice}</span><span>{selectedFlight.price} €</span></div>
            <div style={styles.priceRow}><span>{t.passengersCount}</span><span>{passengers}</span></div>
            <div style={styles.totalRow}><span>{t.total}</span><span style={styles.totalPrice}>{total} €</span></div>
          </div>

          <div style={styles.infoBox}>
            <p style={styles.infoText}>{t.infoText}</p>
          </div>

          <button style={styles.bookBtn} onClick={() => setPage('confirm')}>
            {t.bookBtn(total)}
          </button>
        </div>
      </div>
    )
  }

  if (page === 'results') {
    return (
      <div style={{ ...styles.page, direction: dir }}>
        <header style={styles.header}>
          <button style={styles.backBtn} onClick={() => setPage('home')}>{t.back}</button>
          <Logo />
          <LangSwitcher />
        </header>
        <div style={styles.resultsContainer}>
          <div style={styles.searchSummary}>
            <span>{getAirportName(from)} → {getAirportName(to)}</span>
            <span> · {date} · {passengers} {t.passengerWord(passengers)}</span>
          </div>
          <h3 style={styles.resultsTitle}>{t.flightsAvailable(results?.length || 0)}</h3>
          {results?.map(flight => (
            <div key={flight.id} style={styles.resultCard} onClick={() => selectFlight(flight)}>
              <div style={styles.flightRow}>
                <div style={styles.flightPoint}>
                  <span style={styles.flightTime}>{flight.dep}</span>
                  <span style={styles.flightCode}>{flight.from}</span>
                </div>
                <div style={styles.flightMiddle}>
                  <span style={styles.flightDuration}>{formatDuration(flight.durationMin, t)}</span>
                  <div style={styles.flightLine}><span style={styles.planIcon}>✈</span></div>
                  <span style={styles.stopsText}>{flight.stops === 0 ? t.direct : t.stop(flight.stops)}</span>
                </div>
                <div style={styles.flightPoint}>
                  <span style={styles.flightTime}>{flight.arr}</span>
                  <span style={styles.flightCode}>{flight.to}</span>
                </div>
                <div style={styles.priceTag}>
                  <span style={styles.priceNum}>{flight.price * passengers}€</span>
                  <span style={styles.priceLabel}>{t.select}</span>
                </div>
              </div>
              <div style={styles.airlineSmall}>{flight.airline}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // HOME PAGE
  return (
    <div style={{ ...styles.page, direction: dir }}>
      <header style={styles.header}>
        <Logo />
        <span style={styles.tagline}>{t.tagline}</span>
        <LangSwitcher />
      </header>

      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>{t.heroTitle}</h1>
        <p style={styles.heroSub}>{t.heroSub}</p>
      </div>

      <div style={styles.searchBox}>
        {/* Trip Type */}
        <div style={styles.tripTypeRow}>
          <button
            style={tripType === 'oneWay' ? styles.tripBtnActive : styles.tripBtn}
            onClick={() => setTripType('oneWay')}
          >{t.oneWay}</button>
          <button
            style={tripType === 'roundTrip' ? styles.tripBtnActive : styles.tripBtn}
            onClick={() => setTripType('roundTrip')}
          >{t.roundTrip}</button>
        </div>

        {/* From / To */}
        <div style={styles.fromToRow}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>{t.from}</label>
            <select style={{ ...styles.select, direction: dir }} value={from} onChange={e => setFrom(e.target.value)}>
              <option value="">{t.selectAirport}</option>
              {AIRPORTS.map(a => (
                <option key={a.code} value={a.code}>{a.name[lang]} ({a.code})</option>
              ))}
            </select>
          </div>

          <button style={styles.swapBtn} onClick={swap}>⇄</button>

          <div style={styles.inputGroup}>
            <label style={styles.label}>{t.to}</label>
            <select style={{ ...styles.select, direction: dir }} value={to} onChange={e => setTo(e.target.value)}>
              <option value="">{t.selectAirport}</option>
              {AIRPORTS.map(a => (
                <option key={a.code} value={a.code}>{a.name[lang]} ({a.code})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Date & Passengers */}
        <div style={styles.dateRow}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>{t.departureDate}</label>
            <input style={styles.input} type="date" min={today} value={date} onChange={e => setDate(e.target.value)} />
          </div>
          {tripType === 'roundTrip' && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>{t.returnDate}</label>
              <input style={styles.input} type="date" min={date || today} value={returnDate} onChange={e => setReturnDate(e.target.value)} />
            </div>
          )}
          <div style={styles.inputGroup}>
            <label style={styles.label}>{t.passengers}</label>
            <div style={styles.passengerRow}>
              <button style={styles.counterBtn} onClick={() => setPassengers(p => Math.max(1, p - 1))}>−</button>
              <span style={styles.counterNum}>{passengers}</span>
              <button style={styles.counterBtn} onClick={() => setPassengers(p => Math.min(9, p + 1))}>+</button>
            </div>
          </div>
        </div>

        <button
          style={!from || !to || !date ? styles.searchBtnDisabled : styles.searchBtn}
          onClick={search}
          disabled={!from || !to || !date}
        >
          {loading ? t.searching : t.searchBtn}
        </button>
      </div>

      {/* Features */}
      <div style={styles.features}>
        <div style={styles.feature}><span style={styles.featureIcon}>🌐</span><span>{t.featureSupport}</span></div>
        <div style={styles.feature}><span style={styles.featureIcon}>✅</span><span>{t.featurePrices}</span></div>
        <div style={styles.feature}><span style={styles.featureIcon}>⚡</span><span>{t.featureBooking}</span></div>
      </div>
    </div>
  )
}

// ===== COLOR PALETTE =====
// Primary: deep navy blue  #0D3B66
// Accent:  warm amber/orange #FAA916
// Background: cool light gray #F4F6FB

// ===== STYLES =====
const styles = {
  page: { minHeight: '100vh', background: '#F4F6FB', fontFamily: "'Segoe UI', Tahoma, Arial, sans-serif", color: '#1a1a2e' },
  header: { background: '#0D3B66', color: 'white', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  logoWrap: { display: 'flex', alignItems: 'center', gap: 8 },
  logoIcon: { background: '#FAA916', color: '#0D3B66', borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, transform: 'rotate(45deg)' },
  logo: { fontSize: 20, fontWeight: 'bold', letterSpacing: 0.5 },
  tagline: { fontSize: 12, opacity: 0.85 },
  langSwitcher: { display: 'flex', gap: 4 },
  langBtn: { background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: 'white', padding: '4px 8px', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 'bold' },
  langBtnActive: { background: '#FAA916', border: '1px solid #FAA916', color: '#0D3B66', padding: '4px 8px', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 'bold' },
  backBtn: { background: 'transparent', border: '1px solid rgba(255,255,255,0.4)', color: 'white', padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 14 },
  hero: { background: 'linear-gradient(135deg, #0D3B66, #1B6CA8)', color: 'white', padding: '40px 20px', textAlign: 'center' },
  heroTitle: { fontSize: 30, fontWeight: 'bold', margin: '0 0 8px' },
  heroSub: { fontSize: 15, opacity: 0.9, margin: 0 },
  searchBox: { background: 'white', margin: '20px 16px', borderRadius: 16, padding: '20px 16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
  tripTypeRow: { display: 'flex', gap: 8, marginBottom: 16 },
  tripBtn: { flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: 8, background: 'white', cursor: 'pointer', fontSize: 14, color: '#333' },
  tripBtnActive: { flex: 1, padding: '8px', border: '2px solid #FAA916', borderRadius: 8, background: '#FFF6E5', cursor: 'pointer', fontSize: 14, fontWeight: 'bold', color: '#0D3B66' },
  fromToRow: { display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 12 },
  inputGroup: { flex: 1, display: 'flex', flexDirection: 'column', gap: 4 },
  label: { fontSize: 12, color: '#666', fontWeight: 'bold' },
  select: { padding: '10px 8px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14, background: 'white' },
  input: { padding: '10px 8px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14 },
  swapBtn: { background: '#FFF6E5', border: 'none', borderRadius: 8, padding: '10px 12px', cursor: 'pointer', fontSize: 18, color: '#0D3B66', marginBottom: 0 },
  dateRow: { display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' },
  passengerRow: { display: 'flex', alignItems: 'center', gap: 12, border: '1px solid #ddd', borderRadius: 8, padding: '6px 12px' },
  counterBtn: { background: '#0D3B66', color: 'white', border: 'none', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  counterNum: { fontSize: 16, fontWeight: 'bold', minWidth: 20, textAlign: 'center' },
  searchBtn: { width: '100%', background: '#FAA916', color: '#0D3B66', border: 'none', borderRadius: 10, padding: '14px', fontSize: 16, fontWeight: 'bold', cursor: 'pointer' },
  searchBtnDisabled: { width: '100%', background: '#ccc', color: '#777', border: 'none', borderRadius: 10, padding: '14px', fontSize: 16, fontWeight: 'bold', cursor: 'not-allowed' },
  features: { display: 'flex', justifyContent: 'space-around', padding: '20px 16px' },
  feature: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, fontSize: 13, color: '#444', textAlign: 'center' },
  featureIcon: { fontSize: 24 },
  resultsContainer: { padding: '16px' },
  searchSummary: { background: '#0D3B66', color: 'white', padding: '10px 16px', borderRadius: 10, fontSize: 14, marginBottom: 12 },
  resultsTitle: { margin: '0 0 12px', fontSize: 16, color: '#444' },
  resultCard: { background: 'white', borderRadius: 12, padding: '16px', marginBottom: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.06)', cursor: 'pointer', border: '1px solid #eee' },
  flightRow: { display: 'flex', alignItems: 'center', gap: 8 },
  flightPoint: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 },
  flightTime: { fontSize: 20, fontWeight: 'bold', color: '#1a1a2e' },
  flightCode: { fontSize: 13, color: '#666', fontWeight: 'bold' },
  flightCity: { fontSize: 11, color: '#999' },
  flightMiddle: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1.5 },
  flightDuration: { fontSize: 11, color: '#888' },
  flightLine: { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', margin: '4px 0' },
  planIcon: { fontSize: 16, color: '#0D3B66' },
  stopsText: { fontSize: 11, color: '#2A9D8F', fontWeight: 'bold' },
  priceTag: { display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#FFF6E5', borderRadius: 10, padding: '8px 12px' },
  priceNum: { fontSize: 18, fontWeight: 'bold', color: '#0D3B66' },
  priceLabel: { fontSize: 11, color: '#0D3B66' },
  airlineSmall: { fontSize: 12, color: '#888', marginTop: 8, borderTop: '1px solid #f0f0f0', paddingTop: 8 },
  airlineRow: { borderTop: '1px solid #f0f0f0', paddingTop: 10, marginTop: 10, fontSize: 13, color: '#666' },
  bookingContainer: { padding: '16px' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  flightCard: { background: 'white', borderRadius: 12, padding: 16, marginBottom: 16, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' },
  priceBox: { background: 'white', borderRadius: 12, padding: 16, marginBottom: 16, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' },
  priceRow: { display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f5f5f5', fontSize: 14 },
  totalRow: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: 16, fontWeight: 'bold' },
  totalPrice: { color: '#FAA916', fontSize: 20 },
  infoBox: { background: '#fff8e1', borderRadius: 10, padding: 12, marginBottom: 16 },
  infoText: { fontSize: 13, color: '#666', margin: 0 },
  bookBtn: { width: '100%', background: '#25D366', color: 'white', border: 'none', borderRadius: 10, padding: 14, fontSize: 16, fontWeight: 'bold', cursor: 'pointer' },
  confirmBox: { maxWidth: 400, margin: '60px auto', background: 'white', borderRadius: 20, padding: 32, textAlign: 'center', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' },
  checkIcon: { width: 60, height: 60, background: '#27ae60', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 16px' },
  confirmTitle: { fontSize: 22, margin: '0 0 8px' },
  confirmText: { color: '#666', fontSize: 14, marginBottom: 16 },
  confirmDetails: { background: '#f8f9ff', borderRadius: 10, padding: 16, marginBottom: 20, fontSize: 14, lineHeight: 2 },
  whatsappBtn: { width: '100%', background: '#25D366', color: 'white', border: 'none', borderRadius: 10, padding: 14, fontSize: 16, fontWeight: 'bold', cursor: 'pointer' },
  secondBtn: { width: '100%', background: '#0D3B66', color: 'white', border: 'none', borderRadius: 10, padding: 12, fontSize: 15, cursor: 'pointer' },
}
