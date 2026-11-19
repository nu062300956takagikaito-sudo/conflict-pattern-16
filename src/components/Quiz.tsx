import {
  BLOCKS,
  LIKERT_OPTIONS,
  QUESTIONS,
  type LikertValue,
} from '../data/quiz'
import { useIsPhone } from '../hooks/useIsPhone'
import type { Answers } from '../lib/scoring'
import { LikertScaleDesktop } from './LikertScaleDesktop'
import { LikertScalePhone } from './LikertScalePhone'
import { ProgressBar } from './ProgressBar'

export type LayoutPreference = 'auto' | 'phone' | 'desktop'

interface QuizProps {
  answers: Answers
  index: number
  layoutPreference?: LayoutPreference
  onAnswer: (questionId: number, value: LikertValue) => void
  onBack: () => void
}

/** Shared order: よくある(4) → まったくない(0) */
const SCALE_OPTIONS = [...LIKERT_OPTIONS].sort((a, b) => b.value - a.value)

const TONE_BY_VALUE: Record<LikertValue, string> = {
  0: 'tone-0',
  1: 'tone-1',
  2: 'tone-2',
  3: 'tone-3',
  4: 'tone-4',
}

export function Quiz({
  answers,
  index,
  layoutPreference = 'auto',
  onAnswer,
  onBack,
}: QuizProps) {
  const autoPhone = useIsPhone()
  const isPhone =
    layoutPreference === 'phone' ||
    (layoutPreference === 'auto' && autoPhone)
  const question = QUESTIONS[index]
  const block = BLOCKS[question.block]
  const selected = answers[question.id]
  const groupName = `q-${question.id}`
  const selectedOption = SCALE_OPTIONS.find((o) => o.value === selected)

  return (
    <section
      className={`quiz${isPhone ? ' quiz-phone' : ' quiz-desktop'}`}
      aria-labelledby="quiz-heading"
    >
      <ProgressBar current={index + 1} total={QUESTIONS.length} />

      <p className="quiz-block-tag">
        {question.block} · {block.label}
      </p>
      <h2 id="quiz-heading" className="quiz-question">
        <span className="quiz-qnum">問い {question.id}</span>
        {question.text}
      </h2>

      <fieldset className="likert">
        <legend className="sr-only">最近の自分に近いものを、5段階から選ぶ</legend>

        <div
          className={`likert-selected${selectedOption ? ` ${TONE_BY_VALUE[selectedOption.value]}` : ''}`}
          aria-live="polite"
        >
          {selectedOption ? (
            <>
              <span className="likert-selected-score">{selectedOption.value}</span>
              <span className="likert-selected-label">{selectedOption.label}</span>
            </>
          ) : (
            <span className="likert-selected-placeholder">
              {isPhone
                ? '下の色バーから、いちばん近いものを選んでください'
                : '目盛りから、いちばん近いものを選んでください'}
            </span>
          )}
        </div>

        {isPhone ? (
          <LikertScalePhone
            options={SCALE_OPTIONS}
            groupName={groupName}
            selected={selected}
            labelledBy="quiz-heading"
            onAnswer={(value) => onAnswer(question.id, value)}
          />
        ) : (
          <LikertScaleDesktop
            options={SCALE_OPTIONS}
            groupName={groupName}
            selected={selected}
            labelledBy="quiz-heading"
            onAnswer={(value) => onAnswer(question.id, value)}
          />
        )}
      </fieldset>

      <div className="quiz-nav">
        <button
          type="button"
          className="btn-ghost"
          onClick={onBack}
          disabled={index === 0}
        >
          ひとつ前へ
        </button>
      </div>
    </section>
  )
}
