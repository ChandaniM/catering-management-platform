/**
 * Nest API base (includes `/api`). Set in `.env`: `VITE_API_URL=http://localhost:4000/api`
 */
function normalizeApiUrl(input: string | undefined): string {
  if (!input?.trim()) return 'http://localhost:4000/api'
  const t = input.trim().replace(/\/+$/, '')
  return t.endsWith('/api') ? t : `${t}/api`
}

export const API_URL = normalizeApiUrl(import.meta.env.VITE_API_URL as string | undefined)
