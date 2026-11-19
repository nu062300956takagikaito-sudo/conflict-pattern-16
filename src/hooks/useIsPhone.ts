import { useEffect, useState } from 'react'

const QUERY = '(max-width: 639px)'

function layoutOverride(): 'phone' | 'desktop' | null {
  if (typeof window === 'undefined') return null
  const v = new URLSearchParams(window.location.search).get('layout')
  if (v === 'phone' || v === 'desktop') return v
  return null
}

export function useIsPhone(): boolean {
  const [isPhone, setIsPhone] = useState(() => {
    const override = layoutOverride()
    if (override === 'phone') return true
    if (override === 'desktop') return false
    if (typeof window === 'undefined') return true
    return window.matchMedia(QUERY).matches
  })

  useEffect(() => {
    const apply = () => {
      const override = layoutOverride()
      if (override === 'phone') {
        setIsPhone(true)
        return
      }
      if (override === 'desktop') {
        setIsPhone(false)
        return
      }
      setIsPhone(window.matchMedia(QUERY).matches)
    }

    apply()
    const mq = window.matchMedia(QUERY)
    mq.addEventListener('change', apply)
    window.addEventListener('popstate', apply)
    return () => {
      mq.removeEventListener('change', apply)
      window.removeEventListener('popstate', apply)
    }
  }, [])

  return isPhone
}
