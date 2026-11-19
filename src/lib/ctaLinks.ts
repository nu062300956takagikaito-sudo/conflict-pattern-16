/** In-house edge CTAs — placeholders until real URLs are set. */
const NOTE_FALLBACK = '#note-placeholder'
const MENTORING_FALLBACK = '#mentoring-placeholder'

function fromEnv(value: unknown, fallback: string): string {
  if (typeof value !== 'string') return fallback
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : fallback
}

export const NOTE_CTA_HREF = fromEnv(
  import.meta.env.VITE_NOTE_CTA_URL,
  NOTE_FALLBACK,
)

export const MENTORING_CTA_HREF = fromEnv(
  import.meta.env.VITE_MENTORING_CTA_URL,
  MENTORING_FALLBACK,
)
