import type { ConflictType } from './quiz'

/** Cropped character cards from the 16-type sheet under /public/types */
export function typeArtUrl(code: ConflictType['code']): string {
  return `/types/${code}.webp`
}

export const TYPE_SHEET_URL = '/types/sheet.webp'
