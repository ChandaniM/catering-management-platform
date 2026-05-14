import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import axios from 'axios'
import { API_URL } from '../apiConfig'

export type SiteSettingsMap = Record<string, string>

type SiteSettingsContextValue = {
  settings: SiteSettingsMap
  loading: boolean
  reload: () => Promise<void>
}

const SiteSettingsContext = createContext<SiteSettingsContextValue | null>(null)

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettingsMap>({})
  const [loading, setLoading] = useState(true)

  const reload = useCallback(async () => {
    try {
      const res = await axios.get<{ key: string; value: string }[]>(`${API_URL}/settings`, {
        params: { _t: Date.now() },
        headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
      })
      const map = res.data.reduce<SiteSettingsMap>((acc, row) => {
        acc[row.key] = row.value
        return acc
      }, {})
      setSettings(map)
    } catch (e) {
      console.error('Failed to load site settings:', e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void reload()
  }, [reload])

  useEffect(() => {
    const onFocus = () => {
      void reload()
    }
    const onVis = () => {
      if (document.visibilityState === 'visible') void reload()
    }
    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onVis)
    const poll = window.setInterval(() => {
      if (document.visibilityState === 'visible') void reload()
    }, 12_000)
    return () => {
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onVis)
      window.clearInterval(poll)
    }
  }, [reload])

  const value = useMemo(
    () => ({ settings, loading, reload }),
    [settings, loading, reload],
  )

  return (
    <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>
  )
}

export function useSiteSettings(): SiteSettingsContextValue {
  const ctx = useContext(SiteSettingsContext)
  if (!ctx) {
    throw new Error('useSiteSettings must be used within SiteSettingsProvider')
  }
  return ctx
}
