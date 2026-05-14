import { useEffect } from 'react'

type RefetchOptions = { pollMs?: number }

/** Re-fetch when the tab/window is focused, and optionally on an interval while the tab is visible. */
export function useRefetchOnFocus(
  callback: () => void | Promise<void>,
  options?: RefetchOptions,
) {
  const pollMs = options?.pollMs

  useEffect(() => {
    const run = () => {
      void Promise.resolve(callback())
    }
    const onVis = () => {
      if (document.visibilityState === 'visible') run()
    }
    window.addEventListener('focus', run)
    document.addEventListener('visibilitychange', onVis)
    const interval =
      pollMs && pollMs > 0
        ? window.setInterval(() => {
            if (document.visibilityState === 'visible') run()
          }, pollMs)
        : null
    return () => {
      window.removeEventListener('focus', run)
      document.removeEventListener('visibilitychange', onVis)
      if (interval != null) window.clearInterval(interval)
    }
  }, [callback, pollMs])
}
