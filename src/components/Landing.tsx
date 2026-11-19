import { typeArtUrl } from '../data/typeArt'
import { AdEdgeRails } from './AdEdgeRails'

interface LandingProps {
  onStart: (layout?: 'auto' | 'phone') => void
}

const PREVIEW_CODES = ['A-A', 'B-B', 'C-C', 'D-B', 'A-C', 'D-D'] as const

export function Landing({ onStart }: LandingProps) {
  return (
    <AdEdgeRails page="landing">
      <section className="landing" aria-labelledby="product-title">
        <div className="landing-atmosphere" aria-hidden="true" />
        <div className="landing-cast" aria-hidden="true">
          {PREVIEW_CODES.map((code, i) => (
            <img
              key={code}
              className={`landing-cast-card landing-cast-card-${i + 1}`}
              src={typeArtUrl(code)}
              alt=""
            />
          ))}
        </div>
        <div className="landing-inner">
          <p className="brand-parent">お悩み相談室</p>
          <h1 className="landing-title brand-mark" id="product-title">
            衝突パターン
            <br />
            16タイプ診断
          </h1>
          <p className="landing-lead">
            否定されてつい反応してしまうとき、あなたのクセはどの型に近い？
            30の問いで、いちばん出やすい反応（主軸）と、それに寄りやすいクセ（副軸）を見てみます。
          </p>
          <div className="landing-cta">
            <div className="landing-cta-row">
              <button type="button" className="btn-primary" onClick={() => onStart('auto')}>
                無料ではじめる
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => onStart('phone')}
              >
                大きなボタンで答える
              </button>
            </div>
            <p className="landing-meta">
              所要約5分。医療行為や性格矯正を目的としたものではありません。
            </p>
          </div>
        </div>
      </section>
    </AdEdgeRails>
  )
}
