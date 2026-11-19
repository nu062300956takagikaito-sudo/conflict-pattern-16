export type BlockId = 'A' | 'B' | 'C' | 'D'

export type LikertValue = 0 | 1 | 2 | 3 | 4

export interface LikertOption {
  value: LikertValue
  label: string
}

export interface Question {
  id: number
  block: BlockId
  text: string
}

export interface ConflictType {
  code: string
  primary: BlockId
  secondary: BlockId
  name: string
  explanation: string
  tip: string
}

export const LIKERT_OPTIONS: LikertOption[] = [
  { value: 4, label: 'よくある' },
  { value: 3, label: 'ときどきある' },
  { value: 2, label: 'どちらともいえない' },
  { value: 1, label: 'ほとんどない' },
  { value: 0, label: 'まったくない' },
]

export const BLOCKS: Record<
  BlockId,
  { id: BlockId; label: string; short: string }
> = {
  A: { id: 'A', label: 'すぐ言い返す', short: '否定されるとすぐ押し返す' },
  B: { id: 'B', label: 'ためて爆発', short: '溜めてから一気に出る' },
  C: { id: 'C', label: '気にしすぎ', short: '曖昧さを悪意に取りやすい' },
  D: { id: 'D', label: '自分を責める', short: '「自分が悪い」に寄りすぎる' },
}

export const QUESTIONS: Question[] = [
  // Block A — 防衛反撃 (1–8)
  {
    id: 1,
    block: 'A',
    text: '注意されると、内容より言い方の方が気になって反論したくなる',
  },
  {
    id: 2,
    block: 'A',
    text: '冗談でも性格をいじられると、すぐに言い返す',
  },
  {
    id: 3,
    block: 'A',
    text: '「わかってない」と感じると、説明より先に態度が硬くなる',
  },
  {
    id: 4,
    block: 'A',
    text: '議論になると、正しさより負けたくなくなる',
  },
  {
    id: 5,
    block: 'A',
    text: '相手の指摘が少しでもズレていると、全体を否定したくなる',
  },
  {
    id: 6,
    block: 'A',
    text: '謝るより先に、自分の正当化をしてしまう',
  },
  {
    id: 7,
    block: 'A',
    text: '距離を置きたい相手に、つい刺さる一言を言ってしまう',
  },
  {
    id: 8,
    block: 'A',
    text: '後で「言いすぎた」と思うことが多い',
  },
  // Block B — 我慢爆発 (9–15)
  {
    id: 9,
    block: 'B',
    text: '嫌なことがあっても、その場では笑って流すことが多い',
  },
  {
    id: 10,
    block: 'B',
    text: '「大したことない」と自分に言い聞かせて我慢する',
  },
  {
    id: 11,
    block: 'B',
    text: '溜まった不満を、別の人や別の場面でぶつけてしまう',
  },
  {
    id: 12,
    block: 'B',
    text: '限界まで我慢したあと、急に冷たくなる',
  },
  {
    id: 13,
    block: 'B',
    text: '本当は言いたいのに、タイミングを逃してモヤモヤする',
  },
  {
    id: 14,
    block: 'B',
    text: '小さなことで急にイライラして、自分でも驚く',
  },
  {
    id: 15,
    block: 'B',
    text: '爆発したあと、「あの人のせい」と「自分のせい」で揺れる',
  },
  // Block C — 被害解釈 (16–22)
  {
    id: 16,
    block: 'C',
    text: 'LINEの既読無視を、嫌われているサインに感じやすい',
  },
  {
    id: 17,
    block: 'C',
    text: '会議や会話で自分が外されている気がする',
  },
  {
    id: 18,
    block: 'C',
    text: '相手の短い返事を、怒っている証拠だと思いやすい',
  },
  {
    id: 19,
    block: 'C',
    text: '「大丈夫？」と聞かれても、裏があるのではと考える',
  },
  {
    id: 20,
    block: 'C',
    text: '友人同士の会話を見て、自分の悪口かもと思うことがある',
  },
  {
    id: 21,
    block: 'C',
    text: '曖昧な態度を、拒絶だと決めつけてしまう',
  },
  {
    id: 22,
    block: 'C',
    text: '確認する前に、相手への印象が悪くなっている',
  },
  // Block D — 自己卑下 (23–30)
  {
    id: 23,
    block: 'D',
    text: 'いざこざが起きると、まず「自分の性格が悪い」と思う',
  },
  {
    id: 24,
    block: 'D',
    text: '相手の機嫌を損ねないように、本音を隠す',
  },
  {
    id: 25,
    block: 'D',
    text: '「また変なこと言ったかも」と後から何度も思い出す',
  },
  {
    id: 26,
    block: 'D',
    text: '謝りすぎて、かえって関係がぎこちなくなる',
  },
  {
    id: 27,
    block: 'D',
    text: '自分の意見を言うと、嫌われる気がする',
  },
  {
    id: 28,
    block: 'D',
    text: '褒められても、すぐ否定したくなる',
  },
  {
    id: 29,
    block: 'D',
    text: '衝突を避けるために、不利な条件でも合わせてしまう',
  },
  {
    id: 30,
    block: 'D',
    text: '誰かに否定されると、数日引きずる',
  },
]

