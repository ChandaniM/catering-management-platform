import { MessageCircle } from 'lucide-react'
import { useSiteSettings } from '../contexts/SiteSettingsContext'

export default function WhatsAppButton() {
  const { settings } = useSiteSettings()
  const wa = (settings.contact_whatsapp || '919999999999').replace(/\D/g, '')

  return (
    <a
      href={`https://wa.me/${wa}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} strokeWidth={2} />
    </a>
  )
}
