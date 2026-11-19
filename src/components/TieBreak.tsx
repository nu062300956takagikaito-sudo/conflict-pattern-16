import { BLOCKS, type BlockId } from '../data/quiz'

interface TieBreakProps {
  kind: 'primary' | 'secondary'
  candidates: BlockId[]
  onPick: (id: BlockId) => void
}

export function TieBreak({ kind, candidates, onPick }: TieBreakProps) {
  const title =
    kind === 'primary'
      ? 'いくつか同じくらいの強さでした'
      : '副軸も、同じくらいの強さでした'

  const lead =
    kind === 'primary'
      ? '最近いちばんしんどかった場面に近いものを、1つ選んでください。それが主軸になります。'
      : 'いまの自分により近いと感じる方を、1つ選んでください。それが副軸になります。'

  return (
    <section className="tiebreak" aria-labelledby="tie-heading">
      <h2 id="tie-heading" className="tie-title">
        {title}
      </h2>
      <p className="tie-lead">{lead}</p>
      {candidates.length === 0 ? (
        <p className="tie-empty">選べる項目がありません。最初からやり直してください。</p>
      ) : (
        <ul className="tie-list">
          {candidates.map((id) => {
            const block = BLOCKS[id]
            return (
              <li key={id}>
                <button
                  type="button"
                  className="tie-option"
                  onClick={() => onPick(id)}
                >
                  <span className="tie-code">{id}</span>
                  <span className="tie-name">{block.label}</span>
                  <span className="tie-short">{block.short}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