/** Tips follow the note draft: primary tip + optional secondary tip (skip when same-axis). */
const tipFor = (primary: BlockId, secondary: BlockId): string => {
  const primaryTips: Record<BlockId, string> = {
    A: '反論の前に、まず10秒おく。「事実 / 気持ち / 希望」を1文ずつ言ってみる。',
    B: '嫌だったことを、その日のうちに1行だけ残す。小さな一言で返す練習もしてみる。',
    C: '「決めつけ」と「確認の質問」を分けて書く。確認する前に距離を取らない。',
    D: '謝るのは1回まで。あわせて、要望を1つだけ添えてみる。',
  }
  if (primary === secondary) return primaryTips[primary]

  const secondaryTips: Record<BlockId, Partial<Record<BlockId, string>>> = {
    A: {
      B: '爆発しそうなときの身体サイン（熱い顔・早口）をメモする。',
      C: 'いまの相手は「敵意が確定」か「まだ未確認」か、先に一行書く。',
      D: '言い返したあとの自己攻撃は、1行だけ書いて区切る。',
    },
    B: {
      A: '後から刺す代わりに、できればその日のうちに短い一文で返す。',
      C: '想像で傷ついた点と、事実だけを2列に分けて書く。',
      D: '爆発したあとの自責は、15分タイマーでいったん止める。',
    },
    C: {
      A: '確認する前の反撃は、いったん禁止ルールにする。',
      B: '黙ったまま溜めない。確認の一文を下書きしてから送る。',
      D: '「嫌われた＋自分が悪い」の二重決めつけになっていないか疑う。',
    },
    D: {
      A: '卑下から一気に言いすぎないよう、先に要望の一文を書いておく。',
      B: '「合わせてしまう」回数を、週に一度だけ数えてみる。',
      C: '自責と被害想像が同時なら、事実確認を先にする。',
    },
  }
  const base = primaryTips[primary]
  const extra = secondaryTips[primary][secondary]
  return extra ? `${base} ${extra}` : base
}

