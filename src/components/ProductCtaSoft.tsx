import { MENTORING_CTA_HREF, NOTE_CTA_HREF } from '../lib/ctaLinks'

/** Secondary self-product CTAs — result page only, under content. */
export function ProductCtaSoft() {
  return (
    <aside className="product-cta-soft" aria-label="お悩み相談室からのご案内">
      <p className="product-cta-soft-lead">
        診断のあと、もう少しだけ寄り添いたいときへ。押し売りではなく、任意のご案内です。
      </p>
      <ul className="product-cta-soft-list">
        <li>
          <a className="product-cta-soft-link" href={NOTE_CTA_HREF}>
            <span className="product-cta-soft-kicker">よみもの · 500円</span>
            <span className="product-cta-soft-title">診断の背景を note で読む</span>
          </a>
        </li>
        <li>
          <a className="product-cta-soft-link" href={MENTORING_CTA_HREF}>
            <span className="product-cta-soft-kicker">オンライン1時間 · 2,000円</span>
            <span className="product-cta-soft-title">衝突パターンを一緒にほどく</span>
          </a>
        </li>
      </ul>
    </aside>
  )
}
