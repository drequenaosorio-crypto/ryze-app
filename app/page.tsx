"use client"
import { useState, useEffect } from 'react"

const DICTIONARY: any = {
  es: { join: "Únete a la lista de espera", button: "Unirme", promo1: "TRAE A 5 Y RECLAMA AUTOMÁTICAMENTE TU REGALO", promo2: "¡TENEMOS GRANDES SORPRESAS POR LANZAMIENTO!" },
  en: { join: "Join the waitlist", button: "Join", promo1: "BRING 5 AND AUTOMATICALLY CLAIM YOUR GIFT", promo2: "WE HAVE BIG SURPRISES FOR LAUNCH!" },
  pt: { join: "Entre para a lista de espera", button: "Entrar", promo1: "TRAGA 5 E RESGATE SEU PRESENTE AUTOMATICAMENTE", promo2: "TEMOS GRANDES SURPRESAS PARA O LANÇAMENTO!" },
  fr: { join: "Rejoignez la liste d'attente", button: "Rejoindre", promo1: "APPORTEZ 5 ET RÉCLAMEZ AUTOMATIQUEMENT VOTRE CADEAU", promo2: "NOUS AVONS DE GRANDES SURPRISES POUR LE LANCEMENT!" },
  de: { join: "Tritt der Warteliste bei", button: "Beitreten", promo1: "BRING 5 MIT UND FORDERE AUTOMATISCH DEIN GESCHENK AN", promo2: "WIR HABEN GROSSE ÜBERRASCHUNGEN ZUM START!" },
  it: { join: "Unisciti alla lista d'attesa", button: "Unisciti", promo1: "PORTA 5 E RICHIEDI AUTOMATICAMENTE IL TUO REGALO", promo2: "ABBIAMO GRANDI SORPRESE PER IL LANCIO!" },
  // Agrega más aquí, el código ya está listo para todos
}

export default function Page() {
  const [lang, setLang] = useState("es")

  useEffect(() => {
    const userLang = navigator.language.slice(0,2).toLowerCase()
    if(DICTIONARY[userLang]) setLang(userLang)
    else setLang("en") // si es un idioma que no tenemos, inglés
  }, [])

  const t = DICTIONARY[lang]

  // Tu diseño actual aquí usando t.join, t.button, etc
}
