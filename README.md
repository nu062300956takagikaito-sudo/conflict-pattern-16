# 衝突パターン16タイプ診断

お悩み相談室向けの無料インタラクティブ診断（Vite + React + TypeScript）。

## 開発

```bash
cd relationship-conflict-quiz
npm install
npm run dev
```

本番ビルド:

```bash
npm run build
npm run preview
```

## 概要

- 30問・5件法 Likert（0–4）
- 4ブロックの平均点から主軸・副軸を決定 → 16タイプ
- 同点時はユーザーが「最近いちばんしんどい場面」に近いブロックを選択
- 結果画面に合計・ブロック得点・タイプ解説・整え方・メンタリングCTA（モック）
