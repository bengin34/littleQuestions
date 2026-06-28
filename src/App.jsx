import { useState, useEffect, useCallback } from 'react'
import './App.css'

const FORM_ENDPOINT = "https://formspree.io/f/xgojyaer"

const TRANSLATIONS = {
  tr: {
    logoName: "Merak Defteri",
    navCta: "Haberi al",
    heroBadge: "✦ Yakında geliyor",
    heroH1Before: "Çocuğunuz ",
    heroH1Em: "zor soru",
    heroH1After: " sorunca",
    heroH1Line2: "donup kalmayın.",
    heroSub: "Uzmanlar tarafından, çocuğunuzun yaşına göre hazırlanmış cevaplar.",
    heroQuestions: [
      "Dedem nereye gitti, artık hiç gelmeyecek mi?",
      "Sen de bir gün ölecek misin?",
      "Allah bizi görüyor mu şu an?",
      "Cennet gerçek mi, oraya nasıl gidilir?",
      "Neden dua ediyoruz, Allah duyuyor mu?",
      "Öldükten sonra bizi hatırlayan olur mu?",
      "Kötü insanlar cehenneme mi gider?",
      "Biz ölünce nerede olacağız?",
    ],
    emailPlaceholder: "E-posta adresiniz",
    emailBtn: "Haberdar et",
    emailLoading: "Gönderiliyor…",
    successMsg: "✓ Haberdar edeceğiz. Teşekkürler!",
    formNote: "Spam yok. Yalnızca lansman haberi için kullanılır.",
    painLabel: "Tanıdık geliyor mu?",
    painH2: "Her ebeveyn bu anı yaşıyor.",
    painH2b: "Çoğu hazırlıksız yakalanıyor.",
    howLabel: "Nasıl çalışır?",
    howH2: "Üç adımda hazır olun.",
    pricingLabel: "Fiyatlandırma",
    pricingH2: "Lansman fiyatı — sınırlı süre.",
    pricingNote: '"Ön kayıt" butonu yalnızca ilginizi bildirmenizi sağlar. Henüz ödeme alınmıyor.',
    planFreeTitle: "Ücretsiz",
    planFreeFeatures: ["Aylık 5 soru", "3–6 yaş kategorisi", "Temel cevaplar"],
    planFreeBtn: "Ücretsiz başla",
    planFamilyTitle: "Aile",
    planBadge: "En çok tercih",
    planFamilyFeatures: ["Sınırsız soru", "3–12 yaş kategorileri", "Pedagojik onaylı cevaplar", "Türkçe + Almanca"],
    planFamilyBtn: "₺49'a ön kayıt ol",
    planFamilyAmount: "49",
    planFamilyCurrency: "₺",
    planPeriod: "/ay",
    planFreeAmount: "0",
    planDisclaimer: "Ödeme alınmaz. Ön kayıt = fiyat garantisi ve erken erişim.",
    footerP1: "E-postanızı yalnızca lansman haberi için kullanırız. Üçüncü taraflarla paylaşılmaz.",
    footerP2: "© 2025 Merak Defteri",
    toastDemo: "Kaydedildi! (demo mod)",
    toastSuccess: "E-posta alındı, teşekkürler!",
    toastError: "Bir hata oluştu, tekrar deneyin.",
    toastNetwork: "Bağlantı hatası.",
    toastPricing: (plan) => `${plan} — ön kayıt isteği alındı.`,
  },
  de: {
    logoName: "Little Questions",
    navCta: "Benachrichtigen",
    heroBadge: "✦ Demnächst verfügbar",
    heroH1Before: "Nie mehr sprachlos, wenn Ihr Kind ",
    heroH1Em: "schwierige Fragen",
    heroH1After: " stellt.",
    heroH1Line2: "",
    heroSub: "Von Experten entwickelte, altersgerechte Antworten für Ihr Kind.",
    heroQuestions: [
      "Wo ist Opa jetzt — kommt er nie wieder?",
      "Stirbst du auch mal, Mama?",
      "Sieht Gott uns gerade zu?",
      "Gibt es den Himmel wirklich?",
      "Warum beten wir, hört Gott uns zu?",
      "Erinnert sich jemand an uns, wenn wir sterben?",
      "Kommen böse Menschen in die Hölle?",
      "Wo sind wir, wenn wir gestorben sind?",
    ],
    emailPlaceholder: "Ihre E-Mail-Adresse",
    emailBtn: "Benachrichtigen",
    emailLoading: "Wird gesendet…",
    successMsg: "✓ Wir melden uns. Danke!",
    formNote: "Kein Spam. Nur für die Startankündigung.",
    painLabel: "Kommt Ihnen das bekannt vor?",
    painH2: "Jeder Elternteil erlebt diesen Moment.",
    painH2b: "Die meisten sind nicht vorbereitet.",
    howLabel: "Wie funktioniert es?",
    howH2: "In drei Schritten bereit.",
    pricingLabel: "Preise",
    pricingH2: "Einführungspreis — nur für begrenzte Zeit.",
    pricingNote: 'Der „Vorregistrierung"-Button zeigt nur Ihr Interesse an. Noch keine Zahlung erforderlich.',
    planFreeTitle: "Kostenlos",
    planFreeFeatures: ["5 Fragen pro Monat", "Kategorie 3–6 Jahre", "Grundlegende Antworten"],
    planFreeBtn: "Kostenlos starten",
    planFamilyTitle: "Familie",
    planBadge: "Am beliebtesten",
    planFamilyFeatures: ["Unbegrenzte Fragen", "Kategorien 3–12 Jahre", "Pädagogisch geprüfte Antworten", "Türkisch + Deutsch"],
    planFamilyBtn: "Für €3,99 vorregistrieren",
    planFamilyAmount: "3,99",
    planFamilyCurrency: "€",
    planPeriod: "/Mo.",
    planFreeAmount: "0",
    planDisclaimer: "Keine Zahlung. Vorregistrierung = Preisgarantie & Frühzugang.",
    footerP1: "Wir verwenden Ihre E-Mail nur für die Startankündigung. Keine Weitergabe an Dritte.",
    footerP2: "© 2025 Little Questions",
    toastDemo: "Gespeichert! (Demo-Modus)",
    toastSuccess: "E-Mail erhalten, danke!",
    toastError: "Ein Fehler ist aufgetreten. Bitte erneut versuchen.",
    toastNetwork: "Verbindungsfehler.",
    toastPricing: (plan) => `${plan} — Vorregistrierung eingegangen.`,
  },
  en: {
    logoName: "Little Questions",
    navCta: "Get notified",
    heroBadge: "✦ Coming soon",
    heroH1Before: "Stop freezing when your child asks a ",
    heroH1Em: "hard question",
    heroH1After: ".",
    heroH1Line2: "",
    heroSub: "Expert-crafted answers, tailored to your child's age.",
    heroQuestions: [
      "Where did grandpa go — is he never coming back?",
      "Are you going to die too, mommy?",
      "Is God watching us right now?",
      "Is heaven a real place?",
      "Why do we pray — does God actually hear us?",
      "Will anyone remember us after we die?",
      "Do bad people really go to hell?",
      "Where will we be when we're gone?",
    ],
    emailPlaceholder: "Your email address",
    emailBtn: "Notify me",
    emailLoading: "Sending…",
    successMsg: "✓ We'll let you know. Thank you!",
    formNote: "No spam. Only used for the launch announcement.",
    painLabel: "Does this sound familiar?",
    painH2: "Every parent faces this moment.",
    painH2b: "Most are caught completely off guard.",
    howLabel: "How does it work?",
    howH2: "Get ready in three steps.",
    pricingLabel: "Pricing",
    pricingH2: "Launch price — limited time.",
    pricingNote: 'No payment yet. The "Pre-register" button only signals your interest.',
    planFreeTitle: "Free",
    planFreeFeatures: ["5 questions per month", "Ages 3–6 category", "Basic answers"],
    planFreeBtn: "Start for free",
    planFamilyTitle: "Family",
    planBadge: "Most popular",
    planFamilyFeatures: ["Unlimited questions", "Ages 3–12 categories", "Pedagogically approved answers", "Turkish + German"],
    planFamilyBtn: "Pre-register for $3.99",
    planFamilyAmount: "3.99",
    planFamilyCurrency: "$",
    planPeriod: "/mo",
    planFreeAmount: "0",
    planDisclaimer: "No payment. Pre-register = price guarantee & early access.",
    footerP1: "We only use your email for the launch announcement. Never shared with third parties.",
    footerP2: "© 2025 Little Questions",
    toastDemo: "Saved! (demo mode)",
    toastSuccess: "Email received, thank you!",
    toastError: "An error occurred, please try again.",
    toastNetwork: "Connection error.",
    toastPricing: (plan) => `${plan} — pre-registration received.`,
  },
}

