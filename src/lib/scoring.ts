import {
  BLOCKS,
  QUESTIONS,
  getType,
  severityFromTotal,
  type BlockId,
  type ConflictType,
  type LikertValue,
} from '../data/quiz'

export type Answers = Record<number, LikertValue | undefined>

export interface BlockScore {
  id: BlockId
  label: string
  short: string
  sum: number
  count: number
  /** Mean 0–4; used for ranking so unequal block lengths stay comparable */
  mean: number
}

export interface RankingResult {
  ordered: BlockScore[]
  primaryCandidates: BlockId[]
  secondaryCandidates: BlockId[]
  needsPrimaryTieBreak: boolean
  needsSecondaryTieBreak: boolean
}

export interface QuizResult {
  total: number
  blocks: BlockScore[]
  primary: BlockId
  secondary: BlockId
  type: ConflictType
  severity: ReturnType<typeof severityFromTotal>
}

const BLOCK_ORDER: BlockId[] = ['A', 'B', 'C', 'D']

export function scoreBlocks(answers: Answers): BlockScore[] {
  return BLOCK_ORDER.map((id) => {
    const qs = QUESTIONS.filter((q) => q.block === id)
    const sum = qs.reduce((acc, q) => acc + (answers[q.id] ?? 0), 0)
    const count = qs.length
    return {
      id,
      label: BLOCKS[id].label,
      short: BLOCKS[id].short,
      sum,
      count,
      mean: count === 0 ? 0 : sum / count,
    }
  })
}

function idsAtMean(
  blocks: BlockScore[],
  targetMean: number,
  exclude: BlockId[] = [],
): BlockId[] {
  return blocks
    .filter((b) => !exclude.includes(b.id) && Math.abs(b.mean - targetMean) < 1e-9)
    .map((b) => b.id)
}

export function rankBlocks(answers: Answers): RankingResult {
  const blocks = scoreBlocks(answers)
  const ordered = [...blocks].sort((a, b) => {
    if (b.mean !== a.mean) return b.mean - a.mean
    return BLOCK_ORDER.indexOf(a.id) - BLOCK_ORDER.indexOf(b.id)
  })

  const topMean = ordered[0].mean
  const primaryCandidates = idsAtMean(ordered, topMean)

  let secondaryCandidates: BlockId[] = []
  let needsSecondaryTieBreak = false

  if (primaryCandidates.length === 1) {
    const rest = ordered.filter((b) => b.id !== primaryCandidates[0])
    const secondMean = rest[0]?.mean ?? 0
    secondaryCandidates = idsAtMean(rest, secondMean)
    needsSecondaryTieBreak = secondaryCandidates.length > 1
  } else {
    // Primary tie: secondary is chosen after user picks primary.
    secondaryCandidates = []
    needsSecondaryTieBreak = false
  }

  return {
    ordered,
    primaryCandidates,
    secondaryCandidates,
    needsPrimaryTieBreak: primaryCandidates.length > 1,
    needsSecondaryTieBreak,
  }
}

export function secondaryCandidatesFor(
  answers: Answers,
  primary: BlockId,
): BlockId[] {
  const blocks = scoreBlocks(answers)
  const rest = blocks.filter((b) => b.id !== primary)
  const ordered = [...rest].sort((a, b) => b.mean - a.mean)
  const secondMean = ordered[0]?.mean ?? 0
  return idsAtMean(ordered, secondMean)
}

export function buildResult(
  answers: Answers,
  primary: BlockId,
  secondary: BlockId,
): QuizResult {
  const blocks = scoreBlocks(answers)
  const total = blocks.reduce((acc, b) => acc + b.sum, 0)
  return {
    total,
    blocks,
    primary,
    secondary,
    type: getType(primary, secondary),
    severity: severityFromTotal(total),
  }
}

export function isComplete(answers: Answers): boolean {
  return QUESTIONS.every((q) => answers[q.id] !== undefined)
}
