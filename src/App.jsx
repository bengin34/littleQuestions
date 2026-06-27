import { useState, useCallback } from 'react'
import './App.css'

// Set your Formspree / Tally endpoint here when ready
const FORM_ENDPOINT = "https://formspree.io/f/xgojyaer"

const QUOTES = [
  {
    text: "Çocuğum 'Allah nerede yaşıyor?' diye sordu. Ne diyeceğimi bilemedim, 'gökyüzünde' dedim ama içim rahat etmedi.",
    source: "Bir anne, 5 yaşında çocuğuyla"
  },
  {
    text: "Ölüm sorusunu sormadan önce uyuyordu. Sordu, artık uyuyamıyorum.",
    source: "Bir baba, 4 yaşında kızıyla"
  },
  {
    text: "Cehennem var mı, oraya gider miyim diye sordu. Yüzü o kadar ciddiydi ki donup kaldım.",
    source: "Bir anne, 6 yaşında oğluyla"
  },
]

const STEPS = [
  {
    n: "1",
    title: "Soruyu yaz",
    desc: "Çocuğunuzun sorduğu soruyu uygulamaya yazın — kendi kelimeleriyle."
  },
  {
    n: "2",
    title: "Yaşa uygun cevabı al",
    desc: "Pedagojik ve psikolojik olarak onaylı, yaşa göre seçilmiş kelimeler gelir."
  },
  {
    n: "3",
    title: "Kendi sesinle anlat",
    desc: "Cevabı ezberlemezsiniz; sadece ne söyleyeceğinizi bilirsiniz."
  },
]

export default function App() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState('')

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const handleEmailSubmit = useCallback(async (e) => {
    e.preventDefault()
    if (!email) return

    if (!FORM_ENDPOINT) {
      // Demo mode: no endpoint configured
      setSubmitted(true)
      showToast('Kaydedildi! (demo mod)')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setSubmitted(true)
        showToast('E-posta alındı, teşekkürler!')
      } else {
        showToast('Bir hata oluştu, tekrar deneyin.')
      }
    } catch {
      showToast('Bağlantı hatası.')
    } finally {
      setLoading(false)
    }
  }, [email])

  const handlePricingClick = useCallback((plan) => {
    showToast(`${plan} — ön kayıt isteği alındı.`)
    // Fire analytics event if Meta Pixel is loaded
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', { content_name: plan })
    }
  }, [])

  const scrollToHero = () => {
    document.querySelector('.hero').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="page">

      {/* Nav */}
      <nav className="nav">
        <span className="nav-logo">Little Questions</span>
        <button className="nav-cta" onClick={scrollToHero}>Haberi al</button>
      </nav>

      {/* Hero */}
      <section className="hero">
        <span className="hero-badge">✦ Yakında geliyor</span>
        <h1>
          Çocuğunuz <em>zor soru</em> sorunca<br />donup kalmayın.
        </h1>
        <p>
          "Allah nerede?", "Ölünce ne olur?", "Neden namaz kılıyoruz?" —<br />
          kendi sesinizle, sakin bir şekilde cevaplamanızı sağlıyoruz.
        </p>

        {submitted ? (
          <p className="success-msg">✓ Haberdar edeceğiz. Teşekkürler!</p>
        ) : (
          <form className="email-form" onSubmit={handleEmailSubmit}>
            <input
              type="email"
              required
              placeholder="E-posta adresiniz"
              value={email}
              onChange={e => setEmail(e.target.value)}
              aria-label="E-posta adresiniz"
            />
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? 'Gönderiliyor…' : 'Haberdar et'}
            </button>
          </form>
        )}

        <p className="form-note">
          Spam yok. Yalnızca lansman haberi için kullanılır.
        </p>
      </section>

      {/* Pain */}
      <section className="pain">
        <div className="pain-inner">
          <span className="section-label">Tanıdık geliyor mu?</span>
          <h2>Her ebeveyn bu anı yaşıyor.<br />Çoğu hazırlıksız yakalanıyor.</h2>
          <div className="quotes">
            {QUOTES.map((q, i) => (
              <div key={i} className="quote-card">
                <span className="quote-mark">"</span>
                <p>{q.text}</p>
                <cite>{q.source}</cite>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how">
        <span className="section-label">Nasıl çalışır?</span>
        <h2>Üç adımda hazır olun.</h2>
        <div className="steps">
          {STEPS.map(s => (
            <div key={s.n} className="step">
              <div className="step-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing" id="pricing">
        <span className="section-label">Fiyatlandırma</span>
        <h2>Lansman fiyatı — sınırlı süre.</h2>
        <p>
          Henüz ödeme alınmıyor. "Ön kayıt" butonu yalnızca ilginizi bildirmenizi sağlar.
        </p>
        <div className="plans">

          <div className="plan">
            <h3>Ücretsiz</h3>
            <div className="plan-price">
              <span className="amount">0</span>
              <span className="currency">₺</span>
              <span className="period">/ay</span>
            </div>
            <ul className="plan-features">
              <li>Aylık 5 soru</li>
              <li>3–6 yaş kategorisi</li>
              <li>Temel cevaplar</li>
            </ul>
            <button className="btn-outline" onClick={() => handlePricingClick('Ücretsiz')}>
              Ücretsiz başla
            </button>
          </div>

          <div className="plan featured">
            <span className="plan-badge">En çok tercih</span>
            <h3>Aile</h3>
            <div className="plan-price">
              <span className="amount">49</span>
              <span className="currency">₺</span>
              <span className="period">/ay</span>
            </div>
            <ul className="plan-features">
              <li>Sınırsız soru</li>
              <li>3–12 yaş kategorileri</li>
              <li>Pedagojik onaylı cevaplar</li>
              <li>Türkçe + Almanca</li>
            </ul>
            <button className="btn-primary" onClick={() => handlePricingClick('Aile ₺49/ay')}>
              ₺49'a ön kayıt ol
            </button>
          </div>

        </div>
        <p className="plan-disclaimer">
          Ödeme alınmaz. Ön kayıt = fiyat garantisi ve erken erişim.
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <span className="footer-logo">Little Questions</span>
        <p>
          E-postanızı yalnızca lansman haberi için kullanırız. Üçüncü taraflarla paylaşılmaz.
        </p>
        <p>© 2025 Little Questions</p>
      </footer>

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