const QUOTES = {
  tr: [
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
  ],
  de: [
    {
      text: "Mein Kind fragte: 'Wo wohnt Gott?' Ich wusste nicht, was ich sagen sollte. Ich sagte 'im Himmel' — aber ich war nicht zufrieden damit.",
      source: "Eine Mutter, mit ihrem 5-jährigen Kind"
    },
    {
      text: "Vorher schlief er immer friedlich ein. Dann stellte er die Frage nach dem Tod — jetzt schlafe ich nicht mehr.",
      source: "Ein Vater, mit seiner 4-jährigen Tochter"
    },
    {
      text: "Sie fragte, ob es die Hölle gibt und ob sie dort hinkommt. Ihr Gesicht war so ernst — ich war sprachlos.",
      source: "Eine Mutter, mit ihrem 6-jährigen Sohn"
    },
  ],
  en: [
    {
      text: "My child asked 'Where does God live?' I didn't know what to say. I said 'in the sky' but I wasn't comfortable with that answer.",
      source: "A mother, with her 5-year-old child"
    },
    {
      text: "She used to sleep just fine before. Then she asked about death — now I can't sleep.",
      source: "A father, with his 4-year-old daughter"
    },
    {
      text: "He asked if hell exists and whether he would go there. His face was so serious — I froze.",
      source: "A mother, with her 6-year-old son"
    },
  ],
}