export const TYPES: ConflictType[] = [
  {
    code: 'A-A',
    primary: 'A',
    secondary: 'A',
    name: '反撃のアキラ',
    explanation:
      '否定されると、すぐ反論や正当化が出やすいタイプ。正しさ勝負になりやすく、まわりから「キツく見える」ことも。',
    tip: tipFor('A', 'A'),
  },
  {
    code: 'A-B',
    primary: 'A',
    secondary: 'B',
    name: '爆発のケンタ',
    explanation:
      '言い返す勢いのうえに、我慢のストレスが乗りやすい。小さな指摘でも、声や態度が一気に大きくなりがち。',
    tip: tipFor('A', 'B'),
  },
  {
    code: 'A-C',
    primary: 'A',
    secondary: 'C',
    name: '疑いのリョウ',
    explanation:
      '「攻撃された」と感じた瞬間に言い返しやすい。曖昧な言動でも敵意ありきで押し返してしまうことがある。',
    tip: tipFor('A', 'C'),
  },
  {
    code: 'A-D',
    primary: 'A',
    secondary: 'D',
    name: '後悔のハルト',
    explanation:
      '言い返した直後に自己嫌悪が来やすい。強気と「自分が最悪」が、短い時間で入れ替わるのが特徴。',
    tip: tipFor('A', 'D'),
  },
  {
    code: 'B-A',
    primary: 'B',
    secondary: 'A',
    name: '後出しのユウキ',
    explanation:
      'その場では黙りやすいが、あとから刺さる一言や態度で返しがち。相手には「突然キレた」ように見えやすい。',
    tip: tipFor('B', 'A'),
  },
  {
    code: 'B-B',
    primary: 'B',
    secondary: 'B',
    name: 'がまんのナオキ',
    explanation:
      '嫌なことを溜め込み、限界で一気に出しやすい。前後の予兆が少なく、あとから関係を戻しにくいことも。',
    tip: tipFor('B', 'B'),
  },
  {
    code: 'B-C',
    primary: 'B',
    secondary: 'C',
    name: '気にし屋のサトシ',
    explanation:
      '「嫌われてる気がする」を溜めて爆発しやすい。事実確認より、想像の傷が燃料になりがち。',
    tip: tipFor('B', 'C'),
  },
  {
    code: 'B-D',
    primary: 'B',
    secondary: 'D',
    name: '自責のショウタ',
    explanation:
      '我慢の末に爆発し、そのあと強く自分を責めやすい。「怒ってしまった自分」への嫌悪が長く残ることも。',
    tip: tipFor('B', 'D'),
  },
  {
    code: 'C-A',
    primary: 'C',
    secondary: 'A',
    name: '警戒のミナト',
    explanation:
      '悪意を感じると先に警戒し、少し触れられると反撃しやすい。距離を取りつつ攻撃も出るセットになりがち。',
    tip: tipFor('C', 'A'),
  },
  {
    code: 'C-B',
    primary: 'C',
    secondary: 'B',
    name: '沈黙のカイト',
    explanation:
      '傷つけられたと感じても言わず、心のなかで物語が大きくなりやすい。ある日突然冷たくなることがある。',
    tip: tipFor('C', 'B'),
  },
  {
    code: 'C-C',
    primary: 'C',
    secondary: 'C',
    name: '決めつけのレン',
    explanation:
      '曖昧なサインを、拒絶や排除の証拠にしやすい。確認する前に、関係を諦めがちになることも。',
    tip: tipFor('C', 'C'),
  },
  {
    code: 'C-D',
    primary: 'C',
    secondary: 'D',
    name: '落ち込みのアヤト',
    explanation:
      '「嫌われてる」と感じつつ「自分が悪いから当然」と思いやすい。孤立と自己否定が同時に進むことがある。',
    tip: tipFor('C', 'D'),
  },
  {
    code: 'D-A',
    primary: 'D',
    secondary: 'A',
    name: '反転のダイキ',
    explanation:
      '普段は自分を下げがちだが、限界で急に強く言い返すことがある。まわりには一貫して見えないこともある。',
    tip: tipFor('D', 'A'),
  },
  {
    code: 'D-B',
    primary: 'D',
    secondary: 'B',
    name: 'いい人のソウタ',
    explanation:
      '「私が悪い」で耐え続け、限界で崩れる・泣く・黙るになりやすい。自分の主張が後回しになりがち。',
    tip: tipFor('D', 'B'),
  },
  {
    code: 'D-C',
    primary: 'D',
    secondary: 'C',
    name: '自責と疑いのコウキ',
    explanation:
      '自分を責めながら、相手の悪意も同時に想像しやすい。謝りすぎと疑心が同居しやすいタイプ。',
    tip: tipFor('D', 'C'),
  },
  {
    code: 'D-D',
    primary: 'D',
    secondary: 'D',
    name: '自分責めのユウト',
    explanation:
      '衝突の原因をほぼ自分に寄せやすい。必要な要望が言えず、否定されたダメージが長く残りがち。',
    tip: tipFor('D', 'D'),
  },
]

export function getType(primary: BlockId, secondary: BlockId): ConflictType {
  const code = `${primary}-${secondary}`
  const found = TYPES.find((t) => t.code === code)
  if (!found) {
    throw new Error(`Unknown type: ${code}`)
  }
  return found
}

export type Severity = 'light' | 'mid' | 'high'

export function severityFromTotal(total: number): {
  level: Severity
  label: string
  description: string
} {
  if (total <= 40) {
    return {
      level: 'light',
      label: '軽め',
      description: 'クセはあるけれど、気づきながら整えやすい段階です。',
    }
  }
  if (total <= 80) {
    return {
      level: 'mid',
      label: 'ふつう〜やや強め',
      description: 'タイプのクセが、対人関係に出やすい段階です。',
    }
  }
  return {
    level: 'high',
    label: '強め',
    description: '否定されたときの反応が、日常にも入り込みやすい段階です。',
  }
}
