import { useEffect, useState } from 'react'
import { Landing } from './components/Landing'
import { Quiz, type LayoutPreference } from './components/Quiz'
import { Result } from './components/Result'
import { TieBreak } from './components/TieBreak'
import {
  QUESTIONS,
  TYPES,
  type BlockId,
  type LikertValue,
} from './data/quiz'
import {
  buildResult,
  isComplete,
  rankBlocks,
  secondaryCandidatesFor,
  type Answers,
  type QuizResult,
} from './lib/scoring'

type Step = 'landing' | 'quiz' | 'tie-primary' | 'tie-secondary' | 'result'

function demoResultFor(code: string): QuizResult | null {
  const type = TYPES.find((t) => t.code === code)
  if (!type) return null
  const answers: Answers = {}
  for (const q of QUESTIONS) {
    if (q.block === type.primary) answers[q.id] = 4
    else if (q.block === type.secondary) answers[q.id] = 3
    else answers[q.id] = 1
  }
  return buildResult(answers, type.primary, type.secondary)
}

export default function App() {
  const [step, setStep] = useState<Step>('landing')
  const [answers, setAnswers] = useState<Answers>({})
  const [index, setIndex] = useState(0)
  const [primary, setPrimary] = useState<BlockId | null>(null)
  const [tieCandidates, setTieCandidates] = useState<BlockId[]>([])
  const [result, setResult] = useState<QuizResult | null>(null)
  const [layoutPreference, setLayoutPreference] =
    useState<LayoutPreference>('auto')

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('demoType')
    if (!code) return
    const demo = demoResultFor(code)
    if (!demo) return
    setResult(demo)
    setPrimary(demo.primary)
    setStep('result')
  }, [])

  function reset() {
    setStep('landing')
    setAnswers({})
    setIndex(0)
    setPrimary(null)
    setTieCandidates([])
    setResult(null)
    setLayoutPreference('auto')
  }

  function startQuiz(layout: LayoutPreference = 'auto') {
    setLayoutPreference(layout)
    setStep('quiz')
  }

  function finishWithAxes(nextAnswers: Answers, p: BlockId, s: BlockId) {
    setPrimary(p)
    setResult(buildResult(nextAnswers, p, s))
    setStep('result')
  }

  function resolveAxes(nextAnswers: Answers) {
    const ranking = rankBlocks(nextAnswers)

    if (ranking.needsPrimaryTieBreak) {
      setTieCandidates(ranking.primaryCandidates)
      setStep('tie-primary')
      return
    }

    const p = ranking.primaryCandidates[0]
    setPrimary(p)

    if (ranking.needsSecondaryTieBreak) {
      setTieCandidates(ranking.secondaryCandidates)
      setStep('tie-secondary')
      return
    }

    const s = ranking.secondaryCandidates[0]
    finishWithAxes(nextAnswers, p, s)
  }

  function handleAnswer(questionId: number, value: LikertValue) {
    const next = { ...answers, [questionId]: value }
    setAnswers(next)

    if (index < QUESTIONS.length - 1) {
      window.setTimeout(() => setIndex((i) => i + 1), 180)
      return
    }

    if (!isComplete(next)) return
    resolveAxes(next)
  }

  function handlePrimaryPick(id: BlockId) {
    setPrimary(id)
    const secs = secondaryCandidatesFor(answers, id)
    if (secs.length > 1) {
      setTieCandidates(secs)
      setStep('tie-secondary')
      return
    }
    finishWithAxes(answers, id, secs[0])
  }

  function handleSecondaryPick(id: BlockId) {
    if (!primary) return
    finishWithAxes(answers, primary, id)
  }

  return (
    <div className="app-shell">
      <header className="top-bar">
        <span className="top-brand">衝突パターン16タイプ診断</span>
        {step !== 'landing' && (
          <button type="button" className="btn-text" onClick={reset}>
            はじめにもどる
          </button>
        )}
      </header>

      <main
        className={
          step === 'landing' || step === 'result'
            ? 'main-panel main-panel-wide'
            : 'main-panel'
        }
      >
        {step === 'landing' && <Landing onStart={startQuiz} />}
        {step === 'quiz' && (
          <Quiz
            answers={answers}
            index={index}
            layoutPreference={layoutPreference}
            onAnswer={handleAnswer}
            onBack={() => setIndex((i) => Math.max(0, i - 1))}
          />
        )}
        {step === 'tie-primary' && (
          <TieBreak
            kind="primary"
            candidates={tieCandidates}
            onPick={handlePrimaryPick}
          />
        )}
        {step === 'tie-secondary' && (
          <TieBreak
            kind="secondary"
            candidates={tieCandidates}
            onPick={handleSecondaryPick}
          />
        )}
        {step === 'result' && result && (
          <Result result={result} onRestart={reset} />
        )}
      </main>

      <footer className="site-footer">
        <p>衝突パターン16タイプ診断 · お悩み相談室</p>
      </footer>
    </div>
  )
}
