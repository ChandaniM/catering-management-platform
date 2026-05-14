export function parseJson<T>(raw: string | undefined, fallback: T): T {
  if (!raw || !raw.trim()) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

/**
 * `raw` missing from API → `fallback` (first install).
 * `raw` present but empty/whitespace → `whenCleared` (admin intentionally cleared the field).
 */
export function parseJsonField<T>(raw: string | undefined, fallback: T, whenCleared: T): T {
  if (raw === undefined) return fallback
  if (!raw.trim()) return whenCleared
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}
