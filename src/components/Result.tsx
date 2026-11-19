import { BLOCKS, TYPES } from '../data/quiz'
import { typeArtUrl } from '../data/typeArt'
import type { QuizResult } from '../lib/scoring'
import { AdEdgeRails } from './AdEdgeRails'
import { ProductCtaSoft } from './ProductCtaSoft'

interface ResultProps {
  result: QuizResult
  onRestart: () => void
}

const TOTAL_MAX = 120

function toPercent(score: number, max: number): number {
  if (max <= 0) return 0
  return Math.round((score / max) * 100)
}

export function Result({ result, onRestart }: ResultProps) {
  const { type, total, blocks, severity, primary, secondary } = result
  const totalPct = toPercent(total, TOTAL_MAX)
  const artSrc = typeArtUrl(type.code)

  return (
    <AdEdgeRails page="result">
      <section className="result" aria-labelledby="result-type">
        <p className="result-eyebrow">いまのあなたに近いパターン</p>

        <div className="result-hero">
          <figure className="result-art">
            <img
              src={artSrc}
              alt={`${type.name}のキャラクターイラスト`}
              width={360}
              height={256}
              decoding="async"
            />
          </figure>
          <div className="result-hero-copy">
            <h2 id="result-type" className="result-name">
              {type.name}
            </h2>
            <p className="result-code">
              {type.code}　主軸「{BLOCKS[primary].label}」× 副軸「
              {BLOCKS[secondary].label}」
            </p>
            <p className="result-explain">{type.explanation}</p>
          </div>
        </div>

        <div className="result-scores" aria-label="得点の目安">
          <div className="score-total">
            <span className="score-label">全体の傾向</span>
            <span className="score-value">
              {totalPct}
              <span className="score-unit">%</span>
            </span>
            <span className={`severity-pill severity-${severity.level}`}>
              {severity.label}
            </span>
            <p className="severity-desc">{severity.description}</p>
          </div>
          <ul className="block-scores">
            {blocks.map((b) => {
              const blockPct = toPercent(b.sum, b.count * 4)
              return (
                <li key={b.id} className="block-score">
                  <div className="block-score-head">
                    <span>
                      {b.id} {b.label}
                    </span>
                    <span className="block-score-pct">
                      {blockPct}
                      <span className="score-unit">%</span>
                    </span>
                  </div>
                  <div className="block-bar" aria-hidden="true">
                    <div
                      className="block-bar-fill"
                      style={{ width: `${blockPct}%` }}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <aside className="result-tip">
          <h3>明日からできる整え方</h3>
          <p>{type.tip}</p>
        </aside>

        <div className="type-roster" aria-label="16タイプ一覧">
          <h3 className="type-roster-title">16タイプのなかでの位置</h3>
          <ul className="type-roster-grid">
            {TYPES.map((t) => {
              const active = t.code === type.code
              return (
                <li key={t.code}>
                  <figure
                    className={`type-roster-card${active ? ' is-active' : ''}`}
                    aria-current={active ? 'true' : undefined}
                  >
                    <img
                      src={typeArtUrl(t.code)}
                      alt={t.name}
                      loading="lazy"
                      decoding="async"
                    />
                    {active && (
                      <figcaption className="type-roster-you">あなた</figcaption>
                    )}
                  </figure>
                </li>
              )
            })}
          </ul>
        </div>

        <ProductCtaSoft />

        <button type="button" className="btn-ghost result-restart" onClick={onRestart}>
          もう一度やってみる
        </button>
      </section>
    </AdEdgeRails>
  )
}
