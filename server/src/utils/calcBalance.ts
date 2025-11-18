// 引き算を行う関数 収入-支出

// 例えば、収入が10000円で支出が3000円の場合、残高は7000円となる
// income（収入） と expense（支出） を引数に取り、残高を返す

// src/utils/calcBalance.ts

export function calcBalance(income: number, expense: number): number {
  // 1. null / undefined チェック
  if (income == null) {
    throw new Error('収入が未入力です');
  }
  if (expense == null) {
    throw new Error('支出が未入力です');
  }

  // 2. 型チェック（呼び出し元がJSの可能性も考慮）
  if (typeof income !== 'number' || Number.isNaN(income)) {
    throw new Error('収入には数値を入力してください');
  }
  if (typeof expense !== 'number' || Number.isNaN(expense)) {
    throw new Error('支出には数値を入力してください');
  }

  // 3. 無限大のようなおかしな数値
  if (!Number.isFinite(income) || !Number.isFinite(expense)) {
    throw new Error('収入と支出には正しい数値を入力してください');
  }

  // 4. マイナス値は禁止
  if (income < 0) {
    throw new Error('収入にマイナスは入力できません');
  }
  if (expense < 0) {
    throw new Error('支出にマイナスは入力できません');
  }

  // 5.（任意）あまりに桁数が大きい場合に弾く例
  const MAX_AMOUNT = 1_000_000_000; // 10億とか
  if (income > MAX_AMOUNT || expense > MAX_AMOUNT) {
    throw new Error('金額が大きすぎます');
  }

  // 正常系: 残高計算
  return income - expense;
}
