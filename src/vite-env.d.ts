/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NOTE_CTA_URL?: string
  readonly VITE_MENTORING_CTA_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
