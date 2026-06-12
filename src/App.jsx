import { useState } from 'react'

const AIRPORTS = [
  { code: 'MAD', name: 'مدريد', country: 'إسبانيا' },
  { code: 'BCN', name: 'برشلونة', country: 'إسبانيا' },
  { code: 'CMN', name: 'الدار البيضاء', country: 'المغرب' },
  { code: 'RAK', name: 'مراكش', country: 'المغرب' },
  { code: 'TNG', name: 'طنجة', country: 'المغرب' },
  { code: 'ALG', name: 'الجزائر العاصمة', country: 'الجزائر' },
  { code: 'TUN', name: 'تونس', country: 'تونس' },
  { code: 'CAI', name: 'القاهرة', country: 'مصر' },
  { code: 'DXB', name: 'دبي', country: 'الإمارات' },
  { code: 'CDG', name: 'باريس', country: 'فرنسا' },
  { code: 'LHR', name: 'لندن', country: 'بريطانيا' },
  { code: 'AMS', name: 'أمستردام', country: 'هولندا' },
]

const MOCK_FLIGHTS = [
  { id: 1, airline: 'Royal Air Maroc', from: 'MAD', to: 'CMN', dep: '08:30', arr: '10:15', duration: '1س 45د', price: 89, stops: 0 },
  { id: 2, airline: 'Ryanair', from: 'MAD', to: 'CMN', dep: '14:00', arr: '16:00', duration: '2س 00د', price: 65, stops: 0 },
  { id: 3, airline: 'Iberia', from: 'MAD', to: 'CMN', dep: '19:45', arr: '22:30', duration: '2س 45د', price: 112, stops: 1 },
  { id: 4, airline: 'Vueling', from: 'BCN', to: 'CMN', dep: '07:00', arr: '09:00', duration: '2س 00د', price: 78, stops: 0 },
  { id: 5, airline: 'Air Arabia', from: 'MAD', to: 'RAK', dep: '11:20', arr: '13:30', duration: '2س 10د', price: 55, stops: 0 },
]