const STEPS = {
  tr: [
    { n: "1", title: "Soruyu yaz", desc: "Çocuğunuzun sorduğu soruyu uygulamaya yazın — kendi kelimeleriyle." },
    { n: "2", title: "Yaşa uygun cevabı al", desc: "Pedagojik ve psikolojik olarak onaylı, yaşa göre seçilmiş kelimeler gelir." },
    { n: "3", title: "Kendi sesinle anlat", desc: "Cevabı ezberlemezsiniz; sadece ne söyleyeceğinizi bilirsiniz." },
  ],
  de: [
    { n: "1", title: "Frage eingeben", desc: "Geben Sie die Frage Ihres Kindes in der App ein — mit seinen eigenen Worten." },
    { n: "2", title: "Altersgerechte Antwort erhalten", desc: "Pädagogisch und psychologisch geprüfte Antworten, abgestimmt auf das Alter Ihres Kindes." },
    { n: "3", title: "Mit eigenen Worten erzählen", desc: "Sie müssen nichts auswendig lernen — Sie wissen einfach, was Sie sagen sollen." },
  ],
  en: [
    { n: "1", title: "Write the question", desc: "Type your child's question into the app — in their own words." },
    { n: "2", title: "Get an age-appropriate answer", desc: "Pedagogically and psychologically approved words, chosen for your child's age." },
    { n: "3", title: "Tell it in your own voice", desc: "You don't memorize answers — you simply know what to say." },
  ],
}

const LANG_LABELS = { tr: "TR", de: "DE", en: "EN" }

function useTypewriter(strings, lang) {
  const [displayed, setDisplayed] = useState('')
  const [idx, setIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setIdx(0)
    setDeleting(false)
  }, [lang])

  useEffect(() => {
    const current = strings[idx % strings.length]
    const TYPE_SPEED = 55
    const DELETE_SPEED = 30
    const PAUSE_MS = 2400

    if (!deleting) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), TYPE_SPEED)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setDeleting(true), PAUSE_MS)
        return () => clearTimeout(t)
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), DELETE_SPEED)
        return () => clearTimeout(t)
      } else {
        setIdx(i => i + 1)
        setDeleting(false)
      }
    }
  }, [displayed, deleting, idx, strings])

  return displayed
}

