import type { LikertOption, LikertValue } from '../data/quiz'

const TONE_BY_VALUE: Record<LikertValue, string> = {
  0: 'tone-0',
  1: 'tone-1',
  2: 'tone-2',
  3: 'tone-3',
  4: 'tone-4',
}

interface LikertScaleDesktopProps {
  options: LikertOption[]
  groupName: string
  selected: LikertValue | undefined
  labelledBy: string
  onAnswer: (value: LikertValue) => void
}

export function LikertScaleDesktop({
  options,
  groupName,
  selected,
  labelledBy,
  onAnswer,
}: LikertScaleDesktopProps) {
  const fillPct =
    selected === undefined ? 0 : ((4 - selected) / 4) * 100

  return (
    <div
      className="likert-scale likert-scale-desktop"
      role="radiogroup"
      aria-labelledby={labelledBy}
      data-value={selected ?? ''}
    >
      <div className="likert-rail" aria-hidden="true">
        <div className="likert-rail-fill" style={{ width: `${fillPct}%` }} />
      </div>

      <div className="likert-stops">
        {options.map((opt) => {
          const inputId = `${groupName}-desk-${opt.value}`
          const isSelected = selected === opt.value
          return (
            <label
              key={opt.value}
              htmlFor={inputId}
              className={`likert-stop ${TONE_BY_VALUE[opt.value]}${isSelected ? ' is-selected' : ''}`}
              title={opt.label}
            >
              <input
                id={inputId}
                type="radio"
                name={groupName}
                value={opt.value}
                checked={isSelected}
                onChange={() => onAnswer(opt.value)}
              />
              <span className="likert-dot">
                <span className="likert-dot-value">{opt.value}</span>
              </span>
              <span className="likert-stop-label">{opt.label}</span>
            </label>
          )
        })}
      </div>

      <div className="likert-ends" aria-hidden="true">
        <span>よくある</span>
        <span>まったくない</span>
      </div>
    </div>
  )
}