export default function App() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')
  const [passengers, setPassengers] = useState(1)
  const [tripType, setTripType] = useState('oneWay')
  const [returnDate, setReturnDate] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [page, setPage] = useState('home') // home | results | booking | confirm

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

  const getAirport = (code) => AIRPORTS.find(a => a.code === code)

  // ===== PAGES =====

  if (page === 'confirm') {
    return (
      <div style={styles.page}>
        <div style={styles.confirmBox}>
          <div style={styles.checkIcon}>✓</div>
          <h2 style={styles.confirmTitle}>تم إرسال طلبك!</h2>
          <p style={styles.confirmText}>سيتواصل معك فريق رحلتي عبر واتساب خلال دقائق لإتمام الحجز والدفع.</p>
          <div style={styles.confirmDetails}>
            <p>✈️ {getAirport(selectedFlight?.from)?.name} ← {getAirport(selectedFlight?.to)?.name}</p>
            <p>🏢 {selectedFlight?.airline}</p>
            <p>💰 {selectedFlight?.price * passengers} € — {passengers} راكب</p>
          </div>
          <button style={styles.whatsappBtn} onClick={() => window.open('https://wa.me/34600000000', '_blank')}>
            📱 تواصل عبر واتساب
          </button>
          <button style={{...styles.secondBtn, marginTop: 12}} onClick={() => { setPage('home'); setResults(null); setSelectedFlight(null) }}>
            🔍 بحث جديد
          </button>
        </div>
      </div>
    )
  }

  if (page === 'booking' && selectedFlight) {
    const total = selectedFlight.price * passengers
    return (
      <div style={styles.page}>
        <header style={styles.header}>
          <button style={styles.backBtn} onClick={() => setPage('results')}>← رجوع</button>
          <span style={styles.logo}>✈️ رحلتي</span>
        </header>
        <div style={styles.bookingContainer}>
          <h2 style={styles.sectionTitle}>تفاصيل الرحلة</h2>
          <div style={styles.flightCard}>
            <div style={styles.flightRow}>
              <div style={styles.flightPoint}>
                <span style={styles.flightTime}>{selectedFlight.dep}</span>
                <span style={styles.flightCode}>{selectedFlight.from}</span>
                <span style={styles.flightCity}>{getAirport(selectedFlight.from)?.name}</span>
              </div>
              <div style={styles.flightMiddle}>
                <span style={styles.flightDuration}>{selectedFlight.duration}</span>
                <div style={styles.flightLine}><span style={styles.planIcon}>✈</span></div>
                <span style={styles.stopsText}>{selectedFlight.stops === 0 ? 'مباشر' : `${selectedFlight.stops} توقف`}</span>
              </div>
              <div style={styles.flightPoint}>
                <span style={styles.flightTime}>{selectedFlight.arr}</span>
                <span style={styles.flightCode}>{selectedFlight.to}</span>
                <span style={styles.flightCity}>{getAirport(selectedFlight.to)?.name}</span>
              </div>
            </div>
            <div style={styles.airlineRow}>
              <span>🏢 {selectedFlight.airline}</span>
            </div>
          </div>

          <div style={styles.priceBox}>
            <div style={styles.priceRow}><span>سعر التذكرة</span><span>{selectedFlight.price} €</span></div>
            <div style={styles.priceRow}><span>عدد الركاب</span><span>{passengers}</span></div>
            <div style={styles.totalRow}><span>المجموع</span><span style={styles.totalPrice}>{total} €</span></div>
          </div>

          <div style={styles.infoBox}>
            <p style={styles.infoText}>📋 سيتواصل معك فريق رحلتي عبر واتساب لإتمام الدفع وإرسال التذاكر.</p>
          </div>

          <button style={styles.bookBtn} onClick={() => setPage('confirm')}>
            📱 احجز عبر واتساب — {total} €
          </button>
        </div>
      </div>
    )
  }

  if (page === 'results') {
    return (
      <div style={styles.page}>
        <header style={styles.header}>
          <button style={styles.backBtn} onClick={() => setPage('home')}>← رجوع</button>
          <span style={styles.logo}>✈️ رحلتي</span>
        </header>
        <div style={styles.resultsContainer}>
          <div style={styles.searchSummary}>
            <span>{getAirport(from)?.name || from} → {getAirport(to)?.name || to}</span>
            <span> · {date} · {passengers} راكب</span>
          </div>
          <h3 style={styles.resultsTitle}>{results?.length} رحلة متاحة</h3>
          {results?.map(flight => (
            <div key={flight.id} style={styles.resultCard} onClick={() => selectFlight(flight)}>
              <div style={styles.flightRow}>
                <div style={styles.flightPoint}>
                  <span style={styles.flightTime}>{flight.dep}</span>
                  <span style={styles.flightCode}>{flight.from}</span>
                </div>
                <div style={styles.flightMiddle}>
                  <span style={styles.flightDuration}>{flight.duration}</span>
                  <div style={styles.flightLine}><span style={styles.planIcon}>✈</span></div>
                  <span style={styles.stopsText}>{flight.stops === 0 ? 'مباشر' : `${flight.stops} توقف`}</span>
                </div>
                <div style={styles.flightPoint}>
                  <span style={styles.flightTime}>{flight.arr}</span>
                  <span style={styles.flightCode}>{flight.to}</span>
                </div>
                <div style={styles.priceTag}>
                  <span style={styles.priceNum}>{flight.price * passengers}€</span>
                  <span style={styles.priceLabel}>اختر</span>
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
    <div style={styles.page}>
      <header style={styles.header}>
        <span style={styles.logo}>✈️ رحلتي</span>
        <span style={styles.tagline}>تذاكر طيران بأسعار مناسبة</span>
      </header>

      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>سافر بسعر أفضل</h1>
        <p style={styles.heroSub}>رحلات من إسبانيا إلى المغرب والعالم العربي</p>
      </div>

      <div style={styles.searchBox}>
        {/* Trip Type */}
        <div style={styles.tripTypeRow}>
          <button
            style={tripType === 'oneWay' ? styles.tripBtnActive : styles.tripBtn}
            onClick={() => setTripType('oneWay')}
          >ذهاب فقط</button>
          <button
            style={tripType === 'roundTrip' ? styles.tripBtnActive : styles.tripBtn}
            onClick={() => setTripType('roundTrip')}
          >ذهاب وعودة</button>
        </div>

        {/* From / To */}
        <div style={styles.fromToRow}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>من</label>
            <select style={styles.select} value={from} onChange={e => setFrom(e.target.value)}>
              <option value="">اختر المطار</option>
              {AIRPORTS.map(a => (
                <option key={a.code} value={a.code}>{a.name} ({a.code})</option>
              ))}
            </select>
          </div>

          <button style={styles.swapBtn} onClick={swap}>⇄</button>

          <div style={styles.inputGroup}>
            <label style={styles.label}>إلى</label>
            <select style={styles.select} value={to} onChange={e => setTo(e.target.value)}>
              <option value="">اختر المطار</option>
              {AIRPORTS.map(a => (
                <option key={a.code} value={a.code}>{a.name} ({a.code})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Date & Passengers */}
        <div style={styles.dateRow}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>تاريخ الذهاب</label>
            <input style={styles.input} type="date" min={today} value={date} onChange={e => setDate(e.target.value)} />
          </div>
          {tripType === 'roundTrip' && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>تاريخ العودة</label>
              <input style={styles.input} type="date" min={date || today} value={returnDate} onChange={e => setReturnDate(e.target.value)} />
            </div>
          )}
          <div style={styles.inputGroup}>
            <label style={styles.label}>الركاب</label>
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
          {loading ? '⏳ جاري البحث...' : '🔍 ابحث عن رحلات'}
        </button>
      </div>

      {/* Features */}
      <div style={styles.features}>
        <div style={styles.feature}><span style={styles.featureIcon}>💬</span><span>دعم بالعربية</span></div>
        <div style={styles.feature}><span style={styles.featureIcon}>✅</span><span>أسعار موثوقة</span></div>
        <div style={styles.feature}><span style={styles.featureIcon}>⚡</span><span>حجز سريع</span></div>
      </div>
    </div>
  )
}

// ===== STYLES =====
const styles = {
  page: { minHeight: '100vh', background: '#f0f4ff', fontFamily: 'Arial, sans-serif', direction: 'rtl', color: '#1a1a2e' },
  header: { background: '#1a1a6e', color: 'white', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { fontSize: 22, fontWeight: 'bold' },
  tagline: { fontSize: 13, opacity: 0.8 },
  backBtn: { background: 'transparent', border: '1px solid rgba(255,255,255,0.4)', color: 'white', padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 14 },
  hero: { background: 'linear-gradient(135deg, #1a1a6e, #2d5be3)', color: 'white', padding: '40px 20px', textAlign: 'center' },
  heroTitle: { fontSize: 32, fontWeight: 'bold', margin: '0 0 8px' },
  heroSub: { fontSize: 16, opacity: 0.85, margin: 0 },
  searchBox: { background: 'white', margin: '20px 16px', borderRadius: 16, padding: '20px 16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
  tripTypeRow: { display: 'flex', gap: 8, marginBottom: 16 },
  tripBtn: { flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: 8, background: 'white', cursor: 'pointer', fontSize: 14 },
  tripBtnActive: { flex: 1, padding: '8px', border: '2px solid #1a1a6e', borderRadius: 8, background: '#eef0ff', cursor: 'pointer', fontSize: 14, fontWeight: 'bold', color: '#1a1a6e' },
  fromToRow: { display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 12 },
  inputGroup: { flex: 1, display: 'flex', flexDirection: 'column', gap: 4 },
  label: { fontSize: 12, color: '#666', fontWeight: 'bold' },
  select: { padding: '10px 8px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14, background: 'white', direction: 'rtl' },
  input: { padding: '10px 8px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14 },
  swapBtn: { background: '#eef0ff', border: 'none', borderRadius: 8, padding: '10px 12px', cursor: 'pointer', fontSize: 18, color: '#1a1a6e', marginBottom: 0 },
  dateRow: { display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' },
  passengerRow: { display: 'flex', alignItems: 'center', gap: 12, border: '1px solid #ddd', borderRadius: 8, padding: '6px 12px' },
  counterBtn: { background: '#1a1a6e', color: 'white', border: 'none', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  counterNum: { fontSize: 16, fontWeight: 'bold', minWidth: 20, textAlign: 'center' },
  searchBtn: { width: '100%', background: '#1a1a6e', color: 'white', border: 'none', borderRadius: 10, padding: '14px', fontSize: 16, fontWeight: 'bold', cursor: 'pointer' },
  searchBtnDisabled: { width: '100%', background: '#aaa', color: 'white', border: 'none', borderRadius: 10, padding: '14px', fontSize: 16, fontWeight: 'bold', cursor: 'not-allowed' },
  features: { display: 'flex', justifyContent: 'space-around', padding: '20px 16px' },
  feature: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, fontSize: 13, color: '#444' },
  featureIcon: { fontSize: 24 },
  resultsContainer: { padding: '16px' },
  searchSummary: { background: '#1a1a6e', color: 'white', padding: '10px 16px', borderRadius: 10, fontSize: 14, marginBottom: 12 },
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
  planIcon: { fontSize: 16, color: '#1a1a6e' },
  stopsText: { fontSize: 11, color: '#27ae60', fontWeight: 'bold' },
  priceTag: { display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#eef0ff', borderRadius: 10, padding: '8px 12px' },
  priceNum: { fontSize: 18, fontWeight: 'bold', color: '#1a1a6e' },
  priceLabel: { fontSize: 11, color: '#1a1a6e' },
  airlineSmall: { fontSize: 12, color: '#888', marginTop: 8, borderTop: '1px solid #f0f0f0', paddingTop: 8 },
  airlineRow: { borderTop: '1px solid #f0f0f0', paddingTop: 10, marginTop: 10, fontSize: 13, color: '#666' },
  bookingContainer: { padding: '16px' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  flightCard: { background: 'white', borderRadius: 12, padding: 16, marginBottom: 16, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' },
  priceBox: { background: 'white', borderRadius: 12, padding: 16, marginBottom: 16, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' },
  priceRow: { display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f5f5f5', fontSize: 14 },
  totalRow: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: 16, fontWeight: 'bold' },
  totalPrice: { color: '#1a1a6e', fontSize: 20 },
  infoBox: { background: '#fff8e1', borderRadius: 10, padding: 12, marginBottom: 16 },
  infoText: { fontSize: 13, color: '#666', margin: 0 },
  bookBtn: { width: '100%', background: '#25D366', color: 'white', border: 'none', borderRadius: 10, padding: 14, fontSize: 16, fontWeight: 'bold', cursor: 'pointer' },
  confirmBox: { maxWidth: 400, margin: '60px auto', background: 'white', borderRadius: 20, padding: 32, textAlign: 'center', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' },
  checkIcon: { width: 60, height: 60, background: '#27ae60', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 16px' },
  confirmTitle: { fontSize: 22, margin: '0 0 8px' },
  confirmText: { color: '#666', fontSize: 14, marginBottom: 16 },
  confirmDetails: { background: '#f8f9ff', borderRadius: 10, padding: 16, marginBottom: 20, textAlign: 'right', fontSize: 14, lineHeight: 2 },
  whatsappBtn: { width: '100%', background: '#25D366', color: 'white', border: 'none', borderRadius: 10, padding: 14, fontSize: 16, fontWeight: 'bold', cursor: 'pointer' },
  secondBtn: { width: '100%', background: '#1a1a6e', color: 'white', border: 'none', borderRadius: 10, padding: 12, fontSize: 15, cursor: 'pointer' },
}