export default function App() {
  const [lang, setLang] = useState('tr')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState('')

  const t = TRANSLATIONS[lang]
  const quotes = QUOTES[lang]
  const steps = STEPS[lang]
  const typedQuestion = useTypewriter(t.heroQuestions, lang)

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const handleEmailSubmit = useCallback(async (e) => {
    e.preventDefault()
    if (!email) return

    if (!FORM_ENDPOINT) {
      setSubmitted(true)
      showToast(t.toastDemo)
      return
    }

    setLoading(true)
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, lang }),
      })
      if (res.ok) {
        setSubmitted(true)
        showToast(t.toastSuccess)
      } else {
        showToast(t.toastError)
      }
    } catch {
      showToast(t.toastNetwork)
    } finally {
      setLoading(false)
    }
  }, [email, lang, t])

  const handlePricingClick = useCallback((plan) => {
    showToast(t.toastPricing(plan))
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', { content_name: plan })
    }
  }, [t])

  const scrollToHero = () => {
    document.querySelector('.hero').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="page">

      {/* Nav */}
      <nav className="nav">
        <span className="nav-logo">{t.logoName}</span>
        <div className="nav-right">
          <div className="lang-switcher">
            {Object.keys(LANG_LABELS).map(l => (
              <button
                key={l}
                className={`lang-btn${lang === l ? ' active' : ''}`}
                onClick={() => setLang(l)}
                aria-label={l.toUpperCase()}
              >
                {LANG_LABELS[l]}
              </button>
            ))}
          </div>
          <button className="nav-cta" onClick={scrollToHero}>{t.navCta}</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <span className="hero-badge">{t.heroBadge}</span>
        <h1>
          {t.heroH1Before}<em>{t.heroH1Em}</em>{t.heroH1After}
          {t.heroH1Line2 && <><br />{t.heroH1Line2}</>}
        </h1>

        <div className="typewriter-wrap">
          <span className="tw-quote">"</span>
          <span className="tw-text">{typedQuestion}</span>
          <span className="tw-cursor">|</span>
          <span className="tw-quote">"</span>
        </div>

        <p className="hero-sub">{t.heroSub}</p>

        {submitted ? (
          <p className="success-msg">{t.successMsg}</p>
        ) : (
          <form className="email-form" onSubmit={handleEmailSubmit}>
            <input
              type="email"
              required
              placeholder={t.emailPlaceholder}
              value={email}
              onChange={e => setEmail(e.target.value)}
              aria-label={t.emailPlaceholder}
            />
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? t.emailLoading : t.emailBtn}
            </button>
          </form>
        )}

        <p className="form-note">{t.formNote}</p>
      </section>

      {/* Pain */}
      <section className="pain">
        <div className="pain-inner">
          <span className="section-label">{t.painLabel}</span>
          <h2>{t.painH2}<br />{t.painH2b}</h2>
          <div className="quotes">
            {quotes.map((q, i) => (
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
        <span className="section-label">{t.howLabel}</span>
        <h2>{t.howH2}</h2>
        <div className="steps">
          {steps.map(s => (
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
        <span className="section-label">{t.pricingLabel}</span>
        <h2>{t.pricingH2}</h2>
        <p>{t.pricingNote}</p>
        <div className="plans">

          <div className="plan">
            <h3>{t.planFreeTitle}</h3>
            <div className="plan-price">
              <span className="currency">{t.planFamilyCurrency}</span>
              <span className="amount">{t.planFreeAmount}</span>
              <span className="period">{t.planPeriod}</span>
            </div>
            <ul className="plan-features">
              {t.planFreeFeatures.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            <button className="btn-outline" onClick={() => handlePricingClick(t.planFreeTitle)}>
              {t.planFreeBtn}
            </button>
          </div>

          <div className="plan featured">
            <span className="plan-badge">{t.planBadge}</span>
            <h3>{t.planFamilyTitle}</h3>
            <div className="plan-price">
              <span className="currency">{t.planFamilyCurrency}</span>
              <span className="amount">{t.planFamilyAmount}</span>
              <span className="period">{t.planPeriod}</span>
            </div>
            <ul className="plan-features">
              {t.planFamilyFeatures.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            <button className="btn-primary" onClick={() => handlePricingClick(t.planFamilyTitle)}>
              {t.planFamilyBtn}
            </button>
          </div>

        </div>
        <p className="plan-disclaimer">{t.planDisclaimer}</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <span className="footer-logo">{t.logoName}</span>
        <p>{t.footerP1}</p>
        <p>{t.footerP2}</p>
      </footer>

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
