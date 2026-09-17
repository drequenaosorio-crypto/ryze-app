"use client"
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

const DICTIONARY: any = {
  es: { title: "Únete a la lista de espera", ph: "tu@email.com", btn: "Unirme", promo1: "🎁 TRAE A 5 Y RECLAMA AUTOMÁTICAMENTE TU REGALO", promo2: "¡TENEMOS GRANDES SORPRESAS POR LANZAMIENTO!", thanks: "¡Estás dentro!", copy: "Tu link de referido:", copied: "¡Copiado!" },
  en: { title: "Join the waitlist", ph: "your@email.com", btn: "Join", promo1: "🎁 BRING 5 AND AUTOMATICALLY CLAIM YOUR GIFT", promo2: "WE HAVE BIG SURPRISES FOR LAUNCH!", thanks: "You're in!", copy: "Your referral link:", copied: "Copied!" },
  pt: { title: "Entre para a lista de espera", ph: "seu@email.com", btn: "Entrar", promo1: "TRAGA 5 E RESGATE SEU PRESENTE AUTOMATICAMENTE", promo2: "TEMOS GRANDES SURPRESAS!", thanks: "Você está dentro!", copy: "Seu link:", copied: "Copiado!" },
  fr: { title: "Rejoignez la liste d'attente", ph: "votre@email.com", btn: "Rejoindre", promo1: "🎁 APPORTEZ 5 ET RÉCLAMEZ VOTRE CADEAU", promo2: "NOUS AVONS DE GRANDES SURPRISES!", thanks: "Vous êtes dedans!", copy: "Votre lien:", copied: "Copié!" },
  de: { title: "Tritt der Warteliste bei", ph: "deine@email.com", btn: "Beitreten", promo1: "🎁 BRING 5 MIT UND FORDERE DEIN GESCHENK AN", promo2: "WIR HABEN GROSSE ÜBERRASCHUNGEN!", thanks: "Du bist dabei!", copy: "Dein Link:", copied: "Kopiert!" },
  it: { title: "Unisciti alla lista d'attesa", ph: "tua@email.com", btn: "Unisciti", promo1: "🎁 PORTA 5 E RICHIEDI IL TUO REGALO", promo2: "ABBIAMO GRANDI SORPRESE!", thanks: "Sei dentro!", copy: "Il tuo link:", copied: "Copiato!" },
  ja: { title: "ウェイティングリストに参加", ph: "あなたのメール", btn: "参加", promo1: "🎁 5人招待で自動的にギフトをゲット", promo2: "大きなサプライズあり！", thanks: "参加完了！", copy: "紹介リンク：", copied: "コピーしました！" },
  ru: { title: "Присоединиться к листу ожидания", ph: "твоя@почта.com", btn: "Вступить", promo1: "🎁 ПРИВЕДИ 5 И ПОЛУЧИ ПОДАРОК", promo2: "У НАС БОЛЬШИЕ СЮРПРИЗЫ!", thanks: "Ты внутри!", copy: "Твоя ссылка:", copied: "Скопировано!" },
}

function WaitlistForm() {
  const [lang, setLang] = useState("es")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [referralLink, setReferralLink] = useState("")
  const searchParams = useSearchParams()
  const ref = searchParams.get('ref')

  useEffect(() => {
    const userLang = navigator.language.slice(0, 2).toLowerCase()
    if (DICTIONARY[userLang]) setLang(userLang)
    else setLang("en")
  }, [])

  const t = DICTIONARY[lang] || DICTIONARY["en"]

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, ref })
      })
      const data = await res.json()
      if (res.ok) {
        const link = `${window.location.origin}?ref=${encodeURIComponent(email)}`
        setReferralLink(link)
        setDone(true)
      } else {
        alert(data.error || 'Error')
      }
    } catch (err) {
      alert('Error de conexión')
    }
    setLoading(false)
  }

  return (
    <div style={{ background: 'black', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ color: 'white', fontSize: '60px', fontWeight
