import type { LikertOption, LikertValue } from '../data/quiz'

const TONE_BY_VALUE: Record<LikertValue, string> = {
  0: 'tone-0',
  1: 'tone-1',
  2: 'tone-2',
  3: 'tone-3',
  4: 'tone-4',
}

interface LikertScalePhoneProps {
  options: LikertOption[]
  groupName: string
  selected: LikertValue | undefined
  labelledBy: string
  onAnswer: (value: LikertValue) => void
}

/** Phone alternative: full-width color rows (よくある → まったくない, top → bottom). */
export function LikertScalePhone({
  options,
  groupName,
  selected,
  labelledBy,
  onAnswer,
}: LikertScalePhoneProps) {
  const fillPct =
    selected === undefined ? 0 : ((4 - selected) / 4) * 100

  return (
    <div
      className="likert-scale likert-scale-phone"
      role="radiogroup"
      aria-labelledby={labelledBy}
      data-value={selected ?? ''}
    >
      <div className="phone-scale-frame">
        <div className="phone-rail" aria-hidden="true">
          <div className="phone-rail-fill" style={{ height: `${fillPct}%` }} />
        </div>

        <div className="phone-stops">
          {options.map((opt) => {
            const inputId = `${groupName}-phone-${opt.value}`
            const isSelected = selected === opt.value
            return (
              <label
                key={opt.value}
                htmlFor={inputId}
                className={`phone-stop ${TONE_BY_VALUE[opt.value]}${isSelected ? ' is-selected' : ''}`}
              >
                <input
                  id={inputId}
                  type="radio"
                  name={groupName}
                  value={opt.value}
                  checked={isSelected}
                  onChange={() => onAnswer(opt.value)}
                />
                <span className="phone-stop-score" aria-hidden="true">
                  {opt.value}
                </span>
                <span className="phone-stop-copy">
                  <span className="phone-stop-label">{opt.label}</span>
                  {isSelected && (
                    <span className="phone-stop-check">いまの選択</span>
                  )}
                </span>
              </label>
            )
          })}
        </div>
      </div>

      <p className="phone-hint">上＝よくある　／　下＝まったくない</p>
    </div>
  )
}
